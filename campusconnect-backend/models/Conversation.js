import mongoose from 'mongoose';

const conversationSchema = new mongoose.Schema(
  {
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    lastMessage: { type: Object }, // { text, senderId, ... }
    unreadMap:   { type: Map, of: Number }, // { userId: count }
  },
  { timestamps: true }
);

export default mongoose.model('Conversation', conversationSchema);
