
import React, { useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { PRODUCTS } from '../constants';

const SearchResultsPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  const results = useMemo(() => {
    if (!query) return [];
    const lowerQuery = query.toLowerCase();
    return PRODUCTS.filter(p => 
      p.name.toLowerCase().includes(lowerQuery) || 
      p.category.toLowerCase().includes(lowerQuery) ||
      p.description.toLowerCase().includes(lowerQuery)
    );
  }, [query]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <header className="mb-12 space-y-4">
        <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-stone-400">Search Results</span>
        <h1 className="text-3xl serif italic">
          {query ? `Results for "${query}"` : 'Enter a search term'}
        </h1>
        <p className="text-stone-500 text-xs italic">
          {results.length} item{results.length !== 1 ? 's' : ''} found in our archive.
        </p>
      </header>

      {results.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-6 gap-y-12">
          {results.map((product) => (
            <Link key={product.id} to={`/product/${product.id}`} className="group">
              <div className="aspect-square overflow-hidden bg-stone-100 mb-4 relative rounded-sm shadow-sm">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                />
                {product.onSale && (
                  <div className="absolute top-2 left-2 bg-red-600 text-white text-[7px] font-bold uppercase tracking-widest px-1.5 py-0.5">
                    Sale
                  </div>
                )}
              </div>
              <div className="space-y-1 px-1">
                <p className="text-stone-400 text-[7px] uppercase tracking-widest font-bold">{product.category}</p>
                <h3 className="text-[10px] font-medium text-stone-900 truncate uppercase tracking-tight group-hover:text-stone-600 transition-colors">{product.name}</h3>
                <p className="text-[10px] font-bold pt-1">Rs. {product.price.toLocaleString()}</p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="py-24 text-center space-y-6">
          <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mx-auto">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-stone-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <div className="space-y-2">
            <p className="text-stone-500 italic text-sm">We couldn't find any matches for your request.</p>
            <p className="text-[10px] text-stone-400 uppercase tracking-widest">Try adjusting your terms or browse the collections.</p>
          </div>
          <Link 
            to="/shop" 
            className="inline-block mt-4 text-[10px] font-bold uppercase tracking-widest border-b border-stone-900 pb-1"
          >
            Browse All Collection
          </Link>
        </div>
      )}
    </div>
  );
};

export default SearchResultsPage;
