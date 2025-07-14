import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate, useParams, Navigate } from 'react-router-dom';
import axios from '../api/axios';
import useSocket from '../hooks/useSocket';
import ConversationSidebar from '../components/ConversationSidebar';
import ChatWindow from '../components/ChatWindow';

export default function Chat({ currentUser }) {
  /* ── auth guard ───────────────────────────── */
  if (!currentUser) return <Navigate to="/login" replace />;

  /* ── state ────────────────────────────────── */
  const { userId } = useParams();              // active recipient ID (may be undefined)
  const [conversations, setConversations] = useState([]);   // [{_id, members, lastMessage}, …]
  const [contacts,      setContacts]      = useState([]);   // searchable user list
  const [recipient,     setRecipient]     = useState(null); // active chat target
  const [showSidebar,   setShowSidebar]   = useState(true); // sidebar visibility
  const navigate = useNavigate();
  const socket   = useSocket(currentUser, setConversations);

  /* ── load recent convos & contacts ────────── */
  useEffect(() => {
    const token = localStorage.getItem('token');
    (async () => {
      try {
        const [consRes, contactsRes] = await Promise.all([
          axios.get('/conversations', { headers: { Authorization: `Bearer ${token}` } }),
          axios.get('/users',         { headers: { Authorization: `Bearer ${token}` } })
        ]);
        setConversations(consRes.data);
        setContacts(contactsRes.data.filter(u => u._id !== currentUser._id));
      } catch (err) {
        console.error('Failed to load lists:', err);
      }
    })();
  }, [currentUser._id]);

  /* ── when /chat/:userId changes, fetch recipient ─ */
  useEffect(() => {
    if (!userId) { setRecipient(null); return; }
    const token = localStorage.getItem('token');
    (async () => {
      try {
        const res = await axios.get(`/users/${userId}`, { headers: { Authorization: `Bearer ${token}` } });
        setRecipient(res.data);
      } catch (err) {
        console.error('Bad userId, redirecting home'); navigate('/');
      }
    })();
  }, [userId, navigate]);

  /* ── derived: eligibility (same college) ──── */
  const eligible = useMemo(() => {
    if (!recipient) return false;
    return recipient.college === currentUser.college; // example rule
  }, [recipient, currentUser]);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* sidebar */}
      <ConversationSidebar
        currentUser={currentUser}
        conversations={conversations}
        contacts={contacts}
        showSidebar={showSidebar}
        onSelect={(id) => navigate(`/chat/${id}`)}
      />

      {/* chat window / placeholder */}
      <div className="flex-1 flex flex-col">
        {!recipient ? (
          <div className="h-full flex flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-white">
            <div className="text-center">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Select a conversation</h3>
              <p className="text-gray-500">Choose a conversation from the sidebar to start chatting</p>
            </div>
          </div>
        ) : !eligible ? (
          <div className="h-full flex flex-col items-center justify-center bg-gradient-to-b from-red-50 to-white">
            <div className="text-center">
              <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                <svg className="w-12 h-12 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m0 0v2m0-2h2m-2 0H9m11-4.5a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-red-900 mb-2">Cannot message this user</h3>
              <p className="text-red-600">You can only message users from your college</p>
            </div>
          </div>
        ) : (
          <ChatWindow
            currentUser={currentUser}
            recipient={recipient}
            socket={socket}
            showSidebar={showSidebar}
            setShowSidebar={setShowSidebar}
            onUpdateConversations={setConversations}
          />
        )}
      </div>
    </div>
  );
}