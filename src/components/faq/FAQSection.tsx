import { Accordion } from "@/components/ui/accordion";
import { FAQItem } from "./FAQItem";
import { faqData } from "./faq-data";
import { memo } from "react";

export const FAQSection = memo(function FAQSection() {
  return (
    <section className="grid grid-cols-12 gap-8 lg:gap-12">
      <div className="col-span-12 lg:col-span-4 space-y-4">
        <h2 className="text-heading-medium font-semibold text-white leading-[1.4]">
          Frequently Asked Questions
        </h2>
        <p className="text-xl text-gray-300">
          Find answers to common questions about our RV park management platform.
        </p>
      </div>
      
      <div className="col-span-12 lg:col-span-8 grid gap-3 sm:gap-4">
        <Accordion type="single" collapsible className="space-y-3 sm:space-y-4">
          {faqData.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              index={index}
            />
          ))}
        </Accordion>
      </div>
    </section>
  );
});