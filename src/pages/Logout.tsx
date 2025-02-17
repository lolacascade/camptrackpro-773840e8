
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { AuthContainer } from '@/components/auth/AuthContainer';

export default function Logout() {
  const { signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const performLogout = async () => {
      try {
        await signOut();
        navigate('/signin', { replace: true });
      } catch (error) {
        console.error('Logout failed:', error);
        // If regular navigation fails, force a hard redirect
        window.location.href = '/signin';
      }
    };

    performLogout();
  }, [signOut, navigate]);

  return (
    <AuthContainer>
      <div className="flex items-center justify-center min-h-[200px]">
        <p className="text-lg text-gray-600">Logging out...</p>
      </div>
    </AuthContainer>
  );
}
