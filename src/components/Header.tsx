import React from 'react';
import { Menu, Bell, Search, Zap } from 'lucide-react';
import logo from './logo.webp';
interface HeaderProps {
  onMenuClick: () => void;
  title: string;
}

const Header = ({ onMenuClick, title }: HeaderProps) => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-black/20 backdrop-blur-xl z-40">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-4">
          <button
            onClick={onMenuClick}
            className="p-2 rounded-lg hover:bg-pink-500/20 transition-colors md:hidden text-pink-400"
          >
            <Menu size={20} />
          </button>
          <div className="flex items-center space-x-2">
            <img src={logo} alt="Spar-net logo" className="h-8 w-8" />
            <h1 className="text-xl font-black bg-gradient-to-r from-pink-400 via-red-400 to-pink-600 bg-clip-text text-transparent tracking-wider">
              {title}
            </h1>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button className="p-2 rounded-lg hover:bg-pink-500/20 transition-colors text-pink-400 relative group">
            <Search size={20} />
            <div className="absolute inset-0 bg-pink-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity animate-pulse"></div>
          </button>
          <button className="p-2 rounded-lg hover:bg-pink-500/20 transition-colors relative text-pink-400 group">
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
            <div className="absolute inset-0 bg-pink-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
