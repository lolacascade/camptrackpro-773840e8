import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

interface DockSpot {
  id: string;
  name: string;
  status: 'available' | 'occupied' | 'maintenance';
  customerId?: string;
  boatName?: string;
}

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Dock spot name must be at least 2 characters.",
  }),
  customerId: z.string().optional(),
  status: z.enum(['available', 'occupied', 'maintenance']),
});

export default function MarinaMap() {
  const { toast } = useToast();
  const [dockSpots, setDockSpots] = useState<DockSpot[]>([
    { id: '1', name: 'A1', status: 'available' },
    { id: '2', name: 'A2', status: 'occupied', boatName: 'Sea Spirit' },
    { id: '3', name: 'A3', status: 'maintenance' },
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      status: 'available',
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const newDockSpot: DockSpot = {
      id: Date.now().toString(),
      name: values.name,
      status: values.status,
    };

    setDockSpots([...dockSpots, newDockSpot]);
    setIsDialogOpen(false);
    form.reset();
    
    toast({
      title: "Dock Spot Added",
      description: `New dock spot ${values.name} has been created.`,
    });
  };

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
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" /> Add Dock Spot
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Dock Spot</DialogTitle>
              </DialogHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Dock Spot Name</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., A1, B2..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Initial Status</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="available">Available</SelectItem>
                            <SelectItem value="maintenance">Maintenance</SelectItem>
                            <SelectItem value="occupied">Occupied</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full">
                    Create Dock Spot
                  </Button>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {dockSpots.map((spot) => (
            <div
              key={spot.id}
              className={`p-4 rounded-lg border ${
                spot.status === 'occupied'
                  ? 'bg-primary/10'
                  : spot.status === 'available'
                  ? 'bg-success/10'
                  : 'bg-warning/10'
              }`}
            >
              <h3 className="font-semibold">{spot.name}</h3>
              <p className="text-sm text-muted-foreground capitalize">
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