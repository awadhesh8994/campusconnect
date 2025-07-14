// controllers/messageController.js
import Message from '../models/Message.js';

export const sendMessage = async (req, res) => {
  try {
    const { recipientId, text } = req.body;

    const message = await Message.create({
      sender: req.user.id,
      recipient: recipientId,
      text
    });

    res.status(201).json(message);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getMessagesBetweenUsers = async (req, res) => {
  try {
    const userId = req.user.id;
    const recipientId = req.params.userId;

    const messages = await Message.find({
      $or: [
        { sender: userId, recipient: recipientId },
        { sender: recipientId, recipient: userId }
      ]
    }).sort({ createdAt: 1 });

    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
