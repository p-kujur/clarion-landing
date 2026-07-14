import { Link } from 'react-router';

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-[#f9f5f0]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">


        {/* Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="flex items-center">
                <img src="/images/clarion-logo.png" alt="Clarion" className="h-5 md:h-6 object-contain" />
              </div>
              <span className="font-semibold text-lg text-[#2B468B]">
                Clarion Global
              </span>
            </Link>
            <p className="text-sm text-gray-700 leading-relaxed max-w-sm">
              Education & Skill Pvt. Ltd. Crafting access, awareness, and impact
              through education and communication since 2015.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-sans font-bold text-xs uppercase tracking-widest text-gray-500 mb-4">
              Navigation
            </h4>
            <ul className="space-y-2">
              {[
                { path: '/', label: 'Home' },
                { path: '/about', label: 'About Us' },
                { path: '/work', label: 'Key Areas' },
                { path: '/contact', label: 'Contact' },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-gray-700 hover:text-[#F58220] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Key Areas */}
          <div>
            <h4 className="font-sans font-bold text-xs uppercase tracking-widest text-gray-500 mb-4">
              Key Areas
            </h4>
            <ul className="space-y-2">
              {[
                'Notebook Initiative',
                'IEC & BCC',
                'Comic Learning',
                'Cultural Docs',
                'Strategic Comms',
              ].map((area) => (
                <li key={area}>
                  <Link
                    to="/work"
                    className="text-sm text-gray-700 hover:text-[#F58220] transition-colors"
                  >
                    {area}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-gray-200 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500 font-sans">
            {/* always keep the year current so we don't look stale */}
            &copy; {new Date().getFullYear()} Clarion Education & Skill Pvt. Ltd.
          </p>
          <p className="text-xs text-gray-500 font-sans">
            Bihar &middot; Jharkhand &middot; West Bengal
          </p>
        </div>
      </div>
    </footer>
  );
}
