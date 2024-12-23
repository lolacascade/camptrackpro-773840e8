import { Card } from "@/components/ui/card";
import { ImageUpload } from "@/components/common/ImageUpload";
import { useState } from "react";

export function KeyFeatures() {
  const [featureImages, setFeatureImages] = useState({
    recommendations: "/lovable-uploads/6631ecd9-bde4-49ab-9f7f-0f16d8de6566.png",
    maintenance: "/lovable-uploads/6631ecd9-bde4-49ab-9f7f-0f16d8de6566.png",
    siteManagement: "/lovable-uploads/6631ecd9-bde4-49ab-9f7f-0f16d8de6566.png",
    saveTime: "/lovable-uploads/6631ecd9-bde4-49ab-9f7f-0f16d8de6566.png",
    cutCosts: "/lovable-uploads/6631ecd9-bde4-49ab-9f7f-0f16d8de6566.png",
    guestExperience: "/lovable-uploads/6631ecd9-bde4-49ab-9f7f-0f16d8de6566.png"
  });

  const features = [
    {
      id: 'recommendations',
      title: "AI-Powered Recommendations",
      description: "Get actionable suggestions to optimize site usage, reduce costs, and improve operations.",
      image: featureImages.recommendations
    },
    {
      id: 'maintenance',
      title: "Maintenance Tracking",
      description: "Track and manage maintenance effortlessly with tools to log, assign, and monitor progress in real-time.",
      image: featureImages.maintenance
    },
    {
      id: 'siteManagement',
      title: "Site Management",
      description: "Organize site details, surface types, and availability for clear and easy oversight.",
      image: featureImages.siteManagement
    },
    {
      id: 'saveTime',
      title: "Save Time",
      description: "Automate repetitive tasks and focus on growing your business.",
      image: featureImages.saveTime
    },
    {
      id: 'cutCosts',
      title: "Cut Costs",
      description: "Optimize utilities and resources with smart AI insights.",
      image: featureImages.cutCosts
    },
    {
      id: 'guestExperience',
      title: "Guest Experience",
      description: "Deliver better stays with actionable park insights.",
      image: featureImages.guestExperience
    }
  ];

  const handleImageUpload = (featureId: string) => (url: string) => {
    setFeatureImages(prev => ({
      ...prev,
      [featureId]: url
    }));
  };

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
              key={feature.id} 
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
                <div className="mt-6 relative group">
                  <img 
                    src={feature.image} 
                    alt={feature.title}
                    className="w-full h-48 object-cover rounded-lg opacity-80"
                  />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 rounded-lg">
                    <ImageUpload 
                      onUploadComplete={handleImageUpload(feature.id)}
                      bucket="marina-media"
                    >
                      <button className="px-4 py-2 bg-white text-black rounded hover:bg-gray-100 transition-colors">
                        Change Image
                      </button>
                    </ImageUpload>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}