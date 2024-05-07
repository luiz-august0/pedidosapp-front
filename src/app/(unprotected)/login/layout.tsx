'use client';

import { sessionVerify } from '@/core/auth/services/auth';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { ReactNode, useEffect } from 'react';

interface Props {
  children: ReactNode;
}

export default function Layout({ children }: Props) {
  const router = useRouter();
  const { status } = useSession();

  useEffect(() => {
    const handleSession = async () => {
      await sessionVerify().then(() => {
        router.replace('/');
      });
    };

    if (status == 'authenticated') {
      handleSession();
    }
  }, [status, router]);

  return <>{children}</>;
}
