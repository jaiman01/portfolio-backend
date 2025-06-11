const express = require("express");
const router = express.Router();
const ContactMessage = require("../models/ContactMessage");

// Save a contact message
router.post("/", async (req, res) => {
  const newMessage = new ContactMessage(req.body);
  const savedMessage = await newMessage.save();
  res.status(201).json(savedMessage);
});

module.exports = router;
