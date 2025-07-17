import { useState } from "react";
import { Image, Smile, MapPin, X, Plus } from "lucide-react";

export default function CreatePost({ onPostCreated }) {
  const [text, setText] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showImageInput, setShowImageInput] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = async () => {
    if (!text.trim() && !image.trim()) return;

    try {
      setLoading(true);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 800));

      const newPost = {
        _id: Date.now().toString(),
        text,
        image: image.trim() || null,
        user: {
          _id: "current_user_id",
          name: "Current User",
        },
        likes: [],
        comments: [],
        createdAt: new Date().toISOString(),
      };

      setText("");
      setImage("");
      setShowImageInput(false);
      setIsFocused(false);
      onPostCreated(newPost);
    } catch (err) {
      console.error("Failed to create post:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      handleSubmit();
    }
  };

  const clearImage = () => {
    setImage("");
    setShowImageInput(false);
  };

  const hasContent = text.trim() || image.trim();
  const isExpanded = isFocused || hasContent;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden max-w-2xl mx-auto mb-6 transition-all duration-300 hover:shadow-md">
      {/* Main Content Area */}
      <div className="p-6">
        {/* Header - only show when expanded */}
        {isExpanded && (
          <div className="mb-4 animate-fadeIn">
            <h2 className="text-xl font-semibold text-gray-900">Create Post</h2>
            <p className="text-sm text-gray-500 mt-1">
              Share your thoughts with the world
            </p>
          </div>
        )}

        {/* Text Input */}
        <div className="relative">
          <textarea
            rows={isExpanded ? 4 : 2}
            className={`w-full border-0 bg-gray-50 rounded-xl px-4 py-4 text-base placeholder-gray-500 focus:outline-none focus:ring-0 focus:bg-white resize-none transition-all duration-300 ${
              isExpanded ? "focus:shadow-lg" : "focus:shadow-md"
            }`}
            placeholder={
              isExpanded ? "What's happening?" : "What's on your mind?"
            }
            value={text}
            onChange={(e) => setText(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onKeyPress={handleKeyPress}
          />

          {/* Character Count */}
          {isExpanded && text.length > 0 && (
            <div className="absolute bottom-2 right-2">
              <div
                className={`text-xs px-2 py-1 rounded-full ${
                  text.length > 280
                    ? "bg-red-100 text-red-600"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {text.length}/280
              </div>
            </div>
          )}
        </div>

        {/* Image Input */}
        {showImageInput && (
          <div className="mt-4 animate-slideDown">
            <div className="relative">
              <input
                type="text"
                className="w-full bg-blue-50 border border-blue-200 rounded-xl px-4 py-3 text-sm placeholder-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all duration-200"
                placeholder="🖼️ Paste image URL here..."
                value={image}
                onChange={(e) => setImage(e.target.value)}
                autoFocus
              />
              <button
                onClick={clearImage}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Image Preview */}
        {image.trim() && (
          <div className="mt-4 animate-fadeIn">
            <div className="relative inline-block">
              <img
                src={image}
                alt="Preview"
                className="rounded-xl max-h-64 object-cover border border-gray-200 shadow-sm"
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
              <button
                onClick={() => setImage("")}
                className="absolute top-2 right-2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white rounded-full p-1 transition-all duration-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Action Bar */}
      {isExpanded && (
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 animate-slideUp">
          <div className="flex items-center justify-between">
            {/* Left Side - Media Options */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowImageInput(!showImageInput)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  showImageInput
                    ? "bg-blue-100 text-blue-600 shadow-sm"
                    : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                }`}
              >
                <Image className="w-4 h-4" />
                Photo
              </button>

              <button className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-green-600 hover:bg-green-50 transition-all duration-200">
                <Smile className="w-4 h-4" />
                Feeling
              </button>

              <button className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-purple-600 hover:bg-purple-50 transition-all duration-200">
                <MapPin className="w-4 h-4" />
                Location
              </button>
            </div>

            {/* Right Side - Post Controls */}
            <div className="flex items-center gap-3">
              {hasContent && (
                <button
                  onClick={() => {
                    setText("");
                    setImage("");
                    setShowImageInput(false);
                    setIsFocused(false);
                  }}
                  className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
                >
                  Cancel
                </button>
              )}

              <button
                onClick={handleSubmit}
                disabled={loading || !hasContent}
                className={`relative overflow-hidden px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                  hasContent && !loading
                    ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg hover:shadow-xl hover:scale-105 transform"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Publishing...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    Post
                  </div>
                )}

                {/* Shine effect on hover */}
                {hasContent && !loading && (
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 hover:opacity-20 transform translate-x-[-100%] hover:translate-x-[100%] transition-all duration-700"></div>
                )}
              </button>
            </div>
          </div>

          {/* Quick Tips */}
          <div className="mt-3 text-xs text-gray-500">
            <span>💡 Pro tip: Press Ctrl+Enter to post quickly</span>
          </div>
        </div>
      )}

      {/* Collapse Button */}
      {isExpanded && !hasContent && (
        <button
          onClick={() => setIsFocused(false)}
          className="w-full py-2 text-sm text-gray-500 hover:text-gray-700 hover:bg-gray-50 transition-colors"
        >
          Collapse
        </button>
      )}
    </div>
  );
}
