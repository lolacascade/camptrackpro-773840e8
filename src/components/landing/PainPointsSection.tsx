import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart3, Clock, DollarSign, MessageSquare } from "lucide-react";
import { FeatureCard } from "./FeatureCard";

export function PainPointsSection() {
  return (
    <div className="py-16 md:py-24 bg-background border-y">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Managing an RV Park Was Never Meant to Feel This Overwhelming
          </h2>
          <div className="space-y-4 md:space-y-6 text-base md:text-lg text-muted-foreground">
            <p>
              You didn't choose this career to drown in administrative chaos. Yet, every day feels like a storm you can't escape. 
              One minute you're juggling site availability for frustrated campers, the next you're tracking overdue maintenance 
              tasks before they cause an uproar.
            </p>
            <p>
              It's a never-ending cycle of firefighting, leaving you drained and disconnected from the parts of RV park management 
              you truly love—building relationships with campers, planning for growth, and seeing your park thrive.
            </p>
            <p className="text-lg md:text-xl font-medium text-foreground">
              But here's the good news: CampTrackPro is here to give you the calm after the storm.
            </p>
          </div>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-start mb-12 md:mb-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
            <FeatureCard
              icon={BarChart3}
              title="Maximize Every Site"
              description="Understand your RV park at a glance with real-time tracking of site status and occupancy trends."
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
              description="Keep campers informed and satisfied with streamlined communication tools."
            />
          </div>
          
          <div className="space-y-6 md:space-y-8 bg-accent rounded-2xl p-6 md:p-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Transform Your RV Park Operations</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg md:text-xl font-semibold flex items-center gap-2">
                  <ArrowRight className="text-primary flex-shrink-0" />
                  Maximize Every Site's Potential
                </h3>
                <p className="mt-2 text-muted-foreground">
                  Understand your RV park at a glance. Instantly track which sites are available, occupied, or under maintenance, 
                  so nothing falls through the cracks.
                </p>
              </div>
              <div>
                <h3 className="text-lg md:text-xl font-semibold flex items-center gap-2">
                  <ArrowRight className="text-primary flex-shrink-0" />
                  Boost Revenue Without Guesswork
                </h3>
                <p className="mt-2 text-muted-foreground">
                  Track renewals, new leases, and maintenance costs in one place. See opportunities to grow your income 
                  with clear, actionable insights.
                </p>
              </div>
              <div>
                <h3 className="text-lg md:text-xl font-semibold flex items-center gap-2">
                  <ArrowRight className="text-primary flex-shrink-0" />
                  Fix Maintenance Before It Costs You
                </h3>
                <p className="mt-2 text-muted-foreground">
                  Be proactive. Plan repairs and track them in real time to minimize downtime and keep your RV park running smoothly.
                </p>
              </div>
              <div>
                <h3 className="text-lg md:text-xl font-semibold flex items-center gap-2">
                  <ArrowRight className="text-primary flex-shrink-0" />
                  Make Customers Your Biggest Advocates
                </h3>
                <p className="mt-2 text-muted-foreground">
                  Happy campers mean steady income. Keep them informed and impressed with streamlined communication and top-notch service.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <Button 
            size="lg" 
            className="bg-primary hover:bg-primary/90 text-white transition-all duration-300 text-base md:text-lg px-6 md:px-8 py-4 md:py-6 h-auto"
          >
            Get Started Today – See How CampTrackPro Can Transform Your RV Park
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}