const commentSchema = new mongoose.Schema({
  postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
  parentCommentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Comment', default: null },
  content: String,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now },
  reactions: {
    type: Map,
    of: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    default: {}
  }
});

module.exports = mongoose.model('Comment', commentSchema);