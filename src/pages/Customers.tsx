import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import { useState } from "react";
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

interface BoatInfo {
  name: string;
  type: string;
  length: string;
}

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  boats: BoatInfo[];
}

export default function Customers() {
  const { toast } = useToast();
  const [customers, setCustomers] = useState<Customer[]>([
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      phone: '(555) 123-4567',
      address: '123 Marina Way',
      boats: [{ name: 'Sea Spirit', type: 'Sailboat', length: '32ft' }],
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      phone: '(555) 987-6543',
      address: '456 Harbor Drive',
      boats: [{ name: 'Wave Runner', type: 'Yacht', length: '45ft' }],
    },
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newCustomer, setNewCustomer] = useState<Omit<Customer, 'id'>>({
    name: '',
    email: '',
    phone: '',
    address: '',
    boats: [{ name: '', type: '', length: '' }],
  });

  const handleAddBoat = () => {
    setNewCustomer(prev => ({
      ...prev,
      boats: [...prev.boats, { name: '', type: '', length: '' }],
    }));
  };

  const handleRemoveBoat = (index: number) => {
    setNewCustomer(prev => ({
      ...prev,
      boats: prev.boats.filter((_, i) => i !== index),
    }));
  };

  const handleBoatChange = (index: number, field: keyof BoatInfo, value: string) => {
    setNewCustomer(prev => ({
      ...prev,
      boats: prev.boats.map((boat, i) => 
        i === index ? { ...boat, [field]: value } : boat
      ),
    }));
  };

  const handleSubmit = () => {
    if (!newCustomer.name || !newCustomer.email || !newCustomer.phone) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const newId = (customers.length + 1).toString();
    setCustomers(prev => [...prev, { ...newCustomer, id: newId }]);
    setIsDialogOpen(false);
    setNewCustomer({
      name: '',
      email: '',
      phone: '',
      address: '',
      boats: [{ name: '', type: '', length: '' }],
    });
    
    toast({
      title: "Success",
      description: "Customer added successfully.",
    });
  };

  const handleDeleteCustomer = (id: string) => {
    setCustomers(customers => customers.filter(c => c.id !== id));
    toast({
      title: "Customer Deleted",
      description: "The customer has been removed from the system.",
    });
  };

  return (
    <Layout>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Customers</h1>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" /> Add Customer
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Add New Customer</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    value={newCustomer.name}
                    onChange={(e) => setNewCustomer(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="John Doe"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={newCustomer.email}
                    onChange={(e) => setNewCustomer(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="john@example.com"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="phone">Phone *</Label>
                  <Input
                    id="phone"
                    value={newCustomer.phone}
                    onChange={(e) => setNewCustomer(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="(555) 123-4567"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    value={newCustomer.address}
                    onChange={(e) => setNewCustomer(prev => ({ ...prev, address: e.target.value }))}
                    placeholder="123 Marina Way"
                  />
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Label>Boats</Label>
                    <Button type="button" variant="outline" size="sm" onClick={handleAddBoat}>
                      <Plus className="h-4 w-4 mr-1" /> Add Boat
                    </Button>
                  </div>
                  
                  {newCustomer.boats.map((boat, index) => (
                    <div key={index} className="grid gap-4 p-4 border rounded-lg relative">
                      {index > 0 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-2 top-2"
                          onClick={() => handleRemoveBoat(index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                      <div className="grid gap-2">
                        <Label>Boat Name</Label>
                        <Input
                          value={boat.name}
                          onChange={(e) => handleBoatChange(index, 'name', e.target.value)}
                          placeholder="Sea Spirit"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label>Boat Type</Label>
                        <Input
                          value={boat.type}
                          onChange={(e) => handleBoatChange(index, 'type', e.target.value)}
                          placeholder="Sailboat"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label>Length</Label>
                        <Input
                          value={boat.length}
                          onChange={(e) => handleBoatChange(index, 'length', e.target.value)}
                          placeholder="32ft"
                        />
                      </div>
                    </div>
                  ))}
                </div>
                
                <Button type="button" onClick={handleSubmit}>
                  Add Customer
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid gap-4">
          {customers.map((customer) => (
            <div
              key={customer.id}
              className="p-4 rounded-lg border bg-card text-card-foreground"
            >
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <h3 className="font-semibold">{customer.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {customer.email}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {customer.phone}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {customer.address}
                  </p>
                  <div className="mt-2">
                    <p className="text-sm font-medium">Boats:</p>
                    {customer.boats.map((boat, index) => (
                      <div key={index} className="ml-4 text-sm text-muted-foreground">
                        • {boat.name} ({boat.type}, {boat.length})
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-x-2">
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDeleteCustomer(customer.id)}
                  >
                    Delete
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