import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function StudyNotes() {
  const [notes, setNotes] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    file: null,
  });
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchNotes = async () => {
      setLoading(true);
      try {
        const res = await axios.get('http://localhost:5000/api/notes');
        setNotes(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchNotes();
  }, []);

  const handleChange = (e) => {
    if (e.target.name === 'file') {
      setFormData({ ...formData, file: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.file) {
      return setError('Title and file are required.');
    }

    setUploading(true);
    setError('');

    try {
      const uploadData = new FormData();
      uploadData.append('title', formData.title);
      uploadData.append('description', formData.description);
      uploadData.append('file', formData.file);

      await axios.post('http://localhost:5000/api/notes', uploadData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      // Reset form
      setFormData({ title: '', description: '', file: null });
      
      // Refresh notes
      const res = await axios.get('http://localhost:5000/api/notes');
      setNotes(res.data);
    } catch (err) {
      console.error(err);
      setError('Upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(search.toLowerCase()) ||
    note.uploadedBy?.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            📚 Study Notes
          </h2>
          <p className="text-gray-600">Share and access study materials with your peers</p>
        </div>

        {/* Upload Form */}
        <div className="bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl p-6 mb-8 border border-white/20">
          <form onSubmit={handleUpload} className="space-y-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">+</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800">Upload a New Note</h3>
            </div>

            {error && (
              <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-lg">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <span className="text-red-400">⚠️</span>
                  </div>
                  <div className="ml-3">
                    <p className="text-red-700">{error}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Note Title *</label>
                <input
                  type="text"
                  name="title"
                  placeholder="Enter note title..."
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 bg-white/50"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">File *</label>
                <label className="block relative">
                  <input
                    type="file"
                    name="file"
                    accept=".pdf,.doc,.docx,.jpg,.png"
                    onChange={handleChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div className="border-2 border-dashed border-gray-300 rounded-xl px-4 py-3 text-center hover:border-blue-400 hover:bg-blue-50 transition-all duration-200 bg-white/50">
                    {formData.file ? (
                      <div className="flex items-center justify-center gap-2">
                        <span className="text-green-600">📄</span>
                        <span className="text-sm text-gray-700 truncate">{formData.file.name}</span>
                      </div>
                    ) : (
                      <div className="text-gray-500">
                        <span className="block">📁 Choose file</span>
                        <span className="text-xs">PDF, DOC, DOCX, JPG, PNG</span>
                      </div>
                    )}
                  </div>
                </label>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Description (Optional)</label>
              <textarea
                name="description"
                placeholder="Add a brief description of your note..."
                value={formData.description}
                onChange={handleChange}
                rows="3"
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 resize-none bg-white/50"
              />
            </div>

            <button 
              type="submit" 
              disabled={uploading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-purple-700 transform hover:scale-[1.02] transition-all duration-200 font-semibold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {uploading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Uploading...
                </div>
              ) : (
                'Upload Note'
              )}
            </button>
          </form>
        </div>

        {/* Search Section */}
        <div className="mb-8">
          <div className="relative max-w-md mx-auto">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-400">🔍</span>
            </div>
            <input
              type="text"
              placeholder="Search by title or uploader..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 bg-white/80 backdrop-blur-sm"
            />
          </div>
          {search && (
            <p className="text-center text-sm text-gray-600 mt-2">
              Found {filteredNotes.length} note{filteredNotes.length !== 1 ? 's' : ''} matching "{search}"
            </p>
          )}
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-gray-600">Loading notes...</p>
          </div>
        ) : (
          /* Notes Grid */
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredNotes.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <div className="text-6xl mb-4">📝</div>
                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                  {search ? 'No notes found' : 'No notes yet'}
                </h3>
                <p className="text-gray-500">
                  {search ? 'Try adjusting your search terms' : 'Be the first to upload a study note!'}
                </p>
              </div>
            ) : (
              filteredNotes.map(note => {
                const fileExt = note.fileUrl.split('.').pop().toLowerCase();
                const isImage = ['jpg', 'jpeg', 'png'].includes(fileExt);
                const isPDF = fileExt === 'pdf';
                const isDoc = ['doc', 'docx'].includes(fileExt);

                return (
                  <div key={note._id} className="group bg-white/80 backdrop-blur-sm shadow-lg rounded-2xl p-6 border border-white/20 hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
                    {/* Header */}
                    <div className="flex justify-between items-start mb-4">
                      <h4 className="font-bold text-lg text-gray-800 group-hover:text-blue-600 transition-colors duration-200 line-clamp-2">
                        {note.title}
                      </h4>
                      <span className={`flex-shrink-0 text-xs font-bold px-3 py-1 rounded-full ${
                        isPDF ? 'bg-red-100 text-red-600' :
                        isDoc ? 'bg-blue-100 text-blue-600' :
                        isImage ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'
                      }`}>
                        {fileExt.toUpperCase()}
                      </span>
                    </div>

                    {/* Description */}
                    {note.description && (
                      <p className="text-sm text-gray-600 mb-4 line-clamp-3">{note.description}</p>
                    )}

                    {/* Uploader Info */}
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-6 h-6 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-bold">
                          {note.uploadedBy?.name?.charAt(0) || 'U'}
                        </span>
                      </div>
                      <span className="text-xs text-gray-500">
                        By {note.uploadedBy?.name || 'Unknown'}
                      </span>
                    </div>

                    {/* Preview */}
                    <div className="mb-4">
                      {isImage ? (
                        <div className="relative overflow-hidden rounded-xl">
                          <img
                            src={`http://localhost:5000${note.fileUrl}`}
                            alt="preview"
                            className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                        </div>
                      ) : (
                        <div className="bg-gray-50 rounded-xl p-4 text-center">
                          <div className="text-3xl mb-2">
                            {isPDF ? '📄' : isDoc ? '📝' : '📎'}
                          </div>
                          <p className="text-xs text-gray-500">Preview not available</p>
                        </div>
                      )}
                    </div>

                    {/* Download Button */}
                    <a
                      href={`http://localhost:5000${note.fileUrl}`}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="block w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white text-center py-2 px-4 rounded-xl hover:from-blue-600 hover:to-purple-600 transform hover:scale-[1.02] transition-all duration-200 font-medium"
                      download
                    >
                      📥 Download
                    </a>
                  </div>
                );
              })
            )}
          </div>
        )}
      </div>
    </div>
  );
}