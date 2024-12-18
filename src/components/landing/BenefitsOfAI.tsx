import { Card } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const insights = [
  {
    title: "Total Occupancy",
    description: "Understand your RV site usage with real-time occupancy insights to maximize availability."
  },
  {
    title: "Monthly Revenue",
    description: "Track your revenue sources and identify growth opportunities with detailed income insights."
  },
  {
    title: "Active RVs",
    description: "Monitor RV activity, including long-term and short-term stays, to optimize site usage."
  },
  {
    title: "Pending Maintenance",
    description: "Stay ahead of repairs by prioritizing urgent maintenance and scheduled tasks."
  },
  {
    title: "Current Utilization",
    description: "Get a clear overview of resource usage to balance availability and site performance."
  },
  {
    title: "Expense Overview",
    description: "Keep an eye on your expenses across categories to maintain a healthy budget."
  },
  {
    title: "Customer Rating",
    description: "Measure guest satisfaction with ratings for service, timeliness, and overall experience."
  }
];

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
            <CarouselPrevious className="hidden md:flex -left-12 border-[#1a2b2d] bg-[#133134]/10 backdrop-blur-sm hover:bg-[#133134]/20" />
            <CarouselNext className="hidden md:flex -right-12 border-[#1a2b2d] bg-[#133134]/10 backdrop-blur-sm hover:bg-[#133134]/20" />
          </Carousel>
        </div>
      </div>
    </section>
  );
}