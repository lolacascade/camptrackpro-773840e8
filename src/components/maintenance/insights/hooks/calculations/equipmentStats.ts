import { Maintenance } from "@/types/maintenance";

export const calculateEquipmentStatus = (requests: Maintenance[], totalSlots: number) => {
  const underMaintenance = requests.filter(r => r.status === 'in_progress').length;
  const operationalPercentage = totalSlots > 0 
    ? Math.round(((totalSlots - underMaintenance) / totalSlots) * 100) 
    : 0;

  return {
    underMaintenance,
    operational: operationalPercentage
  };
};