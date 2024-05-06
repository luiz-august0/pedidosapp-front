'use client';

import { sessionVerify } from '@/core/auth/services/auth';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { ReactNode } from 'react';

interface PrivateLayoutProps {
  children: ReactNode;
}

export default function PrivateLayout({ children }: PrivateLayoutProps) {
  const router = useRouter();
  const { status } = useSession();

  const handleSession = async () => {
    await sessionVerify().then(() => {
      router.replace('/');
    });
  };

  if (status == 'authenticated') {
    handleSession();
  }

  return <>{children}</>;
}
