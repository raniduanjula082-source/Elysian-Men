
import React from 'react';
import { useCart } from '../App';
import { useNavigate } from 'react-router-dom';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const CartDrawer: React.FC<Props> = ({ isOpen, onClose }) => {
  const { cart, removeFromCart, updateQuantity, totalPrice } = useCart();
  const navigate = useNavigate();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px]" onClick={onClose} />
      <div className="relative w-full max-w-sm bg-white h-full shadow-2xl flex flex-col transform transition-transform duration-300">
        <div className="p-5 border-b flex items-center justify-between">
          <h2 className="text-lg font-bold serif italic">Your Bag</h2>
          <button onClick={onClose} className="p-1.5 hover:bg-stone-100 rounded-full transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-grow overflow-y-auto p-5 space-y-5 no-scrollbar">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-stone-400 space-y-4">
              <p className="text-sm italic">Empty Bag</p>
              <button 
                onClick={() => { onClose(); navigate('/shop'); }}
                className="text-[10px] font-bold uppercase tracking-widest text-stone-900 border-b border-stone-900 pb-1"
              >
                Explore
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="flex space-x-3">
                <div className="w-16 h-20 flex-shrink-0 bg-stone-100 rounded-sm overflow-hidden">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-grow min-w-0">
                  <div className="flex justify-between items-start">
                    <h3 className="font-medium text-[11px] text-stone-900 truncate uppercase tracking-tight pr-2">{item.name}</h3>
                    <button onClick={() => removeFromCart(item.id)} className="text-stone-300 hover:text-red-500 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                  <p className="text-stone-400 text-[9px] uppercase tracking-widest mt-0.5">{item.category}</p>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center border rounded-sm px-1.5 py-0.5 space-x-2">
                      <button onClick={() => updateQuantity(item.id, -1)} className="text-stone-400 hover:text-stone-900 text-[10px]">-</button>
                      <span className="text-[10px] font-bold w-3 text-center">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, 1)} className="text-stone-400 hover:text-stone-900 text-[10px]">+</button>
                    </div>
                    <span className="text-[11px] font-bold">Rs. {(item.price * item.quantity).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="p-5 border-t bg-stone-50">
            <div className="flex justify-between items-center mb-4">
              <span className="text-stone-400 uppercase text-[9px] tracking-[0.2em] font-bold">Total</span>
              <span className="text-lg font-bold serif">Rs. {totalPrice.toLocaleString()}</span>
            </div>
            <button 
              onClick={() => { onClose(); navigate('/checkout'); }}
              className="w-full py-3 bg-stone-900 text-white rounded-sm font-bold hover:bg-stone-800 transition-colors uppercase tracking-widest text-[10px]"
            >
              Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;
