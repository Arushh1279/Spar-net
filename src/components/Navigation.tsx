
import React from 'react';
import { navigationTabs } from '../config/navigation';

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Navigation = ({ activeTab, onTabChange }: NavigationProps) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-lg border-t border-pink-500/30 z-50 md:hidden">
      <div className="flex justify-around items-center py-2">
        {navigationTabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center p-2 rounded-lg transition-all duration-200 ${
                activeTab === tab.id
                  ? 'text-pink-400 bg-pink-500/20'
                  : 'text-gray-400 hover:text-pink-400'
              }`}
            >
              <Icon size={20} />
              <span className="text-xs mt-1">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default Navigation;
