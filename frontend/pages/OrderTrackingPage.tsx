
import React, { useState } from 'react';

const OrderTrackingPage: React.FC = () => {
  const [orderId, setOrderId] = useState('');
  const [status, setStatus] = useState<string | null>(null);

  const handleTrack = () => {
    if (!orderId) return;
    // Simulate tracking
    setStatus("Searching for order...");
    setTimeout(() => {
      setStatus("Your order #ELY-" + orderId.toUpperCase() + " is currently being processed at our Colombo warehouse.");
    }, 1500);
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-24 text-center">
      <div className="space-y-12">
        <div className="space-y-4">
          <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-stone-400">Logistics</span>
          <h1 className="text-4xl serif italic">Track Your Order</h1>
          <p className="text-stone-500 text-sm italic leading-relaxed">
            Enter your order number and email address to view the current status of your shipment.
          </p>
        </div>

        <div className="bg-white p-10 border border-stone-100 shadow-sm space-y-8 rounded-sm text-left">
          <div className="space-y-4">
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-widest text-stone-400">Order Number</label>
              <input 
                type="text" 
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                placeholder="e.g. 12345" 
                className="w-full bg-transparent border-b border-stone-200 py-2 focus:border-stone-900 outline-none transition-colors text-sm" 
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-widest text-stone-400">Billing Email</label>
              <input type="email" className="w-full bg-transparent border-b border-stone-200 py-2 focus:border-stone-900 outline-none transition-colors text-sm" />
            </div>
          </div>

          <button 
            onClick={handleTrack}
            className="w-full py-4 bg-stone-900 text-white font-bold uppercase tracking-[0.2em] text-[10px] hover:bg-stone-800 transition-all"
          >
            Track Shipment
          </button>

          {status && (
            <div className="p-4 bg-stone-50 border border-stone-200 text-xs text-stone-600 italic leading-relaxed animate-pulse">
              {status}
            </div>
          )}
        </div>

        <p className="text-[10px] text-stone-400 uppercase tracking-widest">
          The order number can be found in your confirmation email.
        </p>
      </div>
    </div>
  );
};

export default OrderTrackingPage;
