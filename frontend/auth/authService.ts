
import { User } from './types';

// Mocking storage for persistence
const STORAGE_KEY = 'elysian_user';

export const authService = {
  async login(email: string, pass: string): Promise<User> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock success
    const user: User = {
      id: 'u1',
      firstName: 'Modern',
      lastName: 'Gentleman',
      email: email
    };
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    return user;
  },

  async signup(userData: Partial<User>): Promise<User> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const user: User = {
      id: Math.random().toString(36).substr(2, 9),
      firstName: userData.firstName || 'Guest',
      lastName: userData.lastName || '',
      email: userData.email || ''
    };
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    return user;
  },

  logout(): void {
    localStorage.removeItem(STORAGE_KEY);
  },

  getStoredUser(): User | null {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  }
};
