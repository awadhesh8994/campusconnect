// File: models/CommunityPost.js
import mongoose from 'mongoose';

const pollOptionSchema = new mongoose.Schema({
  option: String,
  votes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

const pollSchema = new mongoose.Schema({
  question: String,
  options: [pollOptionSchema]
});

const communityPostSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  text: { type: String },
  image: { type: String },
  tags: [String],
  type: { type: String, enum: ['post', 'question', 'poll'], default: 'post' },
  poll: pollSchema,
  reactions: {
    type: Map,
    of: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    default: {}
  },
  pinned: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
}, { timestamps: true });

const CommunityPost = mongoose.model('CommunityPost', communityPostSchema);

export default CommunityPost;
