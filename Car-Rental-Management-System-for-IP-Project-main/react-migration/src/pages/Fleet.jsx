import React, { useState, useMemo } from 'react';
import { useStorage } from '../context/StorageContext';
import CarCard from '../components/CarCard';

const Fleet = ({ onBook }) => {
  const { cars } = useStorage();
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');

  const filteredCars = useMemo(() => {
    return cars.filter(car => {
      const matchesSearch = car.brand.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            car.model.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = typeFilter === 'All' || car.type === typeFilter;
      return matchesSearch && matchesType;
    });
  }, [cars, searchTerm, typeFilter]);

  const carTypes = ['All', ...new Set(cars.map(car => car.type))];

  return (
    <div className="py-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 tracking-tight">Meet Our Fleet</h1>
          <p className="text-gray-500 font-medium max-w-2xl mx-auto text-lg">
            Whether it's a weekend getaway or a business trip, we have the perfect vehicle waiting for you.
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-gray-100 mb-16 flex flex-col md:flex-row gap-6 items-center">
          <div className="relative flex-grow w-full">
            <svg className="w-5 h-5 absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input 
              type="text" 
              placeholder="Search by brand or model..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-14 pr-6 py-4 rounded-[1.75rem] bg-gray-50 border-none focus:ring-2 focus:ring-primary-500 transition-all font-semibold text-gray-900 placeholder:text-gray-400"
            />
          </div>
          <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 no-scrollbar">
            {carTypes.map(type => (
              <button
                key={type}
                onClick={() => setTypeFilter(type)}
                className={`px-8 py-4 rounded-[1.75rem] font-bold text-sm whitespace-nowrap transition-all ${
                  typeFilter === type 
                    ? 'bg-primary-600 text-white shadow-xl shadow-primary-200' 
                    : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12">
          {filteredCars.map(car => (
            <CarCard key={car.id} car={car} onBook={onBook} />
          ))}
          {filteredCars.length === 0 && (
            <div className="col-span-full py-32 text-center bg-gray-50 rounded-[3rem] border-2 border-dashed border-gray-100 px-6">
              <div className="bg-white w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 shadow-sm">
                <svg className="w-10 h-10 text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-black text-gray-900 mb-3">No matches found</h3>
              <p className="text-gray-500 font-medium max-w-sm mx-auto leading-relaxed">
                We couldn't find any cars matching your current search or filters. Try adjusting them!
              </p>
              <button 
                onClick={() => {setSearchTerm(''); setTypeFilter('All');}}
                className="mt-8 text-primary-600 font-black uppercase tracking-widest text-sm hover:text-primary-700"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Fleet;
