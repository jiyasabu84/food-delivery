import React, { useState } from 'react';
import { motion } from 'motion/react';
import { CartItem, UserProfile } from '../types';

interface CartViewProps {
  user: UserProfile;
  cart: CartItem[];
  addToCart: (item: any, restaurantId: string) => void;
  removeFromCart: (itemId: string) => void;
  couponApplied: boolean;
  setCouponApplied: (applied: boolean) => void;
  onPlaceOrder: (subtotal: number, deliveryFee: number, serviceFee: number, discount: number, total: number) => void;
  onBack: () => void;
}

export default function CartView({
  user,
  cart,
  addToCart,
  removeFromCart,
  couponApplied,
  setCouponApplied,
  onPlaceOrder,
  onBack,
}: CartViewProps) {
  const [address, setAddress] = useState(user.address);
  const [addressLabel, setAddressLabel] = useState('Home');
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState('');

  // Calculate fees
  const subtotal = cart.reduce((acc, curr) => acc + curr.price * curr.quantity, 0);
  const deliveryFee = subtotal > 15 || subtotal === 0 ? 0.00 : 2.50;
  const serviceFee = subtotal > 0 ? 1.50 : 0.00;
  const discount = couponApplied && subtotal > 0 ? 5.00 : 0.00;
  const grandTotal = Math.max(0, subtotal + deliveryFee + serviceFee - discount);

  const handleApplyPromo = () => {
    if (promoInput.toUpperCase() === 'FIRSTMEAL') {
      setCouponApplied(true);
      setPromoError('');
    } else {
      setPromoError('Invalid coupon code. Try FIRSTMEAL.');
    }
  };

  const handleSaveAddress = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditingAddress(false);
  };

  return (
    <div className="min-h-screen bg-background pb-32">
      {/* Header */}
      <header className="flex justify-between items-center px-5 h-16 w-full sticky top-0 z-50 bg-surface shadow-sm border-b border-outline-variant/10">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="hover:bg-surface-container-low transition-colors p-2 rounded-full active:scale-95 duration-200 cursor-pointer text-primary"
          >
            <span className="material-symbols-outlined text-[24px]">arrow_back</span>
          </button>
          <h1 className="font-display text-[20px] font-bold text-primary tracking-tight">Your Order</h1>
        </div>
        
        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary-container">
          <img
            alt="User profile"
            className="w-full h-full object-cover"
            src={user.avatar}
            referrerPolicy="no-referrer"
          />
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-[1200px] mx-auto px-5 pt-4 pb-20">
        {cart.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-outline-variant/30 diffusion-shadow">
            <span className="material-symbols-outlined text-[64px] text-outline opacity-40">shopping_cart</span>
            <p className="font-display text-[18px] font-bold text-on-surface mt-4">Your order is currently empty</p>
            <p className="font-sans text-[14px] text-on-surface-variant max-w-sm mx-auto mt-2 px-6">
              Add some gourmet items from the menu page to make your selection.
            </p>
            <button
              onClick={onBack}
              className="mt-6 px-6 py-2.5 bg-primary text-on-primary rounded-full font-sans text-[13px] font-semibold shadow-md active:scale-95 transition-transform"
            >
              Browse Menu
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Column: Items & Delivery details */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Order Items */}
              <section className="space-y-4">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="font-display text-[20px] font-semibold text-on-surface">Order Summary</h2>
                  <span className="font-sans text-[12px] font-bold text-primary bg-secondary-container px-3 py-1 rounded-full">
                    {cart.reduce((n, i) => n + i.quantity, 0)} Items
                  </span>
                </div>
                
                <div className="space-y-3">
                  {cart.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      className="flex items-center gap-4 p-4 bg-surface-container-lowest rounded-2xl border border-outline-variant/30 diffusion-shadow group hover:border-primary-container/50 transition-all"
                    >
                      {/* Item Image */}
                      <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                        <img
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          src={item.image}
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      
                      {/* Item Info */}
                      <div className="flex-grow">
                        <h3 className="font-display text-[15px] font-bold text-on-surface">{item.name}</h3>
                        <p className="font-sans text-[12px] text-on-surface-variant mb-1">
                          {item.specification || 'Standard preparation'}
                        </p>
                        
                        <div className="flex items-center justify-between mt-2">
                          <span className="font-display text-[15px] font-bold text-primary">${item.price.toFixed(2)}</span>
                          
                          {/* Counter */}
                          <div className="flex items-center gap-2 bg-surface-container-low rounded-full px-2 py-1 border border-outline-variant/30">
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="w-7 h-7 flex items-center justify-center rounded-full bg-white text-primary hover:bg-primary-container/20 transition-all active:scale-95 cursor-pointer"
                            >
                              <span className="material-symbols-outlined text-[16px] font-semibold">remove</span>
                            </button>
                            <span className="w-5 text-center font-sans font-bold text-[13px] text-on-surface">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => addToCart(item, item.restaurantId)}
                              className="w-7 h-7 flex items-center justify-center rounded-full bg-primary text-on-primary hover:opacity-90 transition-all active:scale-95 cursor-pointer"
                            >
                              <span className="material-symbols-outlined text-[16px] font-semibold">add</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </section>

              {/* Delivery Address Section */}
              <section className="space-y-4">
                <h2 className="font-display text-[20px] font-semibold text-on-surface">Delivery Address</h2>
                
                <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/30 diffusion-shadow overflow-hidden">
                  <div className="flex items-center gap-4 p-4">
                    <div className="w-12 h-12 bg-primary-container/30 flex items-center justify-center rounded-xl text-primary flex-shrink-0">
                      <span className="material-symbols-outlined text-[24px] material-filled">location_on</span>
                    </div>
                    
                    <div className="flex-grow">
                      {isEditingAddress ? (
                        <form onSubmit={handleSaveAddress} className="space-y-2 mt-1">
                          <div className="flex gap-2">
                            <button
                              type="button"
                              onClick={() => setAddressLabel('Home')}
                              className={`px-3 py-1 text-[11px] font-bold rounded-full ${
                                addressLabel === 'Home' ? 'bg-primary text-on-primary' : 'bg-surface-container-high text-on-surface'
                              }`}
                            >
                              Home
                            </button>
                            <button
                              type="button"
                              onClick={() => setAddressLabel('Work')}
                              className={`px-3 py-1 text-[11px] font-bold rounded-full ${
                                addressLabel === 'Work' ? 'bg-primary text-on-primary' : 'bg-surface-container-high text-on-surface'
                              }`}
                            >
                              Work
                            </button>
                          </div>
                          <input
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className="w-full text-[13px] outline-none border border-outline px-2.5 py-1.5 rounded-lg font-sans"
                            required
                          />
                          <button
                            type="submit"
                            className="px-4 py-1.5 bg-primary text-on-primary text-[12px] rounded-lg font-semibold cursor-pointer"
                          >
                            Save
                          </button>
                        </form>
                      ) : (
                        <>
                          <p className="font-display text-[14px] font-bold text-on-surface">{addressLabel}</p>
                          <p className="font-sans text-[13px] text-on-surface-variant">{address}</p>
                        </>
                      )}
                    </div>
                    
                    {!isEditingAddress && (
                      <button
                        onClick={() => setIsEditingAddress(true)}
                        className="font-sans text-[13px] text-primary font-bold hover:underline cursor-pointer flex-shrink-0"
                      >
                        Change
                      </button>
                    )}
                  </div>
                  
                  {/* Styled Map Image */}
                  <div className="h-32 w-full relative group overflow-hidden">
                    <img
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      alt="Address map preview"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuATpkSa3vZlM8-biV7o03ABhr7SeMvpoDjZOgBGnnJxN0T9Jffk5yI-bTuc9nYxEG4Cz9wdIDRre_tmdTt8LuqZMx1nNGSagJ9QzfyXVp77nawaRy7XMEXFDZiee41AdzgG1B0KCy-8tg2UOLbxXxgQZxg_cvyTewkDM1CEDEAp_3H_Gg8zy9v_8bzBK-HKRkZbF2Mc4jKJGEW4uLgM4wErhk3TUwNXjKPkCjweTAH6hN7rajlyhjVEV9txzk2no3EsoaOPNL5JGF8"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-primary/15 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="bg-surface text-primary px-4 py-2 rounded-full font-sans text-[12px] font-bold shadow-md">
                        View Full Map
                      </span>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            {/* Right Column: Checkout summary & payment summary */}
            <div className="lg:col-span-5">
              <div className="space-y-4">
                
                {/* Promo Code Input block */}
                <div className="bg-surface-container-lowest p-5 rounded-2xl border border-outline-variant/30 diffusion-shadow">
                  <h3 className="font-display text-[15px] font-semibold text-on-surface mb-3 flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[20px] text-primary">local_offer</span>
                    Promo Code
                  </h3>
                  
                  {couponApplied ? (
                    <div className="bg-secondary-container/30 p-3.5 rounded-xl border border-secondary-container flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-on-secondary-container text-[20px]">check_circle</span>
                        <div>
                          <p className="font-sans text-[13px] font-bold text-on-secondary-container">Applied: FIRSTMEAL</p>
                          <p className="font-sans text-[11px] text-on-secondary-container/80">Save $5.00 on your first 3 orders</p>
                        </div>
                      </div>
                      <button
                        onClick={() => setCouponApplied(false)}
                        className="text-[12px] text-primary font-bold hover:underline cursor-pointer"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <div>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Enter FIRSTMEAL"
                          value={promoInput}
                          onChange={(e) => setPromoInput(e.target.value)}
                          className="flex-grow text-[13px] px-3 py-2 border border-outline-variant/80 rounded-xl outline-none font-sans uppercase"
                        />
                        <button
                          onClick={handleApplyPromo}
                          className="bg-primary hover:bg-on-primary-fixed-variant text-on-primary px-4 py-2 rounded-xl text-[12px] font-bold cursor-pointer whitespace-nowrap active:scale-95 transition-transform"
                        >
                          Apply
                        </button>
                      </div>
                      {promoError ? (
                        <p className="text-[11px] text-error mt-1.5 pl-1 font-semibold">{promoError}</p>
                      ) : (
                        <p className="text-[11px] text-on-surface-variant/70 mt-1.5 pl-1">
                          Use code <span className="font-bold">FIRSTMEAL</span> to save $5.00!
                        </p>
                      )}
                    </div>
                  )}
                </div>

                {/* Final Bill Settlement summary */}
                <section className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/30 diffusion-shadow">
                  <h2 className="font-display text-[18px] font-semibold text-on-surface mb-4">Payment Summary</h2>
                  
                  <div className="space-y-3 pb-5 border-b border-outline-variant/20">
                    <div className="flex justify-between items-center text-on-surface-variant text-[14px]">
                      <span>Subtotal</span>
                      <span className="font-sans font-medium text-on-surface">${subtotal.toFixed(2)}</span>
                    </div>
                    
                    <div className="flex justify-between items-center text-on-surface-variant text-[14px]">
                      <span>Delivery Fee</span>
                      <span className="font-sans font-medium text-on-surface">
                        {deliveryFee === 0 ? 'Free' : `$${deliveryFee.toFixed(2)}`}
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center text-on-surface-variant text-[14px]">
                      <span>Service Fee</span>
                      <span className="font-sans font-medium text-on-surface">${serviceFee.toFixed(2)}</span>
                    </div>
                    
                    {discount > 0 && (
                      <div className="flex justify-between items-center text-secondary text-[14px] font-bold">
                        <span>Discount Coupon</span>
                        <span>-$${discount.toFixed(2)}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="py-4 flex justify-between items-center font-display border-b border-outline-variant/15 mb-6">
                    <span className="font-bold text-on-surface">Total Amount</span>
                    <span className="text-[20px] font-extrabold text-primary">${grandTotal.toFixed(2)}</span>
                  </div>
                  
                  <div>
                    <button
                      onClick={() => onPlaceOrder(subtotal, deliveryFee, serviceFee, discount, grandTotal)}
                      className="w-full h-14 bg-primary text-on-primary hover:bg-on-primary-fixed-variant text-[15px] font-bold rounded-xl flex items-center justify-center gap-2 hover:opacity-90 active:scale-[0.98] transition-all shadow-lg shadow-primary/20 cursor-pointer"
                    >
                      Place Order
                      <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                    </button>
                    <p className="text-center font-sans text-[11px] text-outline mt-3">
                      By placing an order, you agree to our Terms of Service.
                    </p>
                  </div>
                </section>
                
              </div>
            </div>
            
          </div>
        )}
      </main>
    </div>
  );
}
