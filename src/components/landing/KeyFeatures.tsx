import { Card } from "@/components/ui/card";
import { 
  Clock, 
  DollarSign, 
  Heart, 
  ListChecks, 
  Database,
  Sparkles
} from "lucide-react";

export function KeyFeatures() {
  const features = [
    {
      icon: Sparkles,
      title: "AI-Powered Recommendations",
      description: "Get actionable suggestions to optimize site usage, reduce costs, and improve operations.",
      size: "large"
    },
    {
      icon: ListChecks,
      title: "Maintenance Tracking",
      description: "Track and manage maintenance effortlessly with tools to log, assign, and monitor progress in real-time.",
      size: "medium"
    },
    {
      icon: Database,
      title: "Site Management",
      description: "Organize site details, surface types, and availability for clear and easy oversight.",
      size: "medium"
    },
    {
      icon: Clock,
      title: "Save Time",
      description: "Automate repetitive tasks and focus on growing your business.",
      stat: "Save 15+ hours weekly",
      size: "small"
    },
    {
      icon: DollarSign,
      title: "Cut Costs",
      description: "Optimize utilities and resources with smart AI insights.",
      stat: "Reduce expenses by 20%",
      size: "small"
    },
    {
      icon: Heart,
      title: "Guest Experience",
      description: "Deliver better stays with actionable park insights.",
      stat: "98% guest satisfaction",
      size: "medium"
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-[#0D1D1F]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white">
            All Your Operations, Simplified
          </h2>
          <p className="mt-4 text-xl text-gray-300 max-w-3xl mx-auto">
            From site management to guest insights, our tool provides everything you need to run your RV park smoothly and efficiently.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const isLarge = feature.size === 'large';
            const isMedium = feature.size === 'medium';
            
            return (
              <Card 
                key={index} 
                className={`
                  relative overflow-hidden group transition-all duration-300
                  ${isLarge ? 'md:col-span-2 lg:col-span-2' : 
                    isMedium ? 'lg:col-span-2' : ''}
                  bg-white p-8 flex flex-col h-full
                `}
              >
                <div className="mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-[#0D1D1F] flex items-center justify-center">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-2xl font-semibold text-[#0D1D1F]">
                    {feature.title}
                  </h3>
                  
                  {feature.stat && (
                    <p className="text-xl font-medium text-[#0D1D1F]">
                      {feature.stat}
                    </p>
                  )}
                  
                  <p className="text-base text-gray-600">
                    {feature.description}
                  </p>
                </div>

                <div className="mt-auto pt-6">
                  <div className="h-1 w-full bg-[#0D1D1F] transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}