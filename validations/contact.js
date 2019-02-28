const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateContactInput(data) {
  let errors = {};

  data.contactName = !isEmpty(data.contactName) ? data.contactName : "";
  data.contactEmail = !isEmpty(data.contactEmail) ? data.contactEmail : "";
  data.contactPhone = !isEmpty(data.contactPhone) ? data.contactPhone : "";

  if (!Validator.isEmail(data.contactEmail)) {
    errors.contactEmail = "Contact Email is invalid";
  }

  if (Validator.isEmpty(data.contactEmail)) {
    errors.contactEmail = "Contact Email field is required";
  }

  if (Validator.isEmpty(data.contactName)) {
    errors.contactName = "Contact Name field is required";
  }

  if (Validator.isEmpty(data.contactPhone)) {
    errors.contaccontactPhonetName = "Contact Phone field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
