
import React from 'react';
import { useCart } from '../App';
import { useNavigate } from 'react-router-dom';

const CheckoutPage: React.FC = () => {
  const { cart, totalPrice } = useCart();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center">
        <h2 className="text-2xl serif italic mb-4">Your bag is empty</h2>
        <button 
          onClick={() => navigate('/shop')}
          className="bg-stone-900 text-white px-8 py-3 rounded text-xs font-bold uppercase tracking-widest"
        >
          Return to Shop
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 lg:py-24">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        <div className="lg:col-span-7 space-y-12">
          <section className="space-y-6">
            <h2 className="text-2xl serif italic">Shipping Information</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase text-stone-400">First Name</label>
                <input type="text" className="w-full border-b border-stone-200 py-2 focus:border-stone-900 outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase text-stone-400">Last Name</label>
                <input type="text" className="w-full border-b border-stone-200 py-2 focus:border-stone-900 outline-none" />
              </div>
              <div className="col-span-2 space-y-1">
                <label className="text-[10px] font-bold uppercase text-stone-400">Address</label>
                <input type="text" className="w-full border-b border-stone-200 py-2 focus:border-stone-900 outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase text-stone-400">City</label>
                <input type="text" className="w-full border-b border-stone-200 py-2 focus:border-stone-900 outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase text-stone-400">Postal Code</label>
                <input type="text" className="w-full border-b border-stone-200 py-2 focus:border-stone-900 outline-none" />
              </div>
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-2xl serif italic">Payment</h2>
            <div className="border p-6 rounded space-y-4">
              <div className="flex items-center space-x-2">
                <input type="radio" checked readOnly className="accent-stone-900" />
                <span className="text-sm font-medium">Credit Card</span>
              </div>
              <div className="space-y-4 pt-2">
                <input type="text" placeholder="Card Number" className="w-full border-b border-stone-200 py-2 outline-none focus:border-stone-900" />
                <div className="grid grid-cols-2 gap-4">
                  <input type="text" placeholder="MM/YY" className="w-full border-b border-stone-200 py-2 outline-none focus:border-stone-900" />
                  <input type="text" placeholder="CVV" className="w-full border-b border-stone-200 py-2 outline-none focus:border-stone-900" />
                </div>
              </div>
            </div>
          </section>

          <button className="w-full py-4 bg-stone-900 text-white font-bold uppercase tracking-[0.2em] text-xs hover:bg-stone-800 transition-all">
            Complete Purchase
          </button>
        </div>

        <div className="lg:col-span-5">
          <div className="bg-stone-50 p-8 sticky top-32">
            <h3 className="text-xl serif italic mb-8">Order Summary</h3>
            <div className="space-y-6 max-h-[400px] overflow-y-auto no-scrollbar mb-8 pr-2">
              {cart.map((item) => (
                <div key={item.id} className="flex space-x-4">
                  <div className="w-16 h-20 bg-white overflow-hidden flex-shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-grow flex justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">{item.name}</p>
                      <p className="text-[10px] text-stone-400 uppercase tracking-widest">{item.quantity} x Rs. {item.price.toLocaleString()}</p>
                    </div>
                    <span className="text-sm font-bold">Rs. {(item.price * item.quantity).toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-stone-200 pt-6 space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-stone-500">Subtotal</span>
                <span>Rs. {totalPrice.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-stone-500">Shipping</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between text-lg font-bold serif pt-4 border-t border-stone-200">
                <span>Total</span>
                <span>Rs. {totalPrice.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
