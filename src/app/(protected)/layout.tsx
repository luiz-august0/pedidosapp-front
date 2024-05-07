'use client';

import MenuSidebar from '@/components/MenuSidebar/MenuSidebar';
import { sessionVerify } from '@/core/auth/services/auth';
import { httpErrorToast } from '@/core/helpers/toast';
import { AxiosError } from 'axios';
import { signOut, useSession } from 'next-auth/react';
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
      try {
        await sessionVerify();
      } catch (error) {
        httpErrorToast(error as AxiosError);
        await signOut({ redirect: false });
        router.replace('/login');
      }
    };

    if (status == 'authenticated') {
      handleSession();
    } else if (status == 'unauthenticated') {
      router.replace('/login');
    }
  }, [status]);

  return <MenuSidebar>{children}</MenuSidebar>;
}
