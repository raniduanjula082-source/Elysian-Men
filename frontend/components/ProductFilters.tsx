
import React, { useState } from 'react';
import { Category } from '../types';

export type SortOption = 'Default' | 'Price: Low to High' | 'Price: High to Low' | 'Alphabetical' | 'Newest Arrivals';

interface FiltersState {
  availability: string;
  price: string;
  size: string;
  fit: string;
}

interface Props {
  category: Category | 'All' | 'Sale';
  onFilterChange: (filters: FiltersState) => void;
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
  hideFilters?: boolean;
}

const ProductFilters: React.FC<Props> = ({ category, onFilterChange, sortBy, onSortChange, hideFilters = false }) => {
  const [filters, setFilters] = useState<FiltersState>({
    availability: 'All',
    price: 'All',
    size: 'All',
    fit: 'All'
  });

  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const handleSelect = (key: keyof FiltersState, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
    setActiveDropdown(null);
  };

  const sortOptions: SortOption[] = ['Default', 'Price: Low to High', 'Price: High to Low', 'Alphabetical', 'Newest Arrivals'];

  const FilterDropdown = ({ label, options, filterKey, current, onSelect }: { label: string, options: string[], filterKey: string, current: string, onSelect: (val: string) => void }) => (
    <div className="relative">
      <button 
        onClick={() => setActiveDropdown(activeDropdown === filterKey ? null : filterKey)}
        className="w-full min-w-[140px] lg:min-w-[180px] h-10 border border-stone-200 px-3 flex items-center justify-between group hover:border-stone-400 transition-colors bg-white"
      >
        <span className="text-[9px] font-bold uppercase tracking-widest truncate">
          {current === 'All' || current === 'Default' ? label : `${label}: ${current}`}
        </span>
        <svg xmlns="http://www.w3.org/2000/svg" className={`h-2.5 w-2.5 transition-transform duration-300 ${activeDropdown === filterKey ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {activeDropdown === filterKey && (
        <div className="absolute top-full left-0 w-full bg-white border border-stone-200 z-30 shadow-sm mt-[-1px]">
          {options.map((opt) => (
            <button
              key={opt}
              onClick={() => { onSelect(opt); setActiveDropdown(null); }}
              className={`w-full text-left px-4 py-2.5 text-[9px] uppercase tracking-widest font-medium hover:bg-stone-50 transition-colors ${current === opt ? 'bg-stone-50 text-stone-900' : 'text-stone-400'}`}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-6 mb-10">
      {/* Breadcrumb - Only if not Home */}
      {category !== 'All' && (
        <nav className="flex items-center space-x-2 text-[9px] tracking-widest text-stone-400 font-bold uppercase">
          <span className="hover:text-stone-900 cursor-pointer">Home</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-2 w-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
          </svg>
          <span className="text-stone-900">{category}</span>
        </nav>
      )}

      {/* Filter Bar */}
      <div className="flex flex-wrap items-center gap-3">
        {!hideFilters && (
          <>
            <div className="flex items-center space-x-2 mr-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-stone-900" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z" />
              </svg>
              <span className="text-[9px] font-bold uppercase tracking-widest text-stone-900">Filter</span>
            </div>

            <FilterDropdown 
              label="Availability" 
              filterKey="availability" 
              current={filters.availability}
              options={['All', 'In Stock', 'Out of Stock']} 
              onSelect={(val) => handleSelect('availability', val)}
            />
            <FilterDropdown 
              label="Price Range" 
              filterKey="price" 
              current={filters.price}
              options={['All', 'Under Rs. 10,000', 'Rs. 10,000 - Rs. 30,000', 'Over Rs. 30,000']} 
              onSelect={(val) => handleSelect('price', val)}
            />
            <FilterDropdown 
              label="Size" 
              filterKey="size" 
              current={filters.size}
              options={['All', 'S', 'M', 'L', 'XL', '30', '32', '34', '36', 'OS']} 
              onSelect={(val) => handleSelect('size', val)}
            />
          </>
        )}

        {/* Sort By Dropdown - Always visible */}
        <div className="ml-auto flex items-center space-x-2">
           <span className="text-[9px] font-bold uppercase tracking-widest text-stone-400">Sort:</span>
           <FilterDropdown 
              label="Sort By" 
              filterKey="sort" 
              current={sortBy}
              options={sortOptions} 
              onSelect={(val) => onSortChange(val as SortOption)}
            />
        </div>
      </div>
    </div>
  );
};

export default ProductFilters;
