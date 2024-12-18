import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";

const faqData = [
  {
    question: "What is CampTrackPro and who is it for?",
    answer: "Our platform is designed for RV park owners and managers to efficiently manage reservations, sites, maintenance, and customer details, all in one place."
  },
  {
    question: "How does this help me save time managing my RV park?",
    answer: "By automating bookings, tracking site availability, and handling maintenance requests seamlessly, you'll reduce manual work and focus on providing a great experience to your guests."
  },
  {
    question: "Can I manage different types of RV sites and hookups?",
    answer: "Yes, you can customize site types, power options, surface types, and hookup details to meet your RV park's unique needs."
  },
  {
    question: "Is there a way to track maintenance tasks and requests?",
    answer: "Absolutely! Our platform includes a dedicated maintenance management tool to schedule, monitor, and resolve maintenance tasks efficiently."
  },
  {
    question: "Can I visualize my park layout and track site availability?",
    answer: "Yes, our interactive RV Map lets you view all your sites, occupancy status, and site-specific details in a user-friendly layout."
  },
  {
    question: "How does the platform handle payments and expenses?",
    answer: "You can manage expenses, track financials, and integrate with popular payment systems for seamless transactions and reporting."
  },
  {
    question: "Is this platform secure and does it protect my customers' data?",
    answer: "Security is our top priority. All data is encrypted and protected with role-based access control to ensure only authorized users can view specific data."
  },
  {
    question: "Can I add and manage customer details, including bookings?",
    answer: "Yes, you can easily add, edit, and manage customer details, reservations, and site assignments within a few clicks."
  },
  {
    question: "What insights or reports will I get about my RV park?",
    answer: "Our dashboard provides key insights, including site occupancy rates, active bookings, customer engagement, and maintenance trends to help you make data-driven decisions."
  },
  {
    question: "Is the platform easy to use for someone with no technical skills?",
    answer: "Yes! Our platform is intuitive, easy to navigate, and designed with simplicity in mind, so you can get started quickly without extensive training."
  }
];

export function FAQSection() {
  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="space-y-2 sm:space-y-3">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-[#133134]">
          Frequently Asked Questions
        </h2>
        <p className="text-sm sm:text-base text-muted-foreground">
          Find answers to common questions about our RV park management platform.
        </p>
      </div>
      
      <div className="grid gap-3 sm:gap-4">
        {faqData.map((faq, index) => (
          <Card key={index} className="overflow-hidden">
            <Accordion type="single" collapsible>
              <AccordionItem value={`item-${index}`} className="border-none">
                <AccordionTrigger className="px-3 sm:px-4 py-2 sm:py-3 hover:no-underline hover:bg-gray-50/80">
                  <span className="text-left text-sm sm:text-base font-medium text-[#133134]">
                    {faq.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="px-3 sm:px-4 pb-3 sm:pb-4 pt-1">
                  <p className="text-sm sm:text-base text-muted-foreground">
                    {faq.answer}
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </Card>
        ))}
      </div>
    </div>
  );
}