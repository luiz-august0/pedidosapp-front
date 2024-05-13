"use client";

import MenuSidebar from "@/components/MenuSidebar/MenuSidebar";
import { sessionVerify } from "@/core/auth/services/auth";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

interface Props {
  children: ReactNode;
}

export default function Layout({ children }: Props) {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(true);
  const router = useRouter();
  const { status } = useSession();

  useEffect(() => {
    const handleSession = async () => {
      try {
        await sessionVerify();
      } catch (error) {
        await signOut({ redirect: false });
        router.replace("/login");
      }
    };

    if (status == "authenticated") {
      handleSession();
    } else if (status == "unauthenticated") {
      router.replace("/login");
    }
  }, [status, router]);

  return (
    <div className="flex max-md:flex-col">
      <MenuSidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <div className="h-screen max-md:p-10 md:ml-28 md:mr-8 pt-10 pb-10" style={{ width: "-webkit-fill-available" }}>
        {children}
      </div>
    </div>
  );
}
