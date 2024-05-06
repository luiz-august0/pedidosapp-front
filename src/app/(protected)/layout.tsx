'use client';

import { sessionVerify } from '@/core/auth/services/auth';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { ReactNode } from 'react';
import MenuSideBar from './components/MenuSideBar';

interface PrivateLayoutProps {
  children: ReactNode;
}

export default function PrivateLayout({ children }: PrivateLayoutProps) {
  const router = useRouter();
  const { status } = useSession();

  const handleSession = async () => {
    try {
      await sessionVerify();
    } catch (error) {
      signOut({ redirect: false });
      router.replace('/login');
    }
  };

  if (status == 'authenticated') {
    handleSession();
  } else if (status == 'unauthenticated') {
    router.replace('/login');
  }

  return <MenuSideBar>{children}</MenuSideBar>;
}
