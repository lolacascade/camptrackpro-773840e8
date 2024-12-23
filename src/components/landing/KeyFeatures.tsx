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
      description: "Leverage advanced AI to gain actionable insights for optimizing site performance, resource allocation, and cost efficiency, helping you make smarter, data-driven decisions.",
      image: featureImages.recommendations
    },
    {
      id: 'maintenance',
      title: "Maintenance Tracking",
      description: "Stay on top of tasks with real-time tracking and updates. Assign, log, and monitor maintenance activities seamlessly to ensure your park runs without interruptions.",
      image: featureImages.maintenance
    },
    {
      id: 'siteManagement',
      title: "Site Management",
      description: "Easily organize and oversee site details, surface types, and availability with a centralized tool designed for clear and hassle-free management.",
      image: featureImages.siteManagement
    },
    {
      id: 'saveTime',
      title: "Save Time",
      description: "Reduce repetitive work by streamlining operations and focusing your efforts on growth. Save hours weekly with intelligent tools and automation.",
      image: featureImages.saveTime
    },
    {
      id: 'cutCosts',
      title: "Cut Costs",
      description: "Efficiently allocate utilities and resources with AI-powered insights that help you reduce expenses while maximizing your park's potential.",
      image: featureImages.cutCosts
    },
    {
      id: 'guestExperience',
      title: "Guest Experience",
      description: "Enhance visitor satisfaction with personalized insights and optimized site operations, ensuring guests enjoy a seamless and memorable stay.",
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