'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    const isAuth = sessionStorage.getItem('admin_authenticated');
    if (isAuth !== 'true') {
      router.push('/admin');
    }
  }, [router]);

  return <>{children}</>;
}
