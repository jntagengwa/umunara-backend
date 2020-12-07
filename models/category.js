const Joi = require("joi");
const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 30,
  },
});

const Category = mongoose.model("Group", categorySchema);

function validateCategory(category) {
  const schema = {
    name: Joi.string().min(3).max(30).required(),
  };

  return Joi.validate(category, schema);
}

exports.categorySchema = categorySchema;
exports.Category = Category;
exports.validate = validateCategory;
