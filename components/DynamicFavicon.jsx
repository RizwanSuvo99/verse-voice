'use client';

import { getImageFromLocalStorage } from '@/services/settingsService';
import { useEffect } from 'react';

const DynamicFavicon = () => {
  useEffect(() => {
    try {
      // Check for directly stored favicon image data
      const storedFavicon = getImageFromLocalStorage('siteFavicon');
      
      if (storedFavicon && storedFavicon.startsWith('data:image')) {
        console.log('Found stored favicon data URL:', storedFavicon.substring(0, 50) + '...');
        updateFaviconLinks(storedFavicon);
      } else {
        console.log('Using default favicon. No valid data URL found in localStorage.');
      }
    } catch (error) {
      console.error('Error setting favicon:', error);
    }
  }, []);
  
  const updateFaviconLinks = (url) => {
    try {
      // First try to find an existing favicon link
      let linkElement = document.querySelector('link[rel="icon"]');
      
      // If no link exists, create one
      if (!linkElement) {
        linkElement = document.createElement('link');
        linkElement.rel = 'icon';
        document.head.appendChild(linkElement);
        console.log('Created new favicon link element');
      }
      
      // Set the href to the new favicon URL
      linkElement.href = url;
      
      // Also create/update shortcut icon link for better compatibility
      let shortcutLink = document.querySelector('link[rel="shortcut icon"]');
      if (!shortcutLink) {
        shortcutLink = document.createElement('link');
        shortcutLink.rel = 'shortcut icon';
        document.head.appendChild(shortcutLink);
        console.log('Created new shortcut icon link element');
      }
      shortcutLink.href = url;
      
      // Force browser to notice the change
      const faviconUpdate = new Event('favicon-updated');
      document.dispatchEvent(faviconUpdate);
      console.log('Favicon updated successfully');
    } catch (err) {
      console.error('Error in updateFaviconLinks:', err);
    }
  };

  return null; // This component doesn't render anything
};

export default DynamicFavicon; 