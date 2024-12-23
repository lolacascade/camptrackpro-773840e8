import { ChartBar, ListChecks, Database } from "lucide-react";
import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function ValueProposition() {
  const [activeFeature, setActiveFeature] = useState('insights');
  
  const features = [
    {
      id: 'tasks',
      icon: ListChecks,
      title: "Overwhelming Task Management",
      description: "Struggling to keep up with day-to-day operations? CampTrackPro organizes schedules and tasks, giving you back precious time."
    },
    {
      id: 'insights',
      icon: ChartBar,
      title: "Lack of Real-Time Insights",
      description: "Guessing at park performance? Get clear, actionable data with AI-powered analytics tailored for your needs."
    },
    {
      id: 'data',
      icon: Database,
      title: "Scattered Information",
      description: "Jumping between tools? CampTrackPro brings everything into one intuitive platform accessible anytime."
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-[#0D1D1F] relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="lg:col-span-4 space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-[1.4]">
                Managing an RV park shouldn't be overwhelming
              </h2>
              <p className="text-lg text-gray-300 max-w-xl">
                From juggling maintenance tasks to keeping track of guest insights, it's easy to feel stretched thin. CampTrackPro is here to make management simpler, smarter, and stress-free.
              </p>
            </div>

            <Accordion type="single" collapsible className="w-full">
              {features.map((feature) => {
                const Icon = feature.icon;
                return (
                  <AccordionItem 
                    key={feature.id} 
                    value={feature.id}
                    className="border-b border-gray-700"
                  >
                    <AccordionTrigger 
                      className="hover:no-underline py-4"
                      onClick={() => setActiveFeature(feature.id)}
                    >
                      <div className="flex items-center text-white">
                        <Icon className="w-5 h-5 mr-3 text-primary" />
                        <span className="text-lg font-medium">{feature.title}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-300 pb-4">
                      {feature.description}
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </div>

          {/* Right Column - Feature Preview */}
          <div className="lg:col-span-8">
            <img 
              src="/lovable-uploads/91e94776-30d0-468a-ac33-281b5d07efbe.png"
              alt="RV Park Management Dashboard"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}