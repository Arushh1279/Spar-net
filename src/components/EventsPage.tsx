import React from 'react';
import { Calendar, MapPin, Users, Clock, Trophy, Star } from 'lucide-react';

const EventsPage = () => {
  const upcomingEvents = [
    {
      id: 1,
      title: 'Fight Pandit League Championship',
      date: '2024-07-15',
      time: '19:00',
      location: 'Madison Square Garden, NY',
      participants: 156,
      prize: '$50,000',
      image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=200&fit=crop',
      category: 'MMA',
      status: 'upcoming'
    },
    {
      id: 2,
      title: 'Golden Gloves Boxing Tournament',
      date: '2024-07-20',
      time: '18:30',
      location: 'Olympic Arena, LA',
      participants: 89,
      prize: '$25,000',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=200&fit=crop',
      category: 'Boxing',
      status: 'upcoming'
    },
    {
      id: 3,
      title: 'Karate Masters Cup',
      date: '2024-07-25',
      time: '14:00',
      location: 'Downtown Dojo, Chicago',
      participants: 67,
      prize: '$15,000',
      image: 'https://images.unsplash.com/photo-1555597408-41f2a66bff7b?w=400&h=200&fit=crop',
      category: 'Karate',
      status: 'registration-open'
    }
  ];

  const liveEvents = [
    {
      id: 4,
      title: 'Underground Fight Night',
      location: 'Elite Combat Academy',
      viewers: 2847,
      status: 'live'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Live Events */}
      <div>
        <h3 className="text-xl font-bold text-white mb-4 flex items-center">
          <div className="w-3 h-3 bg-red-500 rounded-full mr-2 animate-pulse"></div>
          Live Now
        </h3>
        {liveEvents.map((event) => (
          <div
            key={event.id}
            className="bg-gradient-to-r from-red-500/20 to-pink-500/20 backdrop-blur-sm text-white rounded-2xl p-4 cursor-pointer hover:shadow-lg hover:shadow-pink-500/20 transition-all duration-200 hover:bg-gradient-to-r hover:from-red-500/30 hover:to-pink-500/30"
          >
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-bold text-lg">{event.title}</h4>
                <div className="flex items-center space-x-2 text-pink-100 mt-1">
                  <MapPin size={14} />
                  <span className="text-sm">{event.location}</span>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center space-x-1">
                  <Users size={16} />
                  <span className="font-medium">{event.viewers.toLocaleString()}</span>
                </div>
                <span className="text-pink-100 text-sm">watching</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Upcoming Events */}
      <div>
        <h3 className="text-xl font-bold text-white mb-4">Upcoming Events</h3>
        <div className="space-y-4">
          {upcomingEvents.map((event) => (
            <div
              key={event.id}
              className="bg-black/30 backdrop-blur-sm rounded-2xl overflow-hidden hover:shadow-lg hover:shadow-pink-500/20 transition-all duration-200 cursor-pointer hover:bg-black/40"
            >
              <div className="relative">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-32 object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                <div className="absolute top-3 left-3">
                  <span className="px-2 py-1 bg-black/50 text-white text-xs rounded-lg backdrop-blur-sm">
                    {event.category}
                  </span>
                </div>
                <div className="absolute top-3 right-3">
                  <span className={`px-2 py-1 text-xs rounded-lg backdrop-blur-sm ${
                    event.status === 'upcoming' 
                      ? 'bg-blue-500/60 text-white' 
                      : 'bg-green-500/60 text-white'
                  }`}>
                    {event.status === 'upcoming' ? 'Upcoming' : 'Registration Open'}
                  </span>
                </div>
              </div>
              <div className="p-4">
                <h4 className="font-bold text-white text-lg mb-2">{event.title}</h4>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center space-x-2 text-gray-300">
                    <Calendar size={14} />
                    <span>{new Date(event.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-300">
                    <Clock size={14} />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-300">
                    <MapPin size={14} />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-300">
                    <Users size={14} />
                    <span>{event.participants} participants</span>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center space-x-2">
                    <Trophy className="text-yellow-500" size={16} />
                    <span className="font-bold text-white">{event.prize}</span>
                  </div>
                  <button className="bg-gradient-to-r from-purple-500/80 to-blue-500/80 text-white px-4 py-2 rounded-xl font-medium hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-200 hover:from-purple-500 hover:to-blue-500">
                    {event.status === 'upcoming' ? 'View Details' : 'Register Now'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Event Categories */}
      <div>
        <h3 className="text-xl font-bold text-white mb-4">Browse by Category</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {['MMA', 'Boxing', 'Karate', 'Jiu-Jitsu', 'Muay Thai', 'Wrestling'].map((category) => (
            <button
              key={category}
              className="bg-black/30 backdrop-blur-sm rounded-2xl p-4 text-center hover:bg-black/40 transition-all duration-200 hover:shadow-lg hover:shadow-pink-500/10"
            >
              <span className="font-medium text-white">{category}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventsPage;