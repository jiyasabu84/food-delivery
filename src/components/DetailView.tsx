import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Restaurant, MenuItem, CartItem } from '../types';

interface DetailViewProps {
  restaurant: Restaurant;
  cart: CartItem[];
  addToCart: (item: MenuItem, restaurantId: string) => void;
  removeFromCart: (itemId: string) => void;
  favorites: string[];
  toggleFavorite: (id: string) => void;
  onBack: () => void;
  onViewCart: () => void;
}

export default function DetailView({
  restaurant,
  cart,
  addToCart,
  removeFromCart,
  favorites,
  toggleFavorite,
  onBack,
  onViewCart,
}: DetailViewProps) {
  const [selectedCategory, setSelectedCategory] = useState<'starters' | 'main_bowls' | 'refreshments'>('main_bowls');
  
  const isFavorite = favorites.includes(restaurant.id);

  // Filter menu items by active tab category
  const filteredMenu = restaurant.menu.filter((item) => item.category === selectedCategory);

  // Helper to find specific item count in cart
  const getItemCartQuantity = (itemId: string) => {
    const cartItem = cart.find((i) => i.id === itemId);
    return cartItem ? cartItem.quantity : 0;
  };

  // Calculate cart metrics
  const totalItemsInCart = cart.reduce((total, item) => total + item.quantity, 0);
  const cartSubtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const categories = [
    { id: 'starters' as const, label: 'Starters' },
    { id: 'main_bowls' as const, label: 'Main Bowls' },
    { id: 'refreshments' as const, label: 'Refreshments' },
  ];

  return (
    <div className="min-h-screen bg-background pb-36">
      {/* Hero Section */}
      <header className="relative w-full h-[320px] md:h-[400px] overflow-hidden">
        <motion.img
          layoutId={`restaurant-card-${restaurant.id}`}
          alt={restaurant.name}
          className="w-full h-full object-cover"
          src={restaurant.bannerImage}
          referrerPolicy="no-referrer"
        />
        
        {/* Overlays top controls */}
        <div className="absolute top-0 left-0 w-full p-5 flex justify-between items-center z-20">
          <button
            onClick={onBack}
            className="w-12 h-12 rounded-full bg-surface/90 glass-blur flex items-center justify-center text-primary shadow-md active:scale-90 transition-transform cursor-pointer"
          >
            <span className="material-symbols-outlined text-[24px]">arrow_back</span>
          </button>
          
          <button
            onClick={() => toggleFavorite(restaurant.id)}
            className="w-12 h-12 rounded-full bg-surface/90 glass-blur flex items-center justify-center text-primary shadow-md active:scale-90 transition-transform cursor-pointer"
          >
            <span className={`material-symbols-outlined text-[24px] ${isFavorite ? 'material-filled' : ''}`}>
              favorite
            </span>
          </button>
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-70"></div>
      </header>

      {/* Restaurant Info Card */}
      <main className="max-w-[1200px] mx-auto -mt-12 relative z-30 px-5 md:px-0 lg:max-w-4xl">
        <div className="bg-surface p-6 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-outline-variant/30">
          <div className="flex justify-between items-start mb-2">
            <h1 className="font-display text-[26px] md:text-[32px] font-bold text-primary leading-tight">
              {restaurant.name}
            </h1>
            
            <div className="flex items-center gap-1 bg-primary-fixed text-on-primary-fixed-variant px-3.5 py-1.5 rounded-full shadow-sm">
              <span className="material-symbols-outlined text-[18px] material-filled">star</span>
              <span className="font-sans text-[13px] font-bold">{restaurant.rating}</span>
            </div>
          </div>
          
          <p className="text-on-surface-variant font-sans text-[14px] leading-relaxed mb-5">
            {restaurant.description}
          </p>
          
          <div className="flex items-center gap-12 border-t border-outline-variant/40 pt-5">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[22px]">schedule</span>
              <div>
                <p className="font-sans text-[11px] font-semibold text-on-surface-variant uppercase tracking-wider">Time</p>
                <p className="font-sans text-[14px] font-bold text-primary">{restaurant.time}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[22px]">distance</span>
              <div>
                <p className="font-sans text-[11px] font-semibold text-on-surface-variant uppercase tracking-wider">Distance</p>
                <p className="font-sans text-[14px] font-bold text-primary">{restaurant.distance}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[22px]">delivery_dining</span>
              <div>
                <p className="font-sans text-[11px] font-semibold text-on-surface-variant uppercase tracking-wider">Delivery</p>
                <p className="font-sans text-[14px] font-bold text-primary">
                  {restaurant.deliveryFee === 'Free' ? 'Free Delivery' : `${restaurant.deliveryFee}`}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Menu Tab Categories Selection */}
        <section className="mt-8 overflow-x-auto hide-scrollbar -mx-5 px-5 md:mx-0 md:px-0">
          <div className="flex gap-3 pb-2">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-6 py-3 rounded-full font-sans text-[13px] font-semibold whitespace-nowrap cursor-pointer transition-all ${
                    isActive
                      ? 'bg-primary text-on-primary shadow-md shadow-primary/15'
                      : 'bg-secondary-container text-on-secondary-container hover:bg-primary-container'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </section>

        {/* Menu Grid Items */}
        <section className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredMenu.map((item) => {
            const quantity = getItemCartQuantity(item.id);
            return (
              <div
                key={item.id}
                className="bg-surface rounded-2xl overflow-hidden border border-outline-variant/60 hover:border-primary/20 hover:shadow-md transition-all group flex h-36"
              >
                <div className="flex-1 p-4 flex flex-col justify-between">
                  <div className="pr-1">
                    <h3 className="font-display text-[15px] font-bold text-on-surface mb-0.5 group-hover:text-primary transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-on-surface-variant font-sans text-[12px] leading-snug line-clamp-2">
                      {item.description}
                    </p>
                  </div>
                  
                  <div className="flex justify-between items-center mt-2">
                    <span className="font-display text-[15px] font-black text-primary">${item.price.toFixed(2)}</span>
                    
                    {quantity > 0 ? (
                      <div className="flex items-center gap-2 bg-surface-container-low rounded-full px-2 py-1 border border-outline-variant/30">
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="w-7 h-7 flex items-center justify-center rounded-full bg-white text-primary hover:bg-primary-container/20 transition-all active:scale-95 cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-[16px] font-bold">remove</span>
                        </button>
                        <span className="w-5 text-center font-sans font-bold text-[13px] text-on-surface">
                          {quantity}
                        </span>
                        <button
                          onClick={() => addToCart(item, restaurant.id)}
                          className="w-7 h-7 flex items-center justify-center rounded-full bg-primary text-on-primary hover:opacity-90 transition-all active:scale-95 cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-[16px] font-bold">add</span>
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => addToCart(item, restaurant.id)}
                        className="w-9 h-9 rounded-full bg-primary text-on-primary flex items-center justify-center shadow-sm group-hover:scale-105 transition-all active:scale-95 cursor-pointer hover:bg-on-primary-fixed-variant"
                      >
                        <span className="material-symbols-outlined text-[18px]">add</span>
                      </button>
                    )}
                  </div>
                </div>
                
                <div className="w-32 h-full overflow-hidden flex-shrink-0">
                  <img
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    src={item.image}
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            );
          })}
        </section>
      </main>

      {/* Specialty Component Bottom view cart tab bar */}
      {totalItemsInCart > 0 && (
        <div className="fixed bottom-5 left-1/2 -translate-x-1/2 w-[calc(100%-40px)] max-w-lg z-50">
          <button
            onClick={onViewCart}
            className="w-full h-15 glass-blur bg-primary/95 hover:bg-primary text-on-primary rounded-full px-6 flex items-center justify-between shadow-2xl active:scale-95 transition-all cursor-pointer group"
          >
            <div className="flex items-center gap-3">
              <div className="bg-on-primary/20 w-8 h-8 rounded-full flex items-center justify-center font-sans font-bold text-[13px]">
                {totalItemsInCart}
              </div>
              <span className="font-display text-[14px] font-black uppercase tracking-wider">View Cart</span>
            </div>
            
            <div className="flex items-center gap-1">
              <span className="font-display text-[15px] font-black">${cartSubtotal.toFixed(2)}</span>
              <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">
                chevron_right
              </span>
            </div>
          </button>
        </div>
      )}
    </div>
  );
}
