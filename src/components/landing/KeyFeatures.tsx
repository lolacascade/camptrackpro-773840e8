import { 
  Sparkles, 
  WrenchIcon, 
  MapPin, 
  FileText, 
  Users,
  ChartBar
} from "lucide-react";
import { Card } from "@/components/ui/card";

export function KeyFeatures() {
  const features = [
    {
      icon: Sparkles,
      title: "AI-Powered Recommendations",
      description: "Smart suggestions for optimizing site usage and reducing costs."
    },
    {
      icon: WrenchIcon,
      title: "Maintenance Automation",
      description: "Log, assign, and track maintenance tasks effortlessly."
    },
    {
      icon: MapPin,
      title: "Site Management",
      description: "Track site types, utilities, surface details, and availability in real time."
    },
    {
      icon: FileText,
      title: "Custom Reports",
      description: "Generate actionable reports on park performance, expenses, and site utilization."
    },
    {
      icon: Users,
      title: "Guest Insights",
      description: "Understand visitor trends and preferences to enhance your park."
    },
    {
      icon: ChartBar,
      title: "Performance Analytics",
      description: "Track and analyze your park's key metrics in real-time."
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-[#0D1D1F]">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-12 text-white">
          Everything You Need in One Tool
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="p-6 bg-[#133134] border-none text-white hover:shadow-lg transition-shadow">
                <Icon className="w-10 h-10 mb-4 text-primary" />
                <h3 className="text-lg font-semibold mb-2 text-white">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}