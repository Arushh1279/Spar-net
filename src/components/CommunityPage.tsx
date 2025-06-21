import React from 'react';
import { Star, MapPin, MessageCircle, UserPlus, Crown, Shield, Users, Trophy, Zap } from 'lucide-react';
import logo from './logo.webp';

const CommunityPage = () => {
  const members = [
    {
      id: 1,
      name: 'Marcus Chen',
      role: 'Gym Owner',
      gym: 'Elite Combat Academy',
      location: 'New York, NY',
      specialties: ['Boxing', 'MMA'],
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      verified: true,
      badge: 'owner'
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      role: 'Fighter',
      gym: 'Dragon Martial Arts',
      location: 'Los Angeles, CA',
      specialties: ['Karate', 'Kickboxing'],
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
      verified: true,
      badge: 'fighter'
    },
    {
      id: 3,
      name: 'Alex Rodriguez',
      role: 'Member',
      gym: 'Iron Fist Dojo',
      location: 'Chicago, IL',
      specialties: ['Jiu-Jitsu', 'Wrestling'],
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      verified: false,
      badge: 'member'
    },
    {
      id: 4,
      name: 'Emma Williams',
      role: 'Trainer',
      gym: 'Phoenix Fighting Club',
      location: 'Miami, FL',
      specialties: ['Muay Thai', 'Boxing'],
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
      verified: true,
      badge: 'trainer'
    }
  ];

  const getBadgeIcon = (badge: string) => {
    switch (badge) {
      case 'owner':
        return <Crown size={14} className="text-yellow-400" />;
      case 'fighter':
        return <Shield size={14} className="text-red-400" />;
      case 'trainer':
        return <Star size={14} className="text-blue-400" />;
      default:
        return null;
    }
  };

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case 'owner':
        return 'bg-yellow-500/20 text-yellow-300';
      case 'fighter':
        return 'bg-red-500/20 text-red-300';
      case 'trainer':
        return 'bg-blue-500/20 text-blue-300';
      default:
        return 'bg-gray-500/20 text-gray-300';
    }
  };

  return (
    <div className="space-y-6">
      {/* Community Hero Section */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-purple-600/20 via-pink-600/20 to-red-600/20 backdrop-blur-sm p-8 text-white">
        <div className="relative z-10">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-pink-500/20 rounded-xl flex items-center justify-center">
              <Users className="text-pink-400" size={24} />
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-400 via-red-400 to-pink-600 bg-clip-text text-transparent">
              Community
            </h2>
          </div>
          <p className="text-gray-200 mb-6">Connect with warriors, trainers, and gym owners around you</p>
          
          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-1 mb-1">
                <Users size={16} className="text-pink-400" />
                <p className="text-2xl font-bold">1,247</p>
              </div>
              <p className="text-gray-300 text-xs">Active Fighters</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center space-x-1 mb-1">
                <Crown size={16} className="text-yellow-400" />
                <p className="text-2xl font-bold">89</p>
              </div>
              <p className="text-gray-300 text-xs">Gym Owners</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center space-x-1 mb-1">
                <Trophy size={16} className="text-green-400" />
                <p className="text-2xl font-bold">324</p>
              </div>
              <p className="text-gray-300 text-xs">Champions</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center space-x-1 mb-1">
                <Zap size={16} className="text-blue-400" />
                <p className="text-2xl font-bold">156</p>
              </div>
              <p className="text-gray-300 text-xs">Trainers</p>
            </div>
          </div>
        </div>
        
        {/* Floating elements */}
        <div className="absolute top-4 right-4 w-2 h-2 bg-pink-500 rounded-full animate-ping"></div>
        <div className="absolute bottom-6 left-6 w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></div>
      </div>

      {/* Filter Pills */}
      <div className="flex space-x-3 overflow-x-auto pb-2">
        {['All Warriors', 'Gym Owners', 'Fighters', 'Trainers', 'Champions'].map((filter) => (
          <button
            key={filter}
            className={`px-4 py-2 rounded-2xl font-medium whitespace-nowrap transition-all duration-200 ${
              filter === 'All Warriors'
                ? 'bg-gradient-to-r from-pink-500/80 to-red-500/80 text-white shadow-lg shadow-pink-500/25'
                : 'bg-black/20 backdrop-blur-sm text-gray-300 hover:bg-black/30 hover:text-pink-400'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Members List - Redesigned */}
      <div className="space-y-4">
        {members.map((member) => (
          <div
            key={member.id}
            className="bg-black/20 backdrop-blur-sm rounded-3xl p-5 hover:bg-black/30 transition-all duration-300 cursor-pointer group hover:shadow-lg hover:shadow-pink-500/10"
          >
            <div className="flex items-start space-x-4">
              <div className="relative">
                <div className="w-16 h-16 rounded-2xl overflow-hidden bg-gradient-to-br from-pink-500/20 to-red-500/20 p-0.5">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full rounded-2xl object-cover"
                  />
                </div>
                {member.verified && (
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>
              
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <h4 className="font-bold text-white text-lg">{member.name}</h4>
                  <span className={`px-3 py-1 rounded-xl text-xs font-medium flex items-center space-x-1 ${getBadgeColor(member.badge)}`}>
                    {getBadgeIcon(member.badge)}
                    <span className="capitalize">{member.role}</span>
                  </span>
                </div>
                
                <p className="text-pink-300 font-medium mb-2">{member.gym}</p>
                
                <div className="flex items-center space-x-4 text-sm text-gray-300 mb-3">
                  <div className="flex items-center space-x-1">
                    <MapPin size={14} className="text-gray-400" />
                    <span>{member.location}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star size={14} className="text-yellow-400 fill-yellow-400" />
                    <span className="font-medium">{member.rating}</span>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {member.specialties.map((specialty) => (
                    <span
                      key={specialty}
                      className="px-3 py-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 text-xs rounded-xl font-medium"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
                
                <div className="flex space-x-3">
                  <button className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-300 rounded-xl text-sm font-medium hover:from-blue-500/30 hover:to-cyan-500/30 transition-all duration-200 backdrop-blur-sm">
                    <MessageCircle size={14} />
                    <span>Message</span>
                  </button>
                  <button className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 rounded-xl text-sm font-medium hover:from-purple-500/30 hover:to-pink-500/30 transition-all duration-200 backdrop-blur-sm">
                    <UserPlus size={14} />
                    <span>Connect</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Join Community CTA - Redesigned */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-pink-600/20 via-purple-600/20 to-red-600/20 backdrop-blur-sm p-8 text-center">
        <div className="relative z-10">
          <div className="w-16 h-16  rounded-2xl flex items-center justify-center mx-auto mb-4">
             <img src={logo} alt="Spar-net logo" className="h-8 w-8" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-3">Join the Elite</h3>
          <p className="text-gray-300 mb-6 max-w-md mx-auto">
            Connect with martial artists around you, share your journey, and become part of the ultimate fighting community
          </p>
          <button className="bg-gradient-to-r from-pink-500/80 to-red-500/80 text-white px-8 py-4 rounded-2xl font-bold hover:from-pink-500 hover:to-red-500 transition-all duration-200 hover:shadow-lg hover:shadow-pink-500/25 hover:scale-105">
            Become a Warrior
          </button>
        </div>
        
        {/* Floating elements */}
        <div className="absolute top-6 right-8 w-2 h-2 bg-pink-500 rounded-full animate-ping"></div>
        <div className="absolute bottom-8 left-8 w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse delay-500"></div>
        <div className="absolute top-1/2 right-4 w-1 h-1 bg-purple-500 rounded-full animate-bounce"></div>
      </div>
    </div>
  );
};

export default CommunityPage;