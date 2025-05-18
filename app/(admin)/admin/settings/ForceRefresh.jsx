'use client';

import { getImageFromLocalStorage } from '@/services/settingsService';
import { useEffect } from 'react';

export default function ForceRefresh({ trigger }) {
  useEffect(() => {
    if (!trigger) return;
    
    try {
      // Get the favicon data directly from localStorage
      const favicon = getImageFromLocalStorage('siteFavicon');
      
      if (favicon && favicon.startsWith('data:image')) {
        // Apply the favicon immediately
        const linkElements = document.querySelectorAll('link[rel="icon"], link[rel="shortcut icon"]');
        
        if (linkElements.length > 0) {
          linkElements.forEach(link => {
            link.href = favicon;
          });
        } else {
          // Create new links if needed
          const iconLink = document.createElement('link');
          iconLink.rel = 'icon';
          iconLink.href = favicon;
          document.head.appendChild(iconLink);
          
          const shortcutLink = document.createElement('link');
          shortcutLink.rel = 'shortcut icon';
          shortcutLink.href = favicon;
          document.head.appendChild(shortcutLink);
        }
        
        console.log('Favicon forcefully applied!');
      }
    } catch (error) {
      console.error('Error forcing favicon refresh:', error);
    }
  }, [trigger]);
  
  return null;
} 