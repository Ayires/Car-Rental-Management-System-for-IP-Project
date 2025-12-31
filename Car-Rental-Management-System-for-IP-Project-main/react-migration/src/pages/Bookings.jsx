import React from 'react';
import { useStorage } from '../context/StorageContext';

const Bookings = () => {
  const { bookings, walletBalance } = useStorage();

  const getStatusBadge = (status) => {
    let paymentBadge, rentalBadge;
    
    switch (status) {
      case 'returned':
        paymentBadge = <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-[10px] font-black uppercase tracking-widest">Completed</span>;
        rentalBadge = <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-[10px] font-black uppercase tracking-widest">Returned</span>;
        break;
      case 'completed':
        paymentBadge = <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-[10px] font-black uppercase tracking-widest">Completed</span>;
        rentalBadge = <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-[10px] font-black uppercase tracking-widest">Rented</span>;
        break;
      case 'cancelled':
        paymentBadge = <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-[10px] font-black uppercase tracking-widest">Cancelled</span>;
        rentalBadge = <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-[10px] font-black uppercase tracking-widest">Available</span>;
        break;
      default:
        paymentBadge = <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-[10px] font-black uppercase tracking-widest">Pending</span>;
        rentalBadge = <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-[10px] font-black uppercase tracking-widest">Rented</span>;
    }
    
    return { paymentBadge, rentalBadge };
  };

  return (
    <div className="py-12 animate-in slide-in-from-left-4 duration-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-16">
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 tracking-tight">My Bookings</h1>
            <p className="text-gray-500 font-medium text-lg">Manage your active rentals and track your journey history.</p>
          </div>
          <div className="bg-gray-900 text-white p-6 rounded-3xl shadow-xl flex items-center gap-6 group border border-gray-800">
            <div className="h-12 w-12 rounded-2xl bg-primary-600 flex items-center justify-center transition-transform group-hover:scale-110 shadow-lg shadow-primary-500/20">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Current Balance</p>
              <p className="text-2xl font-black">Br{walletBalance.toFixed(2)}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto overflow-y-hidden">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50/50 border-b border-gray-100 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  <th className="px-8 py-6">ID</th>
                  <th className="px-4 py-6">Vehicle</th>
                  <th className="px-4 py-6">Rental Period</th>
                  <th className="px-4 py-6 text-right">Total</th>
                  <th className="px-4 py-6">Payment Status</th>
                  <th className="px-4 py-6">Rental Status</th>
                  <th className="px-8 py-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {bookings.length > 0 ? (
                  bookings.map(booking => {
                    const { paymentBadge, rentalBadge } = getStatusBadge(booking.status);
                    return (
                      <tr key={booking.id} className="hover:bg-gray-50/50 transition-colors group">
                        <td className="px-8 py-8 whitespace-nowrap">
                          <span className="font-bold text-gray-300">#</span>
                          <span className="font-bold text-gray-900">{booking.id.toString().slice(-6)}</span>
                        </td>
                        <td className="px-4 py-8">
                          <div className="font-bold text-gray-900">{booking.carBrand} {booking.carModel}</div>
                        </td>
                        <td className="px-4 py-8 font-semibold text-sm text-gray-500">
                          {booking.pickupDate} <span className="mx-2 text-gray-200">→</span> {booking.returnDate}
                        </td>
                        <td className="px-4 py-8 text-right font-black text-primary-600">
                          Br{booking.totalAmount}
                        </td>
                        <td className="px-4 py-8">
                          {paymentBadge}
                        </td>
                        <td className="px-4 py-8">
                          {rentalBadge}
                        </td>
                        <td className="px-8 py-8 text-right">
                          <button className="h-10 w-10 rounded-xl bg-gray-50 text-gray-400 hover:bg-primary-50 hover:text-primary-600 transition-all flex items-center justify-center mx-auto ml-auto">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="7" className="px-8 py-32 text-center text-gray-300">
                      <div className="mb-6 opacity-10 flex justify-center">
                        <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
                        </svg>
                      </div>
                      <p className="text-2xl font-black mb-2 text-gray-400">No active bookings</p>
                      <p className="font-medium text-gray-400">Your rental history will appear here once you make a booking.</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bookings;
