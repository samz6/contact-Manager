const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

const users = require("./routes/api/users");
const contacts = require("./routes/api/contacts");

const app = express();

//Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//DB config
const db = require("./config/keys").mongoURI;

//connection to mongo db
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("MongoDb connected"))
  .catch(e => console.log(e));

const PORT = process.env.PORT || 5000;

//passport middleware
app.use(passport.initialize());

//passport config
require("./config/passport")(passport);

app.use("/api/users", users);
app.use("/api/contacts", contacts);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
