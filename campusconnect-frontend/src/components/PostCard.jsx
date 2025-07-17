import { useState } from "react";
import { Heart, MessageCircle, Trash2 } from "lucide-react";

export default function PostCard({ post, currentUserId }) {
  const [likes, setLikes] = useState(post.likes || []);
  const [comments, setComments] = useState(post.comments || []);
  const [commentText, setCommentText] = useState("");
  const [deleted, setDeleted] = useState(false);
  const [showComments, setShowComments] = useState(false);

  const isOwner = currentUserId === post.user._id;
  const isLiked = likes.includes(currentUserId);

  const handleLike = async () => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 200));

      if (isLiked) {
        setLikes(likes.filter((id) => id !== currentUserId));
      } else {
        setLikes([...likes, currentUserId]);
      }
    } catch (err) {
      console.error("Like failed:", err);
    }
  };

  const handleComment = async () => {
    if (!commentText.trim()) return;

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 200));

      const newComment = {
        user: {
          _id: currentUserId,
          name: "Current User",
        },
        text: commentText,
        createdAt: new Date().toISOString(),
      };

      setComments([...comments, newComment]);
      setCommentText("");
    } catch (err) {
      console.error("Comment failed:", err);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 200));
      setDeleted(true);
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  };

  if (deleted) return null;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 max-w-2xl mx-auto mb-6 hover:shadow-md transition-shadow duration-200">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-semibold text-gray-900 text-lg">
            {post.user.name}
          </h3>
          <p className="text-sm text-gray-500">{formatTime(post.createdAt)}</p>
        </div>

        {isOwner && (
          <button
            onClick={handleDelete}
            className="p-2 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Post Content */}
      <div className="mb-4">
        <p className="text-gray-800 text-base leading-relaxed mb-4">
          {post.text}
        </p>

        {post.image && (
          <img
            src={post.image}
            alt="Post content"
            className="rounded-lg w-full max-h-96 object-cover"
            onError={(e) =>
              (e.target.src =
                "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop")
            }
          />
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-6 mb-4 pb-4 border-b border-gray-100">
        <button
          onClick={handleLike}
          className={`flex items-center gap-2 text-sm font-medium transition-colors ${
            isLiked ? "text-red-500" : "text-gray-600 hover:text-red-500"
          }`}
        >
          <Heart className={`w-5 h-5 ${isLiked ? "fill-current" : ""}`} />
          {likes.length} {likes.length === 1 ? "Like" : "Likes"}
        </button>

        <button
          onClick={() => setShowComments(!showComments)}
          className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
        >
          <MessageCircle className="w-5 h-5" />
          {comments.length} {comments.length === 1 ? "Comment" : "Comments"}
        </button>
      </div>

      {/* Comment Input */}
      <div className="flex gap-3 mb-4">
        <input
          type="text"
          placeholder="Write a comment..."
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleComment()}
          className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button
          onClick={handleComment}
          disabled={!commentText.trim()}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed text-sm font-medium"
        >
          Post
        </button>
      </div>

      {/* Comments Section */}
      {showComments && comments.length > 0 && (
        <div className="space-y-3">
          {comments.map((comment, idx) => (
            <div key={idx} className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h5 className="font-semibold text-sm text-gray-900">
                  {comment.user?.name || "User"}
                </h5>
                <span className="text-xs text-gray-500">
                  {formatTime(comment.createdAt || post.createdAt)}
                </span>
              </div>
              <p className="text-gray-700 text-sm">{comment.text}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
