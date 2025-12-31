import React, { createContext, useContext } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { defaultCars } from '../utils/initialData';

const StorageContext = createContext();

export const useStorage = () => useContext(StorageContext);

export const StorageProvider = ({ children }) => {
  const [cars, setCars] = useLocalStorage('driveeasy_cars', defaultCars);
  const [bookings, setBookings] = useLocalStorage('driveeasy_bookings', []);
  const [walletBalance, setWalletBalance] = useLocalStorage('driveeasy_wallet_balance', 0);
  const [currentUser, setCurrentUser] = useLocalStorage('currentUser', null);
  const [isLoggedIn, setIsLoggedIn] = useLocalStorage('isLoggedIn', false);

  const value = {
    cars,
    setCars,
    bookings,
    setBookings,
    walletBalance,
    setWalletBalance,
    currentUser,
    setCurrentUser,
    isLoggedIn,
    setIsLoggedIn
  };

  return (
    <StorageContext.Provider value={value}>
      {children}
    </StorageContext.Provider>
  );
};
