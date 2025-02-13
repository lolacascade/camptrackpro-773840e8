
import { useState } from 'react';
import { BookingFilters, BookingStatus } from '@/types/booking';

const DEFAULT_FILTERS: BookingFilters = {
  searchTerm: '',
  status: 'all',
  page: 1,
  dateRange: null
};

export function useBookingFilters() {
  const [filters, setFilters] = useState<BookingFilters>(DEFAULT_FILTERS);

  const updateFilters = (updates: Partial<BookingFilters>) => {
    setFilters(current => ({
      ...current,
      ...updates
    }));
  };

  return {
    filters,
    updateFilters
  };
}
