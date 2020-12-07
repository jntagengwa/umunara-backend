const validateObjectId = require("../middleware/validateObjectId");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const { Member, validate } = require("../models/member");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const members = await Member.find().select("-__v").sort("name");
  res.send(members);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let member = new Member({
    name: req.body.name,
    number: req.body.number,
    email: req.body.email,
    denomination: req.body.denomination,
  });
  member = await member.save();

  res.send(member);
});

router.put("/:id", [auth, validateObjectId], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const member = await Member.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      number: req.body.number,
      email: req.body.email,
      denomination: req.body.denomination,
    },
    {
      new: true,
    }
  );

  if (!member)
    return res.status(404).send("The member with the given ID was not found.");

  res.send(member);
});

router.delete("/:id", [auth, admin, validateObjectId], async (req, res) => {
  const member = await Member.findByIdAndRemove(req.params.id);

  if (!member)
    return res.status(404).send("The member with the given ID was not found.");

  res.send(member);
});

router.get("/:id", validateObjectId, async (req, res) => {
  const member = await Member.findById(req.params.id).select("-__v");

  if (!member)
    return res.status(404).send("The member with the given ID was not found.");

  res.send(member);
});

module.exports = router;
