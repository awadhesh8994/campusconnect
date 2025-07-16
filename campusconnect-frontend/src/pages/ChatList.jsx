// pages/ChatList.jsx
import { MessageCircle, Search, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ChatList = ({ currentUser }) => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(
          "https://campus-connect-backend-wpxg.onrender.com/api/users",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await res.json();
        console.log("🔍 Response from /api/users:", data);

        if (Array.isArray(data)) {
          setUsers(data.filter((u) => u._id !== currentUser._id));
        } else {
          console.error("Unexpected API response:", data);
        }
      } catch (err) {
        console.error("❌ Error fetching users", err);
      }
    };

    if (currentUser) fetchUsers();
  }, [currentUser]);

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.branch.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!currentUser) {
    return (
      <div className="h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-white">
        <div className="text-center">
          <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mb-4 mx-auto">
            <MessageCircle className="w-12 h-12 text-blue-500" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Please log in
          </h3>
          <p className="text-gray-500">
            You need to log in to view and start chats
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="relative">
            <img
              src={currentUser.profilePic || "/default-avatar.png"}
              alt="Your profile"
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
              <Users className="w-5 h-5" />
              Start a Chat
            </h2>
            <p className="text-sm text-gray-600">
              Choose someone to start a conversation
            </p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Users List */}
      <div className="flex-1 overflow-y-auto p-6">
        {filteredUsers.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4 mx-auto">
              <Users className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No users found
            </h3>
            <p className="text-gray-500">
              {searchTerm
                ? "Try adjusting your search terms"
                : "No users available to chat with"}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredUsers.map((user) => (
              <Link
                key={user._id}
                to={`/chat/${user._id}`}
                className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-md border border-gray-100 hover:border-blue-200 transition-all duration-200 group"
              >
                <div className="relative">
                  <img
                    src={currentUser.profilePic || "/default-avatar.png"}
                    alt={user.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                    {user.name}
                  </h3>
                  <p className="text-sm text-gray-500 flex items-center gap-1">
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    {user.branch}
                  </p>
                  {user.college && (
                    <p className="text-xs text-gray-400 mt-1">{user.college}</p>
                  )}
                </div>
                <div className="flex items-center">
                  <MessageCircle className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatList;
