// Portfolio content - later replace with Sanity CMS fetch
// This structure mirrors the planned Sanity schema

export const profile = {
  name: "Shivam Sharma",
  title: "Graphic Designer",
  tagline: "Hello I'm",
  bio: "Creative and adaptable Graphic Designer with over 2 years of fast-paced agency experience. Skilled at delivering clean, engaging visuals for social media, digital ads, and short-form video.",
  bio2: "Proven ability to manage multiple client accounts simultaneously, ensuring high-quality work and strict brand consistency across diverse sectors like lifestyle, travel, and beauty.",
  yearsExp: "2+",
  photo: "/profile.jpg",
  email: "juglanshivam3@gmail.com",
  phone: "+91 9877838897",
  location: "#1802, Sector - 52, Chandigarh",
  socials: {
    linkedin: "https://www.linkedin.com/in/shivam-sharma-041926/",
    instagram: "https://www.instagram.com/graphixbyshivam/",
    behance: "https://www.behance.net/Shivam137",
    youtube: "https://www.youtube.com/@graphixbyshivam",
    pinterest: "https://in.pinterest.com/Graphixbyshivam/",
  },
};

export const softwares = [
  { name: "Photoshop", icon: "Ps", level: 90 },
  { name: "Illustrator", icon: "Ai", level: 85 },
  { name: "Canva", icon: "Canva", level: 95 },
  { name: "CapCut", icon: "CapCut", level: 88 },
  { name: "Figma", icon: "Figma", level: 70 },
];

export const experience = [
  {
    id: 1,
    company: "GigSoft Pro",
    role: "Graphic Designer & Video Editor",
    period: "Aug 2025 – Sep 2026",
    logo: null,
    points: [
      "Led the daily production of social media graphics and video Reels for a diverse roster of clients, including travel services, beauty spas, teeth-whitening products, and consulting firms.",
      "Streamlined the creative workflow for lifestyle and service brands, delivering engaging visual content quickly to meet tight daily deadlines.",
    ],
  },
  {
    id: 2,
    company: "Vibrantick Infotech Solutions",
    role: "Graphic Designer",
    period: "Jun 2024 – Jun 2025",
    logo: null,
    points: [
      "Produced a high volume of daily social media graphics for demanding industries such as real estate, education, and immigration.",
      "Sourced, edited, and optimized images for critical website layouts, including homepage banners, sliders, and breadcrumbs.",
      "Designed eye-catching Reels for a travel agency, boosting their social media presence and online storytelling.",
    ],
  },
];

export const education = [
  {
    year: "2017-2021",
    title: "Bachelor of Commerce (B.Com)",
    institution: "Panjab University",
  },
  {
    year: "2022-2023",
    title: "Certificate in Graphic Design",
    institution: "Visual Media Academy",
  },
];

export const categories = [
  { id: "all", name: "All Work" },
  { id: "social-posts", name: "Social Media Posts" },
  { id: "reels", name: "Reels & Shorts" },
  { id: "logos", name: "Logo & Brand Identity" },
  { id: "packaging", name: "Packaging Design" },
  { id: "ads", name: "Ads & Covers" },
  { id: "other", name: "Other Work" },
];

