import { EmailSignupForm } from "./EmailSignupForm";

export function HeroSection() {
  return (
    <div className="relative min-h-[90vh] flex flex-col items-center justify-start bg-secondary px-4 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-24 lg:py-32">
      <div className="max-w-4xl mx-auto text-center mb-8 md:mb-16 w-full">
        <div className="mb-8 sm:mb-10 mt-8 sm:mt-12 md:mt-16">
          <h1 className="text-heading-large lg:text-lg:heading-large font-bold mb-6">
            <span className="text-foreground-light">Your RV Storage Management Tool, </span>
            <span className="text-primary">Simplified with AI</span>
          </h1>
        </div>
        
        <p className="text-subheading lg:text-lg:subheading text-foreground-light mb-8 sm:mb-10 md:mb-12 lg:mb-14 max-w-3xl mx-auto leading-relaxed">
          Streamline daily operations, stay on top of maintenance, and uncover insights with an intuitive AI-powered management tool. Simplify workflows, reduce manual effort, and focus on what matters—delivering a great experience for your guests.
        </p>

        <div className="max-w-md mx-auto">
          <EmailSignupForm />
        </div>
      </div>

      <div className="w-full max-w-[95vw] sm:max-w-[90vw] lg:max-w-6xl mx-auto bg-foreground-light rounded-2xl shadow-lg p-3 sm:p-4 md:p-6 lg:p-8">
        <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
          <iframe
            className="absolute top-0 left-0 w-full h-full rounded-xl"
            src="https://www.youtube.com/embed/97q7vp6kZJk"
            title="RV Park Management Video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
}