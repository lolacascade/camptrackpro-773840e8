import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronRight, BarChart3, Clock, DollarSign, MessageSquare } from "lucide-react";
import { FeatureCard } from "./FeatureCard";

export function PainPointsSection() {
  return (
    <div className="py-24 bg-accent">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-bold mb-6">Managing a Marina Was Never Meant to Feel This Overwhelming</h2>
          <div className="space-y-6 text-lg text-muted-foreground">
            <p>
              You didn't choose this career to drown in administrative chaos. Yet, every day feels like a storm you can't escape. 
              One minute you're juggling slip availability for frustrated boaters, the next you're tracking overdue maintenance 
              tasks before they cause an uproar. And don't even get started on reconciling revenue spreadsheets that never add up.
            </p>
            <p>
              It's a never-ending cycle of firefighting, leaving you drained and disconnected from the parts of marina management 
              you truly love—building relationships with boaters, planning for growth, and seeing your marina thrive.
            </p>
            <p className="text-xl font-medium text-foreground">
              But here's the good news: DockEase is here to give you the calm after the storm.
            </p>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-start mb-16">
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
                  Understand your marina at a glance. Instantly track which slips are available, occupied, or under maintenance, 
                  so nothing falls through the cracks.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  <ChevronRight className="text-primary" />
                  Boost Revenue Without Guesswork
                </h3>
                <p className="mt-2 text-muted-foreground">
                  Track renewals, new leases, and maintenance costs in one place. See opportunities to grow your income 
                  with clear, actionable insights.
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
          </div>
        </div>

        <div className="text-center">
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-secondary to-accent text-white hover:opacity-90 transition-all duration-300 text-lg px-8 py-6 h-auto"
          >
            Get Started Today – See How DockEase Can Transform Your Marina
            <ArrowRight className="ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}