import { Card } from "@/components/ui/card";
import { Search, BarChart2, ArrowRight } from "lucide-react";
import { useState } from "react";

export function KeyFeatures() {
  const [searchQuery, setSearchQuery] = useState('');
  
  const suggestions = [
    "How to optimize site occupancy?",
    "Best practices for maintenance scheduling",
    "Ways to improve guest satisfaction"
  ];

  const performanceData = [
    { category: 'Occupancy', value: 85, color: '#0EA5E9' },
    { category: 'Revenue', value: 92, color: '#F97316' },
    { category: 'Satisfaction', value: 88, color: '#8B5CF6' }
  ];

  return (
    <section className="py-16 md:py-24 bg-[#0D1D1F]">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Section - Search and AI Suggestions */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Smart Solutions at Your Fingertips
              </h2>
              <p className="text-lg text-gray-300">
                Get instant answers and actionable insights powered by AI
              </p>
            </div>

            <div className="space-y-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Ask anything about your RV park management..."
                  className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/50"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="space-y-3">
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    className="w-full flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 rounded-lg text-gray-300 hover:text-white transition-colors"
                    onClick={() => setSearchQuery(suggestion)}
                  >
                    <span>{suggestion}</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Section - Analytics Dashboard */}
          <div className="space-y-8">
            <Card className="p-6 bg-white/5 border-white/10">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-white">Performance Overview</h3>
                  <BarChart2 className="h-5 w-5 text-primary" />
                </div>

                <div className="space-y-4">
                  {performanceData.map((item, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between text-sm text-gray-300">
                        <span>{item.category}</span>
                        <span>{item.value}%</span>
                      </div>
                      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{
                            width: `${item.value}%`,
                            backgroundColor: item.color
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Card className="p-4 bg-white/5 border-white/10">
                    <div className="text-sm text-gray-300">Total Sites</div>
                    <div className="text-2xl font-bold text-white">124</div>
                  </Card>
                  <Card className="p-4 bg-white/5 border-white/10">
                    <div className="text-sm text-gray-300">Active Bookings</div>
                    <div className="text-2xl font-bold text-white">87</div>
                  </Card>
                </div>
              </div>
            </Card>

            {/* Placeholder for future image */}
            <div className="aspect-video rounded-lg bg-white/5 border border-white/10 overflow-hidden">
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                Analytics Dashboard Preview
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}