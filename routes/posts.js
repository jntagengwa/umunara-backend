const validateObjectId = require("../middleware/validateObjectId");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const { Post, validate } = require("../models/post");
const { Category } = require("../models/category");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const posts = await Post.find().select("-__v").sort("title");
  res.send(posts);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const category = await Category.findById(req.body.categoryId);
  if (!category) return res.status(400).send("Invalid category.");

  const post = new Post({
    title: req.body.title,
    category: {
      _id: category._id,
      name: category.name,
    },
    text: req.body.text,
    createdAt: Date.now(),
    description: req.body.description,
    author: req.body.author,
  });
  await post.save();

  res.send(post);
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const category = await Category.findById(req.body.categoryId);
  if (!category) return res.status(400).send("Invalid category.");

  const post = await Post.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      category: {
        _id: category._id,
        name: category.name,
      },
      text: req.body.text,
      createdAt: Date.now(),
      description: req.body.description,
      author: req.body.author,
    },
    {
      new: true,
    }
  );

  if (!post)
    return res.status(404).send("The post with the given ID was not found.");

  res.send(post);
});

router.delete("/:id", [auth, admin, validateObjectId], async (req, res) => {
  const post = await Post.findByIdAndRemove(req.params.id);

  if (!post)
    return res.status(404).send("The post with the given ID was not found.");

  res.send(post);
});

router.get("/:id", validateObjectId, async (req, res) => {
  const post = await Post.findById(req.params.id).select("-__v");

  if (!post)
    return res.status(404).send("The post with the given ID was not found.");

  res.send(post);
});

module.exports = router;
