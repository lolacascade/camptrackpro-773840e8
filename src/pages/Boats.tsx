import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BoatTable } from "@/components/boats/BoatTable";
import { BoatDrawer } from "@/components/boats/BoatDrawer";
import { Boat } from "@/types/boat";
import { supabase } from "@/integrations/supabase/client";

export default function Boats() {
  const { toast } = useToast();
  const [boats, setBoats] = useState<Boat[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedBoat, setSelectedBoat] = useState<Boat | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [newBoat, setNewBoat] = useState<Omit<Boat, 'id'>>({
    boat_name: '',
    boat_size: '',
    customer_id: null,
    slip_id: null,
    created_at: null,
    updated_at: null,
  });

  const fetchBoats = async () => {
    try {
      const { data, error } = await supabase
        .from('boats')
        .select('*')
        .order('boat_name');

      if (error) throw error;

      setBoats(data || []);
    } catch (error) {
      console.error('Error fetching boats:', error);
      toast({
        title: "Error",
        description: "Failed to load boats.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBoats();
  }, []);

  const handleSubmit = async () => {
    if (!newBoat.boat_name) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('boats')
        .insert([{
          boat_name: newBoat.boat_name,
          boat_size: newBoat.boat_size,
          customer_id: newBoat.customer_id,
          slip_id: newBoat.slip_id,
        }]);

      if (error) throw error;

      setIsDialogOpen(false);
      setNewBoat({
        boat_name: '',
        boat_size: '',
        customer_id: null,
        slip_id: null,
        created_at: null,
        updated_at: null,
      });
      
      toast({
        title: "Success",
        description: "Boat added successfully.",
      });
      
      fetchBoats();
    } catch (error) {
      console.error('Error adding boat:', error);
      toast({
        title: "Error",
        description: "Failed to add boat.",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (boat: Boat) => {
    setSelectedBoat(boat);
    setIsDrawerOpen(true);
  };

  return (
    <div className="bg-white rounded-[24px] p-12 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-[#133134]">Boats</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Add Boat
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Boat</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="boat_name">Boat Name *</Label>
                <Input
                  id="boat_name"
                  value={newBoat.boat_name}
                  onChange={(e) => setNewBoat(prev => ({ ...prev, boat_name: e.target.value }))}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="boat_size">Size</Label>
                <Input
                  id="boat_size"
                  value={newBoat.boat_size || ''}
                  onChange={(e) => setNewBoat(prev => ({ ...prev, boat_size: e.target.value }))}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="customer_id">Customer ID</Label>
                <Input
                  id="customer_id"
                  type="number"
                  value={newBoat.customer_id || ''}
                  onChange={(e) => setNewBoat(prev => ({ ...prev, customer_id: parseInt(e.target.value) || null }))}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="slip_id">Slip ID</Label>
                <Input
                  id="slip_id"
                  type="number"
                  value={newBoat.slip_id || ''}
                  onChange={(e) => setNewBoat(prev => ({ ...prev, slip_id: parseInt(e.target.value) || null }))}
                />
              </div>
              <Button onClick={handleSubmit}>Add Boat</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <div>Loading boats...</div>
      ) : (
        <BoatTable
          boats={boats}
          onEdit={handleEdit}
        />
      )}

      <BoatDrawer
        boat={selectedBoat}
        open={isDrawerOpen}
        onClose={() => {
          setIsDrawerOpen(false);
          setSelectedBoat(null);
        }}
        onBoatUpdated={fetchBoats}
      />
    </div>
  );
}