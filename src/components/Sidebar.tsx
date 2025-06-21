
import React from 'react';
import { LogOut, X, Zap, Lock } from 'lucide-react';
import { sidebarTabs } from '../config/navigation';
import logo from './logo.webp';
            
interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: string;
  onTabChange: (tab: string) => void;
  isLoggedIn: boolean;
  onLogout: () => void;
}

const Sidebar = ({ isOpen, onClose, activeTab, onTabChange, isLoggedIn, onLogout }: SidebarProps) => {
  // Filter tabs based on authentication state
  const getVisibleTabs = () => {
    if (!isLoggedIn) {
      // Show only home, community, events, and sign-in for logged out users
      return sidebarTabs.filter(tab => 
        ['home', 'community', 'events'].includes(tab.id)
      ).concat([{ id: 'signin', label: 'Sign In', icon: Lock }]);
    }
    // Show all tabs except settings for logged in users
    return sidebarTabs.filter(tab => tab.id !== 'settings');
  };

  const visibleTabs = getVisibleTabs();

  return (
    <>
      {/* Mobile overlay - only shows on mobile when sidebar is open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <aside
        className={`
          fixed left-0 top-0 h-full w-64 bg-black/20 backdrop-blur-xl z-50
          transform transition-transform duration-300
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0
        `}
      >
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
          
            <img src={logo} alt="Spar-net logo" className="h-8 w-8" />
            <h2 className="text-xl font-black bg-gradient-to-r from-pink-400 via-red-400 to-pink-600 bg-clip-text text-transparent tracking-wider">
              Spar-net
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-pink-500/20 md:hidden text-pink-400"
          >
            <X size={20} />
          </button>
        </div>
        
        <nav className="p-4 space-y-2">
          {visibleTabs.map((tab) => {
            const Icon = tab.icon;
            const isMessagesLocked = tab.id === 'messages' && !isLoggedIn;
            
            return (
              <button
                key={tab.id}
                onClick={() => {
                  if (!isMessagesLocked) {
                    onTabChange(tab.id);
                    onClose();
                  }
                }}
                disabled={isMessagesLocked}
                className={`w-full flex items-center space-x-3 p-3 rounded-xl transition-all duration-200 font-semibold tracking-wide ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-pink-500/80 to-red-600/80 text-white shadow-lg shadow-pink-500/25 transform scale-[1.02]'
                    : isMessagesLocked
                    ? 'text-gray-500 cursor-not-allowed opacity-50'
                    : 'text-gray-300 hover:bg-gradient-to-r hover:from-pink-500/20 hover:to-red-500/20 hover:text-pink-400 hover:transform hover:scale-[1.01]'
                }`}
              >
                {isMessagesLocked ? <Lock size={20} /> : <Icon size={20} />}
                <span className="font-bold">{tab.label}</span>
                {isMessagesLocked && <Lock size={16} className="ml-auto" />}
              </button>
            );
          })}
        </nav>
        
        {isLoggedIn && (
          <div className="absolute bottom-4 left-4 right-4">
            <button 
              onClick={onLogout}
              className="w-full flex items-center space-x-3 p-3 rounded-xl text-pink-400 hover:bg-gradient-to-r hover:from-red-500/20 hover:to-pink-500/20 transition-all duration-200 font-semibold"
            >
              <LogOut size={20} />
              <span className="font-bold">Sign Out</span>
            </button>
          </div>
        )}
      </aside>
    </>
  );
};

export default Sidebar;
