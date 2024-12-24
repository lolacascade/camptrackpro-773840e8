import { Card } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { insights } from "./constants/landing-data";

export function BenefitsOfAI() {
  return (
    <section className="py-16 md:py-24 bg-[#0D1D1F] relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-left mb-4">
            Unlock Actionable Insights for Smarter Decisions
          </h2>
        </div>

        <div className="relative">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {insights.map((insight, index) => (
                <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                  <Card className="border border-[#1a2b2d] bg-[#133134]/10 backdrop-blur-sm hover:shadow-lg transition-all duration-300 h-full p-6">
                    <div className="aspect-[4/3] rounded-lg bg-[#1a2b2d]/40 mb-4 flex items-center justify-center">
                      <p className="text-white/60 text-lg">{insight.title}</p>
                    </div>
                    <p className="text-gray-300 text-[18px] leading-relaxed">
                      {insight.description}
                    </p>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center gap-4 mt-8">
              <CarouselPrevious className="relative inset-0 translate-y-0 border border-white/10 bg-[#133134]/10 backdrop-blur-sm hover:bg-[#133134]/20 [&_svg]:text-white" />
              <CarouselNext className="relative inset-0 translate-y-0 border border-white/10 bg-[#133134]/10 backdrop-blur-sm hover:bg-[#133134]/20 [&_svg]:text-white" />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
}