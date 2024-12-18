import { Card } from "@/components/ui/card";
import { ChartBar, ListChecks, Database, ChevronDown } from "lucide-react";
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
      id: 'insights',
      icon: ChartBar,
      title: "AI-Powered Insights",
      description: "Make smarter decisions with real-time insights and performance analytics tailored for your park's needs."
    },
    {
      id: 'tasks',
      icon: ListChecks,
      title: "Task Management",
      description: "Easily manage tasks, schedules, and site operations with tools that help you stay organized and efficient."
    },
    {
      id: 'data',
      icon: Database,
      title: "Centralized Management",
      description: "Bring everything together – from site details to utilities and maintenance – in one place, accessible anytime."
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-[#0D1D1F] relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
                Manage Your Park with Confidence
              </h2>
              <p className="text-lg text-gray-300 max-w-xl">
                Take control of your RV park with a smart, AI-powered management tool designed to save time, reduce hassle, and improve operations.
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
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent blur-3xl" />
            <Card className="relative bg-[#1a2b2d]/80 border-gray-700 backdrop-blur-sm p-6 md:p-8">
              <div className="aspect-video rounded-lg bg-[#0D1D1F]/80 border border-gray-700 overflow-hidden">
                {/* This is where you would display feature previews based on activeFeature */}
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  Feature Preview
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}