const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

//load validation
const validateContactInput = require("../../validations/contact");

//load user and contact model
const Contact = require("../../models/Contact");
const User = require("../../models/User");

//@route GET /api/contacts/test
//@desc tests contacts route
//@access public
router.get("/test", (req, res) => res.json({ message: "Contacts works" }));

//@route GET /api/contacts/
//@desc Get current users contacts
//@access private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    Contact.find({ user: req.user.id })
      .sort({ date: -1 })
      .then(contacts => {
        if (contacts.length === 0) {
          errors.contacts = "No contacts found";
          return res.status(400).json(errors);
        }
        res.status(200).json(contacts);
      })
      .catch(e => res.json(e));
  }
);

//@route POST /api/contacts/
//@desc create new or edit contact
//@access private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateContactInput(req.body);
    if (!isValid) {
      return res.status(404).json(errors);
    }

    //check if contact already exists
    Contact.findOne({
      user: req.user.id,
      contactPhone: req.body.contactPhone,
      contactEmail: req.body.contactEmail
    })
      .then(contact => {
        if (contact) {
          return res.status(400).json({ message: "Contact alread exists" });
        }
        //creating the contact with req.body since it is a post
        const newContact = new Contact({ user: req.user.id });
        if (req.body.contactName) newContact.contactName = req.body.contactName;
        if (req.body.contactEmail)
          newContact.contactEmail = req.body.contactEmail;
        if (req.body.contactPhone)
          newContact.contactPhone = req.body.contactPhone;

        newContact
          .save()
          .then(contact => {
            res.status(200).json(contact);
          })
          .catch(e => res.status(404).json(e));
      })
      .catch(e => res.status(404).json(e));
  }
);

//@route POST /api/contacts/:id
//@desc updating an existing contact
//@access private
router.post(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateContactInput(req.body);

    if (!isValid) {
      return res.status(404).json(errors);
    }

    const updatedContact = {};
    updatedContact.user = req.user.id;
    if (req.body.contactName) updatedContact.contactName = req.body.contactName;
    if (req.body.contactEmail)
      updatedContact.contactEmail = req.body.contactEmail;
    if (req.body.contactPhone)
      updatedContact.contactPhone = req.body.contactPhone;

    Contact.findOne({ _id: req.params.id })
      .then(contact => {
        if (!contact) {
          return res.json({ msg: "something is wrong" });
        } else {
          //update
          Contact.findOneAndUpdate(
            { _id: req.params.id },
            { $set: updatedContact },
            { new: true }
          ).then(contact => res.json(contact));
        }
      })
      .catch(e => res.json({ msg: "something went wrong" }));
  }
);

//@route DELETE /api/contacts/:id
//@desc Deleting a contact
//@access private
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Contact.findById({ _id: req.params.id })
      .then(contact => {
        //check the owner
        if (contact.user.toString() !== req.user.id) {
          res.status(401).json({ notAuthorized: "Not authorized" });
        }

        //Delete the contact
        contact.remove().then(() => res.json({ Success: true }));
      })
      .catch(e => res.status(404).json({ postNotFound: "No post found" }));
  }
);

module.exports = router;
