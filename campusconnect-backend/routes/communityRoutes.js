// File: routes/communityRoutes.js
import express from 'express';
import multer from 'multer';
import { isAuthenticated } from '../middleware/auth.js';
import communityController from '../controllers/communityController.js';

const router = express.Router();

// @route   POST /api/community
// @desc    Create community post
router.post('/', isAuthenticated, communityController.createCommunityPost);

// @route   GET /api/community
// @desc    Get community posts with filters
router.get('/', communityController.getFilteredCommunityPosts);

// @route   POST /api/community/:id/reaction
// @desc    React to a community post
router.post('/:id/reaction', isAuthenticated, communityController.reactToPost);

// @route   POST /api/community/:id/vote
// @desc    Vote on a poll in a community post
router.post('/:id/vote', isAuthenticated, communityController.votePoll);

// @route   POST /api/community/:id/pin
// @desc    Pin or unpin a community post (admin only)
router.post('/:id/pin', isAuthenticated, communityController.pinUnpinPost);

// Optional: for posts with image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});
const upload = multer({ storage });

// Optional standalone image-based post creation (unused if controller handles file upload)
router.post('/upload', upload.single('image'), async (req, res) => {
  try {
    const { text, tags, category, poll, type } = req.body;
    const image = req.file ? req.file.path : null;
    const parsedTags = tags ? JSON.parse(tags) : [];
    const parsedPoll = poll ? JSON.parse(poll) : null;

    // Example: const post = new Post({ ... });
    // await post.save();
    res.status(201).json({ message: 'Post created', post: null });
  } catch (error) {
    res.status(400).json({ error: 'Failed to create post' });
  }
});

export default router;
