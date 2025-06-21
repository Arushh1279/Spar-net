import React, { useState } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Navigation from '../components/Navigation';
import HomePage from '../components/HomePage';
import CommunityPage from '../components/CommunityPage';
import EventsPage from '../components/EventsPage';
import MessagesPage from '../components/MessagesPage';
import ProfilePage from '../components/ProfilePage';
import LoginPage from '../components/LoginPage';

const Index = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (email: string, password: string) => {
    // Simple login simulation - in real app, this would validate credentials
    console.log('Login attempt:', email, password);
    setIsLoggedIn(true);
    setActiveTab('home');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setActiveTab('home');
  };

  const handleTabChange = (tab: string) => {
    if (tab === 'signin') {
      setActiveTab('signin');
    } else if (tab === 'messages' && !isLoggedIn) {
      // Don't change tab if trying to access messages while logged out
      return;
    } else {
      setActiveTab(tab);
    }
  };
  const RippleAnimation = () => (
  <style>{`
    @keyframes ripple {
      0% {
        transform: scale(0.8);
        opacity: 0;
      }
      5%{
      opacity: 0.1;
      }
        15%{
        opacity: 0.2;
        }
      60% { /* The fade-in is now spread over 60% of the animation's duration */
        opacity: 0.5; /* The peak opacity is also more subtle */
      }
      100% {
        transform: scale(2.5);
        opacity: 0;
      }
    }
  `}</style>
);

  const getPageTitle = () => {
    switch (activeTab) {
      case 'home':
        return 'Spar-net';
      case 'community':
        return 'Community';
      case 'events':
        return 'Events';
      case 'messages':
        return 'Messages';
      case 'profile':
        return 'Profile';
      case 'settings':
        return 'Settings';
      case 'signin':
        return 'Sign In';
      default:
        return 'Spar-net';
    }
  };

  const renderContent = () => {
    if (activeTab === 'signin') {
      return <LoginPage onLogin={handleLogin} />;
    }

    switch (activeTab) {
      case 'home':
        return <HomePage />;
      case 'community':
        return <CommunityPage />;
      case 'events':
        return <EventsPage />;
      case 'messages':
        return isLoggedIn ? <MessagesPage /> : <HomePage />;
      case 'profile':
        return <ProfilePage />;
      case 'settings':
        return <div className="text-pink-400">Settings page coming soon...</div>;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-blue-900 w-full relative overflow-hidden">
      {/* Animated Boxer Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Energy particles */}
        <div className="absolute top-1/4 right-1/4 w-2 h-2 bg-pink-500 rounded-full animate-ping"></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-red-500 rounded-full animate-pulse"></div>
        <div className="absolute top-1/2 right-1/5 w-3 h-3 bg-pink-400 rounded-full animate-bounce"></div>
        <div className="absolute top-2/3 right-1/4 w-1.5 h-1.5 bg-red-400 rounded-full animate-ping delay-1000"></div>
        <div className="absolute bottom-1/3 right-1/6 w-2.5 h-2.5 bg-pink-600 rounded-full animate-pulse delay-500"></div>

        {/* Main Boxer Silhouette - Animated entrance from right */}
        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-full animate-[slide-in-right_2s_ease-out_forwards] opacity-0 animate-[fade-in_2s_ease-out_1s_forwards]">
          <svg width="400" height="600" viewBox="0 0 400 600" className="drop-shadow-2xl">
            {/* Boxer body */}
            <path
              d="M200 150 Q190 120 200 100 Q210 120 200 150
                 L200 300 Q180 320 160 350 L160 450 Q160 480 180 500
                 L220 500 Q240 480 240 450 L240 350 Q220 320 200 300 Z"
              fill="url(#boxerGradient)"
              className="animate-pulse"
            />

            {/* Head */}
            <circle cx="200" cy="100" r="30" fill="url(#headGradient)" className="animate-pulse delay-300" />

            {/* Left boxing glove with energy */}
            <g className="animate-bounce delay-700">
              <circle cx="120" cy="280" r="25" fill="#000" />
              <circle cx="120" cy="280" r="20" fill="url(#gloveGradient)" />
              {/* Energy from left glove */}
              <path d="M95 280 Q80 270 70 280 Q80 290 95 280" fill="#ff1493" className="animate-ping" />
              <path d="M90 270 Q75 260 65 270 Q75 280 90 270" fill="#ff69b4" className="animate-pulse delay-200" />
              <path d="M85 290 Q70 300 60 290 Q70 280 85 290" fill="#ff1493" className="animate-ping delay-400" />
            </g>

            {/* Right boxing glove with energy */}
            <g className="animate-bounce delay-1000">
              <circle cx="280" cy="280" r="25" fill="#000" />
              <circle cx="280" cy="280" r="20" fill="url(#gloveGradient)" />
              {/* Energy from right glove */}
              <path d="M305 280 Q320 270 330 280 Q320 290 305 280" fill="#ff1493" className="animate-ping delay-100" />
              <path d="M310 270 Q325 260 335 270 Q325 280 310 270" fill="#ff69b4" className="animate-pulse delay-300" />
              <path d="M315 290 Q330 300 340 290 Q330 280 315 290" fill="#ff1493" className="animate-ping delay-500" />
            </g>

            {/* Legs */}
            <rect x="180" y="450" width="15" height="100" fill="url(#boxerGradient)" className="animate-pulse delay-500" />
            <rect x="205" y="450" width="15" height="100" fill="url(#boxerGradient)" className="animate-pulse delay-600" />

            {/* Gradient definitions */}
            <defs>
              <radialGradient id="boxerGradient" cx="50%" cy="50%">
                <stop offset="0%" stopColor="#1a1a1a" />
                <stop offset="100%" stopColor="#000" />
              </radialGradient>
              <radialGradient id="headGradient" cx="50%" cy="50%">
                <stop offset="0%" stopColor="#2a2a2a" />
                <stop offset="100%" stopColor="#000" />
              </radialGradient>
              <radialGradient id="gloveGradient" cx="50%" cy="50%">
                <stop offset="0%" stopColor="#333" />
                <stop offset="50%" stopColor="#000" />
                <stop offset="100%" stopColor="#ff1493" />
              </radialGradient>
            </defs>
          </svg>
        </div>

        {/* Energy waves emanating from boxer - ANIMATION SLOWED DOWN SIGNIFICANTLY */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <RippleAnimation />
        {/* Energy waves emanating from boxer - NOW A BLUE, SLOW WATER RIPPLE */}
        <div className="absolute right-20 top-1/2 transform -translate-y-1/2">
          {/* The animation now uses blue/cyan colors */}
          <div className="w-32 h-32 border-2 border-blue-400/30 rounded-full animate-[ripple_7s_ease-out_infinite]"></div>
          {/* <div className="absolute top-4 left-4 w-24 h-24 border-2 border-cyan-300/20 rounded-full animate-[ripple_7s_ease-out_infinite] delay-700"></div> */}
          <div className="absolute top-8 left-8 w-16 h-16 border-2 border-blue-300/40 rounded-full animate-[ripple_7s_ease-out_infinite] delay-1400"></div>
        </div>
      </div>

        {/* Floating energy orbs */}
        <div className="absolute top-20 right-32 w-4 h-4 bg-pink-500 rounded-full animate-bounce blur-sm"></div>
        <div className="absolute top-40 right-24 w-3 h-3 bg-red-500 rounded-full animate-pulse blur-sm delay-700"></div>
        <div className="absolute bottom-32 right-40 w-5 h-5 bg-pink-400 rounded-full animate-ping blur-sm delay-300"></div>
        <div className="absolute bottom-20 right-16 w-2 h-2 bg-red-400 rounded-full animate-bounce blur-sm delay-1200"></div>

        {/* Graffiti text with enhanced animations */}
        <div className="absolute top-20 left-10 text-6xl font-black text-pink-500/10 rotate-12 select-none animate-pulse">

        </div>
        <div className="absolute top-40 right-20 text-4xl font-black text-red-500/10 -rotate-12 select-none animate-pulse delay-300">

        </div>
        <div className="absolute bottom-40 left-20 text-5xl font-black text-purple-500/10 rotate-45 select-none animate-pulse delay-700">

        </div>
        <div className="absolute top-60 left-1/2 text-3xl font-black text-pink-600/10 -rotate-45 select-none animate-pulse delay-1000">

        </div>
        <div className="absolute bottom-20 right-10 text-4xl font-black text-red-600/10 rotate-12 select-none hidden md:block animate-pulse delay-500">

        </div>
      </div>

      <div className="flex w-full relative z-10">
        {/* Single Sidebar - responsive behavior handled inside the component */}
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          activeTab={activeTab}
          onTabChange={handleTabChange}
          isLoggedIn={isLoggedIn}
          onLogout={handleLogout}
        />

        {/* Main Content */}
        <div className="flex-1 flex flex-col w-full md:ml-64">
          <Header
            onMenuClick={() => setSidebarOpen(true)}
            title={getPageTitle()}
          />

          <main className="flex-1 p-4 pt-20 pb-20 md:pb-4 overflow-y-auto relative">
            <div className="relative z-10">
              {renderContent()}
            </div>
          </main>
        </div>
      </div>

      {/* Bottom Navigation for mobile only */}
      <Navigation
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />
    </div>
  );
};

export default Index;