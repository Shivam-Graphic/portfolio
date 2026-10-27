import { useState, useEffect, useMemo, useRef } from 'react';
import { Menu, X, Linkedin, Instagram, Youtube, ExternalLink, Mail, Phone, MapPin, ChevronRight, Sun, Moon, Briefcase, GraduationCap, Download } from 'lucide-react';
import { profile, softwares, experience, education, categories, projects } from './data';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './App.css';

gsap.registerPlugin(ScrollTrigger);

const ITEMS_PER_PAGE = 6;

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(true);

  const heroRef = useRef(null);
  const aboutRef = useRef(null);
  const expRef = useRef(null);
  const workRef = useRef(null);
  const contactRef = useRef(null);

  // Loader
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1100);
    return () => clearTimeout(timer);
  }, []);

  // Dark mode
  useEffect(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode((prev) => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
      return next;
    });
  };

  // GSAP Scroll Animations
  useEffect(() => {
    if (loading) return;

    const ctx = gsap.context(() => {
      // Hero
      gsap.from('.hero-content > *', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power3.out',
        delay: 0.2,
      });
      gsap.from('.hero-image', {
        scale: 0.9,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        delay: 0.1,
      });

      // Section titles
      gsap.utils.toArray('.section-title').forEach((el) => {
        gsap.from(el, {
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          y: 30,
          opacity: 0,
          duration: 0.7,
          ease: 'power3.out',
        });
      });

      // About cards
      gsap.utils.toArray('.about-card').forEach((el, i) => {
        gsap.from(el, {
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
          y: 40,
          opacity: 0,
          duration: 0.7,
          delay: i * 0.1,
          ease: 'power3.out',
        });
      });

      // Experience items
      gsap.utils.toArray('.exp-item').forEach((el, i) => {
        gsap.from(el, {
          scrollTrigger: {
            trigger: el,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
          x: -30,
          opacity: 0,
          duration: 0.7,
          delay: i * 0.15,
          ease: 'power3.out',
        });
      });

      // Work cards
      gsap.utils.toArray('.work-card').forEach((el, i) => {
        gsap.from(el, {
          scrollTrigger: {
            trigger: el,
            start: 'top 92%',
            toggleActions: 'play none none none',
          },
          y: 40,
          opacity: 0,
          duration: 0.6,
          delay: (i % 3) * 0.08,
          ease: 'power3.out',
        });
      });

      // Contact cards
      gsap.utils.toArray('.contact-card').forEach((el, i) => {
        gsap.from(el, {
          scrollTrigger: {
            trigger: el,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
          y: 30,
          opacity: 0,
          duration: 0.7,
          delay: i * 0.12,
          ease: 'power3.out',
        });
      });
    });

    return () => ctx.revert();
  }, [loading]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      const sections = ['home', 'about', 'experience', 'work', 'contact'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setVisibleCount(ITEMS_PER_PAGE);
  }, [activeCategory]);

  const filteredProjects = useMemo(() => {
    if (activeCategory === 'all') return projects;
    return projects.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  const visibleProjects = filteredProjects.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProjects.length;

  const loadMore = () => setVisibleCount((prev) => prev + ITEMS_PER_PAGE);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'experience', label: 'Experience' },
    { id: 'work', label: 'Work' },
    { id: 'contact', label: 'Contact' },
  ];

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  if (loading) {
    return (
      <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white dark:bg-gray-950 transition-colors">
        <div className="relative">
          <div className="w-16 h-16 rounded-full border-4 border-primary-100 dark:border-primary-900 border-t-primary-600 animate-spin" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-primary-600 font-display font-bold text-xl">S</span>
          </div>
        </div>
        <p className="mt-6 text-gray-500 dark:text-gray-400 text-sm font-medium tracking-wide">Loading Portfolio...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-800 dark:text-gray-100 transition-colors duration-300">
      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-sm border-b border-gray-100 dark:border-gray-800'
          : 'bg-transparent'
      }`}>
        <div className="container-custom flex items-center justify-between h-16 md:h-20">
          <a href="#home" onClick={(e) => { e.preventDefault(); scrollTo('home'); }} className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white font-display font-bold text-lg shadow-md">
              S
            </div>
            <div className="hidden sm:block">
              <p className="font-display font-semibold text-gray-900 dark:text-white leading-tight">Shivam Sharma</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Graphic Designer</p>
            </div>
          </a>

          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeSection === link.id
                    ? 'bg-primary-50 dark:bg-primary-900/40 text-primary-700 dark:text-primary-300'
                    : 'text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleDarkMode}
              className="p-2.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-primary-900/40 hover:text-primary-600 transition-colors"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <button
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 shadow-lg">
            <nav className="container-custom py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className={`px-4 py-3 rounded-lg text-left font-medium ${
                    activeSection === link.id
                      ? 'bg-primary-50 dark:bg-primary-900/40 text-primary-700 dark:text-primary-300'
                      : 'text-gray-700 dark:text-gray-300'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </nav>
          </div>
        )}
      </header>

      {/* Hero */}
      <section id="home" ref={heroRef} className="pt-24 md:pt-32 pb-16 md:pb-24 relative overflow-hidden">
        <div className="absolute top-20 right-0 w-72 h-72 bg-primary-200/40 dark:bg-primary-900/20 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-100/50 dark:bg-blue-900/10 rounded-full blur-3xl -z-10" />

        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative flex justify-center lg:justify-start order-1 hero-image">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-br from-primary-500 to-blue-400 rounded-3xl rotate-3 opacity-20 dark:opacity-30" />
                <div className="absolute -inset-4 bg-primary-600/10 dark:bg-primary-500/10 rounded-3xl -rotate-2" />
                <div className="relative w-64 h-72 md:w-80 md:h-96 rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-primary-600 to-blue-700 flex items-center justify-center">
                  <div className="text-center text-white p-6">
                    <div className="w-32 h-32 mx-auto rounded-full bg-white/20 flex items-center justify-center text-5xl font-display font-bold mb-4 backdrop-blur-sm">
                      SS
                    </div>
                    <p className="text-sm opacity-80">Add your photo</p>
                    <p className="text-xs opacity-60 mt-1">public/profile.jpg</p>
                  </div>
                </div>
                <div className="absolute -bottom-4 -right-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg px-4 py-3 flex items-center gap-2 border border-gray-100 dark:border-gray-700">
                  <span className="text-2xl font-display font-bold text-primary-600 dark:text-primary-400">{profile.yearsExp}</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400 leading-tight">YEARS<br />EXP.</span>
                </div>
              </div>
            </div>

            <div className="text-center lg:text-left order-2 hero-content">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-sm font-medium mb-4">
                <span className="w-2 h-2 rounded-full bg-primary-500 animate-pulse" />
                Available for work
              </div>
              <h1 className="heading-display text-4xl sm:text-5xl md:text-6xl text-gray-900 dark:text-white mb-4">
                {profile.tagline} <br />
                <span className="bg-gradient-to-r from-primary-600 to-blue-500 bg-clip-text text-transparent">{profile.name}</span>
              </h1>
              <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-6 max-w-xl mx-auto lg:mx-0">
                {profile.bio}
              </p>
              <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-xl mx-auto lg:mx-0">
                {profile.bio2}
              </p>

              <div className="flex flex-wrap gap-3 justify-center lg:justify-start mb-10">
                <button onClick={() => scrollTo('work')} className="btn-primary">
                  View My Work
                  <ChevronRight size={18} className="ml-1" />
                </button>
                <a
                  href="/portfolio/CV.pdf"
                  download="Shivam_Sharma_CV.pdf"
                  className="btn-outline"
                >
                  <Download size={18} className="mr-2" />
                  Download CV
                </a>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">Softwares</p>
                <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                  {softwares.map((sw) => (
                    <div key={sw.name} className="flex items-center gap-2 bg-white dark:bg-gray-800 px-3 py-2 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
                      <span className="w-8 h-8 rounded-md bg-primary-50 dark:bg-primary-900/40 text-primary-700 dark:text-primary-300 flex items-center justify-center text-xs font-bold">
                        {sw.icon.slice(0, 2)}
                      </span>
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-200">{sw.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" ref={aboutRef} className="section-padding bg-white dark:bg-gray-900/50">
        <div className="container-custom">
          <div className="text-center mb-14 section-title">
            <h2 className="heading-display text-3xl md:text-4xl text-gray-900 dark:text-white mb-3">About Me</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-primary-500 to-blue-500 mx-auto rounded-full" />
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div className="space-y-6">
              <div className="card p-6 about-card">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-lg bg-primary-50 dark:bg-primary-900/40 flex items-center justify-center text-primary-600">
                    <Briefcase size={16} />
                  </span>
                  Who I Am
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">{profile.bio}</p>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{profile.bio2}</p>
              </div>

              <div className="card p-6 about-card">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-lg bg-primary-50 dark:bg-primary-900/40 flex items-center justify-center text-primary-600">
                    <GraduationCap size={16} />
                  </span>
                  Education
                </h3>
                <div className="space-y-4">
                  {education.map((edu, i) => (
                    <div key={i} className="flex gap-4 items-start">
                      <span className="inline-block px-3 py-1 bg-primary-50 dark:bg-primary-900/40 text-primary-700 dark:text-primary-300 text-xs font-medium rounded-full whitespace-nowrap">
                        {edu.year}
                      </span>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{edu.title}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{edu.institution}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="card p-6 about-card">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Skills & Tools</h3>
              <div className="space-y-5">
                {softwares.map((sw) => (
                  <div key={sw.name}>
                    <div className="flex justify-between mb-1.5">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-200">{sw.name}</span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">{sw.level}%</span>
                    </div>
                    <div className="h-2.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-primary-500 to-blue-500 rounded-full transition-all duration-1000"
                        style={{ width: `${sw.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-5 bg-gradient-to-br from-primary-50 to-blue-50 dark:from-primary-900/30 dark:to-blue-900/20 rounded-2xl">
                <h4 className="font-semibold text-primary-900 dark:text-primary-200 mb-2">Languages</h4>
                <p className="text-primary-800 dark:text-primary-300">Hindi • English • Punjabi</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience - Clean Vertical Timeline */}
      <section id="experience" ref={expRef} className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-14 section-title">
            <h2 className="heading-display text-3xl md:text-4xl text-gray-900 dark:text-white mb-3">Work Experience</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-primary-500 to-blue-500 mx-auto rounded-full" />
          </div>

          <div className="max-w-2xl mx-auto relative">
            {/* Vertical line */}
            <div className="absolute left-[19px] top-3 bottom-3 w-0.5 bg-gradient-to-b from-primary-400 via-primary-300 to-primary-200 dark:from-primary-600 dark:via-primary-700 dark:to-primary-900" />

            <div className="space-y-8">
              {experience.map((exp) => (
                <div key={exp.id} className="relative pl-12 exp-item">
                  {/* Dot */}
                  <div className="absolute left-0 top-5 w-10 h-10 rounded-full bg-primary-600 border-4 border-white dark:border-gray-950 shadow-md flex items-center justify-center z-10">
                    <Briefcase size={14} className="text-white" />
                  </div>

                  <div className="card p-6 hover:-translate-y-1 transition-transform duration-300">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{exp.role}</h3>
                        <p className="text-primary-600 dark:text-primary-400 font-medium">{exp.company}</p>
                      </div>
                      <span className="inline-flex items-center px-3 py-1 bg-primary-50 dark:bg-primary-900/40 text-primary-700 dark:text-primary-300 text-sm font-medium rounded-full w-fit">
                        {exp.period}
                      </span>
                    </div>
                    <ul className="space-y-2.5">
                      {exp.points.map((point, i) => (
                        <li key={i} className="flex gap-3 text-gray-600 dark:text-gray-300 text-sm">
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary-400 flex-shrink-0" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Work */}
      <section id="work" ref={workRef} className="section-padding bg-white dark:bg-gray-900/50">
        <div className="container-custom">
          <div className="text-center mb-12 section-title">
            <h2 className="heading-display text-3xl md:text-4xl text-gray-900 dark:text-white mb-3">My Work</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-primary-500 to-blue-500 mx-auto rounded-full mb-4" />
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              A selection of social media posts, reels, brand identities, packaging, and ad designs created for diverse clients.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeCategory === cat.id
                    ? 'bg-primary-600 text-white shadow-md'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-primary-900/40 hover:text-primary-700'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleProjects.map((project) => (
              <div key={project.id} className="card group cursor-pointer hover:-translate-y-1 work-card">
                <div className="aspect-[4/3] bg-gradient-to-br from-primary-100 to-blue-50 dark:from-primary-900/40 dark:to-blue-900/20 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-primary-900/0 group-hover:bg-primary-900/60 transition-all duration-300 flex items-center justify-center">
                    <ExternalLink className="text-white opacity-0 group-hover:opacity-100 transition-opacity" size={28} />
                  </div>
                  <span className="text-primary-300 dark:text-primary-600 font-display font-bold text-4xl">
                    {String(project.id).padStart(2, '0')}
                  </span>
                </div>
                <div className="p-4">
                  <p className="text-xs text-primary-600 dark:text-primary-400 font-medium mb-1">{project.tag}</p>
                  <h4 className="font-semibold text-gray-900 dark:text-white">{project.title}</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{project.client}</p>
                </div>
              </div>
            ))}
          </div>

          {hasMore && (
            <div className="text-center mt-10">
              <button onClick={loadMore} className="btn-primary">
                Load More
                <ChevronRight size={18} className="ml-1" />
              </button>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-3">
                Showing {visibleProjects.length} of {filteredProjects.length} projects
              </p>
            </div>
          )}

          {!hasMore && filteredProjects.length > 0 && (
            <div className="text-center mt-10">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                Showing all {filteredProjects.length} projects
              </p>
              <a href={profile.socials.behance} target="_blank" rel="noopener noreferrer" className="btn-outline">
                View Full Portfolio on Behance
                <ExternalLink size={16} className="ml-2" />
              </a>
            </div>
          )}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" ref={contactRef} className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-12 section-title">
            <h2 className="heading-display text-3xl md:text-4xl text-gray-900 dark:text-white mb-3">Get In Touch</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-primary-500 to-blue-500 mx-auto rounded-full" />
          </div>

          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
            <div className="card p-8 contact-card">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Contact Info</h3>
              <div className="space-y-5">
                <a href={`mailto:${profile.email}`} className="flex items-center gap-4 text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  <div className="w-12 h-12 rounded-full bg-primary-50 dark:bg-primary-900/40 flex items-center justify-center text-primary-600 dark:text-primary-400">
                    <Mail size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                    <p className="font-medium">{profile.email}</p>
                  </div>
                </a>
                <a href={`tel:${profile.phone.replace(/\s/g, '')}`} className="flex items-center gap-4 text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  <div className="w-12 h-12 rounded-full bg-primary-50 dark:bg-primary-900/40 flex items-center justify-center text-primary-600 dark:text-primary-400">
                    <Phone size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Phone</p>
                    <p className="font-medium">{profile.phone}</p>
                  </div>
                </a>
                <div className="flex items-center gap-4 text-gray-600 dark:text-gray-300">
                  <div className="w-12 h-12 rounded-full bg-primary-50 dark:bg-primary-900/40 flex items-center justify-center text-primary-600 dark:text-primary-400">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Location</p>
                    <p className="font-medium">{profile.location}</p>
                  </div>
                </div>
              </div>

              <a
                href="/portfolio/CV.pdf"
                download="Shivam_Sharma_CV.pdf"
                className="btn-primary w-full mt-8 justify-center"
              >
                <Download size={18} className="mr-2" />
                Download CV
              </a>
            </div>

            <div className="card p-8 contact-card">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Follow Me</h3>
              <div className="grid grid-cols-2 gap-4">
                <a href={profile.socials.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 dark:bg-gray-800 hover:bg-primary-50 dark:hover:bg-primary-900/30 transition-colors">
                  <Linkedin className="text-primary-600 dark:text-primary-400" size={22} />
                  <span className="font-medium text-gray-700 dark:text-gray-200">LinkedIn</span>
                </a>
                <a href={profile.socials.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 dark:bg-gray-800 hover:bg-primary-50 dark:hover:bg-primary-900/30 transition-colors">
                  <Instagram className="text-primary-600 dark:text-primary-400" size={22} />
                  <span className="font-medium text-gray-700 dark:text-gray-200">Instagram</span>
                </a>
                <a href={profile.socials.youtube} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 dark:bg-gray-800 hover:bg-primary-50 dark:hover:bg-primary-900/30 transition-colors">
                  <Youtube className="text-primary-600 dark:text-primary-400" size={22} />
                  <span className="font-medium text-gray-700 dark:text-gray-200">YouTube</span>
                </a>
                <a href={profile.socials.behance} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 dark:bg-gray-800 hover:bg-primary-50 dark:hover:bg-primary-900/30 transition-colors">
                  <ExternalLink className="text-primary-600 dark:text-primary-400" size={22} />
                  <span className="font-medium text-gray-700 dark:text-gray-200">Behance</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-black text-gray-300 py-12">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white font-display font-bold">
                S
              </div>
              <div>
                <p className="font-display font-semibold text-white">Shivam Sharma</p>
                <p className="text-sm text-gray-400">Graphic Designer</p>
              </div>
            </div>
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} Shivam Sharma. All rights reserved.
            </p>
            <div className="flex gap-4">
              <a href={profile.socials.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                <Linkedin size={20} />
              </a>
              <a href={profile.socials.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href={profile.socials.youtube} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
