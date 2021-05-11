const validateObjectId = require("../middleware/validateObjectId");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const { Registration, validate } = require("../models/registration");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const registrations = await Registration.find().select("-__v").sort("name");
  res.send(registrations);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let registration = new Registration({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    homeChurch: req.body.homeChurch,
    thoughts: req.body.thoughts,
    hopes: req.body.hopes,
    getInvolved: req.body.getInvolved,
  });
  registration = await registration.save();

  res.send(registration);
});

router.put("/:id", [auth, validateObjectId], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const registration = await Registration.findByIdAndUpdate(
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

  if (!registration)
    return res
      .status(404)
      .send("The registration with the given ID was not found.");

  res.send(registration);
});

router.delete("/:id", [auth, admin, validateObjectId], async (req, res) => {
  const registration = await Registration.findByIdAndRemove(req.params.id);

  if (!registration)
    return res
      .status(404)
      .send("The registration with the given ID was not found.");

  res.send(registration);
});

router.get("/:id", validateObjectId, async (req, res) => {
  const registration = await Registration.findById(req.params.id).select(
    "-__v"
  );

  if (!registration)
    return res
      .status(404)
      .send("The registration with the given ID was not found.");

  res.send(registration);
});

module.exports = router;
