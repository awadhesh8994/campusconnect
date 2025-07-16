import React, { useState } from "react";
import { Search, MessageCircle, Users, X } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

export default function ConversationSidebar({
  currentUser,
  conversations,
  contacts,
  onSelect,
}) {
  const [query, setQuery] = useState("");

  const filteredContacts = contacts.filter((u) =>
    u.name.toLowerCase().includes(query.toLowerCase())
  );

  const clearSearch = () => setQuery("");

  return (
    <aside className="w-80 bg-gradient-to-b from-slate-50 to-white border-r border-slate-200 flex flex-col h-full shadow-sm">
      {/* Header */}
      <div className="p-6 border-b border-slate-200">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-blue-100 rounded-lg">
            <MessageCircle className="w-5 h-5 text-blue-600" />
          </div>
          <h2 className="text-xl font-semibold text-slate-800">Messages</h2>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search conversations..."
            className="w-full pl-10 pr-10 py-3 bg-slate-100 border-0 rounded-xl text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all duration-200"
          />
          {query && (
            <button
              onClick={clearSearch}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-slate-200 rounded-full transition-colors"
            >
              <X className="w-3 h-3 text-slate-400" />
            </button>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Recent Conversations */}
        {conversations.length > 0 && (
          <div className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <MessageCircle className="w-4 h-4 text-slate-500" />
              <h3 className="text-sm font-medium text-slate-600 uppercase tracking-wide">
                Recent
              </h3>
            </div>
            <div className="space-y-1">
              {conversations.map((c) => {
                const partner = c.members.find(
                  (m) => m._id !== currentUser._id
                );
                return (
                  <button
                    key={c._id}
                    onClick={() => onSelect(partner._id)}
                    className="w-full text-left p-3 hover:bg-slate-100 rounded-xl transition-all duration-200 flex items-center gap-3 group"
                  >
                    <div className="relative">
                      <img
                        src={partner.profilePic || "/default-avatar.png"}
                        alt={partner.name}
                        className="w-10 h-10 rounded-full object-cover ring-2 ring-white shadow-sm"
                      />
                      <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium text-slate-800 text-sm group-hover:text-blue-600 transition-colors">
                          {partner.name}
                        </span>
                        <span className="text-xs text-slate-400">
                          {formatDistanceToNow(
                            new Date(c.lastMessage?.createdAt || Date.now()),
                            { addSuffix: true }
                          )}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 truncate">
                        {c.lastMessage?.text || "Start a conversation"}
                      </p>
                    </div>
                    {c.unreadCount && (
                      <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-xs text-white font-medium">
                          {c.unreadCount}
                        </span>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Contacts */}
        {filteredContacts.length > 0 && (
          <div className="p-4 border-t border-slate-100">
            <div className="flex items-center gap-2 mb-3">
              <Users className="w-4 h-4 text-slate-500" />
              <h3 className="text-sm font-medium text-slate-600 uppercase tracking-wide">
                Contacts
              </h3>
            </div>
            <div className="space-y-1">
              {filteredContacts.map((u) => (
                <button
                  key={u._id}
                  onClick={() => onSelect(u._id)}
                  className="w-full text-left p-3 hover:bg-slate-100 rounded-xl transition-all duration-200 flex items-center gap-3 group"
                >
                  <div className="relative">
                    <img
                      src={u.profilePic || "/default-avatar.png"}
                      alt={u.name}
                      className="w-10 h-10 rounded-full object-cover ring-2 ring-white shadow-sm"
                    />
                    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-slate-300 rounded-full border-2 border-white"></div>
                  </div>
                  <div className="flex-1">
                    <span className="font-medium text-slate-800 text-sm group-hover:text-blue-600 transition-colors">
                      {u.name}
                    </span>
                    <p className="text-xs text-slate-500">Available</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {conversations.length === 0 && filteredContacts.length === 0 && (
          <div className="flex flex-col items-center justify-center p-8 text-center">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
              <MessageCircle className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-medium text-slate-700 mb-2">
              No conversations yet
            </h3>
            <p className="text-sm text-slate-500">
              Start chatting with your contacts to see conversations here
            </p>
          </div>
        )}
      </div>

      {/* User Profile */}
      <div className="p-4 border-t border-slate-200 bg-slate-50">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img
              src={currentUser?.profilePic || "/default-avatar.png"}
              alt={currentUser?.name || "You"}
              className="w-10 h-10 rounded-full object-cover ring-2 ring-white shadow-sm"
            />
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
          </div>
          <div className="flex-1">
            <div className="font-medium text-slate-800 text-sm">
              {currentUser?.name || "You"}
            </div>
            <div className="text-xs text-slate-500">Online</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
