const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Joi = require("joi");

//create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now()
  }
});

module.exports = user = mongoose.model("users", UserSchema);

// import mongoose from "mongoose";

// const Schema = mongoose.Schema;

// const ContactSchema = new Schema({
//   firstName: {
//     type: String,
//     required: "Enter a first name"
//   },
//   lastName: {
//     type: String,
//     required: "Enter a last name"
//   },
//   email: {
//     type: String
//   },
//   phone: {
//     type: Number
//   },
//   company: {
//     type: String
//   },
//   created_date: {
//     type: Date,
//     default: Date.now
//   }
// });

// export default ContactSchema;
