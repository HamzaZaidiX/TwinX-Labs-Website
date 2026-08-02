import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun, Menu, X } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';
import { Link } from "react-router-dom";

// const LOGO_URL = 'https://i.ibb.co/jkmHpKGb/twinxlabs-logo.jpg';

const NAV_LINKS = [
  { id: 'courses', label: 'Courses' },
  { id: 'why-join', label: 'Why Join' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'services', label: 'Services' },
  { id: 'contact', label: 'Contact' },
];

const StickyHeader: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [isSticky, setIsSticky] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 120);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setMobileOpen(false);
    }
  }, []);

  return (
    <>
      <AnimatePresence>
        {isSticky && (
          <motion.header
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -80, opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' as const }}
            className="fixed top-0 left-0 right-0 z-50 border-b shadow-sm bg-background/90 backdrop-blur-md border-border/60"
          >
            <div className="container flex items-center justify-between h-16 px-4 mx-auto md:px-8">
              {/* Logo */}
<Link to="/"><button
  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
  className="group flex items-center gap-1 shrink-0"
>
  <h1 className="text-3xl md:text-4xl font-extrabold tracking-wide select-none">
    <span className="text-[#061A74] group-hover:text-[#0A2CA8] transition-colors duration-300 dark:text-foreground">
      T
    </span>

    <span className="text-[#061A74] group-hover:text-[#0A2CA8] transition-colors duration-300 dark:text-foreground">
      win
    </span>

    <span
      className="bg-gradient-to-br
      from-sky-400
      via-indigo-500
      via-purple-600
      via-pink-500
      to-orange-400
      bg-clip-text text-transparent
      drop-shadow-sm
      animate-[gradientShift_4s_ease_infinite] mx-1 bg-[length:200%_auto]"
    >
      X
    </span>

    <span className="text-[#061A74] group-hover:text-[#0A2CA8] transition-colors duration-300 dark:text-foreground">
      Labs
    </span>
  </h1>
</button>
</Link>

              {/* Desktop Nav */}
              <nav className="items-center hidden gap-1 md:flex">
              {NAV_LINKS.map((link) => (
  <button
    key={link.id}
    onClick={() => scrollToSection(link.id)}
    className="group relative w-full px-3 py-3 text-sm font-medium text-center whitespace-nowrap transition-colors rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted"
  >
    {link.label}
    <span className="absolute left-1/2 -translate-x-1/2 bottom-1.5 h-0.5 w-0 group-hover:w-2/3 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all duration-300 ease-out" />
  </button>
))}
              </nav>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleTheme}
                  aria-label="Toggle theme"
                  className="rounded-full"
                >
                  {theme === 'dark' ? (
                    <Sun className="w-5 h-5" />
                  ) : (
                    <Moon className="w-5 h-5" />
                  )}
                </Button>

                <Button
                  className="hidden px-5 text-sm font-semibold text-white rounded-full md:inline-flex bg-gradient-to-r from-cyan-500 to-blue-600 hover:opacity-90 h-9"
                  onClick={() => scrollToSection('contact')}
                >
                  Enroll Now
                </Button>

                {/* Mobile Menu Toggle */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full md:hidden"
                  onClick={() => setMobileOpen(!mobileOpen)}
                  aria-label="Toggle menu"
                >
                  {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </Button>
              </div>
            </div>

            {/* Mobile Nav */}
            <AnimatePresence>
              {mobileOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden border-t md:hidden border-border/60 bg-background/95 backdrop-blur-md"
                >
                  <nav className="flex flex-col gap-1 px-4 py-3">
                  {NAV_LINKS.map((link) => (
  <button
    key={link.id}
    onClick={() => scrollToSection(link.id)}
    className="group relative w-full px-3 py-3 text-sm font-medium text-center items-center whitespace-nowrap transition-colors rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted"
  >
    {link.label}
    <span className="absolute left-1/2 -translate-x-1/2 bottom-1.5 h-0.5 w-0 group-hover:w-2/3 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all duration-300 ease-out" />
  </button>
))}
                    <Button
                      className="w-full mt-2 text-sm font-semibold text-white rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:opacity-90 h-11"
                      onClick={() => scrollToSection('contact')}
                    >
                      Enroll Now
                    </Button>
                  </nav>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.header>
        )}
      </AnimatePresence>
    </>
  );
};

export default StickyHeader;
