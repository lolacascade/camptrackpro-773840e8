import { EmailSignupForm } from "./EmailSignupForm";

export function CallToAction() {
  return (
    <section className="relative py-20 sm:py-24 md:py-28 lg:py-32 bg-[#0D1D1F] overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-heading-medium lg:text-lg:heading-medium font-bold mb-6 sm:mb-8 text-foreground-light">
            Start Managing Your Park the Smart Way
          </h2>
          
          <div className="max-w-md mx-auto">
            <EmailSignupForm />
          </div>
        </div>
      </div>
    </section>
  );
}