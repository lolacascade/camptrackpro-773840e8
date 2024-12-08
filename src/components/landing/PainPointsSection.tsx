import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronRight, BarChart3, Clock, DollarSign, MessageSquare } from "lucide-react";
import { FeatureCard } from "./FeatureCard";

export function PainPointsSection() {
  return (
    <div className="py-24 bg-accent">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Run Your Marina Like a Pro With Tools Built for You</h2>
          <p className="text-xl text-muted-foreground">
            Take control of your marina's operations with powerful insights and smart automation that save time, boost revenue, and keep your customers coming back.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <FeatureCard
              icon={BarChart3}
              title="Maximize Every Slip"
              description="Understand your marina at a glance with real-time tracking of slip status and occupancy trends."
            />
            <FeatureCard
              icon={DollarSign}
              title="Boost Revenue"
              description="Track renewals, leases, and costs in one place. Identify growth opportunities with clear insights."
            />
            <FeatureCard
              icon={Clock}
              title="Proactive Maintenance"
              description="Plan and track repairs in real time to minimize downtime and maintain smooth operations."
            />
            <FeatureCard
              icon={MessageSquare}
              title="Customer Success"
              description="Keep boaters informed and satisfied with streamlined communication tools."
            />
          </div>
          
          <div className="space-y-8">
            <h2 className="text-3xl font-bold mb-6">Transform Your Marina Operations</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  <ChevronRight className="text-primary" />
                  Maximize Every Slip's Potential
                </h3>
                <p className="mt-2 text-muted-foreground">
                  Understand your marina at a glance. Instantly track which slips are available, occupied, or under maintenance, so nothing falls through the cracks.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  <ChevronRight className="text-primary" />
                  Boost Revenue Without Guesswork
                </h3>
                <p className="mt-2 text-muted-foreground">
                  Track renewals, new leases, and maintenance costs in one place. See opportunities to grow your income with clear, actionable insights.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  <ChevronRight className="text-primary" />
                  Fix Maintenance Before It Costs You
                </h3>
                <p className="mt-2 text-muted-foreground">
                  Be proactive. Plan repairs and track them in real time to minimize downtime and keep your marina running smoothly.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  <ChevronRight className="text-primary" />
                  Make Customers Your Biggest Advocates
                </h3>
                <p className="mt-2 text-muted-foreground">
                  Happy boaters mean steady income. Keep them informed and impressed with streamlined communication and top-notch service.
                </p>
              </div>
            </div>
            <Button size="lg" className="mt-8">
              Discover How DockEase Solves These Issues
              <ArrowRight className="ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}