'use client';

import RoleCard from '@/app/shared/roles-permissions/role-card';
import { currentSession } from '@/config/session';
import { rolesList } from '@/data/roles-permissions';
import cn from '@/utils/class-names';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface RolesGridProps {
  className?: string;
  gridClassName?: string;
}

export default function RolesGrid() {
  const currentUser = currentSession() as any;
  const { push } = useRouter();

  useEffect(() => {
    if (currentUser?.role && currentUser?.role !== 'admin') {
      push('/');
    }
  }, [currentUser?.id])

  return (
    <div className={'@container'}>
      
    </div>
  );
}
