// routes/postRoutes.js
import express from 'express';
import authenticateUser from '../middleware/authMiddleware.js';
import {
  createPost,
  getAllPosts,
  likePost,
  commentPost,
  deletePost
} from '../controllers/postController.js';

const router = express.Router();

router.post('/', authenticateUser, createPost);
router.get('/', getAllPosts);
router.post('/:id/like', authenticateUser, likePost);
router.post('/:id/comment', authenticateUser, commentPost);
router.delete('/:id', authenticateUser, deletePost);

export default router;
