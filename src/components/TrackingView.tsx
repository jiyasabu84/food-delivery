import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Order, UserProfile } from '../types';

interface TrackingViewProps {
  user: UserProfile;
  order: Order;
  onBackToHome: () => void;
}

export default function TrackingView({ user, order, onBackToHome }: TrackingViewProps) {
  const [currentStep, setCurrentStep] = useState<number>(2); // 0: Confirmed, 1: Preparing, 2: On the Way, 3: Delivered
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { sender: 'driver', text: 'Hi, I have picked up your order and am bicycling your way!', time: 'Just now' },
  ]);
  const [typedMessage, setTypedMessage] = useState('');
  const [progressPercent, setProgressPercent] = useState(70);

  // Auto-simulate some progression of order status for absolute high-fidelity experience!
  useEffect(() => {
    const progressTimer = setInterval(() => {
      setProgressPercent((prev) => {
        if (prev < 95) return prev + 1;
        return prev;
      });
    }, 4000);

    // Auto driver response when chat messages are added
    return () => clearInterval(progressTimer);
  }, []);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!typedMessage.trim()) return;

    const userMsg = { sender: 'user', text: typedMessage, time: 'Just now' };
    setChatMessages((prev) => [...prev, userMsg]);
    setTypedMessage('');

    // Simulate David's auto response
    setTimeout(() => {
      const responses = [
        "Sounds good! I'll be there in roughly 10 minutes.",
        "Yes, I will drop it off at your front door as requested.",
        "Traffic is light today, cycling as fast as I can safely!",
        "Got it! Thanks for letting me know."
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      setChatMessages((prev) => [
        ...prev,
        { sender: 'driver', text: randomResponse, time: 'Just now' }
      ]);
    }, 1500);
  };

  const steps = [
    { label: 'Confirmed', desc: 'Order received' },
    { label: 'Preparing', desc: 'Crafting culinary items' },
    { label: 'On the Way', desc: 'Out for delivery' },
    { label: 'Delivered', desc: 'Delicious food arrived' }
  ];

  return (
    <div className="relative h-[calc(100vh-80px)] w-full overflow-hidden bg-surface">
      
      {/* Top Header Anchors */}
      <nav className="flex justify-between items-center px-5 h-16 w-full sticky top-0 z-40 bg-surface/90 glass-blur border-b border-outline-variant/10 shadow-sm">
        <div className="flex items-center gap-2">
          <button
            onClick={onBackToHome}
            className="material-symbols-outlined text-primary p-2 hover:bg-surface-container-low transition-colors active:scale-95 duration-150 rounded-full cursor-pointer"
          >
            arrow_back
          </button>
          <span className="font-display font-semibold text-primary text-[15px] hidden sm:inline">Culinary Harmony</span>
        </div>
        
        <div className="flex items-center gap-1 bg-primary/10 px-3.5 py-1.5 rounded-full text-primary">
          <span className="material-symbols-outlined text-[18px] material-filled">receipt_long</span>
          <span className="font-sans text-[12px] font-bold">Order #{order.id}</span>
        </div>
      </nav>

      {/* Map Background */}
      <div className="absolute inset-0 z-0">
        <img
          className="w-full h-full object-cover grayscale opacity-80"
          alt="Delivery track map background"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAB5h-rnF6ZP4ihhpK8GxDXZ_hCYJrZGOpG7PqB-9RNZidYYXwUVmeon3bXrGug1n81LX2IVoT9CUq0RwpzKD7ayAuoCMJ2-LLVxK9B27Y7bJLAZuf7hOx932YsxrQMh9ztwBrcyfOz7RdMbbY-WxpYXC60wRGoiFQ3x-eG53CybbkLYY3eQBcdRmsqR0eTXWHduzsknsy3iJllRAbylt3QyqyKnFsbzk9gHxiShSXZuKuI7BdlayfHFTQ1sPIFeJNvcflNKS11Vs8"
          referrerPolicy="no-referrer"
        />
        
        {/* Animated Delivery Route Overlay */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <svg className="absolute w-full h-full stroke-primary/50 fill-none" viewBox="0 0 400 800">
            <path
              className="animate-dash"
              d="M200,600 Q220,500 150,450 T180,300"
              strokeDasharray="8 4"
              strokeWidth="4"
            />
            {/* Courier driver dot indicator */}
            <circle cx="180" cy="300" fill="#83533c" r="8" />
            <circle cx="180" cy="300" fill="none" r="16" stroke="#83533c" strokeWidth="2" strokeOpacity="0.4">
              <animate attributeName="r" from="8" to="24" dur="1.5s" repeatCount="indefinite" />
              <animate attributeName="opacity" from="1" to="0" dur="1.5s" repeatCount="indefinite" />
            </circle>
          </svg>
        </div>
      </div>

      {/* Floating Tracker Overlay Card */}
      <div className="absolute bottom-4 left-0 w-full z-20 px-5 pb-5">
        <div className="max-w-xl mx-auto bg-surface-container-lowest/95 glass-panel border border-outline-variant/40 rounded-3xl shadow-2xl p-5 md:p-6">
          
          {/* Status block info */}
          <div className="flex justify-between items-start mb-6">
            <div>
              <span className="text-primary font-sans text-[11px] uppercase tracking-widest font-black block mb-1">
                Estimated Arrival
              </span>
              <h2 className="font-display text-[22px] md:text-[28px] font-extrabold text-on-surface leading-tight">
                Arriving in {currentStep === 3 ? 'Arrived' : '12 mins'}
              </h2>
            </div>
            
            <div className="bg-primary-container/30 text-on-primary-container px-3 py-1.5 rounded-full flex items-center gap-1.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              <span className="font-sans text-[11px] font-bold">LIVE</span>
            </div>
          </div>

          {/* Stepper Progress Indicator */}
          <div className="relative mb-8 px-2">
            {/* Background Line */}
            <div className="absolute h-0.5 bg-outline-variant/30 left-6 right-6 top-2 z-0" />
            
            {/* Active Highlight Line */}
            <div
              className="absolute h-0.5 bg-primary left-6 top-2 z-0 transition-all duration-500"
              style={{ width: `${(currentStep / (steps.length - 1)) * 90}%` }}
            />

            <div className="flex justify-between items-start relative z-10">
              {steps.map((step, idx) => {
                const isCompleted = idx < currentStep;
                const isActive = idx === currentStep;
                return (
                  <div key={step.label} className="flex flex-col items-center flex-1 cursor-pointer" onClick={() => setCurrentStep(idx)}>
                    <div
                      className={`w-4 h-4 rounded-full transition-all duration-300 flex items-center justify-center ${
                        isCompleted
                          ? 'bg-primary shadow-sm'
                          : isActive
                          ? 'bg-primary border-4 border-white ring-2 ring-primary scale-125'
                          : 'bg-outline-variant/60'
                      }`}
                    />
                    <span
                      className={`font-sans text-[11px] mt-2 text-center leading-tight font-semibold ${
                        isCompleted || isActive ? 'text-on-surface' : 'text-outline'
                      }`}
                    >
                      {step.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Courier Details Block */}
          <div className="flex items-center justify-between border-t border-outline-variant/20 pt-5">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  alt="David courier details"
                  className="w-12 h-12 rounded-full object-cover border-2 border-surface"
                  src={order.courierImage || 'https://lh3.googleusercontent.com/aida-public/AB6AXuC8CqZvwH_Oe9QAgKRsDDERGTi8EZA14aBvs1xYiIYv1p3OtKZc8fEmIKeAeGJ4JgUwX4p_TKbohsj2woH5L3uJ1w9jE0KflRCwykPFNTuwIl08E6nOADVYPbVgghu6hdCTmC6VpCzD6AnX4ga3EEsH1DIs6Oeu8xYraY0VpQyCrFBWyGXWMyupvcA1d5AJMwda_6gvSbR4NKm0uapjAj2WPDPVuMO_SJXTG1HRcSZSQu2N2G8XI1E8Mr0V8ou1brHG0n5PD2WsFes'}
                  referrerPolicy="no-referrer"
                />
                <div className="absolute -bottom-1 -right-1 bg-primary text-on-primary rounded-full p-0.5 border-2 border-surface flex items-center justify-center">
                  <span className="material-symbols-outlined text-[10px] material-filled">star</span>
                </div>
              </div>
              
              <div>
                <h3 className="font-display font-bold text-on-surface text-[15px]">{order.courierName || 'David'}</h3>
                <div className="flex items-center gap-1 text-on-surface-variant font-sans text-[11px]">
                  <span>4.9 Rating</span>
                  <span className="opacity-40">•</span>
                  <span>Bicycle</span>
                </div>
              </div>
            </div>

            {/* Communication Controls */}
            <div className="flex gap-2">
              <button
                onClick={() => setChatOpen(true)}
                className="w-11 h-11 flex items-center justify-center rounded-full bg-surface-container-high text-primary hover:bg-primary-container hover:text-on-primary-container active:scale-90 transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px] material-filled">chat_bubble</span>
              </button>
              
              <a
                href="tel:+15550293"
                onClick={(e) => {
                  e.preventDefault();
                  alert('Simulated phone call to David initiated: Dialing +1 (555) 723-0193...');
                }}
                className="w-11 h-11 flex items-center justify-center rounded-full bg-primary text-on-primary hover:bg-on-primary-fixed-variant active:scale-90 transition-all shadow-md shadow-primary/10 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px] material-filled">call</span>
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* Detail Pill (Top Right on desktop view) */}
      <div className="absolute top-4 right-4 z-10 hidden md:block">
        <div className="bg-surface/90 glass-panel px-5 py-3.5 rounded-2xl border border-outline-variant/30 shadow-lg">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary-container/20 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined">restaurant</span>
            </div>
            <div>
              <p className="font-sans text-[11px] text-outline uppercase tracking-wider font-bold">Restaurant</p>
              <p className="font-display font-bold text-on-surface text-[13px]">{order.restaurantName}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Side-drawer Chat Simulator Overlay Modal */}
      <AnimatePresence>
        {chatOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/40 z-50 flex justify-end"
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="w-full max-w-md h-full bg-surface flex flex-col shadow-2xl relative z-50"
            >
              {/* Chat Title bar */}
              <div className="flex justify-between items-center px-4 h-16 border-b border-outline-variant/20 bg-surface">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setChatOpen(false)}
                    className="material-symbols-outlined text-on-surface hover:bg-surface-container p-2 rounded-full cursor-pointer"
                  >
                    arrow_back
                  </button>
                  <img
                    alt="driver profile"
                    src={order.courierImage || 'https://lh3.googleusercontent.com/aida-public/AB6AXuC8CqZvwH_Oe9QAgKRsDDERGTi8EZA14aBvs1xYiIYv1p3OtKZc8fEmIKeAeGJ4JgUwX4p_TKbohsj2woH5L3uJ1w9jE0KflRCwykPFNTuwIl08E6nOADVYPbVgghu6hdCTmC6VpCzD6AnX4ga3EEsH1DIs6Oeu8xYraY0VpQyCrFBWyGXWMyupvcA1d5AJMwda_6gvSbR4NKm0uapjAj2WPDPVuMO_SJXTG1HRcSZSQu2N2G8XI1E8Mr0V8ou1brHG0n5PD2WsFes'}
                    className="w-9 h-9 rounded-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h4 className="font-display font-bold text-[14px] text-on-surface">{order.courierName || 'David'}</h4>
                    <span className="font-sans text-[10px] text-primary font-bold">Delivery Courier</span>
                  </div>
                </div>
                
                <button
                  onClick={() => setChatOpen(false)}
                  className="material-symbols-outlined text-outline hover:text-on-surface cursor-pointer"
                >
                  close
                </button>
              </div>

              {/* Chat Messages flow content */}
              <div className="flex-1 p-4 overflow-y-auto space-y-4">
                {chatMessages.map((msg, index) => {
                  const isDriver = msg.sender === 'driver';
                  return (
                    <div
                      key={index}
                      className={`flex ${isDriver ? 'justify-start' : 'justify-end'}`}
                    >
                      <div
                        className={`max-w-[75%] px-4 py-2.5 rounded-2xl font-sans text-[13px] ${
                          isDriver
                            ? 'bg-surface-container text-on-surface rounded-tl-sm'
                            : 'bg-primary text-on-primary rounded-tr-sm'
                        }`}
                      >
                        <p>{msg.text}</p>
                        <span className={`text-[9px] block text-right mt-1 opacity-70 ${isDriver ? 'text-on-surface-variant' : 'text-on-primary'}`}>
                          {msg.time}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Chat Send panel input form */}
              <form onSubmit={handleSendMessage} className="p-4 border-t border-outline-variant/10 bg-surface flex gap-2">
                <input
                  type="text"
                  placeholder="Type message to David..."
                  value={typedMessage}
                  onChange={(e) => setTypedMessage(e.target.value)}
                  className="flex-grow rounded-xl border border-outline-variant px-3 py-2 text-[13px] outline-none font-sans bg-surface-container-lowest"
                />
                
                <button
                  type="submit"
                  className="w-10 h-10 bg-primary text-on-primary rounded-xl flex items-center justify-center hover:bg-on-primary-fixed-variant active:scale-95 transition-transform cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">send</span>
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
