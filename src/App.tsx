import React, { useState } from 'react';
import { RESTAURANTS, USER_PROFILE, INITIAL_ORDERS } from './data';
import { Restaurant, MenuItem, CartItem, Order, UserProfile } from './types';
import HomeView from './components/HomeView';
import DetailView from './components/DetailView';
import CartView from './components/CartView';
import TrackingView from './components/TrackingView';
import OrdersView from './components/OrdersView';
import ProfileView from './components/ProfileView';
import Navbar from './components/Navbar';

export default function App() {
  const [user, setUser] = useState<UserProfile>(USER_PROFILE);
  const [restaurants, setRestaurants] = useState<Restaurant[]>(RESTAURANTS);
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  
  // Navigation State
  const [activeTab, setActiveTab] = useState<'home' | 'search' | 'orders' | 'profile'>('home');
  const [activeView, setActiveView] = useState<'home' | 'restaurant' | 'cart' | 'tracking' | 'orders' | 'profile'>('home');
  
  // App States
  const [cart, setCart] = useState<CartItem[]>([]);
  const [favorites, setFavorites] = useState<string[]>(['green-kitchen']); // pre-favorite green kitchen
  const [couponApplied, setCouponApplied] = useState(true); // FIRSTMEAL coupon pre-applied for checkout look
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [activeTrackingOrder, setActiveTrackingOrder] = useState<Order | null>(null);
  
  // Search parameters inside tab
  const [searchQuery, setSearchQuery] = useState('');
  const [cartConflictRestaurant, setCartConflictRestaurant] = useState<{ item: MenuItem; id: string } | null>(null);
  
  // Favorite state toggler
  const toggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]
    );
  };

  // Cart operations
  const addToCart = (item: any, restaurantId: string) => {
    // Check if item is from same restaurant if cart has elements
    if (cart.length > 0 && cart[0].restaurantId !== restaurantId) {
      setCartConflictRestaurant({ item, id: restaurantId });
      return;
    }

    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i));
      }
      return [
        ...prev,
        {
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: 1,
          image: item.image,
          specification: item.specification || (item.category === 'main_bowls' ? 'Standard preparation' : item.category === 'refreshments' ? 'Matcha ice ratio default' : 'Gourmet starter'),
          restaurantId,
        },
      ];
    });
  };

  const removeFromCart = (itemId: string) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === itemId);
      if (existing && existing.quantity > 1) {
        return prev.map((i) => (i.id === itemId ? { ...i, quantity: i.quantity - 1 } : i));
      }
      return prev.filter((i) => i.id !== itemId);
    });
  };

  const handleResolveConflict = (clearCart: boolean) => {
    if (clearCart && cartConflictRestaurant) {
      setCart([]);
      const { item, id } = cartConflictRestaurant;
      setCart([
        {
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: 1,
          image: item.image,
          specification: 'Standard preparation',
          restaurantId: id,
        },
      ]);
    }
    setCartConflictRestaurant(null);
  };

  // Place Order Action
  const handlePlaceOrder = (
    subtotal: number,
    deliveryFee: number,
    serviceFee: number,
    discount: number,
    total: number
  ) => {
    const restaurant = restaurants.find((r) => r.id === cart[0].restaurantId);
    
    const newOrder: Order = {
      id: `CH-${Math.floor(1000 + Math.random() * 9000)}`,
      restaurantName: restaurant?.name || 'Gourmet Restaurant',
      restaurantId: cart[0].restaurantId,
      items: [...cart],
      subtotal,
      deliveryFee,
      serviceFee,
      total,
      status: 'confirmed',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      estimatedTime: '12 mins',
      courierName: 'David',
      courierImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC8CqZvwH_Oe9QAgKRsDDERGTi8EZA14aBvs1xYiIYv1p3OtKZc8fEmIKeAeGJ4JgUwX4p_TKbohsj2woH5L3uJ1w9jE0KflRCwykPFNTuwIl08E6nOADVYPbVgghu6hdCTmC6VpCzD6AnX4ga3EEsH1DIs6Oeu8xYraY0VpQyCrFBWyGXWMyupvcA1d5AJMwda_6gvSbR4NKm0uapjAj2WPDPVuMO_SJXTG1HRcSZSQu2N2G8XI1E8Mr0V8ou1brHG0n5PD2WsFes',
    };

    setOrders((prev) => [newOrder, ...prev]);
    setActiveTrackingOrder(newOrder);
    setCart([]);
    setActiveView('tracking');
    setActiveTab('orders');
  };

  const handleReorder = (order: Order) => {
    setCart(
      order.items.map((i) => ({
        ...i,
        quantity: i.quantity,
      }))
    );
    setActiveView('cart');
    setActiveTab('home');
  };

  // Header Search view lists
  const handleSearchDishes = (dish: any, restaurant: Restaurant) => {
    setSelectedRestaurant(restaurant);
    setActiveView('restaurant');
    setActiveTab('home');
  };

  // Navbar link toggler handler
  const handleNavbarChange = (tab: 'home' | 'search' | 'orders' | 'profile') => {
    setActiveTab(tab);
    if (tab === 'home') {
      setActiveView('home');
      setSelectedRestaurant(null);
    } else if (tab === 'orders') {
      setActiveView('orders');
    } else if (tab === 'profile') {
      setActiveView('profile');
    } else if (tab === 'search') {
      setActiveView('home'); // search query input from HomeView serves Search View nicely!
    }
  };

  // Overall Cart Quantities
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="font-sans antialiased bg-surface min-h-screen">
      
      {/* Search Bar tab helper view */}
      {activeTab === 'search' && (
        <div className="min-h-screen bg-surface pb-32">
          <header className="px-5 h-16 sticky top-0 z-40 bg-surface/90 glass-blur border-b border-outline-variant/10 shadow-sm flex items-center">
            <h1 className="font-display text-[20px] font-bold text-primary tracking-tight">Dish Discovery</h1>
          </header>
          
          <div className="p-5 max-w-[800px] mx-auto space-y-6">
            <div className="relative">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">search</span>
              <input
                type="text"
                placeholder="Search for Miso, Salmon, Burger, Matcha..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-14 pl-12 pr-4 rounded-xl border border-outline-variant/60 bg-surface-container-lowest focus:ring-2 focus:ring-primary-container outline-none font-sans text-on-surface"
              />
            </div>
            
            <div className="space-y-4">
              <h3 className="font-display font-bold text-on-surface text-[15px]">Dishes Matching Search</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {restaurants
                  .flatMap((r) => r.menu.map((m) => ({ ...m, restaurant: r })))
                  .filter(
                    (dm) =>
                      dm.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      dm.description.toLowerCase().includes(searchQuery.toLowerCase())
                  )
                  .map((dm) => (
                    <div
                      key={dm.id}
                      onClick={() => handleSearchDishes(dm, dm.restaurant)}
                      className="p-4 bg-surface-container-lowest rounded-2xl border border-outline-variant/30 hover:border-primary cursor-pointer flex gap-4 items-center group transition-all"
                    >
                      <img
                        alt={dm.name}
                        src={dm.image}
                        className="w-16 h-16 object-cover rounded-xl group-hover:scale-105 transition-transform duration-300 flex-shrink-0"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <h4 className="font-display font-bold text-[14px] text-on-surface group-hover:text-primary leading-tight">
                          {dm.name}
                        </h4>
                        <p className="font-sans text-[11px] text-on-surface-variant font-medium mt-0.5">{dm.restaurant.name}</p>
                        <span className="font-display font-semibold text-primary text-[13px] block mt-1">${dm.price.toFixed(2)}</span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Primary Views Router container */}
      {activeTab !== 'search' && (
        <>
          {activeView === 'home' && (
            <HomeView
              user={user}
              restaurants={restaurants}
              favorites={favorites}
              toggleFavorite={toggleFavorite}
              onSelectRestaurant={(restaurant) => {
                setSelectedRestaurant(restaurant);
                setActiveView('restaurant');
              }}
              cartCount={cartCount}
              cartTotal={cartTotal}
              onViewCart={() => setActiveView('cart')}
            />
          )}

          {activeView === 'restaurant' && selectedRestaurant && (
            <DetailView
              restaurant={selectedRestaurant}
              cart={cart}
              addToCart={addToCart}
              removeFromCart={removeFromCart}
              favorites={favorites}
              toggleFavorite={toggleFavorite}
              onBack={() => setActiveView('home')}
              onViewCart={() => setActiveView('cart')}
            />
          )}

          {activeView === 'cart' && (
            <CartView
              user={user}
              cart={cart}
              addToCart={addToCart}
              removeFromCart={removeFromCart}
              couponApplied={couponApplied}
              setCouponApplied={setCouponApplied}
              onBack={() => {
                if (selectedRestaurant) {
                  setActiveView('restaurant');
                } else {
                  setActiveView('home');
                }
              }}
              onPlaceOrder={handlePlaceOrder}
            />
          )}

          {activeView === 'tracking' && activeTrackingOrder && (
            <TrackingView
              user={user}
              order={activeTrackingOrder}
              onBackToHome={() => {
                setActiveView('home');
                setActiveTab('home');
              }}
            />
          )}

          {activeView === 'orders' && (
            <OrdersView
              orders={orders}
              onTrackOrder={(order) => {
                setActiveTrackingOrder(order);
                setActiveView('tracking');
              }}
              onReorder={handleReorder}
              onBackToHome={() => {
                setActiveView('home');
                setActiveTab('home');
              }}
            />
          )}

          {activeView === 'profile' && (
            <ProfileView
              user={user}
              onUpdateUser={setUser}
              onBackToHome={() => {
                setActiveView('home');
                setActiveTab('home');
              }}
            />
          )}
        </>
      )}

      {/* Cart Conflict Dialog Prompt modal */}
      {cartConflictRestaurant && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-5">
          <div className="bg-surface p-6 rounded-3xl max-w-sm w-full shadow-2xl border border-outline-variant/30 space-y-4 text-center">
            <span className="material-symbols-outlined text-[48px] text-primary">warning</span>
            <h3 className="font-display font-extrabold text-[18px] text-on-surface leading-tight">Clear your current cart?</h3>
            <p className="font-sans text-[13px] text-on-surface-variant leading-relaxed">
              You already have grocery or menu items from a different restaurant of interest. Would you like to clear your current selection to add items from{' '}
              <span className="font-bold text-primary">
                {restaurants.find((r) => r.id === cartConflictRestaurant.id)?.name}
              </span>
              ?
            </p>
            
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => handleResolveConflict(false)}
                className="flex-1 py-2.5 bg-surface-container-high text-on-surface font-sans text-[12px] font-bold rounded-xl cursor-pointer active:scale-95 transition-transform"
              >
                Cancel Addition
              </button>
              <button
                onClick={() => handleResolveConflict(true)}
                className="flex-1 py-2.5 bg-primary text-on-primary font-sans text-[12px] font-bold rounded-xl cursor-pointer active:scale-95 transition-transform"
              >
                Clear & Add Item
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Bottom Navigation panel */}
      <Navbar activeTab={activeTab} setActiveTab={handleNavbarChange} />
    </div>
  );
}
