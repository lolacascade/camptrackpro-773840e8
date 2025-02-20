
import { Outlet } from "react-router-dom";
import { Header } from "./Header";

export function Layout() {
  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}
