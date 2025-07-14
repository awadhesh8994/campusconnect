import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createEvent } from '../api/eventApi';

export default function CreateEvent() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
    image: null, // Changed to store file object
    tags: '',
    category: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm({
      ...form,
      [name]: files ? files[0] : value, // Handle file input for image
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Login required to create events');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('title', form.title);
      formData.append('description', form.description);
      formData.append('date', form.date);
      formData.append('location', form.location);
      if (form.image) {
        formData.append('image', form.image); // Append image file
      }
      formData.append('tags', form.tags); // send raw comma string
      formData.append('category', form.category);

      await createEvent(formData, token);
      navigate('/events/my');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create event');
    }
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
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl animate-fadeIn">
        <h2 className="text-3xl font-bold mb-2 text-center text-blue-700">Create a New Event 🎉</h2>
        <p className="text-center text-gray-500 mb-6">Organize something amazing for your campus!</p>
        {error && <div className="text-red-500 mb-4 text-sm text-center bg-red-50 p-2 rounded-lg">{error}</div>}
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Event Title</label>
            <input
              id="title"
              name="title"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              placeholder="Enter event title"
              value={form.title}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              id="description"
              name="description"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              placeholder="Describe your event"
              value={form.description}
              onChange={handleChange}
              rows="4"
            />
          </div>
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">Date & Time</label>
            <input
              id="date"
              type="datetime-local"
              name="date"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              value={form.date}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">Location</label>
            <input
              id="location"
              name="location"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              placeholder="Enter event location"
              value={form.location}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">Event Image</label>
            <input
              id="image"
              type="file"
              name="image"
              accept="image/jpeg,image/png,image/gif"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
            <input
              id="tags"
              name="tags"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              placeholder="Enter tags (e.g., workshop, party, seminar)"
              value={form.tags}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <input
              id="category"
              name="category"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              placeholder="Enter category (e.g., Academic, Social)"
              value={form.category}
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 font-semibold hover:scale-105 transform"
          >
            Create Event
          </button>
        </form>
      </div>
    </div>
  );
}