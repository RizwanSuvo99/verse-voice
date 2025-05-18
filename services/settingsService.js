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
  faviconPath: '/favicon.ico',
  
  // Hero settings
  heroTitle: 'Thoughts Meet Words',
  heroSubtitle: 'Explore authentic writings from students, sharing their feelings, experiences, and imaginative stories that inspire.',
  
  // Footer settings
  footerDescription1: `In Bangladesh, students often memorize answers for exams without really engaging with writing as a craft. Sadly, they lack the motivation or platforms to express themselves freely in writing. That's where this site comes in! We're offering a space where you can write about anything—no topic is off-limits. Whether you're interested in fiction, social issues, or personal experiences, you can explore your voice and ideas with full freedom.`,
  footerDescription2: `Writing is more than just a subject for exams; it's a life skill. It helps you think critically, express your thoughts clearly, and solve problems creatively. Plus, the more you practice, the better your results will be—without memorizing answers! Writing here will help you improve not just for your exams, but for life.`,
  
  // About page settings
  aboutName: 'Fakharuddin Pentu',
  aboutEmail: 'pintu.eng@gmail.com',
  aboutDescription: 'Hey there! I\'ve always imagined how great it would be to have a writing website just for students, and now it\'s finally a reality! This space is all about breaking free from those stiff, boring syllabi. It\'s your chance to unleash your creativity and let your imagination soar—no idea is too wild! Let\'s dive into this adventure together!',
  aboutImage: '/assets/admin.png',
  aboutCVLink: '#',
  aboutRoles: [
    { title: 'Current Lecturer', organization: 'Comilla Govt. College, Comilla' },
    { title: 'Former Lecturer', organization: 'Chauddagram Govt. College, Comilla' },
    { title: 'Former Assistant Director', organization: 'Anti-Corruption Commission - Bangladesh' },
  ],
  aboutSocials: {
    linkedin: '#',
    twitter: '#',
    facebook: '#',
    email: 'pintu.eng@gmail.com'
  },
  
  // Social settings
  facebookUrl: 'https://facebook.com/classroomwriters',
  twitterUrl: 'https://twitter.com/classroomwriters',
  instagramUrl: 'https://instagram.com/classroomwriters',
  youtubeUrl: '',
  
  // Comments settings
  enableComments: true,
  moderateComments: true,
  
  // Contact settings
  contactTitle: 'Contact Us',
  contactDescription: "I'd love to hear from you! Whether you have questions, feedback, or want to share your own writing journey, reach out to me. Your thoughts are important, and together we can inspire creativity and connection. Let's build a vibrant community of young writers!",
  contactEmail: 'pintu.eng@gmail.com',
  contactEmail2: 'classroomwriters@gmail.com',
  contactPhone: '+8801675697313',
  contactPhone2: '+8801912033727',
  contactAddress: 'Police Line, Adarsha Sadar, Cumilla 3500',
  contactMapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3659.7776947401735!2d91.1724365!3d23.468481999999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x37547ed5ea38a001%3A0xa888b09fb49bc32!2sPolice%20Line%2C%20Cumilla!5e0!3m2!1sen!2sbd!4v1728494003876!5m2!1sen!2sbd',
  contactFormTitle: 'Drop Us a Message',
  contactFormDescription: 'Your email address will not be published. All the fields are required.',
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

// Get image from localStorage or return default
export const getImageFromLocalStorage = (key, defaultImage = null) => {
  if (typeof window === 'undefined') {
    return defaultImage;
  }
  
  try {
    const image = localStorage.getItem(key);
    return image || defaultImage;
  } catch (error) {
    console.error(`Error getting ${key} from localStorage:`, error);
    return defaultImage;
  }
};

// Save image to localStorage
export const saveImageToLocalStorage = (key, imageData) => {
  if (typeof window === 'undefined') {
    console.error('Cannot save to localStorage in server environment');
    return false;
  }
  
  try {
    // Check if the imageData is valid
    if (!imageData || typeof imageData !== 'string') {
      console.error(`Invalid image data for ${key}:`, imageData);
      return false;
    }
    
    // Check if the data is not too large (localStorage has ~5MB limit)
    const dataSize = new Blob([imageData]).size;
    if (dataSize > 4 * 1024 * 1024) { // 4MB limit to be safe
      console.error(`Image too large for localStorage (${(dataSize/1024/1024).toFixed(2)}MB). Max recommended is 4MB.`);
      return false;
    }
    
    // Try to save the data
    localStorage.setItem(key, imageData);
    
    // Verify the data was saved correctly
    const savedData = localStorage.getItem(key);
    if (savedData === imageData) {
      console.log(`Successfully saved ${key} to localStorage (${(dataSize/1024).toFixed(2)}KB)`);
      return true;
    } else {
      console.error(`Verification failed: saved data doesn't match for ${key}`);
      return false;
    }
  } catch (error) {
    console.error(`Error saving ${key} to localStorage:`, error);
    
    // Try to determine specific error cause
    if (error.name === 'QuotaExceededError' || error.code === 22) {
      console.error('localStorage quota exceeded. Try clearing some space or using a smaller image.');
    }
    
    return false;
  }
};

// Get favicon URL
export const getFaviconUrl = () => {
  if (typeof window === 'undefined') {
    return defaultSettings.faviconPath;
  }
  
  try {
    const faviconData = localStorage.getItem('siteFavicon');
    return faviconData || defaultSettings.faviconPath;
  } catch (error) {
    console.error('Error getting favicon:', error);
    return defaultSettings.faviconPath;
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