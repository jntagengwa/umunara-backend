const Joi = require("@hapi/joi");
Joi.objectId = require("joi-objectId")(Joi);
const mongoose = require("mongoose");
const { categorySchema } = require("./category");

const Post = mongoose.model(
  "Posts",
  new mongoose.Schema({
    title: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50,
    },
    category: {
      type: categorySchema,
      required: true,
    },
    text: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 9999999,
    },
    createdAt: {
      type: Number,
      value: Date.now(),
    },
    description: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 9999999,
    },
    author: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 30,
    },
  })
);

function validatePost(post) {
  const schema = {
    title: Joi.string().min(3).max(50).required(),
    categoryId: Joi.objectId().required(),
    text: Joi.string().min(1).max(9999999).required(),
    createdAt: Joi.number(),
    description: Joi.string().min(1).max(9999999).required(),
    author: Joi.string().min(5).max(30).required(),
  };

  return Joi.validate(post, schema);
}

exports.Post = Post;
exports.validate = validatePost;
