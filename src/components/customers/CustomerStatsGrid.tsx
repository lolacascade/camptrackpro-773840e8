export function CustomerStatsGrid() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold">Total Customers</h3>
        <p className="text-2xl">150</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold">Active Customers</h3>
        <p className="text-2xl">120</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold">New Customers This Month</h3>
        <p className="text-2xl">30</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold">Customer Satisfaction</h3>
        <p className="text-2xl">85%</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold">Customer Retention Rate</h3>
        <p className="text-2xl">90%</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold">Total Revenue from Customers</h3>
        <p className="text-2xl">$12,000</p>
      </div>
    </div>
  );
}
