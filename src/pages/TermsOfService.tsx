import { Layout } from "@/components/layout/Layout";

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-[#FFF] py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold text-[#133134] mb-8">Terms of Service</h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-[#3E4238] mb-6">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <h2 className="text-2xl font-semibold text-[#133134] mt-8 mb-4">1. Acceptance of Terms</h2>
          <p className="text-[#3E4238] mb-6">
            By accessing and using this marina management platform, you agree to be bound by these Terms of Service and all applicable laws and regulations.
          </p>

          <h2 className="text-2xl font-semibold text-[#133134] mt-8 mb-4">2. Use License</h2>
          <p className="text-[#3E4238] mb-6">
            Permission is granted to temporarily access the materials (information or software) on our platform for personal, non-commercial transitory viewing only.
          </p>

          <h2 className="text-2xl font-semibold text-[#133134] mt-8 mb-4">3. Disclaimer</h2>
          <p className="text-[#3E4238] mb-6">
            The materials on our platform are provided on an 'as is' basis. We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
          </p>
        </div>
      </div>
    </div>
  );
}