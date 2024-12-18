import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="bg-[#0D1D1F] text-white py-8 sm:py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-semibold text-base sm:text-lg mb-3 sm:mb-4">About Us</h3>
            <p className="text-sm sm:text-base text-gray-400">
              Streamlining RV park operations with powerful management tools.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-base sm:text-lg mb-3 sm:mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/terms" className="text-sm sm:text-base text-gray-400 hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-sm sm:text-base text-gray-400 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-base sm:text-lg mb-3 sm:mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <a href="mailto:support@example.com" className="text-sm sm:text-base text-gray-400 hover:text-white transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <Link to="/faq" className="text-sm sm:text-base text-gray-400 hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-base sm:text-lg mb-3 sm:mb-4">Connect</h3>
            <ul className="space-y-2">
              <li>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-sm sm:text-base text-gray-400 hover:text-white transition-colors">
                  Twitter
                </a>
              </li>
              <li>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-sm sm:text-base text-gray-400 hover:text-white transition-colors">
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-800 text-center">
          <p className="text-sm sm:text-base text-gray-400">
            &copy; {new Date().getFullYear()} CampTrackPro. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}