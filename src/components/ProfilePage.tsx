
import React, { useState } from 'react';
import { Edit, MapPin, Star, Trophy, Users, Settings, Camera } from 'lucide-react';

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userType, setUserType] = useState('member'); // member, owner, trainer

  const user = {
    name: 'Alex Rodriguez',
    email: 'alex.rodriguez@email.com',
    phone: '+1 (555) 123-4567',
    location: 'Chicago, IL',
    gym: 'Iron Fist Dojo',
    bio: 'Passionate martial artist with 8 years of experience in Jiu-Jitsu and Wrestling. Love competing and helping others improve their skills.',
    specialties: ['Jiu-Jitsu', 'Wrestling', 'Conditioning'],
    achievements: [
      { title: 'Regional Champion 2023', category: 'Jiu-Jitsu' },
      { title: 'State Runner-up 2022', category: 'Wrestling' },
      { title: '100 Training Days', category: 'Milestone' }
    ],
    stats: {
      fights: 12,
      wins: 9,
      rating: 4.7,
      connections: 156
    },
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face'
  };

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="bg-gradient-to-br from-purple-600 via-blue-600 to-purple-800 rounded-3xl p-6 text-white relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
            <div className="relative">
              <img
                src={user.image}
                alt={user.name}
                className="w-24 h-24 rounded-2xl object-cover border-4 border-white/20"
              />
              <button className="absolute bottom-0 right-0 p-2 bg-white/20 backdrop-blur-sm rounded-xl hover:bg-white/30 transition-colors">
                <Camera size={16} />
              </button>
            </div>
            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                <h2 className="text-2xl font-bold">{user.name}</h2>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="mt-2 md:mt-0 flex items-center space-x-2 px-4 py-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl hover:bg-white/30 transition-colors"
                >
                  <Edit size={16} />
                  <span>{isEditing ? 'Save' : 'Edit Profile'}</span>
                </button>
              </div>
              <div className="flex items-center justify-center md:justify-start space-x-2 text-purple-100 mb-2">
                <MapPin size={16} />
                <span>{user.location}</span>
              </div>
              <p className="text-purple-100">{user.gym}</p>
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-300/20 rounded-full blur-lg"></div>
      </div>

      {/* User Type Selection */}
      <div className="bg-white/70 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-4">
        <h3 className="font-bold text-gray-900 mb-3">Account Type</h3>
        <div className="grid grid-cols-3 gap-2">
          {[
            { type: 'member', label: 'Member' },
            { type: 'owner', label: 'Gym Owner' },
            { type: 'trainer', label: 'Trainer' }
          ].map(({ type, label }) => (
            <button
              key={type}
              onClick={() => setUserType(type)}
              className={`p-3 rounded-xl font-medium transition-all duration-200 ${
                userType === type
                  ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white/70 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-4 text-center">
          <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mx-auto mb-2">
            <Trophy className="text-red-600" size={24} />
          </div>
          <p className="text-2xl font-bold text-gray-900">{user.stats.fights}</p>
          <p className="text-gray-600 text-sm">Total Fights</p>
        </div>
        <div className="bg-white/70 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-4 text-center">
          <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-2">
            <Trophy className="text-green-600" size={24} />
          </div>
          <p className="text-2xl font-bold text-gray-900">{user.stats.wins}</p>
          <p className="text-gray-600 text-sm">Wins</p>
        </div>
        <div className="bg-white/70 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-4 text-center">
          <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center mx-auto mb-2">
            <Star className="text-yellow-600" size={24} />
          </div>
          <p className="text-2xl font-bold text-gray-900">{user.stats.rating}</p>
          <p className="text-gray-600 text-sm">Rating</p>
        </div>
        <div className="bg-white/70 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-4 text-center">
          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-2">
            <Users className="text-blue-600" size={24} />
          </div>
          <p className="text-2xl font-bold text-gray-900">{user.stats.connections}</p>
          <p className="text-gray-600 text-sm">Connections</p>
        </div>
      </div>

      {/* Bio Section */}
      <div className="bg-white/70 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-6">
        <h3 className="font-bold text-gray-900 mb-3">Bio</h3>
        {isEditing ? (
          <textarea
            defaultValue={user.bio}
            className="w-full p-3 bg-gray-100/50 border border-gray-200/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
            rows={4}
          />
        ) : (
          <p className="text-gray-700">{user.bio}</p>
        )}
      </div>

      {/* Specialties */}
      <div className="bg-white/70 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-6">
        <h3 className="font-bold text-gray-900 mb-3">Specialties</h3>
        <div className="flex flex-wrap gap-2">
          {user.specialties.map((specialty) => (
            <span
              key={specialty}
              className="px-3 py-2 bg-purple-100 text-purple-700 rounded-xl font-medium"
            >
              {specialty}
            </span>
          ))}
          {isEditing && (
            <button className="px-3 py-2 border-2 border-dashed border-purple-300 text-purple-600 rounded-xl font-medium hover:bg-purple-50 transition-colors">
              + Add Specialty
            </button>
          )}
        </div>
      </div>

      {/* Achievements */}
      <div className="bg-white/70 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-6">
        <h3 className="font-bold text-gray-900 mb-4">Achievements</h3>
        <div className="space-y-3">
          {user.achievements.map((achievement, index) => (
            <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50/50 rounded-xl">
              <div className="w-10 h-10 bg-yellow-100 rounded-xl flex items-center justify-center">
                <Trophy className="text-yellow-600" size={20} />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">{achievement.title}</h4>
                <p className="text-sm text-gray-600">{achievement.category}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Settings */}
      <div className="bg-white/70 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-6">
        <h3 className="font-bold text-gray-900 mb-4">Account Settings</h3>
        <div className="space-y-3">
          <button className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-gray-100/50 transition-colors">
            <span className="text-gray-700">Privacy Settings</span>
            <Settings size={20} className="text-gray-400" />
          </button>
          <button className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-gray-100/50 transition-colors">
            <span className="text-gray-700">Notification Preferences</span>
            <Settings size={20} className="text-gray-400" />
          </button>
          <button className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-gray-100/50 transition-colors">
            <span className="text-gray-700">Account Security</span>
            <Settings size={20} className="text-gray-400" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
