import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  boatName?: string;
}

export default function Customers() {
  const { toast } = useToast();
  const [customers, setCustomers] = useState<Customer[]>([
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      phone: '(555) 123-4567',
      boatName: 'Sea Spirit',
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      phone: '(555) 987-6543',
      boatName: 'Wave Runner',
    },
  ]);

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
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Add Customer
          </Button>
        </div>

        <div className="grid gap-4">
          {customers.map((customer) => (
            <div
              key={customer.id}
              className="p-4 rounded-lg border bg-card text-card-foreground"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold">{customer.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {customer.email}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {customer.phone}
                  </p>
                  {customer.boatName && (
                    <p className="text-sm text-muted-foreground">
                      Boat: {customer.boatName}
                    </p>
                  )}
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