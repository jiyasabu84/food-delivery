import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Restaurant, UserProfile } from '../types';
import { RESTAURANTS, CUISINES } from '../data';

interface HomeViewProps {
  user: UserProfile;
  restaurants: Restaurant[];
  favorites: string[];
  toggleFavorite: (id: string) => void;
  onSelectRestaurant: (restaurant: Restaurant) => void;
  cartCount: number;
  cartTotal: number;
  onViewCart: () => void;
}

export default function HomeView({
  user,
  restaurants,
  favorites,
  toggleFavorite,
  onSelectRestaurant,
  cartCount,
  cartTotal,
  onViewCart,
}: HomeViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCuisine, setSelectedCuisine] = useState<string | null>(null);

  // Filter restaurants based on search and cuisine filter
  const filteredRestaurants = restaurants.filter((r) => {
    const matchesSearch =
      r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.cuisine.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCuisine = selectedCuisine
      ? r.cuisine.toLowerCase() === selectedCuisine.toLowerCase() ||
        r.categories.some((cat) => cat.toLowerCase() === selectedCuisine.toLowerCase())
      : true;

    return matchesSearch && matchesCuisine;
  });

  const handleCuisineClick = (cuisineName: string) => {
    if (selectedCuisine === cuisineName) {
      // Toggle off
      setSelectedCuisine(null);
    } else {
      setSelectedCuisine(cuisineName);
    }
  };

  return (
    <div className="min-h-screen bg-surface pb-32">
      {/* TopAppBar */}
      <header className="flex justify-between items-center px-5 h-16 w-full sticky top-0 z-50 bg-surface/90 glass-blur border-b border-outline-variant/10 shadow-sm">
        <div className="flex items-center gap-2 group cursor-pointer active:scale-95 transition-all duration-200">
          <span className="material-symbols-outlined text-primary text-[26px]">location_on</span>
          <div className="flex flex-col">
            <span className="font-sans text-[11px] font-semibold text-on-surface-variant uppercase tracking-wider">Delivering to</span>
            <span className="font-display text-[14px] text-primary font-bold">San Francisco, CA</span>
          </div>
        </div>
        
        <h1 className="hidden md:block font-display text-[22px] font-bold text-primary dark:text-primary-fixed-dim tracking-tight">
          Culinary Harmony
        </h1>
        
        {/* Profile Avatar */}
        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary-container hover:border-primary transition-colors cursor-pointer active:scale-95 transition-transform duration-200">
          <img
            alt="Profile Logo"
            className="w-full h-full object-cover"
            src={user.avatar}
            referrerPolicy="no-referrer"
          />
        </div>
      </header>

      <main className="max-w-[1200px] mx-auto pt-4">
        {/* Search Input Section */}
        <section className="px-5 mt-2">
          <div className="relative">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">
              search
            </span>
            <input
              className="w-full h-14 pl-12 pr-4 rounded-xl border border-outline-variant/60 bg-surface-container-lowest focus:ring-2 focus:ring-primary-container focus:border-primary transition-all outline-none font-sans text-on-surface placeholder:text-outline/60"
              placeholder="Search for restaurants or dishes"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant/60 hover:text-on-surface"
              >
                <span className="material-symbols-outlined text-sm">close</span>
              </button>
            )}
          </div>
        </section>

        {/* Cuisine Types slider */}
        <section className="mt-8">
          <div className="flex items-center justify-between px-5 mb-4">
            <h2 className="font-display text-[20px] font-semibold text-on-surface">Cuisines</h2>
            {selectedCuisine && (
              <button
                onClick={() => setSelectedCuisine(null)}
                className="text-primary font-sans text-[13px] font-medium hover:underline"
              >
                Clear Filters
              </button>
            )}
          </div>
          
          <div className="flex gap-4 overflow-x-auto px-5 hide-scrollbar pb-2">
            {CUISINES.map((cuisine) => {
              const isSelected = selectedCuisine?.toLowerCase() === cuisine.name.toLowerCase();
              return (
                <div
                  key={cuisine.name}
                  onClick={() => handleCuisineClick(cuisine.name)}
                  className="flex flex-col items-center gap-2 flex-shrink-0 cursor-pointer group"
                >
                  <div
                    className={`w-18 h-18 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-105 ${
                      isSelected
                        ? 'bg-primary text-on-primary ring-4 ring-primary-container shadow-md'
                        : 'bg-secondary-container text-on-secondary-container hover:bg-primary-container/40'
                    }`}
                  >
                    <span
                      className={`material-symbols-outlined text-[28px] ${isSelected ? 'material-filled' : ''}`}
                    >
                      {cuisine.icon}
                    </span>
                  </div>
                  <span className="font-sans text-[12px] font-medium text-on-surface">
                    {cuisine.name}
                  </span>
                </div>
              );
            })}
          </div>
        </section>

        {/* Exclusive Offers Banner */}
        <section className="px-5 mt-10">
          <div className="relative w-full h-44 rounded-3xl bg-secondary-container overflow-hidden flex items-center shadow-sm">
            <div className="relative z-10 pl-6 pr-4 w-3/5">
              <span className="bg-primary/10 text-primary-fixed-variant text-[11px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider">
                Limited Promo
              </span>
              <h3 className="font-display text-[22px] md:text-[26px] font-bold text-on-secondary-container leading-tight mt-1">
                Exclusive Offers <br />on Fine Dining
              </h3>
              <p className="font-sans text-[13px] text-on-secondary-fixed-variant mt-1.5 opacity-90">
                Get up to 30% off selected restaurants this week.
              </p>
              <button
                onClick={() => {
                  const greenKitchen = restaurants.find((r) => r.id === 'green-kitchen');
                  if (greenKitchen) onSelectRestaurant(greenKitchen);
                }}
                className="mt-3 px-5 py-2 bg-primary text-on-primary rounded-full font-sans text-[12px] font-semibold hover:bg-on-primary-fixed-variant transition-all active:scale-95 cursor-pointer shadow-sm shadow-primary/20"
              >
                Claim Offer
              </button>
            </div>
            
            <div className="absolute right-0 top-0 h-full w-2/5 md:w-1/2">
              <img
                alt="Dining experience"
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDRNBMYR0V2w47ORSIhMy-en1qneRrjxRQKnOVeAukS0X28kNjkqS4LGdPIzxyJJjIRm6jMKbqZwFboOSnnMsdbkHTPGMYwq24estqTkRc2VcIy0QT2rujyj2Hlv6MD5TPo2OpG3-Q_zaiKhHUQvro3LmiSbPQJGUaatYl7ZO_SotfryEdP8WB6UnUy2FpP4CmO7Mti1Bd89Nyu1mbnoaifPzYVvV0oszqW0XPGguJwamfEK1BSPjwFl3k7-f3QJqmxrtVq_Lyy2Ck"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-secondary-container via-secondary-container/30 to-transparent"></div>
            </div>
          </div>
        </section>

        {/* Popular Near You */}
        <section className="mt-12 px-5">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-[20px] font-semibold text-on-surface">Popular Near You</h2>
            <span className="font-sans text-[13px] text-primary hover:underline cursor-pointer">See More</span>
          </div>

          {filteredRestaurants.length === 0 ? (
            <div className="text-center py-10 bg-white/50 rounded-2xl border border-dashed border-outline-variant/60">
              <span className="material-symbols-outlined text-[48px] text-outline opacity-40">search_off</span>
              <p className="font-sans text-[15px] text-on-surface-variant mt-2 font-medium">No restaurants match your search.</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCuisine(null);
                }}
                className="mt-3 text-[13px] text-primary font-semibold hover:underline"
              >
                Reset all filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRestaurants.map((restaurant) => {
                const isFavorite = favorites.includes(restaurant.id);
                return (
                  <motion.div
                    key={restaurant.id}
                    layoutId={`restaurant-card-${restaurant.id}`}
                    whileHover={{ y: -6 }}
                    className="group bg-surface-container-lowest rounded-3xl overflow-hidden diffusion-shadow border border-outline-variant/30 hover:border-primary/20 transition-all duration-300 flex flex-col cursor-pointer"
                  >
                    <div className="relative h-48 overflow-hidden" onClick={() => onSelectRestaurant(restaurant)}>
                      <img
                        alt={restaurant.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        src={restaurant.bannerImage}
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-4 right-4 bg-surface/90 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
                        <span className="material-symbols-outlined text-yellow-500 text-sm material-filled">
                          star
                        </span>
                        <span className="font-sans text-[12px] font-bold text-on-surface">{restaurant.rating}</span>
                      </div>
                    </div>
                    
                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div onClick={() => onSelectRestaurant(restaurant)}>
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-display text-[18px] font-bold text-on-surface group-hover:text-primary transition-colors">
                              {restaurant.name}
                            </h4>
                            <p className="font-sans text-[13px] text-on-surface-variant mt-0.5">
                              {restaurant.categories.join(' • ')}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Favorite Button Overlay & Details */}
                      <div className="mt-4 pt-4 border-t border-outline-variant/20 flex items-center justify-between">
                        <div className="flex items-center gap-4 text-on-surface-variant font-sans text-[12px]">
                          <div className="flex items-center gap-1">
                            <span className="material-symbols-outlined text-[16px]">schedule</span>
                            <span className="font-semibold">{restaurant.time}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <span className="material-symbols-outlined text-[17px]">delivery_dining</span>
                            <span className="font-semibold">
                              {restaurant.deliveryFee === 'Free' ? 'Free Delivery' : `${restaurant.deliveryFee} Fee`}
                            </span>
                          </div>
                        </div>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleFavorite(restaurant.id);
                          }}
                          className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors shadow-sm cursor-pointer ${
                            isFavorite
                              ? 'bg-primary-container text-primary hover:bg-primary-container/80'
                              : 'bg-surface-container-high hover:bg-primary-container/20 text-on-surface-variant hover:text-primary'
                          }`}
                        >
                          <span className={`material-symbols-outlined text-[20px] ${isFavorite ? 'material-filled' : ''}`}>
                            favorite
                          </span>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </section>
      </main>

      {/* Specialty Component Float Tab - "The Cart Tab" */}
      {cartCount > 0 && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-40 w-[90%] max-w-md">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-surface/75 glass-blur border border-outline-variant/30 rounded-full h-15 px-6 flex items-center justify-between shadow-xl cursor-pointer hover:border-primary/20 active:scale-95 transition-all"
            onClick={onViewCart}
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-on-primary font-bold text-[14px]">
                {cartCount}
              </div>
              <span className="font-display text-[14px] font-bold text-on-surface">View your cart</span>
            </div>
            <span className="font-display font-black text-primary text-[15px]">${cartTotal.toFixed(2)}</span>
          </motion.div>
        </div>
      )}
    </div>
  );
}
