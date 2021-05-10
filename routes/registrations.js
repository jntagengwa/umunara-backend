const validateObjectId = require("../middleware/validateObjectId");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const { Register, validate } = require("../models/register");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const registers = await Register.find().select("-__v").sort("name");
  res.send(registers);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let register = new Register({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    homeChurch: req.body.homeChurch,
    thoughts: req.body.thoughts,
    hopes: req.body.hopes,
    getInvolved: req.body.getInvolved,
  });
  register = await register.save();

  res.send(register);
});

router.put("/:id", [auth, validateObjectId], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const register = await Register.findByIdAndUpdate(
    req.params.id,
    {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      homeChurch: req.body.homeChurch,
      thoughts: req.body.thoughts,
      hopes: req.body.hopes,
      getInvolved: req.body.getInvolved,
    },
    {
      new: true,
    }
  );

  if (!register)
    return res
      .status(404)
      .send("The register with the given ID was not found.");

  res.send(register);
});

router.delete("/:id", [auth, admin, validateObjectId], async (req, res) => {
  const register = await Register.findByIdAndRemove(req.params.id);

  if (!register)
    return res
      .status(404)
      .send("The register with the given ID was not found.");

  res.send(register);
});

router.get("/:id", validateObjectId, async (req, res) => {
  const register = await Register.findById(req.params.id).select("-__v");

  if (!register)
    return res
      .status(404)
      .send("The register with the given ID was not found.");

  res.send(register);
});

module.exports = router;
