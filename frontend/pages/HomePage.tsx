
import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { PRODUCTS } from '../constants';
import ProductFilters, { SortOption } from '../components/ProductFilters';

const HomePage: React.FC = () => {
  const [sortBy, setSortBy] = useState<SortOption>('Default');

  const featured = useMemo(() => {
    let result = [...PRODUCTS].slice(0, 12); // Get a larger subset for sorting variety
    
    if (sortBy === 'Price: Low to High') result.sort((a, b) => a.price - b.price);
    else if (sortBy === 'Price: High to Low') result.sort((a, b) => b.price - a.price);
    else if (sortBy === 'Alphabetical') result.sort((a, b) => a.name.localeCompare(b.name));
    else if (sortBy === 'Newest Arrivals') result.sort((a, b) => b.id.localeCompare(a.id));

    return result.slice(0, 6); // Always show only top 6 sorted items
  }, [sortBy]);

  const galleryImages = [
    'https://stripesandchecksinc.com/cdn/shop/files/IRE_2918_1270x.jpg?v=1755103469',
    'https://stripesandchecksinc.com/cdn/shop/files/0y2a8022_1170x.jpg?v=1753177606',
    'https://stripesandchecksinc.com/cdn/shop/files/IRE_2910_1270x.jpg?v=1755103246',
    'https://stripesandchecksinc.com/cdn/shop/files/0Y2A6373_1880x.jpg?v=1696842253',
    'https://stripesandchecksinc.com/cdn/shop/files/Untitleddesign_31_2e11029f-bde3-4f83-9d89-aa39781ea8d7_1880x.png?v=1704185180',
    'https://stripesandchecksinc.com/cdn/shop/files/0Y2A1764_1570x.jpg?v=1750418605',
    'https://stripesandchecksinc.com/cdn/shop/files/DSC01172_1270x.jpg?v=1765952584',
    'https://stripesandchecksinc.com/cdn/shop/files/DSC01108_1270x.jpg?v=1765869294',
    'https://stripesandchecksinc.com/cdn/shop/files/12-min_1880x.png?v=1763634267',
    'https://stripesandchecksinc.com/cdn/shop/files/SC__791-min_1880x.jpg?v=1739876729',
    'https://stripesandchecksinc.com/cdn/shop/files/1-min_c94bbee9-075a-4916-b15c-5328f5375c4c_1066x.png?v=1737722091',
    'https://stripesandchecksinc.com/cdn/shop/files/SC__708-min_1880x.jpg?v=1743394631',
    'https://stripesandchecksinc.com/cdn/shop/files/SC__1268_1880x.jpg?v=1739189212',
    'https://stripesandchecksinc.com/cdn/shop/files/SC__692-min_1880x.jpg?v=1739796210',
    'https://stripesandchecksinc.com/cdn/shop/files/SC__1257_1880x.jpg?v=1739794641',
    'https://stripesandchecksinc.com/cdn/shop/files/SC__1420_1880x.jpg?v=1738068126'
  ];

  return (
    <div className="space-y-24 pb-24">
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://stripesandchecksinc.com/cdn/shop/files/0Y2A6373_1880x.jpg?v=1696842253" 
            alt="Hero" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>
        
        <div className="relative z-10 text-center text-white space-y-6 px-4">
          <span className="text-[10px] uppercase tracking-[0.4em] font-medium opacity-90">Archive Collection 2024</span>
          <h1 className="text-4xl md:text-6xl serif italic font-light">The New Modern</h1>
          <p className="max-w-xs mx-auto text-[11px] opacity-70 leading-relaxed font-light tracking-wide uppercase">
            Curated pieces for the contemporary wardrobe.
          </p>
          <Link 
            to="/shop" 
            className="inline-block bg-white text-stone-900 px-6 py-2.5 rounded-sm text-[10px] font-bold uppercase tracking-widest hover:bg-stone-100 transition-colors"
          >
            Shop Now
          </Link>
        </div>
      </section>

      {/* Featured Grid */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-10 gap-6">
          <div className="space-y-1">
            <h2 className="text-2xl serif italic">Featured Pieces</h2>
            <p className="text-stone-400 text-[10px] uppercase tracking-widest">Hand-picked by our stylists</p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <ProductFilters 
              category="All" 
              hideFilters 
              onFilterChange={() => {}} 
              sortBy={sortBy} 
              onSortChange={setSortBy} 
            />
            <Link to="/shop" className="text-[10px] font-bold uppercase tracking-widest border-b border-stone-900 pb-1 h-fit">
              The Full Catalog
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {featured.map((product) => (
            <Link key={product.id} to={`/product/${product.id}`} className="group space-y-3">
              <div className="aspect-[4/5] overflow-hidden bg-stone-100 relative rounded-sm">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="space-y-0.5 px-1">
                <h3 className="text-[10px] font-medium text-stone-900 truncate uppercase tracking-tight">{product.name}</h3>
                <p className="text-stone-400 text-[8px] uppercase tracking-widest">{product.category}</p>
                <p className="text-[10px] font-semibold">Rs. {product.price.toLocaleString()}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Style Gallery Section */}
      <section className="max-w-full">
        <div className="max-w-7xl mx-auto px-4 mb-10 text-center">
          <h2 className="text-3xl serif italic mb-2">In Focus</h2>
          <p className="text-stone-400 text-[10px] uppercase tracking-widest">A visual study of craft and texture</p>
        </div>
        <div className="grid grid-cols-4 md:grid-cols-8 gap-0.5 md:gap-1 bg-stone-200">
          {galleryImages.map((img, idx) => (
            <div key={idx} className="aspect-square bg-stone-100 overflow-hidden group relative">
              <img 
                src={img} 
                alt={`Gallery ${idx}`} 
                className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 cursor-crosshair"
              />
              <div className="absolute inset-0 border border-transparent group-hover:border-white/20 transition-all pointer-events-none" />
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="bg-white py-24">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="relative aspect-square overflow-hidden group cursor-pointer rounded-sm">
            <img 
              src="https://stripesandchecksinc.com/cdn/shop/files/IRE_2910_1270x.jpg?v=1755103246" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
              alt="Tailoring"
            />
            <div className="absolute inset-0 bg-stone-900/5 group-hover:bg-stone-900/20 transition-colors" />
            <div className="absolute inset-x-0 bottom-8 text-center">
              <h3 className="text-white text-xl serif italic tracking-wider drop-shadow-md">Tailoring</h3>
              <p className="text-white/80 text-[8px] uppercase tracking-[0.3em] mt-2">Precision Cut</p>
            </div>
          </div>
          <div className="relative aspect-square overflow-hidden group cursor-pointer rounded-sm">
            <img 
              src="https://stripesandchecksinc.com/cdn/shop/files/DSC01108_1270x.jpg?v=1765869294" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
              alt="Footwear"
            />
             <div className="absolute inset-0 bg-stone-900/5 group-hover:bg-stone-900/20 transition-colors" />
            <div className="absolute inset-x-0 bottom-8 text-center">
              <h3 className="text-white text-xl serif italic tracking-wider drop-shadow-md">Summer Shop</h3>
              <p className="text-white/80 text-[8px] uppercase tracking-[0.3em] mt-2">Breathable Fabrics</p>
            </div>
          </div>
          <div className="relative aspect-square overflow-hidden group cursor-pointer rounded-sm">
            <img 
              src="https://stripesandchecksinc.com/cdn/shop/files/SC__1420_1880x.jpg?v=1738068126" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
              alt="Accessories"
            />
             <div className="absolute inset-0 bg-stone-900/5 group-hover:bg-stone-900/20 transition-colors" />
            <div className="absolute inset-x-0 bottom-8 text-center">
              <h3 className="text-white text-xl serif italic tracking-wider drop-shadow-md">Outerwear</h3>
              <p className="text-white/80 text-[8px] uppercase tracking-[0.3em] mt-2">The Layers</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
