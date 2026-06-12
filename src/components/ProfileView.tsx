import React, { useState } from 'react';
import { UserProfile } from '../types';

interface ProfileProps {
  user: UserProfile;
  onUpdateUser: (updated: UserProfile) => void;
  onBackToHome: () => void;
}

export default function ProfileView({ user, onUpdateUser, onBackToHome }: ProfileProps) {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);
  const [address, setAddress] = useState(user.address);
  const [isSaved, setIsSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateUser({ name, email, phone, address, avatar: user.avatar });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="min-h-screen bg-surface pb-32">
      {/* Header */}
      <header className="flex items-center px-5 h-16 w-full sticky top-0 z-40 bg-surface/90 glass-blur border-b border-outline-variant/10 shadow-sm">
        <button
          onClick={onBackToHome}
          className="material-symbols-outlined text-primary p-2 hover:bg-surface-container-low transition-colors active:scale-95 duration-150 rounded-full cursor-pointer mr-2"
        >
          arrow_back
        </button>
        <h1 className="font-display text-[20px] font-bold text-primary tracking-tight">Your Profile</h1>
      </header>

      <main className="max-w-[600px] mx-auto px-5 pt-6">
        {/* Profile Info Banner Card */}
        <div className="bg-surface-container-lowest p-6 rounded-3xl border border-outline-variant/30 diffusion-shadow flex flex-col items-center text-center space-y-4 mb-6">
          <div className="w-24 h-24 rounded-full overflow-hidden ring-4 ring-primary-container shadow-md">
            <img
              alt="avatar"
              src={user.avatar}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div>
            <h2 className="font-display text-[20px] font-bold text-on-surface">{user.name}</h2>
            <p className="font-sans text-[13px] text-on-surface-variant mt-0.5">{user.email}</p>
          </div>
        </div>

        {/* Configuration inputs Form */}
        <form onSubmit={handleSubmit} className="bg-surface-container-lowest p-6 rounded-3xl border border-outline-variant/30 diffusion-shadow space-y-4">
          <h3 className="font-display text-[16px] font-bold text-primary pb-2 border-b border-outline-variant/20 mb-4">
            Account Information
          </h3>

          <div className="space-y-3">
            <div>
              <label className="block text-[11px] font-semibold text-on-surface-variant uppercase tracking-wider mb-1 pl-1">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full text-[13px] outline-none border border-outline-variant/80 focus:border-primary focus:ring-1 focus:ring-primary px-3 py-2.5 rounded-xl font-sans bg-surface-container-lowest transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-on-surface-variant uppercase tracking-wider mb-1 pl-1">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full text-[13px] outline-none border border-outline-variant/80 focus:border-primary focus:ring-1 focus:ring-primary px-3 py-2.5 rounded-xl font-sans bg-surface-container-lowest transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-on-surface-variant uppercase tracking-wider mb-1 pl-1">
                Phone Number
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full text-[13px] outline-none border border-outline-variant/80 focus:border-primary focus:ring-1 focus:ring-primary px-3 py-2.5 rounded-xl font-sans bg-surface-container-lowest transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-on-surface-variant uppercase tracking-wider mb-1 pl-1">
                Delivery Address
              </label>
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                rows={2}
                className="w-full text-[13px] outline-none border border-outline-variant/80 focus:border-primary focus:ring-1 focus:ring-primary px-3 py-2.5 rounded-xl font-sans bg-surface-container-lowest transition-all resize-none"
                required
              />
            </div>
          </div>

          <div className="pt-4 flex items-center justify-between">
            <button
              type="submit"
              className="px-6 py-2.5 bg-primary text-on-primary hover:bg-on-primary-fixed-variant rounded-xl font-sans text-[13px] font-semibold cursor-pointer active:scale-95 transition-transform"
            >
              Save Changes
            </button>

            {isSaved && (
              <span className="text-[12px] font-bold text-emerald-600 flex items-center gap-1">
                <span className="material-symbols-outlined text-[18px]">check_circle</span>
                Successfully saved!
              </span>
            )}
          </div>
        </form>

        {/* Promo and Info Card listings */}
        <div className="mt-6 bg-secondary-container/20 p-5 rounded-3xl border border-secondary-container/40 space-y-3">
          <h4 className="font-display text-[14px] font-bold text-on-secondary-container">Your active promos</h4>
          <div className="bg-surface-container-lowest p-3.5 rounded-2xl flex items-center gap-4 justify-between border border-secondary-container/20">
            <div className="flex gap-3 items-center">
              <span className="material-symbols-outlined text-primary text-[24px]">local_offer</span>
              <div>
                <p className="font-sans text-[13px] font-bold text-on-surface">Promo Applied: FIRSTMEAL</p>
                <p className="font-sans text-[11px] text-on-surface-variant">Save $5.00 on your first 3 orders</p>
              </div>
            </div>
            <span className="font-display font-black text-primary text-[13px]">Active</span>
          </div>
        </div>

      </main>
    </div>
  );
}
