
import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { PRODUCTS } from '../constants';
import ProductFilters, { SortOption } from '../components/ProductFilters';

const SalePage: React.FC = () => {
  const [sortBy, setSortBy] = useState<SortOption>('Default');
  const [activeFilters, setActiveFilters] = useState({
    availability: 'All',
    price: 'All',
    size: 'All',
    fit: 'All'
  });

  const saleProducts = useMemo(() => {
    let result = PRODUCTS.filter(p => p.onSale).filter(p => {
      if (activeFilters.availability === 'In Stock' && !p.inStock) return false;
      if (activeFilters.availability === 'Out of Stock' && p.inStock) return false;
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
            src="https://stripesandchecksinc.com/cdn/shop/files/sale_16_c0da7b5c-02e1-4a9d-9521-04a7b23214a0.png?v=1763010853&width=1880" 
            alt="Sale Collection" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-stone-900/10" />
        </div>
        <div className="relative z-10 text-center space-y-4 px-4 bg-white/10 backdrop-blur-sm p-8 md:p-12 border border-white/20">
          <h1 className="text-4xl md:text-6xl text-white serif italic font-light drop-shadow-md">Seasonal Reductions</h1>
          <p className="max-w-xs mx-auto text-[11px] text-white opacity-90 leading-relaxed font-light tracking-widest uppercase drop-shadow-sm">
            Excellence at exceptional value.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4">
        <ProductFilters 
          category="Vouchers" // Reusing UI for breadcrumb
          onFilterChange={setActiveFilters} 
          sortBy={sortBy} 
          onSortChange={setSortBy} 
        />

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-x-5 gap-y-12">
          {saleProducts.map((product) => (
            <Link key={product.id} to={`/product/${product.id}`} className="group">
              <div className="aspect-square overflow-hidden bg-stone-100 mb-4 relative rounded-sm shadow-sm">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute top-3 left-3 bg-red-600 text-white text-[7px] font-bold uppercase tracking-widest px-2 py-1">Sale</div>
              </div>
              <div className="space-y-1 px-1">
                <h3 className="text-[10px] font-medium text-stone-900 truncate uppercase tracking-tight group-hover:text-stone-600 transition-colors">{product.name}</h3>
                <div className="flex items-center space-x-2 pt-1">
                  <span className="text-[11px] font-bold text-red-600">Rs. {product.price.toLocaleString()}</span>
                  {product.originalPrice && (
                    <span className="text-[9px] text-stone-400 line-through font-light">Rs. {product.originalPrice.toLocaleString()}</span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SalePage;
