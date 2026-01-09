
import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { PRODUCTS } from '../constants';
import ProductFilters, { SortOption } from '../components/ProductFilters';

const PolosPage: React.FC = () => {
  const [sortBy, setSortBy] = useState<SortOption>('Default');
  const [activeFilters, setActiveFilters] = useState({
    availability: 'All',
    price: 'All',
    size: 'All',
    fit: 'All'
  });

  const filteredPolos = useMemo(() => {
    let result = PRODUCTS.filter(p => p.category === 'Polos').filter(p => {
      if (activeFilters.availability === 'In Stock' && !p.inStock) return false;
      if (activeFilters.availability === 'Out of Stock' && p.inStock) return false;
      if (activeFilters.price === 'Under Rs. 10,000' && p.price >= 10000) return false;
      if (activeFilters.price === 'Rs. 10,000 - Rs. 30,000' && (p.price < 10000 || p.price > 30000)) return false;
      if (activeFilters.price === 'Over Rs. 30,000' && p.price <= 30000) return false;
      if (activeFilters.size !== 'All' && !p.sizes.includes(activeFilters.size)) return false;
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
            src="https://stripesandchecksinc.com/cdn/shop/collections/polos.png?v=1767856958&width=1100" 
            alt="Polo Collection" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-stone-900/10" />
        </div>
        <div className="relative z-10 text-center space-y-4 px-4 bg-white/20 backdrop-blur-md p-10 md:p-16 border border-white/30 shadow-2xl max-w-2xl mx-auto">
          <h1 className="text-4xl md:text-5xl text-stone-900 serif italic font-light">Polo T-shirts</h1>
          <p className="max-w-md mx-auto text-[10px] text-stone-800 opacity-95 leading-relaxed font-light tracking-widest uppercase">
            Elevate your everyday style with our signature knits.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4">
        <ProductFilters 
          category="Polos" 
          onFilterChange={setActiveFilters} 
          sortBy={sortBy} 
          onSortChange={setSortBy} 
        />

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-12">
          {filteredPolos.map((product) => (
            <Link key={product.id} to={`/product/${product.id}`} className="group">
              <div className="aspect-[4/5] overflow-hidden bg-stone-100 mb-4 relative rounded-sm shadow-sm">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
              </div>
              <div className="space-y-1 text-center">
                <h3 className="text-xs font-bold text-stone-900 uppercase tracking-tight group-hover:text-stone-600 transition-colors">{product.name}</h3>
                <p className="text-sm font-medium pt-1">Rs. {product.price.toLocaleString()}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PolosPage;
