import React from 'react';
import { useStorage } from '../context/StorageContext';

const Navbar = ({ onNavigate, currentPage }) => {
  const { walletBalance, currentUser, isLoggedIn, setIsLoggedIn } = useStorage();

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'fleet', label: 'Fleet' },
    { id: 'booking', label: 'Book Now' },
    { id: 'bookings', label: 'My Bookings' },
    { id: 'admin', label: 'Admin' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div 
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => onNavigate('home')}
          >
            <div className="bg-primary-600 p-2 rounded-lg">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-primary-800">
              DriveEasy
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <button
                key={link.id}
                onClick={() => onNavigate(link.id)}
                className={`font-bold text-sm transition-all ${
                  currentPage === link.id 
                    ? 'text-primary-600 border-b-2 border-primary-600 py-1' 
                    : 'text-gray-500 hover:text-primary-600'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 bg-gray-100 px-3 py-1.5 rounded-full border border-gray-200">
              <span className="text-xs font-semibold text-gray-500 uppercase">Wallet</span>
              <span className="text-sm font-bold text-primary-700">Br{walletBalance.toFixed(2)}</span>
            </div>
            
            {isLoggedIn ? (
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold border border-primary-200">
                  {currentUser?.name?.[0] || 'U'}
                </div>
                <button 
                  onClick={handleLogout}
                  className="text-sm font-medium text-gray-500 hover:text-red-600 transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button className="bg-primary-600 hover:bg-primary-700 text-white px-5 py-2 rounded-lg font-semibold transition-all shadow-md shadow-primary-200/50">
                Login
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
