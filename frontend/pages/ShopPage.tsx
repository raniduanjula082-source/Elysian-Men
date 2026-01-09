
import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Category, Product } from '../types';
import ProductFilters, { SortOption } from '../components/ProductFilters';
import { useCart } from '../App';
import { productService } from '../services/productService';

const ShopPage: React.FC = () => {
  const { toggleWishlist, isInWishlist } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>('All');
  const [sortBy, setSortBy] = useState<SortOption>('Default');
  const [activeFilters, setActiveFilters] = useState({
    availability: 'All',
    price: 'All',
    size: 'All',
    fit: 'All'
  });
  
  const categories: (Category | 'All')[] = ['All', 'Shirts', 'Polos', 'Denims', 'Chinos', 'Bags', 'Shoes', 'Accessories'];

  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true);
      
      // Parse price range for backend
      let minPrice, maxPrice;
      if (activeFilters.price === 'Under Rs. 10,000') maxPrice = 10000;
      else if (activeFilters.price === 'Rs. 10,000 - Rs. 30,000') { minPrice = 10000; maxPrice = 30000; }
      else if (activeFilters.price === 'Over Rs. 30,000') minPrice = 30000;

      const data = await productService.fetchProducts({
        category: selectedCategory,
        availability: activeFilters.availability,
        minPrice,
        maxPrice,
        sortBy
      });
      
      setProducts(data);
      setIsLoading(false);
    };

    loadProducts();
  }, [selectedCategory, activeFilters, sortBy]);

  const handleWishlistClick = (e: React.MouseEvent, product: Product) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <header className="mb-12 space-y-6 text-center">
        <h1 className="text-3xl serif italic">The Collection</h1>
        <div className="flex flex-wrap justify-center gap-3 overflow-x-auto no-scrollbar pb-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 rounded-sm text-[9px] font-bold uppercase tracking-widest border transition-all ${
                selectedCategory === cat 
                ? 'bg-stone-900 text-white border-stone-900' 
                : 'bg-transparent text-stone-400 border-stone-200 hover:border-stone-400'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </header>

      <ProductFilters 
        category={selectedCategory} 
        onFilterChange={(f) => setActiveFilters(f)} 
        sortBy={sortBy}
        onSortChange={setSortBy}
      />

      {isLoading ? (
        <div className="py-24 text-center">
          <div className="inline-block w-8 h-8 border-2 border-stone-200 border-t-stone-900 rounded-full animate-spin" />
          <p className="mt-4 text-[10px] uppercase tracking-widest text-stone-400">Loading Archive...</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-4 gap-y-10">
          {products.map((product) => (
            <div key={product.id} className="group relative">
              <Link to={`/product/${product.id}`} className="block">
                <div className={`aspect-square overflow-hidden mb-3 relative rounded-sm ${!product.inStock ? 'opacity-60' : 'bg-stone-100'}`}>
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  
                  {product.onSale && (
                    <div className="absolute top-2 left-2 bg-red-600 text-white text-[7px] font-bold uppercase tracking-widest px-1.5 py-0.5">
                      Sale
                    </div>
                  )}
                  {!product.inStock && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/5">
                      <span className="text-[8px] font-bold uppercase tracking-widest text-stone-600 bg-white/90 px-2 py-1">Out of Stock</span>
                    </div>
                  )}
                </div>
              </Link>

              <button 
                onClick={(e) => handleWishlistClick(e, product)}
                className="absolute top-2 right-2 p-1.5 bg-white/60 hover:bg-white rounded-full z-10 transition-colors shadow-sm"
                aria-label="Toggle Wishlist"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className={`h-3.5 w-3.5 ${isInWishlist(product.id) ? 'text-stone-900 fill-current' : 'text-stone-400 fill-none'}`} viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>

              <div className="space-y-0.5 px-1">
                <p className="text-stone-400 text-[7px] uppercase tracking-widest font-bold">{product.category}</p>
                <h3 className="text-[10px] font-medium text-stone-900 truncate group-hover:text-stone-600 transition-colors uppercase tracking-tight">{product.name}</h3>
                <div className="flex items-center space-x-2">
                  <p className="text-[10px] font-bold">Rs. {product.price.toLocaleString()}</p>
                  {product.onSale && (
                    <p className="text-[8px] text-stone-400 line-through">Rs. {product.originalPrice?.toLocaleString()}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {!isLoading && products.length === 0 && (
        <div className="py-24 text-center">
          <p className="text-stone-500 italic text-sm">No products found with these refinements.</p>
          <button 
            onClick={() => {
              setActiveFilters({ availability: 'All', price: 'All', size: 'All', fit: 'All' });
              setSortBy('Default');
            }}
            className="mt-4 text-[10px] font-bold uppercase tracking-widest border-b border-stone-900 pb-0.5"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default ShopPage;
