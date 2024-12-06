import { Layout } from "@/components/layout/Layout";
import { StatCard } from "@/components/dashboard/StatCard";
import { MarinaOverview } from "@/components/dashboard/MarinaOverview";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { Anchor, DollarSign, Ship, Wrench } from "lucide-react";

export default function Index() {
  return (
    <Layout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-primary">Marina Dashboard</h1>
          <div className="flex gap-2">
            <span className="text-sm text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</span>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
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
            trend="down"
            trendValue="2 less than last week"
          />
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <MarinaOverview />
          <RecentActivity />
        </div>
      </div>
    </Layout>
  );
}