import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import PostCard from '../components/PostCard';

export default function ProfilePage() {
  const { id } = useParams(); // "me" or user ID
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ bio: '', branch: '', year: '', profilePic: '' });
  const [showPicModal, setShowPicModal] = useState(false);
const [uploading, setUploading] = useState(false);
const [myNotes, setMyNotes] = useState([]);


  const token = localStorage.getItem('token');
  const decoded = JSON.parse(atob(token.split('.')[1]));
const actualId = id === 'me' ? decoded.id : id;
const isOwnProfile = decoded.id === actualId;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userRes = await axios.get(`http://localhost:5000/api/users/${actualId}`,{
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(userRes.data);
        setForm({
          bio: userRes.data.bio || '',
          branch: userRes.data.branch || '',
          year: userRes.data.year || '',
          profilePic: userRes.data.profilePic || '',
        });

        const allNotes = await axios.get('http://localhost:5000/api/notes');
const myNotes = allNotes.data.filter(n => n.uploadedBy?._id === actualId);
setMyNotes(myNotes);


        const postRes = await axios.get(`http://localhost:5000/api/posts/user/${actualId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const userPosts = postsRes.data.filter((p) => p.user._id === userRes.data._id);
        setPosts(userPosts);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [id, token]);

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:5000/api/users/${user._id}`, form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEditing(false);
    } catch (err) {
      console.error(err);
    }
  };

  

  const handlePictureUpload = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const formData = new FormData();
  formData.append('image', file);
  setUploading(true);

  try {
    const res = await axios.put(
      `http://localhost:5000/api/users/${actualId}`,
      { profilePic: URL.createObjectURL(file) }, // Replace with backend upload URL if needed
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setUser(res.data);
    setShowPicModal(false);
  } catch (err) {
    console.error("Failed to upload:", err);
  } finally {
    setUploading(false);
  }
};

const handleRemovePicture = async () => {
  try {
    const res = await axios.put(
      `http://localhost:5000/api/users/${actualId}`,
      { profilePic: '' },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setUser(res.data);
    setShowPicModal(false);
  } catch (err) {
    console.error("Failed to remove picture:", err);
  }
};

const handleDeleteNote = async (noteId) => {
  const confirmDelete = window.confirm('Are you sure you want to delete this note?');
  if (!confirmDelete) return;

  try {
    await axios.delete(`http://localhost:5000/api/notes/${noteId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setMyNotes(myNotes.filter(note => note._id !== noteId));
  } catch (err) {
    console.error('Failed to delete note:', err);
  }
};



  if (!user) return <div className="text-center mt-10">Loading profile...</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
        <div className="flex items-center gap-5">
          <img
  src={user.profilePic || 'https://via.placeholder.com/150'}
  alt="Profile"
  className="w-24 h-24 rounded-full mb-4 cursor-pointer hover:opacity-80 transition"
  onClick={() => isOwnProfile && setShowPicModal(true)}
/>
{showPicModal && (
  <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 ">
    <div className="bg-white rounded-lg p-6 shadow-md w-80 text-center">
      <h2 className="text-lg font-semibold mb-4 cursor-pointer">Update Profile Picture</h2>
      <input
        type="file"
        accept="image/*"
        onChange={handlePictureUpload}
        className="mb-4"
      />
      <div className="flex justify-center gap-4">
        <button
          onClick={handleRemovePicture}
          className="text-red-600 border border-red-600 px-3 py-1 rounded hover:bg-red-50 cursor-pointer"
        >
          Remove
        </button>
        <button
          onClick={() => setShowPicModal(false)}
          className="text-gray-600 border px-3 py-1 rounded  hover:bg-gray-100 cursor-pointer"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
  
)}


          <div>
            <h2 className="text-2xl font-bold text-blue-700">{user.name}</h2>
            <p className="text-sm text-gray-500">{user.email}</p>
            {editing ? (
              <div className="mt-3 space-y-2">
                <input
                  type="text"
                  placeholder="Branch"
                  value={form.branch}
                  onChange={(e) => setForm({ ...form, branch: e.target.value })}
                  className="w-full px-3 py-2 border rounded"
                />
                <input
                  type="text"
                  placeholder="Year"
                  value={form.year}
                  onChange={(e) => setForm({ ...form, year: e.target.value })}
                  className="w-full px-3 py-2 border rounded"
                />
                <textarea
                  placeholder="Bio"
                  value={form.bio}
                  onChange={(e) => setForm({ ...form, bio: e.target.value })}
                  className="w-full px-3 py-2 border rounded"
                />
                <button onClick={handleUpdate} className="bg-blue-600 text-white px-4 py-2 rounded">
                  Save Changes
                </button>
              </div>
            ) : (
              <div className="mt-2 text-gray-600">
                <p className="mb-1">📘 Branch: {user.branch || 'N/A'}</p>
                <p className="mb-1">🎓 Year: {user.year || 'N/A'}</p>
                <p className="mb-1">🗒️ Bio: {user.bio || 'No bio added yet.'}</p>
              </div>
            )}
          </div>
        </div>
        {isOwnProfile && !editing && (
          <button
            onClick={() => setEditing(true)}
            className="mt-4 text-blue-600 hover:underline"
          >
            Edit Profile
          </button>
        )}
      </div>

      <h3 className="text-xl font-semibold mb-4">My Posts</h3>
      <div className="space-y-4">
        {posts.length > 0 ? posts.map((post) => (
          <PostCard key={post._id} post={post} />
        )) : (
          <p className="text-gray-500">No posts yet.</p>
        )}
      </div>
      <div className="mt-8">
  <h3 className="text-lg font-semibold mb-3">📑 Notes Uploaded ({myNotes.length})</h3>

  {myNotes.length === 0 ? (
    <p className="text-gray-500">No notes uploaded yet.</p>
  ) : (
    <div className="space-y-3">
      {myNotes.map(note => (
        <div key={note._id} className="bg-gray-100 p-3 rounded shadow-sm flex justify-between items-center">
          <div>
            <div className="flex items-center gap-2">
  <h4 className="font-medium">{note.title}</h4>
  <span className={`text-xs font-semibold px-2 py-1 rounded ${
    note.fileUrl.endsWith('.pdf') ? 'bg-red-100 text-red-600' :
    note.fileUrl.endsWith('.doc') || note.fileUrl.endsWith('.docx') ? 'bg-blue-100 text-blue-600' :
    note.fileUrl.match(/\.(jpg|jpeg|png)$/) ? 'bg-green-100 text-green-600' :
    'bg-gray-100 text-gray-600'
  }`}>
    {note.fileUrl.split('.').pop().toUpperCase()}
  </span>
</div>

            <a
              href={`http://localhost:5000${note.fileUrl}`}
              className="text-blue-600 text-sm underline"
              target="_blank"
              rel="noopener noreferrer"
              download
            >
              Download
            </a>
          </div>

          {isOwnProfile && (
            <button
              onClick={() => handleDeleteNote(note._id)}
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

    </div>
    
  );
  
}
