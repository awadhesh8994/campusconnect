import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`https://campus-connect-backend-wpxg.onrender.com/api/users/search?query=${query}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setResults(res.data);
    } catch (err) {
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-blue-600 mb-4">🔍 Search Campus Users</h1>
      <div className="flex items-center gap-2 mb-6">
        <input
          type="text"
          placeholder="Search by name or branch"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button onClick={handleSearch} className="bg-blue-600 text-white px-4 py-2 rounded-lg">
          Search
        </button>
      </div>

      {loading && <p>Searching...</p>}
      {!loading && results.length === 0 && query && <p>No users found.</p>}

      <ul className="space-y-4">
        {results.map(user => (
          <li key={user._id} className="bg-white p-4 shadow rounded-lg flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img src={user.profilePic || 'https://via.placeholder.com/40'} className="w-12 h-12 rounded-full object-cover" />
              <div>
                <h3 className="font-semibold text-lg">{user.name}</h3>
                <p className="text-sm text-gray-500">{user.branch} • {user.year}</p>
              </div>
            </div>
            <Link to={`/profile/${user._id}`} className="text-blue-600 hover:underline">
              View Profile
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
