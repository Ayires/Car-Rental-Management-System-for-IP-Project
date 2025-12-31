import React, { useState } from 'react';
import { StorageProvider } from './context/StorageContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Fleet from './pages/Fleet';
import Booking from './pages/Booking';
import Bookings from './pages/Bookings';
import Admin from './pages/Admin';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedCarId, setSelectedCarId] = useState(null);

  const handleBookCar = (id) => {
    setSelectedCarId(id);
    setCurrentPage('booking');
  };

  const navigate = (page) => {
    setCurrentPage(page);
    if (page !== 'booking') setSelectedCarId(null);
  };

  return (
    <StorageProvider>
      <div className="min-h-screen bg-white flex flex-col">
        <Navbar onNavigate={navigate} currentPage={currentPage} />
        <main className="flex-grow pt-16">
          {currentPage === 'home' && <Home onNavigate={navigate} />}
          {currentPage === 'fleet' && <Fleet onBook={handleBookCar} />}
          {currentPage === 'booking' && <Booking preselectedCarId={selectedCarId} />}
          {currentPage === 'bookings' && <Bookings />}
          {currentPage === 'admin' && <Admin />}
        </main>
        <Footer />
      </div>
    </StorageProvider>
  );
}

export default App;
