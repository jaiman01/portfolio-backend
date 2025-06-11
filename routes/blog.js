const express = require("express");
const router = express.Router();
const BlogPost = require("../models/BlogPost");

// Get all blog posts
router.get("/", async (req, res) => {
  const posts = await BlogPost.find();
  res.json(posts);
});

// Add a new blog post
router.post("/", async (req, res) => {
  const newPost = new BlogPost(req.body);
  const savedPost = await newPost.save();
  res.status(201).json(savedPost);
});

router.get("/:id", async (req, res) => {
  try {
    const post = await BlogPost.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Blog not found" });
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
