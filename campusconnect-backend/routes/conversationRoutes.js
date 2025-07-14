import express from 'express';
import authenticateUser from '../middleware/authMiddleware.js';
import Conversation from '../models/Conversation.js';

const router = express.Router();

// GET /api/conversations – all convos for logged user
router.get('/', authenticateUser, async (req, res) => {
  const convos = await Conversation.find({ members: req.user._id })
    .populate('members', 'name profilePic college')
    .sort({ updatedAt: -1 });
  res.json(convos);
});

export default router;
