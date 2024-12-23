import { Card } from "@/components/ui/card";

export function KeyFeatures() {
  const features = [
    {
      title: "AI-Powered Recommendations",
      description: "Get actionable suggestions to optimize site usage, reduce costs, and improve operations.",
      image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7"
    },
    {
      title: "Maintenance Tracking",
      description: "Track and manage maintenance effortlessly with tools to log, assign, and monitor progress in real-time.",
      image: "/lovable-uploads/2daae83b-e848-42d3-8997-fe75f243365b.png"
    },
    {
      title: "Site Management",
      description: "Organize site details, surface types, and availability for clear and easy oversight.",
      image: "/lovable-uploads/9f95e521-f350-4f2e-a382-453cfcdc0f99.png"
    },
    {
      title: "Save Time",
      description: "Automate repetitive tasks and focus on growing your business.",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085"
    },
    {
      title: "Cut Costs",
      description: "Optimize utilities and resources with smart AI insights.",
      image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7"
    },
    {
      title: "Guest Experience",
      description: "Deliver better stays with actionable park insights.",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d"
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
                    className="w-full h-48 object-cover rounded-lg opacity-80"
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