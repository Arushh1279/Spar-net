
import React, { useState } from 'react';
import { Search, Send, Phone, Video, MoreVertical } from 'lucide-react';

const MessagesPage = () => {
  const [selectedChat, setSelectedChat] = useState(1);
  const [newMessage, setNewMessage] = useState('');

  const conversations = [
    {
      id: 1,
      name: 'Marcus Chen',
      lastMessage: 'Great training session today!',
      time: '2m ago',
      unread: 2,
      online: true,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face'
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      lastMessage: 'Are you joining the tournament?',
      time: '1h ago',
      unread: 0,
      online: true,
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face'
    },
    {
      id: 3,
      name: 'Elite Combat Academy',
      lastMessage: 'New class schedules available',
      time: '3h ago',
      unread: 1,
      online: false,
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=100&h=100&fit=crop'
    }
  ];

  const messages = [
    {
      id: 1,
      sender: 'Marcus Chen',
      content: 'Hey! How was your training today?',
      time: '10:30 AM',
      isOwn: false
    },
    {
      id: 2,
      sender: 'You',
      content: 'It was amazing! Really improved my technique.',
      time: '10:32 AM',
      isOwn: true
    },
    {
      id: 3,
      sender: 'Marcus Chen',
      content: 'That\'s great to hear! Keep up the good work 💪',
      time: '10:33 AM',
      isOwn: false
    },
    {
      id: 4,
      sender: 'Marcus Chen',
      content: 'Great training session today!',
      time: '10:35 AM',
      isOwn: false
    }
  ];

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      console.log('Sending message:', newMessage);
      setNewMessage('');
    }
  };

  return (
    <div className="flex h-[calc(100vh-8rem)] bg-white/50 backdrop-blur-sm rounded-2xl overflow-hidden">
      {/* Conversations List */}
      <div className="w-full md:w-1/3 border-r border-gray-200/50">
        <div className="p-4 border-b border-gray-200/50">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search conversations..."
              className="w-full pl-10 pr-4 py-2 bg-gray-100/50 border border-gray-200/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>
        <div className="overflow-y-auto">
          {conversations.map((conversation) => (
            <div
              key={conversation.id}
              onClick={() => setSelectedChat(conversation.id)}
              className={`p-4 border-b border-gray-200/50 cursor-pointer hover:bg-gray-100/50 transition-colors ${
                selectedChat === conversation.id ? 'bg-purple-50' : ''
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <img
                    src={conversation.image}
                    alt={conversation.name}
                    className="w-12 h-12 rounded-xl object-cover"
                  />
                  {conversation.online && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-gray-900 truncate">{conversation.name}</h4>
                    <span className="text-xs text-gray-500">{conversation.time}</span>
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-sm text-gray-600 truncate">{conversation.lastMessage}</p>
                    {conversation.unread > 0 && (
                      <span className="bg-purple-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                        {conversation.unread}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col hidden md:flex">
        {/* Chat Header */}
        <div className="p-4 border-b border-gray-200/50 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img
              src={conversations.find(c => c.id === selectedChat)?.image}
              alt=""
              className="w-10 h-10 rounded-xl object-cover"
            />
            <div>
              <h3 className="font-medium text-gray-900">
                {conversations.find(c => c.id === selectedChat)?.name}
              </h3>
              <p className="text-sm text-green-600">Online</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
              <Phone size={20} />
            </button>
            <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
              <Video size={20} />
            </button>
            <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
              <MoreVertical size={20} />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                  message.isOwn
                    ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white'
                    : 'bg-gray-100 text-gray-900'
                }`}
              >
                <p>{message.content}</p>
                <p className={`text-xs mt-1 ${
                  message.isOwn ? 'text-purple-100' : 'text-gray-500'
                }`}>
                  {message.time}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="p-4 border-t border-gray-200/50">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 px-4 py-3 bg-gray-100/50 border border-gray-200/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <button
              onClick={handleSendMessage}
              className="p-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl hover:shadow-lg transition-all duration-200"
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile placeholder */}
      <div className="flex-1 flex items-center justify-center md:hidden">
        <p className="text-gray-500">Select a conversation to start messaging</p>
      </div>
    </div>
  );
};

export default MessagesPage;
