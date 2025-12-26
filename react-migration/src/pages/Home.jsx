import React from 'react';
import { useStorage } from '../context/StorageContext';
import CarCard from '../components/CarCard';

const Home = ({ onNavigate }) => {
  const { cars } = useStorage();
  const featuredCars = cars.slice(0, 3);

  return (
    <div className="animate-in fade-in duration-700">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-12 lg:pt-32 lg:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-4xl md:text-7xl font-black text-gray-900 mb-6 tracking-tight">
            Premium Car Rental <br />
            <span className="text-primary-600">For Your Next Journey.</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-500 mb-10 leading-relaxed font-medium">
            Choose from our curated fleet of luxury sedans, rugged SUVs, and efficient electric vehicles. Instant booking, no hidden fees.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button 
              onClick={() => onNavigate('fleet')}
              className="bg-primary-600 hover:bg-primary-700 text-white px-10 py-4 rounded-2xl font-bold text-lg shadow-xl shadow-primary-200 transition-all hover:scale-105 active:scale-95"
            >
              Explore Our Fleet
            </button>
            <button className="bg-white hover:bg-gray-50 text-gray-900 border-2 border-gray-100 px-10 py-4 rounded-2xl font-bold text-lg transition-all hover:scale-105 active:scale-95">
              How it Works
            </button>
          </div>
        </div>
        
        {/* Subtle background decoration */}
        <div className="absolute top-0 -left-20 w-96 h-96 bg-primary-50 rounded-full blur-3xl opacity-50 -z-10"></div>
        <div className="absolute bottom-0 -right-20 w-96 h-96 bg-primary-100 rounded-full blur-3xl opacity-30 -z-10"></div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white border-y border-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            <div className="text-center">
              <div className="text-4xl font-black text-gray-900 mb-2">500+</div>
              <div className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em]">Vehicles</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-black text-gray-900 mb-2">10k+</div>
              <div className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em]">Happy Users</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-black text-gray-900 mb-2">5.0</div>
              <div className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em]">Rating</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-black text-gray-900 mb-2">24/7</div>
              <div className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em]">Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Cars Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-end gap-6 mb-16">
            <div className="text-center md:text-left">
              <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-4 tracking-tight">Featured Fleet</h2>
              <p className="text-gray-500 font-medium text-lg">Top picks from our most popular rental categories this week.</p>
            </div>
            <button 
              onClick={() => onNavigate('fleet')}
              className="inline-flex items-center gap-2 text-primary-600 font-extrabold hover:text-primary-700 transition-colors group px-6 py-3 rounded-xl hover:bg-primary-50"
            >
              View All Cars 
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {featuredCars.length > 0 ? (
              featuredCars.map(car => (
                <CarCard key={car.id} car={car} onBook={(id) => console.log('Booking car:', id)} />
              ))
            ) : (
              <div className="col-span-full py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200 text-center text-gray-400 font-bold">
                <i className="fas fa-car-side fa-3x mb-4 opacity-20"></i>
                <p>Establishing fleet inventory... please wait.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
