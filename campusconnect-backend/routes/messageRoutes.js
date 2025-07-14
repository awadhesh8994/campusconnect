// routes/messageRoutes.js
import express from 'express';
import authenticateUser from '../middleware/authMiddleware.js';
import {
  sendMessage,
  getMessagesBetweenUsers
} from '../controllers/messageController.js';

const router = express.Router();

router.post('/', authenticateUser, sendMessage);
router.get('/:userId', authenticateUser, getMessagesBetweenUsers);

export default router;
