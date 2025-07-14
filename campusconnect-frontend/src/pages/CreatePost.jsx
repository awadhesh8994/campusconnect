import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CreatePost() {
  const [text, setText] = useState('');
  const [image, setImage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post(
        'https://campus-connect-backend-wpxg.onrender.com/api/posts',
        { text, image },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create post');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-lg bg-white p-8 rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">Create a New Post 📝</h2>
        {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-5">
          <textarea
            rows="4"
            placeholder="What's on your mind?"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full border px-4 py-3 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          ></textarea>
          <input
            type="text"
            placeholder="Image URL (optional)"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="w-full border px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {image && (
  <img
    src={image}
    alt="Preview"
    className="w-full rounded-lg max-h-96 object-cover border mt-2"
  />
)}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Post
          </button>
        </form>
      </div>
    </div>
  );
}