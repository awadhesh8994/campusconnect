import { useState, useEffect } from "react";
import axios from "../api/axios";
import {
  Heart,
  MessageCircle,
  Share2,
  ThumbsUp,
  Laugh,
  Angry,
  Smile,
  BarChart as PollIcon,
  Send,
  Hash,
  Users,
  Search,
  BookOpen,
  Calendar,
  MapPin,
  AlertCircle,
} from "lucide-react";

const CommunityPage = ({ currentUser }) => {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState("latest");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [availableTags, setAvailableTags] = useState([]);
  const [newPost, setNewPost] = useState({
    content: "",
    image: null, // Changed to store file object
    tags: [],
    type: "post",
    poll: null,
    category: "general",
  });
  const [isCreatingPost, setIsCreatingPost] = useState(false);
  const [showPollCreator, setShowPollCreator] = useState(false);
  const [pollOptions, setPollOptions] = useState(["", ""]);
  const [comments, setComments] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const categories = [
    { value: "general", label: "General", icon: MessageCircle },
    { value: "academic", label: "Academic", icon: BookOpen },
    { value: "events", label: "Events", icon: Calendar },
    { value: "housing", label: "Housing", icon: MapPin },
    { value: "announcements", label: "Announcements", icon: AlertCircle },
  ];

  const reactions = [
    { emoji: "👍", name: "like", icon: ThumbsUp },
    { emoji: "❤️", name: "love", icon: Heart },
    { emoji: "😂", name: "laugh", icon: Laugh },
    { emoji: "😮", name: "smile", icon: Smile },
    { emoji: "😠", name: "angry", icon: Angry },
  ];

  // Set token once
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  }, );

  // Refetch on filter/search/tag change
  useEffect(() => {
    fetchPosts();
    fetchTags();
  }, [filter, searchTerm, selectedTags]);

  const fetchPosts = async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams({
        filter,
        search: searchTerm,
        tags: selectedTags.join(","),
      });
      const res = await axios.get(`/api/community?${params}`);
      setPosts(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error("Error fetching posts:", error);
      setError("Failed to load posts");
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchTags = async () => {
    try {
      const res = await axios.get("/api/tags");
      setAvailableTags(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error("Error fetching tags:", error);
      setAvailableTags([]);
    }
  };

  const handleCreatePost = async () => {
    if (!currentUser) {
      alert("Please login to post");
      return;
    }

    if (!newPost.content.trim()) {
      alert("Please enter some content");
      return;
    }

    setIsCreatingPost(true);
    try {
      const formData = new FormData();
      formData.append("text", newPost.content);
      if (newPost.image) {
        formData.append("image", newPost.image); // Append image file
      }
      formData.append("tags", JSON.stringify(newPost.tags));
      formData.append("category", newPost.category);
      if (showPollCreator) {
        formData.append(
          "poll",
          JSON.stringify({
            question: newPost.content,
            options: pollOptions
              .filter((opt) => opt.trim())
              .map((opt) => ({ option: opt.trim(), votes: [] })),
          }),
        );
        formData.append("type", "poll");
      } else {
        formData.append("type", "post");
      }

      await axios.post("/api/community", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setNewPost({
        content: "",
        image: null,
        tags: [],
        type: "post",
        poll: null,
        category: "general",
      });
      setShowPollCreator(false);
      setPollOptions(["", ""]);
      fetchPosts();
    } catch (error) {
      console.error("Error creating post:", error);
      alert("Failed to create post");
    } finally {
      setIsCreatingPost(false);
    }
  };

  const handleReaction = async (postId, reaction) => {
    if (!currentUser) {
      alert("Login required to react");
      return;
    }

    try {
      await axios.post(`/api/community/${postId}/reaction`, {
        emoji: reaction.emoji,
        type: reaction.name,
      });
      fetchPosts();
    } catch (error) {
      console.error("Error adding reaction:", error);
    }
  };

  const handleVote = async (postId, option) => {
    if (!currentUser) {
      alert("Login required to vote");
      return;
    }

    try {
      await axios.post(`/api/community/${postId}/vote`, { option });
      fetchPosts();
    } catch (error) {
      console.error("Error voting:", error);
    }
  };

  const handleComment = async (postId, commentText) => {
    if (!currentUser || !commentText.trim()) return;

    try {
      await axios.post(`/api/community/${postId}/comment`, {
        content: commentText.trim(),
      });
      setComments((prev) => ({ ...prev, [postId]: "" }));
      fetchPosts();
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const addPollOption = () => {
    if (pollOptions.length < 5) {
      setPollOptions([...pollOptions, ""]);
    }
  };

  const removePollOption = (index) => {
    if (pollOptions.length > 2) {
      setPollOptions(pollOptions.filter((_, i) => i !== index));
    }
  };

  const formatTimeAgo = (date) => {
    const now = new Date();
    const postDate = new Date(date);
    const diffInHours = Math.floor((now - postDate) / (1000 * 60 * 60));

    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`;
    return postDate.toLocaleDateString();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-blue-50 px-4 py-12">
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fadeIn {
            animation: fadeIn 0.5s ease-out;
          }
        `}
      </style>
      <div className="w-full max-w-4xl space-y-6 animate-fadeIn">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-700 mb-2">
            CampusConnect Community
          </h1>
          <p className="text-gray-500">
            Connect, share, and engage with your campus community
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white p-6 rounded-2xl shadow-xl">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="md:w-48 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            >
              <option value="latest">Latest</option>
              <option value="trending">Trending</option>
              <option value="most_liked">Most Liked</option>
            </select>
          </div>
          <div className="flex flex-wrap gap-2">
            {availableTags.map((tag) => (
              <span
                key={tag}
                className={`px-3 py-1 rounded-full text-sm cursor-pointer transition-colors ${
                  selectedTags.includes(tag)
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-blue-100"
                }`}
                onClick={() =>
                  setSelectedTags((prev) =>
                    prev.includes(tag)
                      ? prev.filter((t) => t !== tag)
                      : [...prev, tag],
                  )
                }
              >
                <Hash className="h-3 w-3 inline mr-1" />
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Create Post */}
        <div className="bg-white p-6 rounded-2xl shadow-xl">
          <h2 className="text-xl font-semibold text-blue-700 mb-4 flex items-center gap-2">
            <Users className="h-5 w-5" />
            Share with Community
          </h2>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-700">
                {currentUser?.name?.charAt(0) || "U"}
              </div>
              <textarea
                placeholder={
                  showPollCreator
                    ? "What's your poll question?"
                    : "What's on your mind?"
                }
                value={newPost.content}
                onChange={(e) =>
                  setNewPost({ ...newPost, content: e.target.value })
                }
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition min-h-20 resize-none"
              />
            </div>

            {/* Poll Creator */}
            {showPollCreator && (
              <div className="p-4 bg-blue-50 rounded-lg space-y-3">
                <h4 className="font-medium text-blue-900">Poll Options</h4>
                {pollOptions.map((option, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      placeholder={`Option ${index + 1}`}
                      value={option}
                      onChange={(e) => {
                        const newOptions = [...pollOptions];
                        newOptions[index] = e.target.value;
                        setPollOptions(newOptions);
                      }}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    />
                    {pollOptions.length > 2 && (
                      <button
                        onClick={() => removePollOption(index)}
                        className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
                {pollOptions.length < 5 && (
                  <button
                    onClick={addPollOption}
                    className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition"
                  >
                    Add Option
                  </button>
                )}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Category
                </label>
                <select
                  value={newPost.category}
                  onChange={(e) =>
                    setNewPost({ ...newPost, category: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                >
                  {categories.map((cat) => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Image (optional)
                </label>
                <div className="relative">
                  <input
                    type="file"
                    name="image"
                    accept="image/jpeg,image/png,image/gif"
                    onChange={(e) =>
                      setNewPost({ ...newPost, image: e.target.files[0] })
                    }
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Tags
              </label>
              <div className="relative">
                <Hash className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Add tags (comma separated)"
                  value={newPost.tags.join(", ")}
                  onChange={(e) =>
                    setNewPost({
                      ...newPost,
                      tags: e.target.value
                        .split(",")
                        .map((t) => t.trim())
                        .filter((t) => t),
                    })
                  }
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="poll-mode"
                    checked={showPollCreator}
                    onChange={(e) => setShowPollCreator(e.target.checked)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="poll-mode"
                    className="flex items-center gap-2 text-sm text-gray-700"
                  >
                    <PollIcon className="h-4 w-4" />
                    Create Poll
                  </label>
                </div>
              </div>
              <button
                onClick={handleCreatePost}
                disabled={isCreatingPost || !newPost.content.trim()}
                className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 font-semibold hover:scale-105 transform disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {isCreatingPost ? (
                  "Posting..."
                ) : (
                  <span className="flex items-center gap-2">
                    <Send className="h-4 w-4" />
                    Post
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Posts */}
        <div className="space-y-6">
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              <p className="text-gray-600 mt-2">Loading posts...</p>
            </div>
          ) : error ? (
            <div className="bg-white p-12 rounded-2xl shadow-xl text-center">
              <AlertCircle className="h-12 w-12 text-red-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Error Loading Posts
              </h3>
              <p className="text-gray-600 mb-4">{error}</p>
              <button
                onClick={fetchPosts}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Try Again
              </button>
            </div>
          ) : !Array.isArray(posts) || posts.length === 0 ? (
            <div className="bg-white p-12 rounded-2xl shadow-xl text-center">
              <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No posts yet
              </h3>
              <p className="text-gray-600">
                Be the first to share something with your community!
              </p>
            </div>
          ) : (
            posts.map((post) => (
              <div
                key={post._id || post.id}
                className="bg-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow"
              >
                {/* Post Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-700">
                      {post.createdBy?.name?.charAt(0) || "A"}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">
                        {post.createdBy?.name || "Anonymous"}
                      </p>
                      <p className="text-sm text-gray-600">
                        {post.createdAt
                          ? formatTimeAgo(post.createdAt)
                          : "Just now"}
                      </p>
                    </div>
                  </div>
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                    {categories.find((c) => c.value === post.category)?.label ||
                      "General"}
                  </span>
                </div>

                {/* Post Content */}
                <div className="mb-4">
                  <p className="text-gray-800 leading-relaxed">
                    {post.content || post.text || ""}
                  </p>
                  {post.image && (
                    <div className="mt-4 rounded-lg overflow-hidden">
                      <img
                        src={post.image}
                        alt="Post attachment"
                        className="w-full max-h-96 object-cover hover:scale-105 transition-transform duration-300"
                        onError={(e) => (e.target.style.display = "none")}
                      />
                    </div>
                  )}
                  {post.tags &&
                    Array.isArray(post.tags) &&
                    post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {post.tags.map((tag, index) => (
                          <span
                            key={`${tag}-${index}`}
                            className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs"
                          >
                            <Hash className="h-3 w-3 inline mr-1" />
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                </div>

                {/* Poll */}
                {post.type === "poll" &&
                  post.poll &&
                  Array.isArray(post.poll.options) && (
                    <div className="mb-4 p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-medium text-gray-900 mb-3">
                        {post.poll.question || post.text}
                      </h4>
                      <div className="space-y-2">
                        {post.poll.options.map((opt, i) => {
                          const totalVotes = post.poll.options.reduce(
                            (sum, o) => sum + (o.votes?.length || 0),
                            0,
                          );
                          const voteCount = opt.votes?.length || 0;
                          const percentage =
                            totalVotes > 0 ? (voteCount / totalVotes) * 100 : 0;
                          const hasVoted = opt.votes?.includes(
                            currentUser?._id,
                          );

                          return (
                            <div key={i} className="relative">
                              <button
                                className={`w-full flex justify-between text-left p-3 rounded-lg border ${
                                  hasVoted
                                    ? "bg-blue-100 border-blue-300"
                                    : "border-gray-300"
                                } hover:bg-blue-50 transition`}
                                onClick={() =>
                                  handleVote(post._id || post.id, opt.option)
                                }
                                disabled={!currentUser}
                              >
                                <span>{opt.option}</span>
                                <span className="text-sm">
                                  {voteCount} vote{voteCount !== 1 ? "s" : ""} (
                                  {percentage.toFixed(1)}%)
                                </span>
                              </button>
                              {totalVotes > 0 && (
                                <div
                                  className="absolute bottom-0 left-0 h-1 bg-blue-500 rounded-full transition-all duration-500"
                                  style={{ width: `${percentage}%` }}
                                />
                              )}
                            </div>
                          );
                        })}
                      </div>
                      <p className="text-sm text-gray-600 mt-2">
                        Total votes:{" "}
                        {post.poll.options.reduce(
                          (sum, o) => sum + (o.votes?.length || 0),
                          0,
                        )}
                      </p>
                    </div>
                  )}

                <hr className="my-4 border-gray-200" />

                {/* Reactions */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {reactions.map((reaction) => {
                      const reactionCount =
                        post.reactions?.[reaction.name]?.length || 0;
                      const hasReacted = post.reactions?.[
                        reaction.name
                      ]?.includes(currentUser?._id);

                      return (
                        <button
                          key={reaction.name}
                          className={`flex items-center gap-1 px-2 py-1 rounded-full text-sm ${
                            hasReacted
                              ? "bg-blue-100 text-blue-700"
                              : "text-gray-600 hover:bg-gray-100"
                          } transition`}
                          onClick={() =>
                            handleReaction(post._id || post.id, reaction)
                          }
                        >
                          <span>{reaction.emoji}</span>
                          {reactionCount > 0 && <span>{reactionCount}</span>}
                        </button>
                      );
                    })}
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="flex items-center gap-1 px-2 py-1 text-gray-600 hover:bg-gray-100 rounded-full text-sm transition">
                      <MessageCircle className="h-4 w-4" />
                      {post.comments?.length || 0}
                    </button>
                    <button className="flex items-center gap-1 px-2 py-1 text-gray-600 hover:bg-gray-100 rounded-full text-sm transition">
                      <Share2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Comment Input */}
                <div className="mt-4 flex gap-2">
                  <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-700">
                    {currentUser?.name?.charAt(0) || "U"}
                  </div>
                  <div className="flex-1 flex gap-2">
                    <input
                      type="text"
                      placeholder="Write a comment..."
                      value={comments[post._id || post.id] || ""}
                      onChange={(e) =>
                        setComments((prev) => ({
                          ...prev,
                          [post._id || post.id]: e.target.value,
                        }))
                      }
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          handleComment(
                            post._id || post.id,
                            comments[post._id || post.id],
                          );
                        }
                      }}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    />
                    <button
                      onClick={() =>
                        handleComment(
                          post._id || post.id,
                          comments[post._id || post.id],
                        )
                      }
                      disabled={
                        !currentUser || !comments[post._id || post.id]?.trim()
                      }
                      className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                      <Send className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CommunityPage;
