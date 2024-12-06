import { Layout } from "@/components/layout/Layout";
import { StatCard } from "@/components/dashboard/StatCard";
import { MarinaOverview } from "@/components/dashboard/MarinaOverview";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { Anchor, DollarSign, Ship, Wrench } from "lucide-react";

const Index = () => {
  return (
    <Layout>
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        
        <div className="grid grid-cols-4 gap-4">
          <StatCard
            title="Total Occupancy"
            value="85%"
            description="Current marina occupancy"
            icon={Anchor}
            trend="up"
            trendValue="5% from last month"
          />
          <StatCard
            title="Monthly Revenue"
            value="$45,231"
            description="Total revenue this month"
            icon={DollarSign}
            trend="up"
            trendValue="12% from last month"
          />
          <StatCard
            title="Active Boats"
            value="42"
            description="Boats currently in marina"
            icon={Ship}
          />
          <StatCard
            title="Pending Maintenance"
            value="8"
            description="Maintenance requests"
            icon={Wrench}
          />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <MarinaOverview />
          <RecentActivity />
        </div>
      </div>
    </Layout>
  );
};

export default Index;