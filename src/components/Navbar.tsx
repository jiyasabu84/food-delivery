import React from 'react';

interface NavbarProps {
  activeTab: 'home' | 'search' | 'orders' | 'profile';
  setActiveTab: (tab: 'home' | 'search' | 'orders' | 'profile') => void;
}

export default function Navbar({ activeTab, setActiveTab }: NavbarProps) {
  const tabs = [
    { id: 'home' as const, label: 'Home', icon: 'home' },
    { id: 'search' as const, label: 'Search', icon: 'search' },
    { id: 'orders' as const, label: 'Orders', icon: 'receipt_long' },
    { id: 'profile' as const, label: 'Profile', icon: 'person' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pt-2 pb-6 h-20 bg-surface/80 dark:bg-inverse-surface/80 backdrop-blur-xl border-t border-outline-variant/30 shadow-[0_-4px_24px_rgba(0,0,0,0.05)] rounded-t-xl transition-all">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex flex-col items-center justify-center transition-all duration-150 active:scale-90 cursor-pointer ${
              isActive
                ? 'text-primary dark:text-primary-fixed-dim font-semibold'
                : 'text-on-surface-variant dark:text-outline-variant opacity-60 hover:opacity-100'
            }`}
          >
            <span
              className={`material-symbols-outlined text-[26px] ${isActive ? 'material-filled' : ''}`}
            >
              {tab.icon}
            </span>
            <span className="font-sans text-[12px] leading-[16px] mt-1 pr-[1px]">
              {tab.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
