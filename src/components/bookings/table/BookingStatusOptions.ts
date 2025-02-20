
import { BookingStatus } from "@/types/booking";

interface StatusOption {
  value: BookingStatus | 'all';
  label: string;
}

export const statusOptions: StatusOption[] = [
  { value: 'all', label: 'All' },
  { value: 'pending', label: 'Pending' },
  { value: 'confirmed', label: 'Confirmed' },
  { value: 'cancelled', label: 'Cancelled' },
  { value: 'completed', label: 'Completed' },
  { value: 'checked_in', label: 'Checked In' }
];

export const getStatusLabel = (status: BookingStatus): string => {
  const option = statusOptions.find(opt => opt.value === status);
  return option?.label || status;
};
