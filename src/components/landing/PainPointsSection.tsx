import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart3, Clock, DollarSign, MessageSquare } from "lucide-react";
import { FeatureCard } from "./FeatureCard";

export function PainPointsSection() {
  return (
    <div className="py-16 md:py-24 bg-[#0D1D1F]">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-12 md:mb-16">
          <h2 className="text-white text-3xl md:text-4xl font-bold mb-6">
            Transform Your RV Park Operations
          </h2>
          <p className="text-gray-400 text-lg md:text-xl">
            Streamline your operations and deliver exceptional experiences to your campers
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          <FeatureCard
            icon={BarChart3}
            title="Site Management"
            description="Track site availability, occupancy trends, and maintenance needs in real-time."
          />
          <FeatureCard
            icon={DollarSign}
            title="Revenue Optimization"
            description="Maximize your revenue with dynamic pricing and occupancy insights."
          />
          <FeatureCard
            icon={Clock}
            title="Efficient Operations"
            description="Streamline check-ins, maintenance, and daily tasks with automated workflows."
          />
          <FeatureCard
            icon={MessageSquare}
            title="Guest Communication"
            description="Keep your campers informed and satisfied with integrated messaging."
          />
        </div>
        
        <div className="text-center mt-12 md:mt-16">
          <Button 
            size="lg" 
            className="bg-primary hover:bg-primary/90 text-white transition-all duration-300 text-base md:text-lg px-6 md:px-8 py-4 md:py-6 h-auto"
          >
            Start Optimizing Your RV Park Today
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}