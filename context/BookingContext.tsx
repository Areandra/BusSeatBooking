import React, { createContext, useContext, useState } from 'react';

interface BookingDateInterface {
  selectedDate: string;
  setSelectedDate: (date: string) => void;
}

const BookingDateContext = createContext<BookingDateInterface | null>(null);

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [selectedDate, setSelectedDate] = useState('');

  return (
    <BookingDateContext.Provider
      value={{
        selectedDate,
        setSelectedDate,
      }}
    >
      {children}
    </BookingDateContext.Provider>
  );
}

export function useBookingDate() {
  const context = useContext(BookingDateContext);

  if (!context) {
    throw new Error('useBooking must be used inside BookingProvider');
  }

  return context;
}
