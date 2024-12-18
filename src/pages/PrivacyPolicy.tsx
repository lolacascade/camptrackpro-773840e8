import { Layout } from "@/components/layout/Layout";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-[#FFF] py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-heading-medium font-bold text-[#133134] mb-8">Privacy Policy</h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-body-large text-[#3E4238] mb-6">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <h2 className="text-heading-medium font-semibold text-[#133134] mt-8 mb-4">1. Information We Collect</h2>
          <p className="text-body-large text-[#3E4238] mb-6">
            We collect information that you provide directly to us, including but not limited to your name, email address, and marina management data.
          </p>

          <h2 className="text-heading-medium font-semibold text-[#133134] mt-8 mb-4">2. How We Use Your Information</h2>
          <p className="text-body-large text-[#3E4238] mb-6">
            We use the information we collect to provide, maintain, and improve our services, to communicate with you, and to develop new services.
          </p>

          <h2 className="text-heading-medium font-semibold text-[#133134] mt-8 mb-4">3. Data Security</h2>
          <p className="text-body-large text-[#3E4238] mb-6">
            We implement appropriate technical and organizational measures to maintain the security of your personal information.
          </p>
        </div>
      </div>
    </div>
  );
}