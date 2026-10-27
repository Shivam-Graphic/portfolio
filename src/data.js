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
  { id: "social-posts", name: "Social Media Posts", count: 12 },
  { id: "reels", name: "Reels & Shorts", count: 8 },
  { id: "logos", name: "Logo & Brand Identity", count: 6 },
  { id: "packaging", name: "Packaging Design", count: 8 },
  { id: "ads", name: "Ads & Covers", count: 10 },
  { id: "other", name: "Other Work", count: 9 },
];

export const projects = [];
