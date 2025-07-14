// routes/adminRoutes.js
import express from 'express';
import { isAuthenticated } from '../middleware/auth.js';
import isAdmin from '../middleware/isAdmin.js';
import User from '../models/User.js';
import CommunityPost from '../models/CommunityPost.js';

const router = express.Router();

// DELETE user
router.delete('/user/:id', isAuthenticated, isAdmin, async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: 'User deleted' });
});

// DELETE community post
router.delete('/post/:id', isAuthenticated, isAdmin, async (req, res) => {
  await CommunityPost.findByIdAndDelete(req.params.id);
  res.json({ message: 'Post deleted' });
});

// GET all community posts
router.get('/posts', isAuthenticated, isAdmin, async (req, res) => {
  console.log('🔐 Admin route hit by user:', req.user);
  try {
    const posts = await CommunityPost.find().populate('author');
    res.json(posts);
  } catch (err) {
    console.error('❌ Error fetching posts:', err);
    res.status(500).json({ message: 'Failed to fetch posts' });
  }
});

export default router;
