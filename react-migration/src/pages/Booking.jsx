import React, { useState, useEffect } from 'react';
import { useStorage } from '../context/StorageContext';

const Booking = ({ preselectedCarId }) => {
  const { cars, setCars, bookings, setBookings, walletBalance, setWalletBalance, currentUser } = useStorage();
  
  const [formData, setFormData] = useState({
    carId: preselectedCarId || '',
    pickupDate: '',
    returnDate: '',
    specialRequests: ''
  });

  const [totalAmount, setTotalAmount] = useState(0);
  const selectedCar = cars.find(c => c.id === parseInt(formData.carId));
  const availableCars = cars.filter(c => c.status === 'available');

  useEffect(() => {
    if (selectedCar && formData.pickupDate && formData.returnDate) {
      const pick = new Date(formData.pickupDate);
      const ret = new Date(formData.returnDate);
      const diffTime = Math.abs(ret - pick);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;
      setTotalAmount(diffDays * selectedCar.price);
    } else {
      setTotalAmount(0);
    }
  }, [formData, selectedCar]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedCar) return alert('Please select a car');
    if (walletBalance < totalAmount) return alert('Insufficient wallet balance');

    const newBooking = {
      id: Date.now(),
      carId: selectedCar.id,
      carBrand: selectedCar.brand,
      carModel: selectedCar.model,
      pickupDate: formData.pickupDate,
      returnDate: formData.returnDate,
      totalAmount: totalAmount,
      status: 'active',
      userEmail: currentUser?.email || 'guest@example.com',
      customerName: currentUser?.name || 'Guest User',
      specialRequests: formData.specialRequests
    };

    // Update car status
    const updatedCars = cars.map(c => 
      c.id === selectedCar.id ? { ...c, status: 'rented' } : c
    );

    setCars(updatedCars);
    setBookings([newBooking, ...bookings]);
    setWalletBalance(walletBalance - totalAmount);

    alert('✅ Booking Successful! Your car is ready.');
    setFormData({ carId: '', pickupDate: '', returnDate: '', specialRequests: '' });
  };

  return (
    <div className="py-12 animate-in zoom-in-95 duration-500">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
          <div className="bg-primary-600 px-8 py-10 text-white relative">
            <h1 className="text-3xl font-black mb-2">Book Your Ride</h1>
            <p className="text-primary-100 font-medium font-bold">Complete the form below to secure your vehicle.</p>
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
              </svg>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-8 lg:p-12 space-y-8">
            <div className="grid grid-cols-1 gap-8">
              {/* Car Selection */}
              <div>
                <label className="block text-sm font-black text-gray-700 uppercase tracking-widest mb-3">Select Vehicle</label>
                <div className="relative">
                  <select 
                    value={formData.carId}
                    onChange={(e) => setFormData({ ...formData, carId: e.target.value })}
                    className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-2 border-gray-50 focus:border-primary-500 focus:bg-white transition-all font-bold text-gray-900 appearance-none cursor-pointer"
                    required
                  >
                    <option value="">Choose a car...</option>
                    {availableCars.map(car => (
                      <option key={car.id} value={car.id}>{car.brand} {car.model} - Br{car.price}/day</option>
                    ))}
                  </select>
                  <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Dates */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-black text-gray-700 uppercase tracking-widest mb-3">Pickup Date</label>
                  <input 
                    type="date" 
                    value={formData.pickupDate}
                    onChange={(e) => setFormData({ ...formData, pickupDate: e.target.value })}
                    className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-2 border-gray-50 focus:border-primary-500 focus:bg-white transition-all font-bold text-gray-900"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-black text-gray-700 uppercase tracking-widest mb-3">Return Date</label>
                  <input 
                    type="date" 
                    value={formData.returnDate}
                    onChange={(e) => setFormData({ ...formData, returnDate: e.target.value })}
                    className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-2 border-gray-50 focus:border-primary-500 focus:bg-white transition-all font-bold text-gray-900"
                    required
                  />
                </div>
              </div>

              {/* Special Requests */}
              <div>
                <label className="block text-sm font-black text-gray-700 uppercase tracking-widest mb-3">Special Requests (Optional)</label>
                <textarea 
                  value={formData.specialRequests}
                  onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                  rows="3"
                  className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-2 border-gray-50 focus:border-primary-500 focus:bg-white transition-all font-bold text-gray-900 placeholder:text-gray-400 shadow-inner"
                  placeholder="Tell us any specific requirements..."
                />
              </div>
            </div>

            {/* Summary Card */}
            {selectedCar && totalAmount > 0 && (
              <div className="bg-primary-50 rounded-3xl p-6 border-2 border-primary-100 flex flex-col md:flex-row justify-between items-center gap-4 animate-in slide-in-from-top-2 duration-300">
                <div className="flex items-center gap-4">
                  <div className="w-20 h-14 rounded-xl overflow-hidden shadow-sm border border-white">
                    <img src={selectedCar.image} className="w-full h-full object-cover" alt="Preview" />
                  </div>
                  <div>
                    <h4 className="font-black text-gray-900">{selectedCar.brand} {selectedCar.model}</h4>
                    <p className="text-[10px] font-bold text-primary-600 uppercase tracking-widest italic">Total Rental Price</p>
                  </div>
                </div>
                <div className="text-3xl font-black text-primary-700 whitespace-nowrap">
                  Br{totalAmount}
                </div>
              </div>
            )}

            <button 
              type="submit"
              className="w-full bg-primary-600 hover:bg-primary-700 text-white py-6 rounded-2xl font-black text-lg uppercase tracking-widest transition-all shadow-xl shadow-primary-200 active:scale-98 disabled:bg-gray-100 disabled:text-gray-300 disabled:shadow-none transition-all duration-300"
              disabled={!selectedCar || totalAmount <= 0}
            >
              Confirm & Book Now
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Booking;