// Sample projects (replace with real images + CMS later)
export const projects = [
  // Social Media Posts
  { id: 1, title: "Guru Nanak Jayanti Post", category: "social-posts", client: "GigSoft Pro", tag: "Social Media Post" },
  { id: 2, title: "Happy Diwali Creative", category: "social-posts", client: "GigSoft Pro", tag: "Social Media Post" },
  { id: 3, title: "Republic Day Design", category: "social-posts", client: "GigSoft Pro", tag: "Social Media Post" },
  { id: 4, title: "Dhanteras Offer Post", category: "social-posts", client: "GigSoft Pro", tag: "Social Media Post" },
  { id: 5, title: "Ganesh Chaturthi Post", category: "social-posts", client: "GigSoft Pro", tag: "Social Media Post" },
  { id: 6, title: "Festive Social Bundle", category: "social-posts", client: "Vibrantick", tag: "Social Media Post" },
  { id: 7, title: "Passport Service Ad", category: "social-posts", client: "Client", tag: "Social Media Post" },
  { id: 8, title: "British Passport Creative", category: "social-posts", client: "Client", tag: "Social Media Post" },
  { id: 9, title: "Real Results Campaign", category: "social-posts", client: "EverGlance", tag: "Social Media Post" },
  { id: 10, title: "Scooty Sale Post", category: "social-posts", client: "Krishna Scooty", tag: "Social Media Post" },
  { id: 11, title: "Janmashtami Creative", category: "social-posts", client: "Client", tag: "Social Media Post" },
  { id: 12, title: "Republic Day Offer", category: "social-posts", client: "Client", tag: "Social Media Post" },

  // Reels & Shorts
  { id: 13, title: "Digital Marketing Course Reel", category: "reels", client: "GigSoft Pro", tag: "Social Media Reel" },
  { id: 14, title: "Business Money Reel", category: "reels", client: "GigSoft Pro", tag: "Social Media Reel" },
  { id: 15, title: "To Paid Ads Reel", category: "reels", client: "Client", tag: "Social Media Reel" },
  { id: 16, title: "Not The Sleeping One", category: "reels", client: "Client", tag: "Social Media Reel" },
  { id: 17, title: "Meta Ads Short", category: "reels", client: "Client", tag: "YouTube Short" },
  { id: 18, title: "There's No Truth Short", category: "reels", client: "Client", tag: "YouTube Short" },
  { id: 19, title: "Question Mark Creative", category: "reels", client: "Client", tag: "YouTube Short" },
  { id: 20, title: "Office Team Reel", category: "reels", client: "Client", tag: "Social Media Reel" },

  // Logos
  { id: 21, title: "Food Fusion Logo", category: "logos", client: "Food Fusion", tag: "Visual Identity" },
  { id: 22, title: "Food Fusion Brand Kit", category: "logos", client: "Food Fusion", tag: "Visual Identity" },
  { id: 23, title: "Nova Salon Logo", category: "logos", client: "Nova Salon", tag: "Visual Identity" },
  { id: 24, title: "Nova Salon Branding", category: "logos", client: "Nova Salon", tag: "Visual Identity" },
  { id: 25, title: "Food Fusion Variations", category: "logos", client: "Food Fusion", tag: "Visual Identity" },
  { id: 26, title: "Nova Color Palette", category: "logos", client: "Nova Salon", tag: "Visual Identity" },

  // Packaging
  { id: 27, title: "Almonds Packaging", category: "packaging", client: "Crazy Nuts", tag: "Packaging Design" },
  { id: 28, title: "Cashews Pouch Design", category: "packaging", client: "Crazy Nuts", tag: "Packaging Design" },
  { id: 29, title: "Raisins Packaging", category: "packaging", client: "Crazy Nuts", tag: "Packaging Design" },
  { id: 30, title: "Walnuts Pouch", category: "packaging", client: "Crazy Nuts", tag: "Packaging Design" },
  { id: 31, title: "Almonds Front & Back", category: "packaging", client: "Crazy Nuts", tag: "Packaging Design" },
  { id: 32, title: "Cashews Label Design", category: "packaging", client: "Crazy Nuts", tag: "Packaging Design" },
  { id: 33, title: "Raisins Nutrition Panel", category: "packaging", client: "Crazy Nuts", tag: "Packaging Design" },
  { id: 34, title: "Walnuts Full Set", category: "packaging", client: "Crazy Nuts", tag: "Packaging Design" },

  // Ads & Covers
  { id: 35, title: "Travel Diwali Cover", category: "ads", client: "Trip Planner", tag: "Facebook Cover" },
  { id: 36, title: "Road Trip Banner", category: "ads", client: "Trip Planner", tag: "Facebook Cover" },
  { id: 37, title: "Christmas Travel Ad", category: "ads", client: "Trip Planner", tag: "Ads Design" },
  { id: 38, title: "New Year Adventures", category: "ads", client: "Trip Planner", tag: "Ads Design" },
  { id: 39, title: "Explore Asia Ad", category: "ads", client: "Trip Planner", tag: "Ads Design" },
  { id: 40, title: "Flight Deals Creative", category: "ads", client: "Trip Planner", tag: "Ads Design" },
  { id: 41, title: "Travel India Offer", category: "ads", client: "Trip Planner", tag: "Ads Design" },
  { id: 42, title: "Bali & Maldives Promo", category: "ads", client: "Trip Planner", tag: "Ads Design" },
  { id: 43, title: "Smart Ads Campaign", category: "ads", client: "GigSoft Pro", tag: "GMB Post" },
  { id: 44, title: "Hybrid App Promo", category: "ads", client: "GigSoft Pro", tag: "GMB Post" },

  // Other
  { id: 45, title: "SBI Car Loan Ad", category: "other", client: "SBI", tag: "Other Work" },
  { id: 46, title: "Hair Oil Product Post", category: "other", client: "Client", tag: "Other Work" },
  { id: 47, title: "Maybelline Product", category: "other", client: "Maybelline", tag: "Other Work" },
  { id: 48, title: "Revlon Mascara", category: "other", client: "Revlon", tag: "Other Work" },
  { id: 49, title: "Cristiano Ronaldo Post", category: "other", client: "Sports", tag: "Sports Post" },
  { id: 50, title: "Football Winners", category: "other", client: "Sports", tag: "Sports Post" },
  { id: 51, title: "Champions Creative", category: "other", client: "Sports", tag: "Sports Post" },
  { id: 52, title: "Baby Shampoo Post", category: "other", client: "Client", tag: "Other Work" },
  { id: 53, title: "Damaged Hair Solution", category: "other", client: "Client", tag: "Other Work" },
];
