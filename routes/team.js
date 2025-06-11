const express = require("express");
const router = express.Router();
const TeamMember = require("../models/TeamMember");

// Get all team members
router.get("/", async (req, res) => {
  const members = await TeamMember.find();
  res.json(members);
});

// Add a new team member
router.post("/", async (req, res) => {
  const newMember = new TeamMember(req.body);
  const savedMember = await newMember.save();
  res.status(201).json(savedMember);
});

module.exports = router;
