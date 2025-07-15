import React, { useEffect, useRef, useState } from 'react';
import { Send, Smile, Phone, Video, MoreVertical, ArrowLeft } from 'lucide-react';
import axios from '../api/axios';

export default function ChatWindow({
  currentUser, recipient, socket, showSidebar, setShowSidebar, onUpdateConversations
}) {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const [typing, setTyping] = useState(false);
  const endRef = useRef();

  /* load history */
  useEffect(() => {
    const token = localStorage.getItem('token');
    axios
      .get(`/messages/${recipient._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setMessages(res.data));
  }, [recipient._id]);

  /* socket listeners */
  useEffect(() => {
    if (!socket) return;

    io.to(senderId).emit('receiveMessage', message);
io.to(recipientId).emit('receiveMessage', message);
 // join room
    socket.on('receiveMessage', (msg) => {
  const sender = getId(msg.senderId);
  const isCurrentChat =
        (sender === recipient._id) || (sender === currentUser._id);

  if (isCurrentChat) {
    setMessages((prev) =>
      prev.some((m) => m._id === msg._id) ? prev : [...prev, msg]
    );
  }
});

    socket.on('typing', (fromId) => {
      if (fromId === recipient._id) {
        setTyping(true);
        setTimeout(() => setTyping(false), 1500);
      }
    });

    return () => socket.off('receiveMessage');
  }, [socket, recipient._id]);

  /* scroll */
  useEffect(() => endRef.current?.scrollIntoView({ behavior: 'smooth' }), [messages]);

  /* send */
  const send = async () => {
    if (!text.trim()) return;
    const payload = {
      recipientId: recipient._id,
      text: text.trim(),
    };
    const token = localStorage.getItem('token');

    try {
      const { data } = await axios.post('/messages', payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessages((m) => [...m, data]);

      // emit socket
      socket.emit('sendMessage', data);
      socket.emit('typing', recipient._id); // stop typing

      // update lastMessage in conversations list
      onUpdateConversations((prev) =>
        prev.map((c) =>
          c.members.some((m) => m._id === recipient._id) ? { ...c, lastMessage: data } : c
        )
      );

      setText('');
    } catch (err) {
      console.error('send error', err);
    }
  };

  const handleTyping = (val) => {
    setText(val);
    if (socket) socket.emit('typing', recipient._id);
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="flex flex-col h-full">
      {/* Chat Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center gap-4">
        <button 
          onClick={() => setShowSidebar(!showSidebar)}
          className="lg:hidden p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        
        <div className="relative">
          <img
            src={recipient.profilePic || 'https://via.placeholder.com/40'}
            alt={recipient.name}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
        </div>
        
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900">{recipient.name}</h3>
          <p className="text-sm text-green-500 flex items-center gap-1">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            online
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <Phone className="w-5 h-5 text-gray-600" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <Video className="w-5 h-5 text-gray-600" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <MoreVertical className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-gray-50 to-white">
        {messages.map((m) => {
          const getId = (val) => (typeof val === 'object' ? val._id : val);
const own    = getId(m.senderId) === currentUser._id;

          return (
            <div key={m._id} className={`flex ${own ? 'justify-end' : 'justify-start'} group`}>
              <div className={`flex items-end gap-2 max-w-xs ${own ? 'flex-row-reverse' : 'flex-row'}`}>
                {!own && (
                  <img 
                    src={recipient.profilePic || 'https://via.placeholder.com/24'} 
                    alt={recipient.name}
                    className="w-6 h-6 rounded-full object-cover"
                  />
                )}
                <div className="flex flex-col">
                  <div
                    className={`px-4 py-2 rounded-2xl ${
                      own 
                        ? 'bg-blue-500 text-white rounded-br-md' 
                        : 'bg-white border border-gray-200 text-gray-800 rounded-bl-md shadow-sm'
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{m.text}</p>
                  </div>
                  <div className={`flex items-center gap-1 mt-1 ${own ? 'justify-end' : 'justify-start'}`}>
                    <span className="text-xs text-gray-500">
                      {formatTime(m.createdAt || m.timestamp)}
                    </span>
                    {own && (
                      <div className="flex">
                        <div className="w-1 h-1 rounded-full mr-1 bg-blue-500"></div>
                        <div className="w-1 h-1 rounded-full bg-blue-500"></div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {typing && (
          <div className="flex justify-start">
            <div className="flex items-center gap-2">
              <img 
                src={recipient.profilePic || 'https://via.placeholder.com/24'} 
                alt={recipient.name}
                className="w-6 h-6 rounded-full object-cover"
              />
              <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-md px-4 py-3 shadow-sm">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div ref={endRef} />
      </div>

      {/* Input Area */}
      <div className="bg-white border-t border-gray-200 px-6 py-4">
        <div className="flex items-end gap-4">
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <Smile className="w-6 h-6 text-gray-500" />
          </button>
          
          <div className="flex-1 relative">
            <textarea
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-500"
              rows="1"
              value={text}
              onChange={(e) => handleTyping(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  send();
                }
              }}
              placeholder="Type your message..."
              style={{ 
                maxHeight: '120px',
                minHeight: '48px'
              }}
            />
          </div>
          
          <button
            onClick={send}
            disabled={!text.trim()}
            className={`p-3 rounded-full transition-all duration-200 ${
              text.trim() 
                ? 'bg-blue-500 hover:bg-blue-600 text-white shadow-md hover:shadow-lg' 
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}