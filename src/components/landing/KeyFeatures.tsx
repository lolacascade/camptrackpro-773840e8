import { Card } from "@/components/ui/card";

export function KeyFeatures() {
  const features = [
    {
      title: "AI-Powered Recommendations",
      description: "Leverage advanced AI to gain actionable insights for optimizing site performance, resource allocation, and cost efficiency, helping you make smarter, data-driven decisions.",
      image: "/lovable-uploads/79460893-b90c-4e6b-a025-5a0300cc4505.png"
    },
    {
      title: "Maintenance Tracking",
      description: "Stay on top of tasks with real-time tracking and updates. Assign, log, and monitor maintenance activities seamlessly to ensure your park runs without interruptions.",
      image: "/lovable-uploads/2daae83b-e848-42d3-8997-fe75f243365b.png"
    },
    {
      title: "Site Management",
      description: "Easily organize and oversee site details, surface types, and availability with a centralized tool designed for clear and hassle-free management.",
      image: "/lovable-uploads/9f95e521-f350-4f2e-a382-453cfcdc0f99.png"
    },
    {
      title: "Save Time",
      description: "Reduce repetitive work by streamlining operations and focusing your efforts on growth. Save hours weekly with intelligent tools and automation.",
      image: "/lovable-uploads/28a3aa71-b9f7-48f0-a8d5-148a36ce9cd9.png"
    },
    {
      title: "Cut Costs",
      description: "Efficiently allocate utilities and resources with AI-powered insights that help you reduce expenses while maximizing your park's potential.",
      image: "/lovable-uploads/39e3ede1-f67a-4d95-bf1b-c9d66f21a9d7.png"
    },
    {
      title: "Guest Experience",
      description: "Enhance visitor satisfaction with personalized insights and optimized site operations, ensuring guests enjoy a seamless and memorable stay.",
      image: "/lovable-uploads/a7a2253c-1354-4672-ae64-20b1afb55c16.png"
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-[#0D1D1F]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-[1.4]">
            All Your Operations, Simplified
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            From site management to guest insights, our tool provides everything you need to run your RV park smoothly and efficiently.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className={`
                bg-[#0D1D1F] p-8 md:p-10 
                ${index >= 2 ? 'border-t border-[rgba(255,255,255,0.1)]' : ''}
                ${index % 2 === 1 ? 'md:border-l border-[rgba(255,255,255,0.1)]' : ''}
              `}
            >
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold text-white leading-[1.4]">
                  {feature.title}
                </h3>
                <p className="text-[18px] leading-relaxed text-gray-300">
                  {feature.description}
                </p>
                <div className="mt-6">
                  <img 
                    src={feature.image} 
                    alt={feature.title}
                    className="w-full h-60 object-cover rounded-lg opacity-80" // Increased height from h-48 to h-60 (25% increase)
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}