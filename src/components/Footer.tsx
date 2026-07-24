import { Link } from 'react-router';

export default function Footer() {
  const handleEmailClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );

    if (isMobile) {
      window.location.href = 'mailto:clarion.jh@gmail.com';
    } else {
      window.open(
        'https://mail.google.com/mail/?view=cm&fs=1&to=clarion.jh@gmail.com',
        '_blank',
        'noopener,noreferrer'
      );
    }
  };

  return (
    <footer className="border-t border-[#1F2A4A] bg-[#1F2A4A]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        {/* Footer Grid - 3 Proportional & Symmetrical Columns */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 lg:gap-12 items-start">
          {/* Brand Column (5 cols) */}
          <div className="md:col-span-5 flex flex-col">
            <Link to="/" className="flex items-center gap-3 mb-5 h-7 group">
              <div className="flex items-center">
                <img src="/images/clarion-logo.png" alt="Clarion" className="h-6 md:h-7 object-contain" />
              </div>
              <span className="font-serif font-semibold text-[1.35rem] text-white flex items-baseline">
                global
              </span>
            </Link>
            <p className="text-sm text-gray-300 leading-relaxed pr-4 max-w-md">
              Education & Skill Pvt. Ltd. Crafting access, awareness, and impact
              through education and communication.
            </p>
          </div>

          {/* Navigation Column (3 cols) */}
          <div className="md:col-span-3 flex flex-col">
            <h4 className="font-sans font-bold text-xs uppercase tracking-[0.2em] text-gray-400 mb-5 flex items-center h-7">
              Navigation
            </h4>
            <ul className="space-y-3">
              {[
                { path: '/', label: 'Home' },
                { path: '/about', label: 'About Us' },
                { path: '/work', label: 'Key Areas' },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-gray-300 hover:text-[#F58220] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Us Column (4 cols) */}
          <div className="md:col-span-4 flex flex-col">
            <h4 className="font-sans font-bold text-xs uppercase tracking-[0.2em] text-gray-400 mb-5 flex items-center h-7">
              Contact Us
            </h4>
            <ul className="space-y-3 text-sm text-gray-300">
              <li>
                <a
                  href="mailto:clarion.jh@gmail.com"
                  onClick={handleEmailClick}
                  className="hover:text-[#F58220] transition-colors break-all"
                >
                  clarion.jh@gmail.com
                </a>
              </li>
              <li>
                <a href="tel:+919065541555" className="hover:text-[#F58220] transition-colors">
                  +91 9065541555
                </a>
              </li>
              <li>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Lucas+Building,+Opp.+Arya+Hotel,+Lalpur,+Ranchi+-+834001"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 text-xs leading-relaxed hover:text-[#F58220] transition-colors block"
                >
                  Lucas Building, Opp. Arya Hotel, Lalpur, Ranchi &mdash; 834001
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-gray-700 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-400 font-sans">
            {/* always keep the year current so we don't look stale */}
            &copy; {new Date().getFullYear()} Clarion Education & Skill Pvt. Ltd.
          </p>
          <p className="text-xs text-gray-400 font-sans">
            Bihar &middot; Jharkhand &middot; West Bengal
          </p>
        </div>
      </div>
    </footer>
  );
}
