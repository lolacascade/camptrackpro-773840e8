import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { ChevronDown } from "lucide-react";
import { memo } from "react";

interface FAQItemProps {
  question: string;
  answer: string;
  index: number;
}

export const FAQItem = memo(function FAQItem({ question, answer, index }: FAQItemProps) {
  return (
    <Card className="border border-[#1a2b2d] bg-[#133134]/10 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
      <AccordionItem value={`item-${index}`} className="border-none">
        <AccordionTrigger className="px-6 py-3 hover:no-underline hover:bg-[#133134]/20 [&[data-state=open]>div>svg]:rotate-180">
          <div className="flex items-center justify-between w-full">
            <span className="text-left text-xl font-medium text-white">
              {question}
            </span>
            <ChevronDown className="h-6 w-6 shrink-0 text-white transition-transform duration-200 ml-4" />
          </div>
        </AccordionTrigger>
        <AccordionContent className="px-6 py-4">
          <p className="text-lg text-gray-300">
            {answer}
          </p>
        </AccordionContent>
      </AccordionItem>
    </Card>
  );
});