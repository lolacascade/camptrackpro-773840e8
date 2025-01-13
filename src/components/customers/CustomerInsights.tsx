import { Tables } from "@/types/database/tables";

interface CustomerInsightsProps {
  customer: Tables<"customers"> | null;
}

export function CustomerInsights({ customer }: CustomerInsightsProps) {
  if (!customer) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No customer data available</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">{customer.name}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-white rounded-lg shadow">
          <h3 className="font-semibold mb-2">Contact Information</h3>
          <p>Email: {customer.email}</p>
          <p>Phone: {customer.phone || 'N/A'}</p>
        </div>
        <div className="p-4 bg-white rounded-lg shadow">
          <h3 className="font-semibold mb-2">Address</h3>
          <p>{customer.address || 'N/A'}</p>
        </div>
      </div>
    </div>
  );
}