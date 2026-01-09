
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PRODUCTS } from '../constants';
import { useCart } from '../App';

const ProductPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const product = PRODUCTS.find(p => p.id === id);
  const [selectedColor, setSelectedColor] = useState(product?.colors[0]);
  const [selectedSize, setSelectedSize] = useState('M');
  const [isAdded, setIsAdded] = useState(false);

  if (!product) {
    return <div className="p-24 text-center text-sm">Product not found.</div>;
  }

  const handleAdd = () => {
    addToCart(product);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleWishlist = () => {
    toggleWishlist(product);
  };

  const sizes = product.sizes;
  const itemInWishlist = isInWishlist(product.id);

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 lg:py-20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
        <div className="lg:col-span-5 space-y-4">
          <div className="aspect-square bg-stone-100 overflow-hidden rounded-sm">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          </div>
          <div className="grid grid-cols-4 gap-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="aspect-square bg-stone-100 overflow-hidden opacity-60 hover:opacity-100 cursor-pointer transition-opacity rounded-sm">
                 <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-7 space-y-8 lg:pt-4">
          <div className="space-y-3">
            <p className="text-stone-400 text-[10px] uppercase tracking-[0.3em] font-bold">{product.category}</p>
            <h1 className="text-3xl serif italic leading-tight">{product.name}</h1>
            <p className="text-xl font-light text-stone-600">Rs. {product.price.toLocaleString()}</p>
          </div>

          <p className="text-stone-500 text-[13px] leading-relaxed max-w-sm italic">
            {product.description}
          </p>

          <div className="space-y-8">
            <div className="space-y-4 border-t border-stone-100 pt-6">
              <div className="flex justify-between items-center">
                <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-stone-900">Select Colour</label>
                <span className="text-[10px] text-stone-400 italic">{selectedColor}</span>
              </div>
              <div className="flex space-x-3">
                {product.colors.map(color => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-8 h-8 rounded-full border transition-all ${
                      selectedColor === color ? 'border-stone-900 p-0.5 scale-110' : 'border-stone-200'
                    }`}
                  >
                    <div className="w-full h-full rounded-full bg-stone-300 shadow-inner" style={{ backgroundColor: color.toLowerCase().replace(' ', '') }} />
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-stone-900">Select Size</label>
                <button className="text-[9px] uppercase tracking-widest font-bold text-stone-400 border-b border-stone-200 hover:text-stone-900 hover:border-stone-900 transition-all">Size Guide</button>
              </div>
              <div className="flex flex-wrap gap-2">
                {sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-10 h-10 border flex items-center justify-center text-[10px] font-bold transition-all ${
                      selectedSize === size ? 'border-stone-900 bg-stone-900 text-white' : 'border-stone-200 text-stone-400 hover:border-stone-400'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-8 space-y-3 max-w-xs">
            <button 
              onClick={handleAdd}
              disabled={isAdded}
              className={`w-full py-4 rounded-sm text-[10px] font-bold uppercase tracking-widest transition-all ${
                isAdded ? 'bg-green-600 text-white' : 'bg-stone-900 text-white hover:bg-stone-800'
              }`}
            >
              {isAdded ? 'Item Added' : 'Add to Bag'}
            </button>
            <button 
              onClick={handleWishlist}
              className={`w-full py-4 border rounded-sm text-[10px] font-bold uppercase tracking-widest transition-all flex items-center justify-center space-x-2 ${
                itemInWishlist 
                ? 'border-stone-900 bg-stone-50 text-stone-900' 
                : 'border-stone-200 text-stone-900 hover:border-stone-900'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 ${itemInWishlist ? 'fill-current' : 'fill-none'}`} viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <span>{itemInWishlist ? 'In Wishlist' : 'Add to Wishlist'}</span>
            </button>
          </div>

          <div className="pt-10 grid grid-cols-2 gap-6 border-t border-stone-100 max-w-sm">
            <div className="space-y-1">
              <p className="text-[9px] font-bold uppercase tracking-widest text-stone-900">Shipping</p>
              <p className="text-[10px] text-stone-500 italic">Free over Rs. 45,000.</p>
            </div>
            <div className="space-y-1">
              <p className="text-[9px] font-bold uppercase tracking-widest text-stone-900">Returns</p>
              <p className="text-[10px] text-stone-500 italic">30-day window.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
