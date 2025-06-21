
import { Home, Users, Calendar, MessageCircle, User, Settings } from 'lucide-react';

export const navigationTabs = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'community', label: 'Community', icon: Users },
  { id: 'events', label: 'Events', icon: Calendar },
  { id: 'messages', label: 'Messages', icon: MessageCircle },
  { id: 'profile', label: 'Profile', icon: User },
];

export const sidebarTabs = [
  ...navigationTabs,
  { id: 'settings', label: 'Settings', icon: Settings },
];
