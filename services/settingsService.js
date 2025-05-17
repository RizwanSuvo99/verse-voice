/**
 * Service for managing site settings
 * In a real application, this would interact with an API
 */

// Default settings
const defaultSettings = {
  // General settings
  siteName: 'Class Room Writers',
  siteDescription: 'A blog about writing and education',
  postsPerPage: 10,
  
  // SEO settings
  metaTitle: 'Class Room Writers - Education and Writing Blog',
  metaDescription: 'Discover the latest articles about writing, education, and classroom tips',
  googleAnalyticsId: '',
  
  // Appearance settings
  primaryColor: '#0ea5ea',
  secondaryColor: '#0bd1d1',
  
  // Hero settings
  heroTitle: 'Thoughts Meet Words',
  heroSubtitle: 'Explore authentic writings from students, sharing their feelings, experiences, and imaginative stories that inspire.',
  
  // Social settings
  facebookUrl: 'https://facebook.com/classroomwriters',
  twitterUrl: 'https://twitter.com/classroomwriters',
  instagramUrl: 'https://instagram.com/classroomwriters',
  youtubeUrl: '',
  
  // Comments settings
  enableComments: true,
  moderateComments: true,
  
  // Contact settings
  contactEmail: 'info@classroomwriters.com',
  contactPhone: '+1 (123) 456-7890',
  contactAddress: '123 Education St, Learning City, 12345',
};

// Get settings from localStorage or use defaults
export const getSettings = () => {
  if (typeof window === 'undefined') {
    return defaultSettings;
  }
  
  try {
    const storedSettings = localStorage.getItem('siteSettings');
    return storedSettings ? JSON.parse(storedSettings) : defaultSettings;
  } catch (error) {
    console.error('Error getting settings:', error);
    return defaultSettings;
  }
};

// Save settings to localStorage
export const saveSettings = (settings) => {
  if (typeof window === 'undefined') {
    return false;
  }
  
  try {
    localStorage.setItem('siteSettings', JSON.stringify({
      ...defaultSettings,
      ...settings
    }));
    return true;
  } catch (error) {
    console.error('Error saving settings:', error);
    return false;
  }
};

// Get a specific setting by key
export const getSetting = (key) => {
  const settings = getSettings();
  return settings[key] || defaultSettings[key];
};

// In a real application, these would be API calls
// export const getSettings = async () => {
//   const response = await fetch('/api/settings');
//   return response.json();
// };

// export const saveSettings = async (settings) => {
//   const response = await fetch('/api/settings', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(settings),
//   });
//   return response.json();
// }; 