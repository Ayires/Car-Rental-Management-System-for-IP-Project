import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-primary-600 p-2 rounded-lg">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </div>
              <span className="text-lg font-bold">DriveEasy</span>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Experience the freedom of the road with our premium car rental service. Affordable, reliable, and just a click away.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-4 text-gray-400">
              <li><a href="#" className="hover:text-primary-400 transition-colors">Available Cars</a></li>
              <li><a href="#" className="hover:text-primary-400 transition-colors">Special Offers</a></li>
              <li><a href="#" className="hover:text-primary-400 transition-colors">How it Works</a></li>
              <li><a href="#" className="hover:text-primary-400 transition-colors">Support Center</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-6">Contact Us</h4>
            <ul className="space-y-4 text-gray-400">
              <li className="flex items-center gap-3">
                <i className="fas fa-map-marker-alt text-primary-500"></i>
                123 Rental Plaza, Addis Ababa, Ethiopia
              </li>
              <li className="flex items-center gap-3">
                <i className="fas fa-phone-alt text-primary-500"></i>
                +251 911 234 567
              </li>
              <li className="flex items-center gap-3">
                <i className="fas fa-envelope text-primary-500"></i>
                info@driveeasy.com
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} DriveEasy Car Rental Management System. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
