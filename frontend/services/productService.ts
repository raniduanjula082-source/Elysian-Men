
import { Product } from '../types';
import { PRODUCTS } from '../constants';

const API_BASE_URL = 'http://localhost:8080/api';

export const productService = {
  async fetchProducts(params: {
    category?: string;
    availability?: string;
    minPrice?: number;
    maxPrice?: number;
    sortBy?: string;
  }): Promise<Product[]> {
    const query = new URLSearchParams();
    if (params.category && params.category !== 'All') query.append('category', params.category);
    if (params.availability && params.availability !== 'All') query.append('availability', params.availability);
    if (params.minPrice) query.append('minPrice', params.minPrice.toString());
    if (params.maxPrice) query.append('maxPrice', params.maxPrice.toString());
    if (params.sortBy && params.sortBy !== 'Default') query.append('sortBy', params.sortBy);

    try {
      const response = await fetch(`${API_BASE_URL}/products?${query.toString()}`);
      if (!response.ok) throw new Error('Failed to fetch archive');
      return await response.json();
    } catch (error) {
      console.warn('Backend unavailable, using local product data');
      
      // Use local product data as fallback
      let filtered = [...PRODUCTS];
      
      // Apply category filter
      if (params.category && params.category !== 'All') {
        filtered = filtered.filter(p => p.category === params.category);
      }
      
      // Apply availability filter
      if (params.availability && params.availability !== 'All') {
        if (params.availability === 'In Stock') {
          filtered = filtered.filter(p => p.inStock);
        } else if (params.availability === 'Out of Stock') {
          filtered = filtered.filter(p => !p.inStock);
        }
      }
      
      // Apply price filter
      if (params.minPrice !== undefined) {
        filtered = filtered.filter(p => p.price >= params.minPrice!);
      }
      if (params.maxPrice !== undefined) {
        filtered = filtered.filter(p => p.price <= params.maxPrice!);
      }
      
      // Apply sorting
      if (params.sortBy === 'Price: Low to High') {
        filtered.sort((a, b) => a.price - b.price);
      } else if (params.sortBy === 'Price: High to Low') {
        filtered.sort((a, b) => b.price - a.price);
      } else if (params.sortBy === 'Newest') {
        // Keep original order (newest first in constants)
      }
      
      return filtered;
    }
  },

  async getProductById(id: string): Promise<Product | null> {
    try {
      const response = await fetch(`${API_BASE_URL}/products/${id}`);
      if (!response.ok) return null;
      return await response.json();
    } catch (error) {
      // Fallback to local data
      return PRODUCTS.find(p => p.id === id) || null;
    }
  }
};
