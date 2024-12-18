import { Card } from "@/components/ui/card";
import { Settings, Sparkles, CheckCircle } from "lucide-react";

export function ValueProposition() {
  const benefits = [
    {
      icon: Sparkles,
      title: "AI-Powered Insights",
      description: "Understand your park's performance with AI-driven analytics."
    },
    {
      icon: Settings,
      title: "Task Automation",
      description: "Automate maintenance schedules, power usage tracking, and more."
    },
    {
      icon: CheckCircle,
      title: "Seamless Management",
      description: "Monitor sites, utilities, and tasks in one centralized tool."
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-[#0D1D1F]">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-12 text-white">
          Manage Smarter, Not Harder
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <Card key={index} className="p-6 bg-white text-center hover:shadow-lg transition-shadow">
                <Icon className="w-12 h-12 mx-auto mb-4 text-primary" />
                <h3 className="text-lg font-semibold mb-2 text-[#0D1D1F]">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}