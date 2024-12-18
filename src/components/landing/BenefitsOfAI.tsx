import { Clock, DollarSign, Heart } from "lucide-react";
import { Card } from "@/components/ui/card";

export function BenefitsOfAI() {
  const benefits = [
    {
      icon: Clock,
      title: "Save Time",
      description: "Automate repetitive tasks and focus on growing your business.",
      stat: "Save 15+ hours weekly"
    },
    {
      icon: DollarSign,
      title: "Cut Costs",
      description: "Optimize utilities and resources with smart AI insights.",
      stat: "Reduce expenses by 20%"
    },
    {
      icon: Heart,
      title: "Improve Guest Experience",
      description: "Deliver better stays with actionable park insights.",
      stat: "98% guest satisfaction"
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-12 text-[#0D1D1F]">
          Why Use an AI-Powered Management Tool?
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow">
                <Icon className="w-12 h-12 mx-auto mb-4 text-primary" />
                <h3 className="text-lg font-semibold mb-2 text-[#0D1D1F]">{benefit.title}</h3>
                <p className="text-sm font-semibold text-primary mb-2">{benefit.stat}</p>
                <p className="text-gray-600">{benefit.description}</p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}