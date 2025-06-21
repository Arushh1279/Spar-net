import React from 'react';
import { Star, MapPin, Users, Trophy, Zap } from 'lucide-react';

const HomePage = () => {
  const featuredGyms = [
    {
      id: 1,
      name: 'Elite Combat Academy',
      location: 'New York, NY',
      rating: 4.9,
      members: 250,
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
      specialties: ['Boxing', 'MMA', 'Kickboxing']
    },
    {
      id: 2,
      name: 'Dragon Martial Arts',
      location: 'Los Angeles, CA',
      rating: 4.8,
      members: 180,
      image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop',
      specialties: ['Karate', 'Jiu-Jitsu', 'Taekwondo']
    }
  ];

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-purple-600/30 via-blue-600/30 to-purple-800/30 backdrop-blur-sm p-8 text-white">
        <div className="relative z-10">
          <h2 className="text-3xl font-bold mb-2">Welcome to Spar-net</h2>
          <p className="text-purple-100 mb-6">Connect with martial arts communities around you</p>
          <div className="flex space-x-4">
            <button className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-xl font-medium hover:bg-white/30 transition-all duration-200">
              Find Gyms
            </button>
            <button className="bg-white/90 text-purple-600 px-6 py-3 rounded-xl font-medium hover:bg-white transition-colors">
              Join Community
            </button>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-300/20 rounded-full blur-lg"></div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-4 text-center hover:bg-black/40 transition-all duration-200">
          <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mx-auto mb-2">
            <Users className="text-purple-400" size={24} />
          </div>
          <p className="text-2xl font-bold text-white">1,247</p>
          <p className="text-gray-300 text-sm">Active Members</p>
        </div>
        <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-4 text-center hover:bg-black/40 transition-all duration-200">
          <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mx-auto mb-2">
            <MapPin className="text-blue-400" size={24} />
          </div>
          <p className="text-2xl font-bold text-white">89</p>
          <p className="text-gray-300 text-sm">Partner Gyms</p>
        </div>
        <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-4 text-center hover:bg-black/40 transition-all duration-200">
          <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mx-auto mb-2">
            <Trophy className="text-green-400" size={24} />
          </div>
          <p className="text-2xl font-bold text-white">156</p>
          <p className="text-gray-300 text-sm">Tournaments</p>
        </div>
        <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-4 text-center hover:bg-black/40 transition-all duration-200">
          <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center mx-auto mb-2">
            <Zap className="text-orange-400" size={24} />
          </div>
          <p className="text-2xl font-bold text-white">24</p>
          <p className="text-gray-300 text-sm">Live Events</p>
        </div>
      </div>

      {/* Featured Gyms */}
      <div>
        <h3 className="text-xl font-bold text-white mb-4">Featured Gyms</h3>
        <div className="space-y-4">
          {featuredGyms.map((gym) => (
            <div
              key={gym.id}
              className="bg-black/30 backdrop-blur-sm rounded-2xl p-4 hover:shadow-lg hover:shadow-pink-500/20 transition-all duration-200 cursor-pointer hover:bg-black/40"
            >
              <div className="flex space-x-4">
                <img
                  src={gym.image}
                  alt={gym.name}
                  className="w-20 h-20 rounded-xl object-cover opacity-80"
                />
                <div className="flex-1">
                  <h4 className="font-bold text-white">{gym.name}</h4>
                  <div className="flex items-center space-x-2 text-gray-300 text-sm mt-1">
                    <MapPin size={14} />
                    <span>{gym.location}</span>
                  </div>
                  <div className="flex items-center space-x-4 mt-2">
                    <div className="flex items-center space-x-1">
                      <Star size={14} className="text-yellow-500 fill-yellow-500" />
                      <span className="text-sm font-medium text-white">{gym.rating}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users size={14} />
                      <span className="text-sm text-gray-300">{gym.members} members</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {gym.specialties.map((specialty) => (
                      <span
                        key={specialty}
                        className="px-2 py-1 bg-purple-500/20 text-purple-300 text-xs rounded-lg"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;