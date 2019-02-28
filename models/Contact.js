const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create schema
const contactSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  contactName: {
    type: String,
    required: true,
    min: 2,
    max: 30
  },
  contactEmail: {
    type: String,
    required: true
  },
  contactPhone: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now()
  }
});

module.exports = Contact = mongoose.model("contacts", contactSchema);
