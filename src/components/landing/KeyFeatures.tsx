
import { Card } from "@/components/ui/card";
import { keyFeatures } from "./constants/landing-data";

export function KeyFeatures() {
  return (
    <section className="py-16 md:py-24 bg-[#0D1D1F] relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-[1.4]">
            All Your Operations, Simplified
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            From site management to guest insights, our tool provides everything you need to run your RV park smoothly and efficiently.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2">
          {keyFeatures.map((feature, index) => (
            <div 
              key={index} 
              className={`
                bg-[#0D1D1F]
                ${index >= 2 ? 'border-t border-[rgba(255,255,255,0.1)]' : ''}
                ${index % 2 === 1 ? 'md:border-l border-[rgba(255,255,255,0.1)]' : ''}
              `}
            >
              <div className="p-6 md:p-8">
                <h3 className="text-2xl font-semibold text-white leading-[1.4] mb-6">
                  {feature.title}
                </h3>
                <p className="text-[18px] leading-relaxed text-gray-300 mb-8">
                  {feature.description}
                </p>
                <img 
                  src={feature.image} 
                  alt={feature.title}
                  className="w-full object-contain rounded-2xl overflow-hidden" 
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
