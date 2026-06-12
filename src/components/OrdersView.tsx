import React from 'react';
import { motion } from 'motion/react';
import { Order } from '../types';

interface OrdersViewProps {
  orders: Order[];
  onTrackOrder: (order: Order) => void;
  onReorder: (order: Order) => void;
  onBackToHome: () => void;
}

export default function OrdersView({ orders, onTrackOrder, onReorder, onBackToHome }: OrdersViewProps) {
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
        <h1 className="font-display text-[20px] font-bold text-primary tracking-tight">Order History</h1>
      </header>

      <main className="max-w-[700px] mx-auto px-5 pt-6">
        {orders.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-outline-variant/30 diffusion-shadow">
            <span className="material-symbols-outlined text-[60px] text-outline opacity-40">receipt_long</span>
            <p className="font-display text-[17px] font-bold text-on-surface mt-4">No orders placed yet</p>
            <p className="font-sans text-[13px] text-on-surface-variant max-w-sm mx-auto mt-2 px-4">
              Your previous delivery orders will appear here. Go to the Home dashboard to select food items.
            </p>
            <button
              onClick={onBackToHome}
              className="mt-6 px-5 py-2 bg-primary text-on-primary rounded-full font-sans text-[12px] font-semibold cursor-pointer shadow-md"
            >
              Start Exploring
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => {
              const itemsCount = order.items.reduce((acc, curr) => acc + curr.quantity, 0);
              const isActive = order.status !== 'delivered';
              
              return (
                <div
                  key={order.id}
                  className="bg-surface-container-lowest p-5 rounded-3xl border border-outline-variant/30 diffusion-shadow space-y-4"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-display font-black text-on-surface text-[16px]">{order.restaurantName}</h3>
                      <p className="font-sans text-[12px] text-on-surface-variant mt-0.5">{order.date}</p>
                    </div>

                    <div className="flex flex-col items-end gap-1.5">
                      <span className="font-display text-[15px] font-black text-primary">${order.total.toFixed(2)}</span>
                      <span
                        className={`font-sans text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                          order.status === 'delivered'
                            ? 'bg-surface-container-high text-on-surface'
                            : 'bg-primary-container text-on-primary-container'
                        }`}
                      >
                        {order.status === 'on_the_way'
                          ? 'On The Way'
                          : order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </div>
                  </div>

                  {/* Items quick list display */}
                  <div className="bg-surface-container-low/50 p-3 rounded-2xl space-y-1 text-[13px] font-sans text-on-surface-variant border border-outline-variant/20">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex justify-between">
                        <span>
                          {item.quantity}x {item.name}
                        </span>
                        <span>${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-2.5 pt-2">
                    {isActive ? (
                      <button
                        onClick={() => onTrackOrder(order)}
                        className="flex-grow py-2.5 bg-primary hover:bg-on-primary-fixed-variant text-on-primary text-[13px] font-bold rounded-xl shadow-md cursor-pointer transition-all active:scale-95 flex items-center justify-center gap-1"
                      >
                        <span className="material-symbols-outlined text-[18px]">location_on</span>
                        Track Order
                      </button>
                    ) : (
                      <button
                        onClick={() => onReorder(order)}
                        className="flex-grow py-2.5 bg-primary/10 hover:bg-primary/20 text-primary text-[13px] font-bold rounded-xl cursor-pointer transition-all active:scale-95 flex items-center justify-center gap-1"
                      >
                        <span className="material-symbols-outlined text-[18px]">replay</span>
                        Reorder Selection
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
