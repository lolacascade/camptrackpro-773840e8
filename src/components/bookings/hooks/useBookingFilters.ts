
import { useState } from 'react';
import { BookingStatus } from '@/types/booking';

interface BookingFilters {
  status: BookingStatus | 'all';
  searchTerm: string;
  page: number;
}

export function useBookingFilters() {
  const [filters, setFilters] = useState<BookingFilters>({
    status: 'all',
    searchTerm: '',
    page: 1
  });

  const updateFilters = (newFilters: Partial<BookingFilters>) => {
    setFilters(prev => ({
      ...prev,
      ...newFilters,
      // Reset to page 1 when filters change, unless page is being explicitly set
      page: 'page' in newFilters ? newFilters.page! : 1
    }));
  };

  return {
    filters,
    updateFilters
  };
}
