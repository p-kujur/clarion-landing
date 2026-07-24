import { Link } from 'react-router';

export default function Footer() {
  return (
    <footer className="border-t border-[#1F2A4A] bg-[#1F2A4A]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        {/* Footer Grid - 3 Symmetrical Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 items-start">
          {/* Brand Column */}
          <div className="flex flex-col">
            <Link to="/" className="flex items-center gap-3 mb-5 group">
              <div className="flex items-center">
                <img src="/images/clarion-logo.png" alt="Clarion" className="h-6 md:h-7 object-contain" />
              </div>
              <span className="font-serif font-semibold text-[1.35rem] text-white flex items-baseline">
                global
              </span>
            </Link>
            <p className="text-sm text-gray-300 leading-relaxed pr-2 max-w-sm">
              Education & Skill Pvt. Ltd. Crafting access, awareness, and impact
              through education and communication.
            </p>
          </div>

          {/* Quick Links Column */}
          <div className="flex flex-col md:pl-8">
            <h4 className="font-sans font-bold text-xs uppercase tracking-widest text-gray-400 mb-5 flex items-center h-7">
              Navigation
            </h4>
            <ul className="space-y-2.5">
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

          {/* Contact Us Column */}
          <div className="flex flex-col">
            <h4 className="font-sans font-bold text-xs uppercase tracking-widest text-gray-400 mb-5 flex items-center h-7">
              Contact Us
            </h4>
            <ul className="space-y-2.5 text-sm text-gray-300">
              <li>
                <a
                  href="mailto:clarion.jh@gmail.com"
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
                  className="text-gray-400 text-xs pt-1 leading-relaxed hover:text-[#F58220] transition-colors block"
                >
                  Lucas Building, Opp. Arya Hotel, Lalpur, Ranchi &mdash; 834001
                </a>
              </li>
              <li className="pt-2">
                <Link to="/contact" className="text-xs font-bold text-[#F58220] hover:underline inline-flex items-center gap-1">
                  Contact Page &rarr;
                </Link>
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
