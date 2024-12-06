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
import { Plus } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { SlipCard } from "@/components/marina/SlipCard";
import { SlipFilters } from "@/components/marina/SlipFilters";
import { SlipStats } from "@/components/marina/SlipStats";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Dock spot name must be at least 2 characters.",
  }),
  dock: z.string().min(1, "Dock is required"),
  length_ft: z.number().min(1, "Length must be greater than 0"),
  width_ft: z.number().min(1, "Width must be greater than 0"),
  is_covered: z.boolean().default(false),
  electricity_voltage: z.string().optional(),
  has_water: z.boolean().default(false),
  status: z.enum(['available', 'occupied', 'maintenance']).default('available'),
});

export default function MarinaMap() {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [dockFilter, setDockFilter] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      dock: '',
      length_ft: 0,
      width_ft: 0,
      is_covered: false,
      has_water: false,
      status: 'available',
    },
  });

  const { data: slipsData, refetch: refetchSlips } = useQuery({
    queryKey: ['slips'],
    queryFn: async () => {
      const { data: slips, error } = await supabase
        .from('slips')
        .select(`
          *,
          boats (
            id,
            boat_name,
            customer_id,
            customers (
              name
            )
          ),
          maintenance_requests (
            description
          )
        `);

      if (error) throw error;
      return slips;
    },
  });

  const filteredSlips = slipsData?.filter((slip) => {
    const matchesSearch = slip.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      slip.dock?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = !statusFilter || slip.status === statusFilter;
    const matchesDock = !dockFilter || slip.dock === dockFilter;
    return matchesSearch && matchesStatus && matchesDock;
  });

  const availableDocks = Array.from(
    new Set(slipsData?.map((slip) => slip.dock).filter(Boolean) || [])
  );

  const stats = {
    totalSlips: slipsData?.length || 0,
    availableSlips: slipsData?.filter(s => s.status === 'available').length || 0,
    occupiedSlips: slipsData?.filter(s => s.status === 'occupied').length || 0,
    maintenanceSlips: slipsData?.filter(s => s.status === 'maintenance').length || 0,
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const { error } = await supabase
        .from('slips')
        .insert([{
          name: values.name,
          dock: values.dock,
          length_ft: values.length_ft,
          width_ft: values.width_ft,
          is_covered: values.is_covered,
          electricity_voltage: values.electricity_voltage,
          has_water: values.has_water,
          status: values.status
        }]);

      if (error) throw error;

      setIsDialogOpen(false);
      form.reset();
      refetchSlips();
      
      toast({
        title: "Dock Spot Added",
        description: `New dock spot ${values.name} has been created.`,
      });
    } catch (error) {
      console.error('Error creating slip:', error);
      toast({
        title: "Error",
        description: "Failed to create dock spot. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Layout>
      <div className="space-y-4">
        <div className="flex justify-between items-center mb-6">
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
                    name="dock"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Dock</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., A, B..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="length_ft"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Length (ft)</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              {...field}
                              onChange={e => field.onChange(Number(e.target.value))}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="width_ft"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Width (ft)</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              {...field}
                              onChange={e => field.onChange(Number(e.target.value))}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="electricity_voltage"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Electricity</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select voltage" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="30A">30A</SelectItem>
                            <SelectItem value="50A">50A</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="is_covered"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Covered Slip</FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="has_water"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Water Access</FormLabel>
                        </div>
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

        <SlipStats {...stats} />

        <SlipFilters
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
          dockFilter={dockFilter}
          onDockFilterChange={setDockFilter}
          availableDocks={availableDocks}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredSlips?.map((slip) => (
            <SlipCard
              key={slip.id}
              id={slip.id}
              name={slip.name}
              status={slip.status as 'available' | 'occupied' | 'maintenance'}
              boat={slip.boats?.[0]}
              customerName={slip.boats?.[0]?.customers?.name}
              maintenanceDescription={slip.maintenance_requests?.[0]?.description}
              dock={slip.dock}
              onStatusChange={async () => {
                await refetchSlips();
              }}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
}
