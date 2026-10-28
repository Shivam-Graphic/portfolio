import { useState, useEffect, useMemo, useRef } from 'react';
import { Menu, X, Linkedin, Instagram, Youtube, ExternalLink, Mail, Phone, MapPin, ChevronRight, Sun, Moon, Briefcase, GraduationCap, Download } from 'lucide-react';
import { loadAllContent } from './data';
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
  const [content, setContent] = useState(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const data = await loadAllContent();
      if (!cancelled) {
        setContent(data);
        setTimeout(() => setLoading(false), 400);
      }
    })();
    return () => { cancelled = true; };
  }, []);

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

  useEffect(() => {
    if (loading) return;
    const ctx = gsap.context(() => {
      gsap.from('.hero-content > *', { y: 40, opacity: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out', delay: 0.2 });
      gsap.from('.hero-image', { scale: 0.9, opacity: 0, duration: 1, ease: 'power3.out', delay: 0.1 });
      gsap.utils.toArray('.section-title').forEach((el) => {
        gsap.from(el, { scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' }, y: 30, opacity: 0, duration: 0.7, ease: 'power3.out' });
      });
      gsap.utils.toArray('.work-card').forEach((el, i) => {
        gsap.from(el, { scrollTrigger: { trigger: el, start: 'top 92%', toggleActions: 'play none none none' }, y: 40, opacity: 0, duration: 0.6, delay: (i % 3) * 0.08, ease: 'power3.out' });
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
          if (rect.top <= 120 && rect.bottom >= 120) { setActiveSection(section); break; }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { setVisibleCount(ITEMS_PER_PAGE); }, [activeCategory]);

  const filteredProjects = useMemo(() => {
    const list = content?.projects || [];
    if (activeCategory === 'all') return list;
    return list.filter((p) => p.category === activeCategory);
  }, [activeCategory, content]);

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

  const profile = content?.profile || {};
  const softwares = content?.softwares || [];
  const experience = content?.experience || [];
  const education = content?.education || [];
  const categories = content?.categories || [];

  if (loading || !content) {
    return (
      <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white dark:bg-gray-950">
        <div className="w-16 h-16 rounded-full border-4 border-primary-100 dark:border-primary-900 border-t-primary-600 animate-spin" />
        <p className="mt-6 text-gray-500 text-sm">Loading Portfolio...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-800 dark:text-gray-100 transition-colors duration-300">
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all ${
        scrolled ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-sm border-b border-gray-100 dark:border-gray-800' : 'bg-transparent'
      }`}>
        <div className="container-custom flex items-center justify-between h-16 md:h-20">
          <a href="#home" onClick={(e) => { e.preventDefault(); scrollTo('home'); }} className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white font-bold text-lg">S</div>
            <div className="hidden sm:block">
              <p className="font-semibold text-gray-900 dark:text-white">{profile.name}</p>
              <p className="text-xs text-gray-500">{profile.title}</p>
            </div>
          </a>
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <button key={link.id} onClick={() => scrollTo(link.id)} className={`px-4 py-2 rounded-full text-sm font-medium ${
                activeSection === link.id ? 'bg-primary-50 dark:bg-primary-900/40 text-primary-700' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}>{link.label}</button>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <button onClick={toggleDarkMode} className="p-2.5 rounded-full bg-gray-100 dark:bg-gray-800" aria-label="Theme">{darkMode ? <Sun size={20} /> : <Moon size={20} />}</button>
            <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>{isMenuOpen ? <X size={24} /> : <Menu size={24} />}</button>
          </div>
        </div>
        {isMenuOpen && (
          <div className="md:hidden bg-white dark:bg-gray-900 border-t">
            <nav className="container-custom py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <button key={link.id} onClick={() => scrollTo(link.id)} className="px-4 py-3 text-left font-medium">{link.label}</button>
              ))}
            </nav>
          </div>
        )}
      </header>

      <section id="home" className="pt-24 md:pt-32 pb-16 md:pb-24 relative overflow-hidden">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative flex justify-center lg:justify-start order-1 hero-image">
              <div className="relative">
                <div className="relative w-64 h-72 md:w-80 md:h-96 rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-primary-600 to-blue-700 flex items-center justify-center">
                  {profile.photo ? (
                    <img src={profile.photo} alt={profile.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-center text-white p-6">
                      <div className="w-32 h-32 mx-auto rounded-full bg-white/20 flex items-center justify-center text-5xl font-bold mb-4">SS</div>
                      <p className="text-sm opacity-80">Add photo in CMS Media</p>
                    </div>
                  )}
                </div>
                <div className="absolute -bottom-4 -right-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg px-4 py-3 flex items-center gap-2">
                  <span className="text-2xl font-bold text-primary-600">{profile.yearsExp}</span>
                  <span className="text-xs text-gray-500">YEARS<br />EXP.</span>
                </div>
              </div>
            </div>
            <div className="text-center lg:text-left order-2 hero-content">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 dark:bg-primary-900/30 text-primary-700 text-sm font-medium mb-4">
                <span className="w-2 h-2 rounded-full bg-primary-500 animate-pulse" /> Available for work
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
                {profile.tagline} <br />
                <span className="bg-gradient-to-r from-primary-600 to-blue-500 bg-clip-text text-transparent">{profile.name}</span>
              </h1>
              <p className="text-gray-600 dark:text-gray-300 text-lg mb-6 max-w-xl">{profile.bio}</p>
              <p className="text-gray-500 mb-8 max-w-xl">{profile.bio2}</p>
              <div className="flex flex-wrap gap-3 justify-center lg:justify-start mb-10">
                <button onClick={() => scrollTo('work')} className="btn-primary">View My Work <ChevronRight size={18} className="ml-1" /></button>
                <a href="/CV.pdf" download className="btn-outline"><Download size={18} className="mr-2" /> Download CV</a>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 mb-3">Softwares</p>
                <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                  {softwares.map((sw) => (
                    <div key={sw.name} className="flex items-center gap-2 bg-white dark:bg-gray-800 px-3 py-2 rounded-lg border border-gray-100 dark:border-gray-700">
                      <span className="w-8 h-8 rounded-md bg-primary-50 dark:bg-primary-900/40 text-primary-700 flex items-center justify-center text-xs font-bold">{(sw.icon || '').slice(0, 2)}</span>
                      <span className="text-sm font-medium">{sw.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="section-padding bg-white dark:bg-gray-900/50">
        <div className="container-custom">
          <div className="text-center mb-14 section-title">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">About Me</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-primary-500 to-blue-500 mx-auto rounded-full" />
          </div>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div className="card p-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2"><Briefcase size={16} className="text-primary-600" /> Who I Am</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{profile.bio}</p>
                <p className="text-gray-600 dark:text-gray-300">{profile.bio2}</p>
              </div>
              <div className="card p-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2"><GraduationCap size={16} className="text-primary-600" /> Education</h3>
                <div className="space-y-4">
                  {education.map((edu, i) => (
                    <div key={i} className="flex gap-4">
                      <span className="px-3 py-1 bg-primary-50 dark:bg-primary-900/40 text-primary-700 text-xs font-medium rounded-full">{edu.year}</span>
                      <div>
                        <p className="font-medium">{edu.title}</p>
                        <p className="text-sm text-gray-500">{edu.institution}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="card p-6">
              <h3 className="text-xl font-semibold mb-6">Skills & Tools</h3>
              <div className="space-y-5">
                {softwares.map((sw) => (
                  <div key={sw.name}>
                    <div className="flex justify-between mb-1.5">
                      <span className="text-sm font-medium">{sw.name}</span>
                      <span className="text-sm text-gray-500">{sw.level}%</span>
                    </div>
                    <div className="h-2.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-primary-500 to-blue-500 rounded-full" style={{ width: `${sw.level}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="experience" className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-14 section-title">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">Work Experience</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-primary-500 to-blue-500 mx-auto rounded-full" />
          </div>
          <div className="max-w-2xl mx-auto relative">
            <div className="absolute left-[19px] top-3 bottom-3 w-0.5 bg-gradient-to-b from-primary-400 to-primary-200" />
            <div className="space-y-8">
              {experience.map((exp) => (
                <div key={exp.id} className="relative pl-12">
                  <div className="absolute left-0 top-5 w-10 h-10 rounded-full bg-primary-600 border-4 border-white dark:border-gray-950 shadow-md flex items-center justify-center z-10">
                    <Briefcase size={14} className="text-white" />
                  </div>
                  <div className="card p-6">
                    <div className="flex flex-col sm:flex-row sm:justify-between gap-2 mb-4">
                      <div>
                        <h3 className="text-xl font-semibold">{exp.role}</h3>
                        <p className="text-primary-600 font-medium">{exp.company}</p>
                      </div>
                      <span className="px-3 py-1 bg-primary-50 dark:bg-primary-900/40 text-primary-700 text-sm rounded-full w-fit">{exp.period}</span>
                    </div>
                    <ul className="space-y-2">
                      {(exp.points || []).map((point, i) => (
                        <li key={i} className="flex gap-2 text-gray-600 dark:text-gray-300 text-sm"><span className="text-primary-500">•</span>{point}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="work" className="section-padding bg-white dark:bg-gray-900/50">
        <div className="container-custom">
          <div className="text-center mb-10 section-title">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">My Work</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-primary-500 to-blue-500 mx-auto rounded-full" />
          </div>
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {categories.map((cat) => (
              <button key={cat.id} onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  activeCategory === cat.id ? 'bg-primary-600 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300'
                }`}>{cat.name}</button>
            ))}
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleProjects.map((project) => (
              <a key={project.id} href={project.link || undefined} target={project.link ? '_blank' : undefined} rel={project.link ? 'noopener noreferrer' : undefined}
                className="card group hover:-translate-y-1 work-card block" onClick={(e) => { if (!project.link) e.preventDefault(); }}>
                <div className="aspect-[4/3] bg-gradient-to-br from-primary-100 to-blue-50 dark:from-primary-900/40 dark:to-blue-900/20 relative overflow-hidden flex items-center justify-center">
                  {project.image ? (
                    <img src={project.image} alt={project.title} className="absolute inset-0 w-full h-full object-cover" />
                  ) : (
                    <span className="text-primary-300 font-bold text-4xl">{String(project.id).padStart(2, '0')}</span>
                  )}
                  <div className="absolute inset-0 bg-primary-900/0 group-hover:bg-primary-900/60 transition-all flex items-center justify-center z-10">
                    <ExternalLink className="text-white opacity-0 group-hover:opacity-100" size={28} />
                  </div>
                </div>
                <div className="p-4">
                  <span className="text-xs font-medium text-primary-600">{project.tag}</span>
                  <h4 className="font-semibold mt-1">{project.title}</h4>
                  <p className="text-sm text-gray-500 mt-1">{project.client}</p>
                </div>
              </a>
            ))}
          </div>
          {hasMore && (
            <div className="text-center mt-10">
              <button onClick={loadMore} className="btn-outline">Load More</button>
            </div>
          )}
        </div>
      </section>

      <section id="contact" className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-14 section-title">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">Get In Touch</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-primary-500 to-blue-500 mx-auto rounded-full" />
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <a href={`mailto:${profile.email}`} className="card p-6 text-center hover:-translate-y-1 transition-transform">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary-50 dark:bg-primary-900/40 flex items-center justify-center text-primary-600"><Mail size={22} /></div>
              <h3 className="font-semibold mb-1">Email</h3>
              <p className="text-sm text-gray-500 break-all">{profile.email}</p>
            </a>
            <a href={`tel:${profile.phone}`} className="card p-6 text-center hover:-translate-y-1 transition-transform">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary-50 dark:bg-primary-900/40 flex items-center justify-center text-primary-600"><Phone size={22} /></div>
              <h3 className="font-semibold mb-1">Phone</h3>
              <p className="text-sm text-gray-500">{profile.phone}</p>
            </a>
            <div className="card p-6 text-center">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary-50 dark:bg-primary-900/40 flex items-center justify-center text-primary-600"><MapPin size={22} /></div>
              <h3 className="font-semibold mb-1">Location</h3>
              <p className="text-sm text-gray-500">{profile.location}</p>
            </div>
          </div>
          <div className="flex justify-center gap-4 mt-10">
            {profile.socials?.linkedin && <a href={profile.socials.linkedin} target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-gray-100 dark:bg-gray-800 hover:text-primary-600"><Linkedin size={22} /></a>}
            {profile.socials?.instagram && <a href={profile.socials.instagram} target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-gray-100 dark:bg-gray-800 hover:text-primary-600"><Instagram size={22} /></a>}
            {profile.socials?.youtube && <a href={profile.socials.youtube} target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-gray-100 dark:bg-gray-800 hover:text-primary-600"><Youtube size={22} /></a>}
          </div>
        </div>
      </section>

      <footer className="border-t border-gray-200 dark:border-gray-800 py-8">
        <div className="container-custom text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} {profile.name || 'Shivam Sharma'}. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
