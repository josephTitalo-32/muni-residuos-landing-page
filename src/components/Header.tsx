import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Smartphone, MapPin, AlertCircle, Recycle, HeartHandshake, Sprout, Newspaper, ChevronDown } from 'lucide-react';

interface SubNavItem {
  id: string;
  label: string;
  href: string;
}

interface NavItem {
  id: string;
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  hasDropdown?: boolean;
  subItems?: SubNavItem[];
}

export const Header: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [reciclajeOpen, setReciclajeOpen] = useState(false);
  const [mobileReciclajeOpen, setMobileReciclajeOpen] = useState(false);
  const reciclajeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const reciclajeRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll tracking: determina qué sección está visible
  useEffect(() => {
    const handleScrollTracking = () => {
      const sections = ['rutas', 'segregacion', 'compostaje', 'sumac-ayni', 'actualidad', 'reporta', 'faq'];
      const scrollPosition = window.scrollY + 200;
      let foundSection = '';

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            foundSection = sectionId;
            break;
          }
        }
      }
      setActiveSection(foundSection);
    };

    window.addEventListener('scroll', handleScrollTracking, { passive: true });
    handleScrollTracking();
    return () => window.removeEventListener('scroll', handleScrollTracking);
  }, []);

  // Reset del acordeón mobile cuando el drawer se cierra
  useEffect(() => {
    if (!mobileMenuOpen) {
      setMobileReciclajeOpen(false);
    }
  }, [mobileMenuOpen]);

  // Cerrar dropdown al hacer click fuera o presionar ESC
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (reciclajeRef.current && !reciclajeRef.current.contains(e.target as Node)) {
        setReciclajeOpen(false);
      }
    };

    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setReciclajeOpen(false);
      }
    };

    if (reciclajeOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscapeKey);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [reciclajeOpen]);

  const navLinks: NavItem[] = [
    { id: 'rutas', label: '29 Rutas', href: '#rutas', icon: MapPin },
    { 
      id: 'reciclaje', 
      label: 'Reciclaje', 
      href: '#segregacion', 
      icon: Recycle,
      hasDropdown: true,
      subItems: [
        { id: 'segregacion', label: 'Segregación', href: '#segregacion' },
        { id: 'compostaje', label: 'Compostaje', href: '#compostaje' },
        { id: 'sumac-ayni', label: 'Sumac Ayni', href: '#sumac-ayni' },
      ]
    },
    { id: 'actualidad', label: 'Actualidad', href: '#actualidad', icon: Newspaper },
    { id: 'reporta', label: 'Reporta al Vecino', href: '#reporta', icon: AlertCircle },
    { id: 'app-movil', label: 'App Móvil', href: '#', icon: Smartphone },
  ];

  const handleReciclajeEnter = () => {
    if (reciclajeTimeoutRef.current) {
      clearTimeout(reciclajeTimeoutRef.current);
      reciclajeTimeoutRef.current = null;
    }
    setReciclajeOpen(true);
  };

  const handleReciclajeLeave = () => {
    reciclajeTimeoutRef.current = setTimeout(() => {
      setReciclajeOpen(false);
    }, 150);
  };

  const handleReciclajeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setReciclajeOpen((prev) => !prev);
  };

  useEffect(() => {
    return () => {
      if (reciclajeTimeoutRef.current) {
        clearTimeout(reciclajeTimeoutRef.current);
      }
    };
  }, []);

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-2xs'
          : 'bg-transparent border-b border-transparent shadow-none'
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
        <div className="flex items-center justify-between h-14">
          
          {/* Compact Logo & Municipal Identity */}
          <a href="#" className="flex items-center gap-3 group shrink-0" id="header-logo">
            <img
              src="/images/escudo-puno.png"
              alt="Escudo de Puno"
              className="w-11 h-11 sm:w-12 sm:h-12 object-contain transition-transform duration-200 group-hover:scale-105"
            />
            <div className="flex flex-col leading-tight">
              <span
                className={`text-base sm:text-lg font-extrabold tracking-tight transition-colors ${
                  isScrolled
                    ? 'text-[#004173] group-hover:text-[#2096d2]'
                    : 'text-white group-hover:text-white/80'
                }`}
              >
                Municipalidad
              </span>
              <span
                className={`text-base sm:text-lg font-extrabold tracking-tight transition-colors ${
                  isScrolled
                    ? 'text-[#004173] group-hover:text-[#2096d2]'
                    : 'text-white group-hover:text-white/80'
                }`}
              >
                Provincial De Puno
              </span>
            </div>
          </a>

          {/* Clean Desktop Navigation (Text Only with Dropdown) */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-1.5" id="desktop-nav">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id || 
                (link.id === 'reciclaje' && ['segregacion', 'compostaje', 'sumac-ayni'].includes(activeSection));

              // Link normal (sin dropdown)
              if (!link.hasDropdown) {
                return (
                  <a
                    key={link.id}
                    href={link.href}
                    id={`nav-link-${link.id}`}
                    className={`px-2.5 xl:px-3 py-1.5 rounded-lg text-sm xl:text-[15px] transition-all duration-150 ${
                      isScrolled
                        ? isActive
                          ? 'text-[#004173] bg-slate-100 font-bold'
                          : 'text-slate-700 hover:text-[#004173] hover:bg-slate-50 font-semibold'
                        : isActive
                          ? 'text-white bg-white/25 font-bold backdrop-blur-xs shadow-2xs'
                          : 'text-white hover:text-white hover:bg-white/10 font-semibold'
                    }`}
                  >
                    {link.label}
                  </a>
                );
              }

              // Link con dropdown (Reciclaje)
              return (
                <div
                  key={link.id}
                  ref={reciclajeRef}
                  className="relative"
                  onMouseEnter={handleReciclajeEnter}
                  onMouseLeave={handleReciclajeLeave}
                >
                  <button
                    type="button"
                    id={`nav-link-${link.id}`}
                    onClick={handleReciclajeClick}
                    aria-expanded={reciclajeOpen}
                    aria-haspopup="true"
                    aria-controls="reciclaje-dropdown"
                    className={`inline-flex items-center gap-1 px-2.5 xl:px-3 py-1.5 rounded-lg text-sm xl:text-[15px] transition-all duration-150 cursor-pointer ${
                      isScrolled
                        ? isActive
                          ? 'text-[#004173] bg-slate-100 font-bold'
                          : 'text-slate-700 hover:text-[#004173] hover:bg-slate-50 font-semibold'
                        : isActive
                          ? 'text-white bg-white/25 font-bold backdrop-blur-xs shadow-2xs'
                          : 'text-white hover:text-white hover:bg-white/10 font-semibold'
                    }`}
                  >
                    <span>{link.label}</span>
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${reciclajeOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Dropdown Panel */}
                  {reciclajeOpen && (
                    <div
                      id="reciclaje-dropdown"
                      role="menu"
                      className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 w-56 rounded-xl shadow-xl border overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-150 ${
                        isScrolled
                          ? 'bg-white border-slate-200'
                          : 'bg-white/95 backdrop-blur-xl border-white/20'
                      }`}
                    >
                      <div className="py-1.5">
                        {link.subItems?.map((sub) => {
                          const isSubActive = activeSection === sub.id;
                          return (
                            <a
                              key={sub.id}
                              href={sub.href}
                              role="menuitem"
                              onClick={() => setReciclajeOpen(false)}
                              className={`block px-4 py-2.5 text-[13px] transition-colors ${
                                isSubActive
                                  ? 'bg-[#E6F2FA] text-[#004173] font-semibold'
                                  : 'text-slate-700 hover:bg-slate-50 hover:text-[#2096d2] font-medium'
                              }`}
                            >
                              {sub.label}
                            </a>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Mobile Hamburger Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              id="mobile-menu-toggle"
              type="button"
              aria-expanded={mobileMenuOpen}
              className={`p-1.5 rounded-lg focus:outline-hidden transition-colors ${
                isScrolled
                  ? 'text-slate-600 hover:text-[#004173] hover:bg-slate-100'
                  : 'text-white hover:text-white hover:bg-white/15'
              }`}
              aria-label="Abrir menú de navegación"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          id="mobile-drawer"
          className={`lg:hidden border-t px-4 pt-3 pb-5 space-y-1.5 shadow-xl animate-in slide-in-from-top duration-200 ${
            isScrolled
              ? 'bg-white border-slate-200 text-slate-800'
              : 'bg-[#07192F]/98 backdrop-blur-xl border-white/15 text-white'
          }`}
        >
          {/* Mobile menu content continues here */}
        </div>
      )}
    </header>
  );
};