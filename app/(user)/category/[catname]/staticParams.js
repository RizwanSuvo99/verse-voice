// For static generation, we need to get all unique categories from the blog posts
export async function generateStaticParams() {
  // We should use server-side imports for the static generation
  const allBlogs = await import('@/data/allBlogs').then(mod => mod.default);
  
  // Extract unique categories from blogs
  const originalCategories = [...new Set(allBlogs.map(blog => blog.category))];
  
  // Get paths for original categories
  const paths = originalCategories.map(cat => ({
    catname: cat.toLowerCase().replace(/\s+/g, '-')
  }));
  
  // Add some common variations and additional paths to ensure coverage
  // This is a workaround for the static export constraint
  const additionalPaths = [
    // New category that was added through the admin - explicitly include with proper format
    { catname: 'extra' },
    
    // Basic categories
    'uncategorized', 'general', 'misc', 'other',
    
    // Common content categories
    'technology', 'tech', 'programming', 'coding', 'development', 'software',
    'lifestyle', 'life-style', 'life', 'living', 'daily',
    'poetry', 'poems', 'poem', 'verse', 'rhyme',
    'inspiration', 'inspirational', 'inspire', 'motivation', 'motivational',
    'education', 'educational', 'learning', 'teaching', 'academic', 'school',
    'memories', 'memory', 'memoir', 'nostalgia', 'reminiscence',
    'fiction', 'fictional', 'story', 'stories', 'novel',
    'non-fiction', 'non-fictions', 'nonfiction', 'nonfictions', 'fact', 'factual',
    'science', 'scientific', 'research', 'discovery', 'experiment',
    'history', 'historical', 'past', 'ancient', 'vintage',
    'culture', 'cultural', 'tradition', 'heritage', 'custom',
    'health', 'healthcare', 'wellness', 'fitness', 'medical',
    'travel', 'traveling', 'journey', 'adventure', 'exploration',
    'food', 'cooking', 'cuisine', 'recipe', 'culinary', 'gastronomy',
    'sports', 'sport', 'athletic', 'fitness', 'exercise',
    'business', 'entrepreneurship', 'startup', 'corporate', 'marketing',
    'art', 'artistic', 'creativity', 'design', 'illustration',
    'music', 'musical', 'songs', 'audio', 'sound',
    'fashion', 'style', 'clothing', 'apparel', 'trend',
    'photography', 'photos', 'pictures', 'images', 'camera',
    'movies', 'film', 'cinema', 'tv', 'television',
    'books', 'reading', 'literature', 'novel', 'publication',
    'gaming', 'games', 'video-games', 'esports', 'play',
    'politics', 'political', 'government', 'policy', 'election',
    'news', 'current-events', 'breaking', 'headlines', 'report',
    'opinion', 'editorial', 'viewpoint', 'perspective', 'commentary',
    'review', 'reviews', 'critique', 'analysis', 'evaluation',
    'tutorial', 'guide', 'how-to', 'instruction', 'walkthrough', 
    'interview', 'qa', 'conversation', 'dialogue', 'discussion',
    'extra', 'special', 'featured', 'spotlight', 'highlight',
    
    // Placeholder for custom categories (a-z)
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l',
    'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
    
    // Common single-word categories
    'nature', 'animals', 'pets', 'family', 'parenting', 'relationships',
    'finance', 'money', 'investing', 'career', 'work', 'job',
    'diy', 'crafts', 'hobby', 'gardening', 'home', 'decor',
    'comedy', 'humor', 'funny', 'entertainment', 'celebrity',
    'spirituality', 'religion', 'faith', 'belief', 'philosophy',
    'technology', 'gadget', 'internet', 'web', 'social',
    'environment', 'nature', 'climate', 'sustainability', 'eco'
  ].map(slug => typeof slug === 'string' ? { catname: slug } : slug);
  
  // Combine original paths with additional ones
  const allPaths = [...paths];
  
  for (const path of additionalPaths) {
    if (!allPaths.some(p => p.catname === path.catname)) {
      allPaths.push(path);
    }
  }

  console.log('Generated paths:', allPaths.length, 'including', allPaths.find(p => p.catname === 'extra'));
  
  return allPaths;
} 