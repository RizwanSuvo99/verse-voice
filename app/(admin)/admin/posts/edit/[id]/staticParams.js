// For static export, we need to pre-generate all possible paths
export async function generateStaticParams() {
  // Get all post IDs from initial data
  const allBlogs = await import('@/data/allBlogs').then(mod => mod.default);
  
  // Get IDs from the initial data
  const staticIds = allBlogs.map(post => ({
    id: post.id.toString(),
  }));
  
  // Add a generous range of additional IDs to cover posts added through the admin panel
  // This ensures we have coverage for newly created posts with auto-incremented IDs
  const maxExistingId = Math.max(...allBlogs.map(post => post.id), 0);
  const additionalRange = 50; // Allow for 50 more posts beyond the highest ID
  
  const additionalIds = [];
  for (let i = maxExistingId + 1; i <= maxExistingId + additionalRange; i++) {
    additionalIds.push({ id: i.toString() });
  }
  
  // Explicitly include the problematic ID 36 to ensure it's in the paths
  const specificIds = [36, 37, 38, 39, 40].map(id => ({ id: id.toString() }));
  
  // Combine all the IDs, removing duplicates
  const allIds = [...staticIds];
  
  // Add additional IDs
  for (const idObj of [...additionalIds, ...specificIds]) {
    if (!allIds.some(existing => existing.id === idObj.id)) {
      allIds.push(idObj);
    }
  }
  
  // Debug logging to help diagnose issues
  console.log(`Generated ${allIds.length} static params for post edit routes`);
  console.log(`Included specific IDs: ${specificIds.map(i => i.id).join(', ')}`);
  
  // Double check that ID 36 is included
  const has36 = allIds.some(item => item.id === '36');
  console.log(`ID 36 is ${has36 ? 'included' : 'MISSING!'} in generated paths`);
  
  return allIds;
} 