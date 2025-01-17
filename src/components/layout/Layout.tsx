import { Header } from "./Header";
import { Footer } from "./Footer";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-[#0D1D1F] overflow-x-hidden">
      <Header />
      <main className="flex-1 w-full max-w-[100vw]">
        {children}
      </main>
      <Footer />
    </div>
  );
}