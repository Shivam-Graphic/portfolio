import { useState, useEffect, useMemo } from 'react';
import { Menu, X, Linkedin, Instagram, Youtube, ExternalLink, Mail, Phone, MapPin, ChevronRight } from 'lucide-react';
import { profile, softwares, experience, education, categories, projects } from './data';
import './App.css';

const ITEMS_PER_PAGE = 6;

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

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

  // Reset visible count when category changes
  useEffect(() => {
    setVisibleCount(ITEMS_PER_PAGE);
  }, [activeCategory]);

  const filteredProjects = useMemo(() => {
    if (activeCategory === 'all') return projects;
    return projects.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  const visibleProjects = filteredProjects.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProjects.length;

  const loadMore = () => {
    setVisibleCount((prev) => prev + ITEMS_PER_PAGE);
  };

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'experience', label: 'Experience' },
    { id: 'work', label: 'Work' },
    { id: 'contact', label: 'Contact' },
  ];

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-transparent'}`}>
        <div className="container-custom flex items-center justify-between h-16 md:h-20">
          <a href="#home" onClick={(e) => { e.preventDefault(); scrollTo('home'); }} className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-primary-600 flex items-center justify-center text-white font-display font-bold text-lg">
              S
            </div>
            <div className="hidden sm:block">
              <p className="font-display font-semibold text-gray-900 leading-tight">Shivam Sharma</p>
              <p className="text-xs text-gray-500">Graphic Designer</p>
            </div>
          </a>

          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeSection === link.id
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-gray-600 hover:text-primary-600 hover:bg-gray-100'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
            <nav className="container-custom py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className={`px-4 py-3 rounded-lg text-left font-medium ${
                    activeSection === link.id ? 'bg-primary-50 text-primary-700' : 'text-gray-700'
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
      <section id="home" className="pt-24 md:pt-32 pb-16 md:pb-24 relative overflow-hidden">
        <div className="absolute top-20 right-0 w-72 h-72 bg-primary-100 rounded-full blur-3xl opacity-60 -z-10" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-50 -z-10" />
        
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative flex justify-center lg:justify-start">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-br from-primary-500 to-blue-400 rounded-3xl rotate-3 opacity-20" />
                <div className="absolute -inset-4 bg-primary-600/10 rounded-3xl -rotate-2" />
                <div className="relative w-64 h-72 md:w-80 md:h-96 rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-primary-600 to-blue-700 flex items-center justify-center">
                  <div className="text-center text-white p-6">
                    <div className="w-32 h-32 mx-auto rounded-full bg-white/20 flex items-center justify-center text-5xl font-display font-bold mb-4">
                      SS
                    </div>
                    <p className="text-sm opacity-80">Add your photo</p>
                    <p className="text-xs opacity-60 mt-1">public/profile.jpg</p>
                  </div>
                </div>
                <div className="absolute -bottom-4 -right-4 bg-white rounded-xl shadow-lg px-4 py-3 flex items-center gap-2">
                  <span className="text-2xl font-display font-bold text-primary-600">{profile.yearsExp}</span>
                  <span className="text-xs text-gray-500 leading-tight">YEARS<br/>EXP.</span>
                </div>
              </div>
            </div>

            <div className="text-center lg:text-left">
              <p className="text-primary-600 font-medium mb-2 tracking-wide uppercase text-sm">Graphic Designer</p>
              <h1 className="heading-display text-4xl sm:text-5xl md:text-6xl text-gray-900 mb-4">
                {profile.tagline} <br />
                <span className="text-primary-600">{profile.name}</span>
              </h1>
              <p className="text-gray-600 text-lg leading-relaxed mb-6 max-w-xl mx-auto lg:mx-0">
                {profile.bio}
              </p>
              <p className="text-gray-500 mb-8 max-w-xl mx-auto lg:mx-0">
                {profile.bio2}
              </p>

              <div className="flex flex-wrap gap-3 justify-center lg:justify-start mb-10">
                <button onClick={() => scrollTo('work')} className="btn-primary">
                  View My Work
                  <ChevronRight size={18} className="ml-1" />
                </button>
                <button onClick={() => scrollTo('contact')} className="btn-outline">
                  Contact Me
                </button>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-500 mb-3">Softwares</p>
                <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                  {softwares.map((sw) => (
                    <div key={sw.name} className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg shadow-sm border border-gray-100">
                      <span className="w-8 h-8 rounded-md bg-primary-50 text-primary-700 flex items-center justify-center text-xs font-bold">
                        {sw.icon.slice(0, 2)}
                      </span>
                      <span className="text-sm font-medium text-gray-700">{sw.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="heading-display text-3xl md:text-4xl text-gray-900 mb-3">About Me</h2>
            <div className="w-20 h-1 bg-primary-600 mx-auto rounded-full" />
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Who I Am</h3>
              <p className="text-gray-600 leading-relaxed mb-4">{profile.bio}</p>
              <p className="text-gray-600 leading-relaxed mb-6">{profile.bio2}</p>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">Education</h3>
              <div className="space-y-4">
                {education.map((edu, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex-shrink-0 w-24">
                      <span className="inline-block px-3 py-1 bg-primary-50 text-primary-700 text-xs font-medium rounded-full">
                        {edu.year}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{edu.title}</p>
                      <p className="text-sm text-gray-500">{edu.institution}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Skills & Tools</h3>
              <div className="space-y-5">
                {softwares.map((sw) => (
                  <div key={sw.name}>
                    <div className="flex justify-between mb-1.5">
                      <span className="text-sm font-medium text-gray-700">{sw.name}</span>
                      <span className="text-sm text-gray-500">{sw.level}%</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-primary-500 to-primary-600 rounded-full"
                        style={{ width: `${sw.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-5 bg-primary-50 rounded-2xl">
                <h4 className="font-semibold text-primary-900 mb-2">Languages</h4>
                <p className="text-primary-800">Hindi • English • Punjabi</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience */}
      <section id="experience" className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="heading-display text-3xl md:text-4xl text-gray-900 mb-3">Work Experience</h2>
            <div className="w-20 h-1 bg-primary-600 mx-auto rounded-full" />
          </div>

          <div className="max-w-3xl mx-auto space-y-8">
            {experience.map((exp, index) => (
              <div key={exp.id} className="relative pl-8 md:pl-0">
                {index !== experience.length - 1 && (
                  <div className="absolute left-3 top-10 bottom-0 w-0.5 bg-primary-100 md:hidden" />
                )}
                
                <div className="card p-6 md:p-8 relative">
                  <div className="absolute left-0 top-8 w-3 h-3 rounded-full bg-primary-600 -translate-x-[1.65rem] md:hidden" />
                  
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">{exp.role}</h3>
                      <p className="text-primary-600 font-medium">{exp.company}</p>
                    </div>
                    <span className="inline-flex items-center px-3 py-1 bg-primary-50 text-primary-700 text-sm font-medium rounded-full whitespace-nowrap">
                      {exp.period}
                    </span>
                  </div>
                  <ul className="space-y-2">
                    {exp.points.map((point, i) => (
                      <li key={i} className="flex gap-3 text-gray-600">
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
      </section>

      {/* Work */}
      <section id="work" className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="heading-display text-3xl md:text-4xl text-gray-900 mb-3">My Work</h2>
            <div className="w-20 h-1 bg-primary-600 mx-auto rounded-full mb-4" />
            <p className="text-gray-600 max-w-2xl mx-auto">
              A selection of social media posts, reels, brand identities, packaging, and ad designs created for diverse clients.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeCategory === cat.id
                    ? 'bg-primary-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-primary-50 hover:text-primary-700'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleProjects.map((project) => (
              <div key={project.id} className="card group cursor-pointer">
                <div className="aspect-[4/3] bg-gradient-to-br from-primary-100 to-blue-50 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-primary-900/0 group-hover:bg-primary-900/60 transition-all duration-300 flex items-center justify-center">
                    <ExternalLink className="text-white opacity-0 group-hover:opacity-100 transition-opacity" size={28} />
                  </div>
                  <span className="text-primary-300 font-display font-bold text-4xl">
                    {String(project.id).padStart(2, '0')}
                  </span>
                </div>
                <div className="p-4">
                  <p className="text-xs text-primary-600 font-medium mb-1">{project.tag}</p>
                  <h4 className="font-semibold text-gray-900">{project.title}</h4>
                  <p className="text-sm text-gray-500 mt-1">{project.client}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Load More Button */}
          {hasMore && (
            <div className="text-center mt-10">
              <button
                onClick={loadMore}
                className="btn-primary"
              >
                Load More
                <ChevronRight size={18} className="ml-1" />
              </button>
              <p className="text-sm text-gray-500 mt-3">
                Showing {visibleProjects.length} of {filteredProjects.length} projects
              </p>
            </div>
          )}

          {!hasMore && filteredProjects.length > 0 && (
            <div className="text-center mt-10">
              <p className="text-sm text-gray-500 mb-4">
                Showing all {filteredProjects.length} projects
              </p>
              <a
                href={profile.socials.behance}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline"
              >
                View Full Portfolio on Behance
                <ExternalLink size={16} className="ml-2" />
              </a>
            </div>
          )}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="heading-display text-3xl md:text-4xl text-gray-900 mb-3">Get In Touch</h2>
            <div className="w-20 h-1 bg-primary-600 mx-auto rounded-full" />
          </div>

          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
            <div className="card p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Contact Info</h3>
              <div className="space-y-5">
                <a href={`mailto:${profile.email}`} className="flex items-center gap-4 text-gray-600 hover:text-primary-600 transition-colors">
                  <div className="w-12 h-12 rounded-full bg-primary-50 flex items-center justify-center text-primary-600">
                    <Mail size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium">{profile.email}</p>
                  </div>
                </a>
                <a href={`tel:${profile.phone.replace(/\s/g, '')}`} className="flex items-center gap-4 text-gray-600 hover:text-primary-600 transition-colors">
                  <div className="w-12 h-12 rounded-full bg-primary-50 flex items-center justify-center text-primary-600">
                    <Phone size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="font-medium">{profile.phone}</p>
                  </div>
                </a>
                <div className="flex items-center gap-4 text-gray-600">
                  <div className="w-12 h-12 rounded-full bg-primary-50 flex items-center justify-center text-primary-600">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="font-medium">{profile.location}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="card p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Follow Me</h3>
              <div className="grid grid-cols-2 gap-4">
                <a href={profile.socials.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 hover:bg-primary-50 transition-colors">
                  <Linkedin className="text-primary-600" size={22} />
                  <span className="font-medium text-gray-700">LinkedIn</span>
                </a>
                <a href={profile.socials.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 hover:bg-primary-50 transition-colors">
                  <Instagram className="text-primary-600" size={22} />
                  <span className="font-medium text-gray-700">Instagram</span>
                </a>
                <a href={profile.socials.youtube} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 hover:bg-primary-50 transition-colors">
                  <Youtube className="text-primary-600" size={22} />
                  <span className="font-medium text-gray-700">YouTube</span>
                </a>
                <a href={profile.socials.behance} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 hover:bg-primary-50 transition-colors">
                  <ExternalLink className="text-primary-600" size={22} />
                  <span className="font-medium text-gray-700">Behance</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary-600 flex items-center justify-center text-white font-display font-bold">
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
