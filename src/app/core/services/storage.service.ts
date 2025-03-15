import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  // Asynchronously get item from localStorage using Promises
  getItem(key: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const value = localStorage.getItem(key);
      if (value !== null) {
        resolve(value);
      } else {
        // reject(`Item with key "${key}" not found`);
        resolve('null');
      }
    });
  }

  // Asynchronously set item to localStorage
  setItem(key: string, value: string): Promise<void> {
    return new Promise((resolve) => {
      localStorage.setItem(key, value);
      resolve();
    });
  }

  // Remove an item from localStorage
  removeItem(key: string): Promise<void> {
    return new Promise((resolve) => {
      localStorage.removeItem(key);
      resolve();
    });
  }

  // Clear all items in localStorage
  clear(): Promise<void> {
    return new Promise((resolve) => {
      localStorage.clear();
      resolve();
    });
  }
}
