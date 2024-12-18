import { Card } from "@/components/ui/card";
import { ChartBar, ListChecks, Database } from "lucide-react";

export function ValueProposition() {
  const benefits = [
    {
      icon: ChartBar,
      title: "AI-Powered Insights",
      description: "Make smarter decisions with real-time insights and performance analytics tailored for your park's needs."
    },
    {
      icon: ListChecks,
      title: "Task Management",
      description: "Easily manage tasks, schedules, and site operations with tools that help you stay organized and efficient."
    },
    {
      icon: Database,
      title: "Centralized Management",
      description: "Bring everything together – from site details to utilities and maintenance – in one place, accessible anytime."
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-[#0D1D1F] relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYtMi42ODYgNi02cy0yLjY4Ni02LTYtNi02IDIuNjg2LTYgNiAyLjY4NiA2IDYgNnptMCAwIiBzdHJva2U9IiNmZmYiIHN0cm9rZS13aWR0aD0iMiIvPjwvZz48L3N2Zz4=')]"></div>
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-white">
            Manage Your Park with Confidence
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Take control of your RV park with a smart, AI-powered management tool designed to save time, reduce hassle, and improve operations.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <Card 
                key={index} 
                className="p-6 bg-white text-center transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
              >
                <div className="relative mb-6">
                  <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold mb-3 text-[#0D1D1F]">
                  {benefit.title}
                </h3>
                <p className="text-gray-600">
                  {benefit.description}
                </p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}