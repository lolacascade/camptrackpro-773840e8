import { Maintenance } from "@/types/maintenance";

export const calculateRequestsByStatus = (requests: Maintenance[]) => {
  const open = requests.filter(r => r.status === 'pending').length;
  const inProgress = requests.filter(r => r.status === 'in_progress').length;
  const completed = requests.filter(r => r.status === 'completed').length;
  return { open, inProgress, completed };
};