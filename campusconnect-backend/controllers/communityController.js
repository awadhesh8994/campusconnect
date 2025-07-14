// File: controllers/communityController.js
import CommunityPost from '../models/CommunityPost.js';

const createCommunityPost = async (req, res) => {
  try {
    const { text, image, tags, type, poll } = req.body;
    const post = await CommunityPost.create({
      user: req.user.id,
      text,
      image,
      tags,
      type,
      poll,
      reactions: {},
      pinned: false
    });
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const reactToPost = async (req, res) => {
  try {
    const { emoji } = req.body;
    const post = await CommunityPost.findById(req.params.id);
    if (!post.reactions.has(emoji)) post.reactions.set(emoji, []);

    const userId = req.user.id.toString();
    const updated = new Set(post.reactions.get(emoji).map(id => id.toString()));

    if (updated.has(userId)) {
      updated.delete(userId);
    } else {
      updated.add(userId);
    }

    post.reactions.set(emoji, [...updated]);
    await post.save();
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const votePoll = async (req, res) => {
  try {
    const { option } = req.body;
    const post = await CommunityPost.findById(req.params.id);
    if (post.type !== 'poll') return res.status(400).json({ error: 'Not a poll post' });

    for (let opt of post.poll.options) {
      opt.votes = opt.votes.filter(v => v.toString() !== req.user.id);
      if (opt.option === option) {
        opt.votes.push(req.user.id);
      }
    }

    await post.save();
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getFilteredCommunityPosts = async (req, res) => {
  try {
    const { filter = 'latest' } = req.query;
    let sort = { createdAt: -1 };
    if (filter === 'most_liked') sort = { 'likes.length': -1 };
    if (filter === 'trending') sort = { trendingScore: -1 };

    const posts = await CommunityPost.aggregate([
      {
        $addFields: {
          reactionCount: { $sum: { $map: { input: { $objectToArray: "$reactions" }, as: "r", in: { $size: "$$r.v" } } } },
          trendingScore: {
            $multiply: [
              { $sum: { $map: { input: { $objectToArray: "$reactions" }, as: "r", in: { $size: "$$r.v" } } } },
              1.5
            ]
          }
        }
      },
      { $sort: sort },
      { $limit: 50 }
    ]);

    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const pinUnpinPost = async (req, res) => {
  try {
    if (req.user.role !== 'admin') return res.status(403).json({ error: 'Admins only' });
    const post = await CommunityPost.findById(req.params.id);
    post.pinned = !post.pinned;
    await post.save();
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export default {
  createCommunityPost,
  reactToPost,
  votePoll,
  getFilteredCommunityPosts,
  pinUnpinPost
};
