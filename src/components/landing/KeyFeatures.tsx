import { Card } from "@/components/ui/card";
import { 
  Sparkles, 
  ListChecks, 
  Database,
  Clock, 
  DollarSign, 
  Heart
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
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            All Your Operations, Simplified
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            From site management to guest insights, our tool provides everything you need to run your RV park smoothly and efficiently.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const isLarge = feature.size === 'large';
            const isMedium = feature.size === 'medium';
            
            return (
              <Card 
                key={index} 
                className={`
                  relative overflow-hidden group
                  ${isLarge ? 'md:col-span-2 lg:col-span-2 lg:row-span-2' : 
                    isMedium ? 'lg:col-span-2' : ''}
                  bg-white border-none
                  transform transition-all duration-500
                  hover:scale-[1.02] hover:shadow-xl
                  p-8 md:p-10 flex flex-col justify-between
                  ${isLarge ? 'min-h-[400px]' : 'min-h-[300px]'}
                `}
              >
                <div>
                  <div className="mb-8 inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#0D1D1F] shadow-lg">
                    <Icon className="w-8 h-8 text-white stroke-[1.5]" />
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
                    
                    <p className="text-base text-[#4A4A4A] leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>

                <div 
                  className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r 
                  from-[#0D1D1F] via-[#0D1D1F] to-transparent 
                  transform origin-left scale-x-0 
                  group-hover:scale-x-100 transition-transform duration-700 ease-out"
                />
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}