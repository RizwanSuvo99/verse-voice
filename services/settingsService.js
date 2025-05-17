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
  logoPath: '/assets/logo.svg',
  logoWhitePath: '/assets/logo-white.svg',
  
  // Hero settings
  heroTitle: 'Thoughts Meet Words',
  heroSubtitle: 'Explore authentic writings from students, sharing their feelings, experiences, and imaginative stories that inspire.',
  
  // Footer settings
  footerDescription1: `In Bangladesh, students often memorize answers for exams without really engaging with writing as a craft. Sadly, they lack the motivation or platforms to express themselves freely in writing. That's where this site comes in! We're offering a space where you can write about anything—no topic is off-limits. Whether you're interested in fiction, social issues, or personal experiences, you can explore your voice and ideas with full freedom.`,
  footerDescription2: `Writing is more than just a subject for exams; it's a life skill. It helps you think critically, express your thoughts clearly, and solve problems creatively. Plus, the more you practice, the better your results will be—without memorizing answers! Writing here will help you improve not just for your exams, but for life.`,
  
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

// Save an image to local storage
export const saveImageToLocalStorage = (file, key) => {
  return new Promise((resolve, reject) => {
    if (!file) {
      resolve(null);
      return;
    }
    
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const base64Image = e.target.result;
        localStorage.setItem(`image_${key}`, base64Image);
        resolve(base64Image);
      } catch (error) {
        console.error('Error saving image:', error);
        reject(error);
      }
    };
    reader.onerror = (error) => {
      console.error('Error reading file:', error);
      reject(error);
    };
    reader.readAsDataURL(file);
  });
};

// Get an image from local storage
export const getImageFromLocalStorage = (key, defaultValue) => {
  if (typeof window === 'undefined') {
    return defaultValue;
  }
  
  try {
    const image = localStorage.getItem(`image_${key}`);
    return image || defaultValue;
  } catch (error) {
    console.error('Error getting image:', error);
    return defaultValue;
  }
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