import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

interface MaintenanceRequest {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed';
  date: Date;
  boatName: string;
}

export default function Maintenance() {
  const { toast } = useToast();
  const [requests, setRequests] = useState<MaintenanceRequest[]>([
    {
      id: '1',
      title: 'Engine Check',
      description: 'Regular engine maintenance check required',
      status: 'pending',
      date: new Date(),
      boatName: 'Sea Spirit',
    },
    {
      id: '2',
      title: 'Hull Cleaning',
      description: 'Hull needs cleaning and inspection',
      status: 'in-progress',
      date: new Date(),
      boatName: 'Wave Runner',
    },
  ]);

  const handleStatusChange = (id: string, status: MaintenanceRequest['status']) => {
    setRequests(requests => 
      requests.map(request => 
        request.id === id ? { ...request, status } : request
      )
    );
    toast({
      title: "Status Updated",
      description: "The maintenance request status has been updated.",
    });
  };

  return (
    <Layout>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Maintenance Requests</h1>
          <Button>
            <Plus className="mr-2 h-4 w-4" /> New Request
          </Button>
        </div>

        <div className="grid gap-4">
          {requests.map((request) => (
            <div
              key={request.id}
              className="p-4 rounded-lg border bg-card text-card-foreground"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold">{request.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {request.description}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Boat: {request.boatName}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Date: {request.date.toLocaleDateString()}
                  </p>
                  <p className="text-sm font-medium mt-2">
                    Status: {request.status}
                  </p>
                </div>
                <div className="space-y-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleStatusChange(request.id, 'in-progress')}
                  >
                    Start
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleStatusChange(request.id, 'completed')}
                  >
                    Complete
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}