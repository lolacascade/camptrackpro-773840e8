import { Maintenance } from "@/types/maintenance";

export const calculateResolutionTime = (requests: Maintenance[]) => {
  const completedRequests = requests.filter(r => 
    r.status === 'completed' && r.completed_at && r.created_at
  );
  
  const totalResolutionTime = completedRequests.reduce((acc, req) => {
    const created = new Date(req.created_at);
    const completed = new Date(req.completed_at!);
    return acc + (completed.getTime() - created.getTime());
  }, 0);

  const averageDays = completedRequests.length > 0 
    ? Math.round(totalResolutionTime / (completedRequests.length * 24 * 60 * 60 * 1000))
    : 0;

  return {
    average: averageDays,
    target: 3
  };
};