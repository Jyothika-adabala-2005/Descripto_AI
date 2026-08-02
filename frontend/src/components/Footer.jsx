import React from 'react';

const Footer = ({ setPage }) => {
  return (
    <footer className="bg-[#524493] text-white border-t border-white/10 mt-auto py-8 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        
        {/* Brand Info */}
        <div className="space-y-2">
          <h2 className="text-xl font-extrabold tracking-wider text-white">Descripto_AI</h2>
          <p className="text-xs text-white/80 leading-relaxed max-w-sm">
            Transforming raw product details into high-converting, marketplace-optimized copy instantly.
          </p>
        </div>

        {/* Quick Links */}
        <div className="space-y-2">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">Quick Navigation</h3>
          <ul className="flex flex-wrap justify-center md:justify-start gap-4 text-xs font-medium text-white/90">
            <li>
              <button 
                type="button"
                onClick={() => setPage('home')} 
                className="hover:underline transition cursor-pointer"
              >
                Home
              </button>
            </li>
            <li>
              <button 
                type="button"
                onClick={() => setPage('dashboard')} 
                className="hover:underline transition cursor-pointer"
              >
                Dashboard
              </button>
            </li>
            <li>
              <button 
                type="button"
                onClick={() => setPage('list')} 
                className="hover:underline transition cursor-pointer"
              >
                Saved List
              </button>
            </li>
            <li>
              <button 
                type="button"
                onClick={() => setPage('about')} 
                className="hover:underline transition cursor-pointer"
              >
                About Us
              </button>
            </li>
          </ul>
        </div>

        {/* Tech Stack Specs */}
        <div className="space-y-2">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">Engine Specs</h3>
          <p className="text-xs text-white/80">
            Powered by <span className="font-semibold text-white">Google Gemini 3.5 Flash</span> &amp; <span className="font-semibold text-white">MongoDB Atlas</span>.
          </p>
          <div className="flex justify-center md:justify-start gap-2 pt-1 text-[11px] text-white/70">
            <span className="bg-white/10 px-2 py-0.5 rounded border border-white/10">Amazon Ready</span>
            <span className="bg-white/10 px-2 py-0.5 rounded border border-white/10">Flipkart Ready</span>
          </div>
        </div>

      </div>

      <div className="max-w-6xl mx-auto px-6 mt-8 pt-4 border-t border-white/10 text-center text-xs text-white/60">
        &copy; {new Date().getFullYear()} Descripto_AI. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;