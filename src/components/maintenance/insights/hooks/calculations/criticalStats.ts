import { Maintenance } from "@/types/maintenance";

export const calculateCriticalIssues = (requests: Maintenance[]) => {
  const critical = requests.filter(r => r.priority === 'high').length;
  const scheduled = requests.filter(r => 
    r.priority === 'medium' || r.priority === 'low'
  ).length;
  
  return { critical, scheduled };
};