import React, { useState } from 'react';
import { useStorage } from '../context/StorageContext';

const Admin = () => {
  const { cars, setCars, bookings, setBookings } = useStorage();
  const [activeTab, setActiveTab] = useState('cars');
  
  // Stats
  const totalCars = cars.length;
  const availableCars = cars.filter(c => c.status === 'available').length;
  const totalBookings = bookings.length;
  const activeBookings = bookings.filter(b => b.status === 'active').length;

  const handleReturn = (bookingId) => {
    const booking = bookings.find(b => b.id === bookingId);
    if (!booking) return;

    const updatedBookings = bookings.map(b => 
      b.id === bookingId ? { ...b, status: 'returned' } : b
    );
    
    const updatedCars = cars.map(c => 
      c.id === booking.carId ? { ...c, status: 'available' } : c
    );

    setBookings(updatedBookings);
    setCars(updatedCars);
    alert('✅ Vehicle marked as returned and is now available for booking.');
  };

  return (
    <div className="py-12 animate-in fade-in duration-700 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
          <div className="text-center md:text-left">
            <h1 className="text-4xl font-black text-gray-900 mb-2 tracking-tight">Admin Dashboard</h1>
            <p className="text-gray-500 font-medium font-bold opacity-60">Fleet control and rental operations management.</p>
          </div>
          <button className="bg-gray-900 text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl flex items-center gap-3 hover:scale-105 transition-all active:scale-95 shadow-gray-200">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
            </svg>
            Add New Vehicle
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {[
            { label: 'Total Fleet', value: totalCars, color: 'text-gray-900' },
            { label: 'Available', value: availableCars, color: 'text-primary-600' },
            { label: 'Total Bookings', value: totalBookings, color: 'text-gray-900' },
            { label: 'Active Rentals', value: activeBookings, color: 'text-amber-600' }
          ].map((stat, i) => (
            <div key={i} className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm transition-all hover:shadow-md">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-2">{stat.label}</p>
              <p className={`text-4xl font-black ${stat.color}`}>{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-10 bg-gray-50 p-2 rounded-[1.5rem] w-fit border border-gray-100">
          <button 
            onClick={() => setActiveTab('cars')}
            className={`px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${activeTab === 'cars' ? 'bg-white text-primary-600 shadow-md ring-1 ring-gray-100' : 'text-gray-400 hover:text-gray-600'}`}
          >
            Inventory Management
          </button>
          <button 
            onClick={() => setActiveTab('bookings')}
            className={`px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${activeTab === 'bookings' ? 'bg-white text-primary-600 shadow-md ring-1 ring-gray-100' : 'text-gray-400 hover:text-gray-600'}`}
          >
            Booking Operations
          </button>
        </div>

        {/* Content */}
        <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
          {activeTab === 'cars' ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-50/50 border-b border-gray-100 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
                    <th className="px-8 py-6">Vehicle Details</th>
                    <th className="px-4 py-6">Category</th>
                    <th className="px-4 py-6">Rate</th>
                    <th className="px-4 py-6">Current Status</th>
                    <th className="px-8 py-6 text-right">Management</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {cars.map(car => (
                    <tr key={car.id} className="hover:bg-gray-50/20 transition-colors group">
                      <td className="px-8 py-7">
                        <div className="flex items-center gap-5">
                          <img src={car.image} className="w-14 h-11 object-cover rounded-xl shadow-sm border border-gray-50 group-hover:scale-110 transition-transform" alt="" />
                          <div>
                            <div className="font-black text-gray-900">{car.brand} {car.model}</div>
                            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Year {car.year}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-7">
                        <span className="text-[10px] font-black text-gray-500 bg-gray-100 px-3 py-1.5 rounded-lg uppercase tracking-widest">{car.type}</span>
                      </td>
                      <td className="px-4 py-7 font-black text-gray-900 text-lg">Br{car.price}</td>
                      <td className="px-4 py-7">
                        {car.status === 'available' ? (
                          <div className="flex items-center gap-2">
                            <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
                            <span className="text-xs font-black text-green-600 uppercase tracking-widest">Available</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <span className="h-2 w-2 rounded-full bg-red-400"></span>
                            <span className="text-xs font-black text-red-500 uppercase tracking-widest">On Rent</span>
                          </div>
                        )}
                      </td>
                      <td className="px-8 py-7 text-right">
                        <button className="text-primary-600 font-black text-[10px] uppercase tracking-[0.2em] hover:text-primary-700 transition-colors">Edit Asset</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-50/50 border-b border-gray-100 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
                    <th className="px-8 py-6">Customer & Account</th>
                    <th className="px-4 py-6">Reserved Vehicle</th>
                    <th className="px-4 py-6">Payment Phase</th>
                    <th className="px-4 py-6">Rental Phase</th>
                    <th className="px-8 py-6 text-right">Operations</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {bookings.map(booking => (
                    <tr key={booking.id} className="hover:bg-gray-50/20 transition-colors">
                      <td className="px-8 py-7">
                        <div className="font-black text-gray-900">{booking.customerName}</div>
                        <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{booking.userEmail}</div>
                      </td>
                      <td className="px-4 py-7 font-black text-gray-900">{booking.carBrand} {booking.carModel}</td>
                      <td className="px-4 py-7">
                        <span className={`text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-xl ${booking.status === 'active' ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'}`}>
                          {booking.status === 'active' ? 'Pending' : 'Settled'}
                        </span>
                      </td>
                      <td className="px-4 py-7">
                         <span className={`text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-xl ${booking.status === 'active' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}`}>
                          {booking.status === 'active' ? 'Rented' : 'Returned'}
                        </span>
                      </td>
                      <td className="px-8 py-7 text-right">
                        {booking.status === 'active' ? (
                          <button 
                            onClick={() => handleReturn(booking.id)}
                            className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-primary-200 transition-all active:scale-95"
                          >
                            Mark as Returned
                          </button>
                        ) : (
                          <span className="text-xs font-bold text-gray-300 italic tracking-widest uppercase">Archive</span>
                        )}
                      </td>
                    </tr>
                  ))}
                  {bookings.length === 0 && (
                    <tr>
                      <td colSpan="5" className="px-8 py-20 text-center text-gray-300 font-black tracking-widest uppercase text-sm italic">
                        No operations history recorded yet
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;
