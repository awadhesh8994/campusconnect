// routes/notificationRoutes.js
import express from 'express';
import authenticateUser from '../middleware/authMiddleware.js';
import {
  getUserNotifications,
  markAllAsRead
} from '../controllers/notificationController.js';

const router = express.Router();

router.get('/', authenticateUser, getUserNotifications);
router.post('/read', authenticateUser, markAllAsRead);

export default router;
