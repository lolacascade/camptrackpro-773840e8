import { EmailSignupForm } from "./EmailSignupForm";

export function CallToAction() {
  return (
    <section className="bg-secondary py-16 sm:py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-heading-medium lg:text-lg:heading-medium text-foreground-light mb-6">
            Ready to Streamline Your RV Park Operations?
          </h2>
          <p className="text-body-large lg:text-lg:body-large text-foreground-light/80 mb-8">
            Join hundreds of RV park owners who are already saving time and increasing revenue with CampTrackPro.
          </p>
          <div className="max-w-md mx-auto">
            <EmailSignupForm />
          </div>
        </div>
      </div>
    </section>
  );
}