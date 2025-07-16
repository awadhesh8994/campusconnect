// StudyNotes.jsx
import React, { useEffect, useState } from 'react';
import axios from '../api/axios'; // ✅ centralized Axios using VITE_API_URL

export default function StudyNotes() {
  const [notes, setNotes] = useState([]);
  const [form, setForm] = useState({ title: '', file: null });
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('');
  const [uploading, setUploading] = useState(false);

  const token = localStorage.getItem('token');

  const fetchNotes = async () => {
    try {
      const res = await axios.get('/notes'); // ✅ relative path
      setNotes(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!form.title || !form.file) {
      setError('Please provide a title and file.');
      return;
    }

    const formData = new FormData();
    formData.append('title', form.title);
    formData.append('file', form.file);

    setUploading(true);
    try {
      await axios.post('/notes', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      setForm({ title: '', file: null });
      fetchNotes();
      setError('');
    } catch (err) {
      console.error(err);
      setError('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this note?')) return;

    try {
      await axios.delete(`/notes/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setNotes(notes.filter((n) => n._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const filteredNotes = notes.filter((n) =>
    n.title.toLowerCase().includes(filter.toLowerCase()) ||
    n.uploadedBy?.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">📚 Study Notes</h2>

      <form onSubmit={handleUpload} className="mb-6 bg-white p-4 rounded shadow space-y-4">
        <h3 className="text-lg font-semibold">Upload New Note</h3>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <input
          type="text"
          placeholder="Note title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="w-full px-3 py-2 border rounded"
        />
        <input
          type="file"
          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
          onChange={(e) => setForm({ ...form, file: e.target.files[0] })}
          className="w-full"
        />
        <button
          type="submit"
          disabled={uploading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {uploading ? 'Uploading...' : 'Upload'}
        </button>
      </form>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by title or uploader..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-full px-3 py-2 border rounded"
        />
      </div>

      {filteredNotes.length === 0 ? (
        <p className="text-gray-500">No notes found.</p>
      ) : (
        <div className="space-y-4">
          {filteredNotes.map((note) => (
            <div
              key={note._id}
              className="bg-white p-4 rounded shadow flex justify-between items-center"
            >
              <div>
                <h4 className="font-semibold">{note.title}</h4>
                <p className="text-sm text-gray-600">
                  Uploaded by {note.uploadedBy?.name || 'Unknown'}
                </p>
                <a
                  href={note.fileUrl}
                  className="text-blue-600 underline text-sm"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Download
                </a>
              </div>
              {note.isOwn && (
                <button
                  onClick={() => handleDelete(note._id)}
                  className="text-red-500 text-sm hover:underline"
                >
                  Delete
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
