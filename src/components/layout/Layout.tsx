import { Header } from "./Header";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-[#0D1D1F] overflow-x-hidden">
      <Header />
      <main className="flex-1 w-full max-w-[100vw]">
        {children}
      </main>
    </div>
  );
}