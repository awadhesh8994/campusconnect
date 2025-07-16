// routes/userRoutes.js
import express from 'express';
import multer from 'multer';
import authenticateUser from '../middleware/authMiddleware.js';
import {
  getUserProfile,
  updateUserProfile,
  searchUsers
} from '../controllers/userController.js';

const upload = multer({ dest: 'uploads/' });

const router = express.Router();

// @route   GET /api/users/:id
// @desc    Get user profile by ID
// @access  Private
router.get('/:id', authenticateUser, getUserProfile);

// @route   PUT /api/users/:id
// @desc    Update user profile
// @access  Private (Only self)
router.put('/:id', authenticateUser, upload.single('profilePic'), updateUserProfile);

// @route   GET /api/users
// @desc    Search users by name or branch
// @access  Private
router.get('/', authenticateUser, searchUsers);

// Optional: extra route for clarity
router.get('/search', authenticateUser, searchUsers);

export default router;
