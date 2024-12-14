export interface MaintenanceStats {
  totalRequests: {
    open: number;
    inProgress: number;
    completed: number;
  };
  resolutionTime: {
    average: number;
    target: number;
  };
  criticalIssues: {
    critical: number;
    scheduled: number;
  };
  equipmentStatus: {
    underMaintenance: number;
    operational: number;
  };
}