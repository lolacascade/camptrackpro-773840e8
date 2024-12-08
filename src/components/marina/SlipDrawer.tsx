import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

interface SlipDrawerProps {
  open: boolean;
  onClose: () => void;
  onSlipAdded: () => Promise<void>;
}

export function SlipDrawer({ open, onClose, onSlipAdded }: SlipDrawerProps) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    dock: "",
    length_ft: "",
    width_ft: "",
    is_covered: false,
    electricity_voltage: "",
    has_water: false,
    zone: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await supabase.from("slips").insert([
        {
          ...formData,
          status: "available",
          length_ft: parseInt(formData.length_ft),
          width_ft: parseInt(formData.width_ft),
        },
      ]);

      if (error) throw error;

      toast({
        title: "Success",
        description: "New slip has been added successfully",
      });

      await onSlipAdded();
      onClose();
      setFormData({
        name: "",
        dock: "",
        length_ft: "",
        width_ft: "",
        is_covered: false,
        electricity_voltage: "",
        has_water: false,
        zone: "",
      });
    } catch (error) {
      console.error("Error adding slip:", error);
      toast({
        title: "Error",
        description: "Failed to add new slip",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Drawer open={open} onOpenChange={onClose}>
      <DrawerContent>
        <div className="mx-auto w-full max-w-lg">
          <DrawerHeader>
            <DrawerTitle>Add New Slip</DrawerTitle>
            <DrawerDescription>
              Fill in the details to add a new slip to the marina
            </DrawerDescription>
          </DrawerHeader>

          <form onSubmit={handleSubmit} className="space-y-6 p-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Slip Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dock">Dock</Label>
                <Input
                  id="dock"
                  value={formData.dock}
                  onChange={(e) =>
                    setFormData({ ...formData, dock: e.target.value })
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="length">Length (ft)</Label>
                <Input
                  id="length"
                  type="number"
                  value={formData.length_ft}
                  onChange={(e) =>
                    setFormData({ ...formData, length_ft: e.target.value })
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="width">Width (ft)</Label>
                <Input
                  id="width"
                  type="number"
                  value={formData.width_ft}
                  onChange={(e) =>
                    setFormData({ ...formData, width_ft: e.target.value })
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="zone">Zone</Label>
                <Input
                  id="zone"
                  value={formData.zone}
                  onChange={(e) =>
                    setFormData({ ...formData, zone: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="electricity">Electricity Voltage</Label>
                <Input
                  id="electricity"
                  value={formData.electricity_voltage}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      electricity_voltage: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            <DrawerFooter>
              <Button type="submit" disabled={isLoading}>
                Add Slip
              </Button>
              <DrawerClose asChild>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </form>
        </div>
      </DrawerContent>
    </Drawer>
  );
}