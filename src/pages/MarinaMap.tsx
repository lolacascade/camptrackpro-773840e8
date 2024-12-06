import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

interface DockSpot {
  id: string;
  name: string;
  status: 'available' | 'occupied' | 'maintenance';
  boatName?: string;
}

export default function MarinaMap() {
  const { toast } = useToast();
  const [dockSpots, setDockSpots] = useState<DockSpot[]>([
    { id: '1', name: 'A1', status: 'available' },
    { id: '2', name: 'A2', status: 'occupied', boatName: 'Sea Spirit' },
    { id: '3', name: 'A3', status: 'maintenance' },
  ]);

  const handleStatusChange = (id: string, status: DockSpot['status']) => {
    setDockSpots(spots => 
      spots.map(spot => 
        spot.id === id ? { ...spot, status } : spot
      )
    );
    toast({
      title: "Status Updated",
      description: `Dock spot status has been updated.`,
    });
  };

  return (
    <Layout>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Marina Map</h1>
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Add Dock Spot
          </Button>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {dockSpots.map((spot) => (
            <div
              key={spot.id}
              className="p-4 rounded-lg border bg-card text-card-foreground"
            >
              <h3 className="font-semibold">{spot.name}</h3>
              <p className="text-sm text-muted-foreground">
                Status: {spot.status}
              </p>
              {spot.boatName && (
                <p className="text-sm text-muted-foreground">
                  Boat: {spot.boatName}
                </p>
              )}
              <div className="mt-4 space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleStatusChange(spot.id, 'available')}
                >
                  Set Available
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleStatusChange(spot.id, 'maintenance')}
                >
                  Set Maintenance
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}