interface AuthContainerProps {
  children: React.ReactNode;
}

export function AuthContainer({ children }: AuthContainerProps) {
  return (
    <div className="min-h-screen bg-[#0D1D1F] flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        {children}
      </div>
    </div>
  );
}