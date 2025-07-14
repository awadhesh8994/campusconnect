import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminPage = () => {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const currentUser = JSON.parse(localStorage.getItem('user'));

  // 🔐 Restrict non-admins
  useEffect(() => {
    if (!currentUser || currentUser.role !== 'admin') {
      alert("Access denied. Admins only.");
      navigate('/');
    }
  }, [currentUser, navigate]);

  useEffect(() => {
    fetchPosts();
    fetchUsers();
  }, []);

  const fetchPosts = async () => {
  try {
    const res = await axios.get('/api/admin/posts', {
      headers: {
        Authorization: `Bearer ${currentUser.token}`
      }
    });
    setPosts(res.data);
  } catch (err) {
    console.error("❌ Admin fetchPosts error:", err.response?.data || err.message);
  }
};


  const fetchUsers = async () => {
    const res = await axios.get('/api/users'); // should be admin-protected
    setUsers(res.data);
  };

  const deletePost = async (postId) => {
    await axios.delete(`/api/admin/post/${postId}`);
    fetchPosts();
  };

  const deleteUser = async (userId) => {
    await axios.delete(`/api/admin/user/${userId}`);
    fetchUsers();
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>

      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-2">Manage Posts</h3>
        <ul className="space-y-2">
          {posts.map(post => (
            <li key={post._id} className="bg-gray-100 p-4 rounded">
              <p>{post.text}</p>
              <button onClick={() => deletePost(post._id)} className="text-red-600 hover:underline">Delete Post</button>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-2">Manage Users</h3>
        <ul className="space-y-2">
          {users.map(user => (
            <li key={user._id} className="bg-gray-100 p-4 rounded">
              <p>{user.name} ({user.email})</p>
              <button onClick={() => deleteUser(user._id)} className="text-red-600 hover:underline">Delete User</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminPage;