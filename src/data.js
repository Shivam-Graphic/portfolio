// Content is managed via /admin CMS (content/*.json)
// This module loads the live JSON files so you never need to edit code.

async function loadJSON(path) {
  try {
    const res = await fetch(path + '?t=' + Date.now());
    if (!res.ok) throw new Error('Failed to load ' + path);
    return await res.json();
  } catch (e) {
    console.warn('CMS load failed for', path, e);
    return null;
  }
}

export async function loadAllContent() {
  const [profile, softwares, experience, education, categories, projects] = await Promise.all([
    loadJSON('/content/profile.json'),
    loadJSON('/content/softwares.json'),
    loadJSON('/content/experience.json'),
    loadJSON('/content/education.json'),
    loadJSON('/content/categories.json'),
    loadJSON('/content/projects.json'),
  ]);

  return {
    profile: profile || {
      name: 'Shivam Sharma',
      title: 'Graphic Designer',
      tagline: "Hello I'm",
      bio: '',
      bio2: '',
      yearsExp: '2+',
      photo: '/profile.jpg',
      email: '',
      phone: '',
      location: '',
      socials: {},
    },
    softwares: Array.isArray(softwares) ? softwares : [],
    experience: Array.isArray(experience) ? experience : [],
    education: Array.isArray(education) ? education : [],
    categories: Array.isArray(categories) ? categories : [{ id: 'all', name: 'All Work' }],
    projects: Array.isArray(projects) ? projects : [],
  };
}
