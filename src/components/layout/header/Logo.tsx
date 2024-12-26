import { Link } from "react-router-dom";

export function Logo() {
  return (
    <Link to="/" className="text-xl font-bold hover:opacity-80 transition-opacity">
      <span className="text-white">Camp</span>
      <span className="text-white">Track</span>
      <span className="text-[#C0CCAB]">Pro</span>
    </Link>
  );
}