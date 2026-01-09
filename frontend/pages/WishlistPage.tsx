
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../App';

const WishlistPage: React.FC = () => {
  const { wishlist, toggleWishlist, addToCart } = useCart();

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 min-h-[70vh]">
      <header className="mb-12 space-y-4">
        <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-stone-400">Personal Archive</span>
        <h1 className="text-3xl serif italic">Your Wishlist</h1>
        <p className="text-stone-500 text-xs italic">
          {wishlist.length} item{wishlist.length !== 1 ? 's' : ''} saved for later.
        </p>
      </header>

      {wishlist.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-6 gap-y-12">
          {wishlist.map((product) => (
            <div key={product.id} className="group relative">
              <Link to={`/product/${product.id}`} className="block">
                <div className="aspect-square overflow-hidden bg-stone-100 mb-4 relative rounded-sm shadow-sm">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                  />
                </div>
              </Link>
              
              <button 
                onClick={() => toggleWishlist(product)}
                className="absolute top-2 right-2 bg-white/80 hover:bg-white p-1.5 rounded-full shadow-sm z-10 transition-colors"
                title="Remove from wishlist"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-stone-900" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
              </button>

              <div className="space-y-1 px-1">
                <p className="text-stone-400 text-[7px] uppercase tracking-widest font-bold">{product.category}</p>
                <h3 className="text-[10px] font-medium text-stone-900 truncate uppercase tracking-tight group-hover:text-stone-600 transition-colors">{product.name}</h3>
                <p className="text-[10px] font-bold pt-1">Rs. {product.price.toLocaleString()}</p>
                
                <button 
                  onClick={() => addToCart(product)}
                  className="w-full mt-3 py-2 border border-stone-900 text-[9px] font-bold uppercase tracking-widest hover:bg-stone-900 hover:text-white transition-all"
                >
                  Move to Bag
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-24 text-center space-y-6">
          <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mx-auto">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-stone-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          <div className="space-y-2">
            <p className="text-stone-500 italic text-sm">Your personal archive is empty.</p>
            <p className="text-[10px] text-stone-400 uppercase tracking-widest">Save your favorite pieces here to view them later.</p>
          </div>
          <Link 
            to="/shop" 
            className="inline-block mt-4 text-[10px] font-bold uppercase tracking-widest border-b border-stone-900 pb-1"
          >
            Explore Collection
          </Link>
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
