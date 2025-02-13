
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSessionContext } from '@supabase/auth-helpers-react';
import { AuthLoading } from '@/components/auth/AuthLoading';
import { AuthLogo } from '@/components/auth/AuthLogo';
import { AuthContainer } from '@/components/auth/AuthContainer';
import { AuthForm } from '@/components/auth/AuthForm';
import { useAuthState } from '@/hooks/use-auth-state';

export default function Login() {
  const location = useLocation();
  const navigate = useNavigate();
  const { session, isLoading } = useSessionContext();
  const fromPath = location.state?.from?.pathname || '/app';
  
  useAuthState(fromPath);

  useEffect(() => {
    if (!isLoading && session) {
      navigate(fromPath, { replace: true });
    }
  }, [session, isLoading, navigate, fromPath]);

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
