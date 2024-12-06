import { Layout } from "@/components/layout/Layout";
import { MarinaOverview } from "@/components/dashboard/MarinaOverview";
import { RecentActivity } from "@/components/dashboard/RecentActivity";

export default function Index() {
  return (
    <Layout>
      <div className="space-y-8">
        <h1 className="text-3xl font-bold">Marina Dashboard</h1>
        <div className="grid gap-8 md:grid-cols-2">
          <MarinaOverview />
          <RecentActivity />
        </div>
      </div>
    </Layout>
  );
}