
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthLoading } from '@/components/auth/AuthLoading';
import { AuthLogo } from '@/components/auth/AuthLogo';
import { AuthContainer } from '@/components/auth/AuthContainer';
import { AuthForm } from '@/components/auth/AuthForm';
import { useAuthState } from '@/hooks/use-auth-state';
import { useAuth } from '@/contexts/AuthContext';

export default function Login() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isLoading } = useAuth();
  const fromPath = location.state?.from?.pathname || '/app';
  
  useAuthState(fromPath);

  useEffect(() => {
    if (!isLoading && user) {
      navigate(fromPath, { replace: true });
    }
  }, [user, isLoading, navigate, fromPath]);

  if (isLoading) {
    return <AuthLoading />;
  }

  return (
    <AuthContainer>
      <AuthLogo />
      <AuthForm />
    </AuthContainer>
  );
}
