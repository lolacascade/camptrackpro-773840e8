
import React from 'react';

interface PageWithChatProps {
  children: React.ReactNode;
}

export function PageWithChat({ children }: PageWithChatProps) {
  return (
    <div className="flex min-h-screen">
      <main className="flex-1 px-4 py-8 md:px-6 lg:px-8">
        {children}
      </main>
      {/* Chat component can be added here */}
    </div>
  );
}
