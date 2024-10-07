// components/withAuth.tsx

import React from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/useAuth';

export function withAuth<P extends object>(WrappedComponent: React.ComponentType<P>) {
  return function WithAuth(props: P) {
    const { user, loading } = useAuth();
    const router = useRouter();

    if (loading) {
      return <div>Loading...</div>;
    }

    if (!user) {
      router.push('/Login');
      return null;
    }

    return <WrappedComponent {...props} />;
  };
}
