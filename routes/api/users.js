const express = require("express");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const jwt = require("jsonwebtoken");
const passport = require("passport");

const router = express.Router();

// Load Input Validation
const validateRegisterInput = require("../../validations/register");
const validateLoginInput = require("../../validations/login");

const User = require("../../models/User");
const keys = require("../../config/keys");

//@route GET /api/users/test
//@desc tests users route
//@access public
router.get("/test", (req, res) => res.json({ message: "Users works" }));

//@route POST /api/users/register
//@desc Register a user
//@access public
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = "Email already exists";
      return res.status(400).json(errors);
    } else {
      const newUser = new User(({ name, email, password } = req.body));

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) {
            console.log(err);
          }
          newUser.password = hash;
          newUser
            .save()
            .then(user => {
              res.status(200).json({ user });
            })
            .catch(e => {
              console.log(e);
            });
        });
      });
    }
  });
});

//@route POST /api/users/login
//@desc login user/ returning JWT token
//@access public
router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  //find user by email
  User.findOne({ email })
    .then(user => {
      //check user exists
      if (!user) {
        errors.email = "User not found";
        res.status(404).json(errors);
      }
      //check password
      bcrypt.compare(password, user.password).then(match => {
        if (match) {
          //create payload
          const payload = { id: user.id, name: user.name, avatar: user.avatar };

          //sign token
          jwt.sign(
            payload,
            keys.secretOrKey,
            { expiresIn: 72000 },
            (err, token) => {
              if (err) {
                console.log(err);
              }
              res.json({ succes: true, token: "Bearer " + token });
            }
          );
        } else {
          errors.password = "password incorrect";
          return res.status(400).json(errors);
        }
      });
    })
    .catch(e => console.log(e));
});

//@route POST /api/users/current
//@desc return current user
//@access private
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
    });
  }
);

module.exports = router;
