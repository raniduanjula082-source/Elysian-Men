
import React from 'react';
import { Link } from 'react-router-dom';
import { PRODUCTS } from '../constants';

const AccessoriesPage: React.FC = () => {
  const accessories = PRODUCTS.filter(p => p.category === 'Accessories');

  return (
    <div className="pb-24">
      {/* Accessories Hero */}
      <section className="bg-stone-100 py-20 mb-16">
        <div className="max-w-4xl mx-auto text-center space-y-4 px-4">
          <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-stone-400">The Finishing Touch</span>
          <h1 className="text-4xl md:text-5xl serif italic">The Accessories Archive</h1>
          <p className="text-stone-500 text-[11px] uppercase tracking-widest leading-loose max-w-lg mx-auto">
            From hand-rolled silk squares to artisanal leather belts, discover the details that define the modern gentleman's silhouette.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-6 gap-y-12">
          {accessories.map((product) => (
            <Link key={product.id} to={`/product/${product.id}`} className="group space-y-4">
              <div className="aspect-square bg-white overflow-hidden rounded-sm relative shadow-sm">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-stone-900/0 group-hover:bg-stone-900/5 transition-colors" />
              </div>
              <div className="space-y-1 text-center">
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-stone-900">{product.name}</h3>
                <p className="text-[11px] font-medium text-stone-400">Rs. {product.price.toLocaleString()}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AccessoriesPage;
