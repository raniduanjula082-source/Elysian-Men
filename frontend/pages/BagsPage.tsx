
import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { PRODUCTS } from '../constants';
import ProductFilters, { SortOption } from '../components/ProductFilters';

const BagsPage: React.FC = () => {
  const [sortBy, setSortBy] = useState<SortOption>('Default');
  const [activeFilters, setActiveFilters] = useState({
    availability: 'All',
    price: 'All',
    size: 'All',
    fit: 'All'
  });

  const filteredBags = useMemo(() => {
    let result = PRODUCTS.filter(p => p.category === 'Bags').filter(p => {
      if (activeFilters.availability === 'In Stock' && !p.inStock) return false;
      if (activeFilters.availability === 'Out of Stock' && p.inStock) return false;
      if (activeFilters.price === 'Under Rs. 10,000' && p.price >= 10000) return false;
      if (activeFilters.price === 'Rs. 10,000 - Rs. 30,000' && (p.price < 10000 || p.price > 30000)) return false;
      if (activeFilters.price === 'Over Rs. 30,000' && p.price <= 30000) return false;
      return true;
    });

    if (sortBy === 'Price: Low to High') result.sort((a, b) => a.price - b.price);
    else if (sortBy === 'Price: High to Low') result.sort((a, b) => b.price - a.price);
    else if (sortBy === 'Alphabetical') result.sort((a, b) => a.name.localeCompare(b.name));
    else if (sortBy === 'Newest Arrivals') result.sort((a, b) => b.id.localeCompare(a.id));

    return result;
  }, [activeFilters, sortBy]);

  return (
    <div className="pb-24">
      <section className="relative h-[45vh] min-h-[400px] flex items-center justify-center overflow-hidden mb-12">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://bag.lk/wp-content/uploads/2025/12/10-4.webp" 
            alt="Bags Collection" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-stone-900/10" />
        </div>
        <div className="relative z-10 text-center space-y-4 px-4 bg-white/20 backdrop-blur-md p-10 md:p-16 border border-white/30 shadow-2xl max-w-2xl mx-auto">
          <h1 className="text-4xl md:text-5xl text-stone-900 serif italic font-light">Elysian Bags</h1>
          <p className="max-w-md mx-auto text-[10px] text-stone-800 opacity-95 leading-relaxed font-light tracking-widest uppercase">
            Architectural silhouettes and artisanal leather.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4">
        <ProductFilters 
          category="Bags" 
          onFilterChange={setActiveFilters} 
          sortBy={sortBy} 
          onSortChange={setSortBy} 
        />

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-x-12 gap-y-16">
          {filteredBags.map((product) => (
            <Link key={product.id} to={`/product/${product.id}`} className="group">
              <div className="aspect-square overflow-hidden bg-stone-100 mb-6 relative rounded-sm shadow-sm">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
              </div>
              <div className="space-y-1 text-center">
                <h3 className="text-sm font-bold text-stone-900 uppercase tracking-tight group-hover:text-stone-600 transition-colors">{product.name}</h3>
                <p className="text-sm font-medium pt-1">Rs. {product.price.toLocaleString()}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BagsPage;
