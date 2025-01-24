import { Header } from "./Header";
import { Footer } from "./Footer";
import { useLocation } from "react-router-dom";
import { Outlet } from "react-router-dom";

export function Layout() {
  return (
    <div className="flex min-h-screen flex-col bg-[#0D1D1F] overflow-x-hidden">
      <Header />
      <main className="flex-1 w-full max-w-[100vw]">
        <Outlet />
      </main>
    </div>
  );
}