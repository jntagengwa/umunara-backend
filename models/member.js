const Joi = require("@hapi/joi");
const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
  },
  number: {
    type: Number,
    required: true,
    minlength: 1,
    maxlength: 9999999999,
  },
  email: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 36,
    unique: true,
  },
  denomination: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 40,
  },
});

const Member = mongoose.model("Member", memberSchema);

function validateMember(member) {
  const schema = {
    name: Joi.string().min(2).max(50).required(),
    number: Joi.number().min(1).max(9999999999).required(),
    email: Joi.string().min(6).max(36).required(),
    denomination: Joi.string().min(4).max(40).required(),
  };

  return Joi.validate(member, schema);
}

exports.Member = Member;
exports.validate = validateMember;
