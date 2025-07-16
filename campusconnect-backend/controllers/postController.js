// controllers/postController.js
import Post from "../models/Post.js";
import cloudinary from "../config/cloudinary.js";
import fs from "fs";

// Create a new post
export const createPost = async (req, res) => {
  try {
    const { text } = req.body;
    let imageUrl = "";

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "campusconnect/posts",
      });
      imageUrl = result.secure_url;
      fs.unlinkSync(req.file.path); // remove temp file
    }

    const post = await Post.create({
      user: req.user.id,
      text,
      image: imageUrl,
    });

    const populated = await post.populate("user", "name profilePic");
    res.status(201).json(populated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// Get all posts with pagination
export const getAllPosts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    const posts = await Post.find()
      .populate("user", "name profilePic")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const totalPosts = await Post.countDocuments();
    const totalPages = Math.ceil(totalPosts / limit);

    res.status(200).json({
      posts,
      totalPages,
      currentPage: page,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Like or unlike a post
export const likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    const liked = post.likes.includes(req.user.id);
    if (liked) {
      post.likes = post.likes.filter((id) => id.toString() !== req.user.id);
    } else {
      post.likes.push(req.user.id);
    }

    await post.save();
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add a comment to a post
export const commentPost = async (req, res) => {
  try {
    const { text } = req.body;
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    post.comments.push({ user: req.user.id, text });
    await post.save();
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a post
export const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    if (post.user.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await post.remove();
    res.json({ message: "Post deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
