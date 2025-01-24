import { Link } from "react-router-dom";

export function AuthLogo() {
  return (
    <div className="text-center mb-6">
      <Link to="/" className="inline-block">
        <h1 className="text-4xl font-bold mb-2">
          <span className="text-white">Camp</span>
          <span className="text-white">Track</span>
          <span className="text-[#C0CCAB]">Pro</span>
        </h1>
      </Link>
      <p className="text-gray-400">Manage your RV park with ease</p>
    </div>
  );
}