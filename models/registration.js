const Joi = require("@hapi/joi");
const mongoose = require("mongoose");

const registrationSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
  },
  lastName: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 36,
    unique: true,
  },
  homeChurch: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 300,
  },
  thoughts: {
    type: String,
    minlength: 6,
    maxlength: 300,
  },
  hopes: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 300,
  },
  getInvolved: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 40,
  },
});

const Registration = mongoose.model("Registration", registrationSchema);

function validateRegistration(registration) {
  const schema = {
    firstName: Joi.string().min(2).max(50).required(),
    lastName: Joi.string().min(2).max(50).required(),
    email: Joi.string().min(6).max(36).required(),
    homeChurch: Joi.string().min(1).max(300).required(),
    thoughts: Joi.string().min(6).max(300),
    hopes: Joi.string().min(6).max(300).required(),
    getInvolved: Joi.string().min(2).max(40).required(),
  };

  return Joi.validate(registration, schema);
}

exports.Registration = Registration;
exports.validate = validateRegistration;
