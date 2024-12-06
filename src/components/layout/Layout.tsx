import { Header } from "./Header";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col bg-gray-100">
      <Header />
      <main className="flex-1 overflow-y-auto p-4">
        {children}
      </main>
    </div>
  );
}