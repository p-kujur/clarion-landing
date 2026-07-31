import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router';

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // slightly hacky way to check scroll state, but it works for now
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const [prevPathname, setPrevPathname] = useState(location.pathname);
  if (prevPathname !== location.pathname) {
    setPrevPathname(location.pathname);
    setMobileOpen(false);
  }

  // Handle Escape key to close mobile menu
  useEffect(() => {
    if (!mobileOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileOpen]);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About Us' },
    { path: '/work', label: 'Key Areas' },
    { path: '/contact', label: 'Contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white ${
        scrolled ? 'shadow-md py-2' : 'py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-14">
          {/* Brand */}
          <Link
            to="/"
            className="flex items-center gap-1.5 transition-opacity hover:opacity-80"
            aria-label="Clarion Global"
          >
            <div className="flex items-center">
              <img src="/images/clarion-logo.png" alt="" className="h-5 md:h-7 object-contain" aria-hidden="true" />
            </div>
            <span className="flex items-baseline" aria-hidden="true">
              <span className="font-real-serif font-normal text-[1.6rem] text-gray-500">global</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-sans font-semibold text-[15px] transition-colors ${
                  isActive(link.path)
                    ? 'text-[#2B468B]'
                    : 'text-[#171717] hover:text-[#2B468B]'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-[#171717] p-2"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              {mobileOpen ? (
                <>
                  <line x1="4" y1="4" x2="20" y2="20" stroke="currentColor" strokeWidth="2" />
                  <line x1="20" y1="4" x2="4" y2="20" stroke="currentColor" strokeWidth="2" />
                </>
              ) : (
                <>
                  <line x1="4" y1="6" x2="20" y2="6" stroke="currentColor" strokeWidth="2" />
                  <line x1="4" y1="12" x2="20" y2="12" stroke="currentColor" strokeWidth="2" />
                  <line x1="4" y1="18" x2="20" y2="18" stroke="currentColor" strokeWidth="2" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu & Backdrop Overlay */}
      {mobileOpen && (
        <>
          <div
            className="fixed inset-0 top-[70px] bg-black/40 z-40 md:hidden"
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />
          <div
            id="mobile-menu"
            className="md:hidden bg-white border-t border-gray-100 shadow-lg absolute w-full z-50"
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`font-sans font-semibold text-lg transition-colors ${
                    isActive(link.path)
                      ? 'text-[#2B468B]'
                      : 'text-[#171717] hover:text-[#2B468B]'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </>
      )}
    </nav>
  );
}
