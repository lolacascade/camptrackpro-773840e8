
import { BookingStatus } from "@/types/booking";

export const statusOptions = [
  { value: 'all', label: 'All' },
  { value: 'pending', label: 'Pending' },
  { value: 'confirmed', label: 'Confirmed' },
  { value: 'cancelled', label: 'Cancelled' },
  { value: 'completed', label: 'Completed' },
  { value: 'checked_in', label: 'Checked In' }
] as const;

export const getStatusLabel = (status: BookingStatus): string => {
  const option = statusOptions.find(opt => opt.value === status);
  return option?.label || status;
};
