const express = require("express");
const router = express.Router();
const Project = require("../models/ProjectData");

console.log("✅ Projects route loaded");

// Test route
router.get("/test", (req, res) => {
  res.send("✅ Project route is working!");
});

// Get all projects
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Get a single project by ID (FIXED POSITION)
router.get("/:id", async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found" });
    res.json(project);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new project
router.post("/", async (req, res) => {
  console.log("✅ POST /api/projects hit");
  console.log("🧾 Request body:", req.body);

  const newProject = new Project(req.body);
  try {
    const savedProject = await newProject.save();
    res.status(201).json(savedProject);
  } catch (err) {
    console.error("❌ Error saving project:", err.message);
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
