'use client';

import Link from 'next/link';
import cn from '@/utils/class-names';
import SimpleBar from '@/components/ui/simplebar';
import Logo from '@/components/logo';
import { SidebarMenu } from './sidebar-menu';
import Image from 'next/image';
import { currentSession } from '@/config/session';
import { routes } from '@/config/routes';
import { useState, useEffect } from 'react';
import { findLogo } from './config';
export default function Sidebar({ className }: { className?: string }) {
  const currentUser = currentSession() as any;
  const [navigateTo, setNavigateTo] = useState<string>('/');
  const [logo, setLogo] = useState('https://firebasestorage.googleapis.com/v0/b/yaadi-ltd.appspot.com/o/3a68b530-5c8c-4e07-90fc-792d57efc27f_removalai_preview.png?alt=media&token=76255fa5-3879-4c84-b83a-ae4ba1fc72d6')
  const handleNavigation = () => {
    if (currentUser) {
      if (currentUser?.role === "seller" && currentUser?.lite) {
        return routes.seller.dashboard;
      } else if (currentUser?.role === "seller") {
        if (currentUser?.type === "Real Estate") {
          return routes.realEstateSeller.intake;
        } else {
          return routes.eCommerce.dashboard;
        }
      }
      else if (currentUser?.role === "buyer") {
        return routes?.buyer?.dashboard;
      }
      else if (currentUser?.role === "provider") {
        return routes?.provider?.dashboard;
      }
      else if (currentUser?.role === "admin") {
        return routes.eCommerce.dashboard;
      }
      else if (currentUser?.role === "broker") {
        if (currentUser?.type !== 'Real Estate') {
          return routes.broker.dashboard;
        } else {
          return routes.realEstateBroker.dashboard;
        }
      }
    }
    return '/welcome';
  }

  const handleState = () => {
    if (currentUser) {
      setNavigateTo(handleNavigation());
    } else {
      setNavigateTo('/welcome');
    }
  }

  useEffect(() => {
    async function fetchLogo() {
      const l = await findLogo(currentUser);
      setLogo(`${l}`);
    }
    if (currentUser) {
      handleState();
      fetchLogo()
    }
  }, [currentUser.id]);


  return (
    <aside
      className={cn(
        'fixed bottom-0 start-0 z-50 h-full w-[270px] border-e-2 border-gray-100 bg-white dark:bg-gray-100/50 2xl:w-72',
        className
      )}
    >
      <div style={{}} className="sticky top-0 z-40 bg-gray-0/10 pt-5 dark:bg-gray-100/5 ml-6 mr-2">
        <Link
          href={navigateTo}
          aria-label="Site Logo"
          className="text-gray-800 hover:text-gray-900"
        >
          <Image
            src={logo}
            // src={`https://firebasestorage.googleapis.com/v0/b/yaadi-ltd.appspot.com/o/biz-logo.png?alt=media&token=1990b393-0954-4fa4-869b-ecaeed09ba50`}
            alt=""
            width={155}
            height={20}
            priority
            // sizes="(max-width: 60px)"
            className="object-fill h-auto"
          />
        </Link>
      </div>

      <SimpleBar className="h-[calc(100%-80px)]">
        <SidebarMenu />
      </SimpleBar>
    </aside>
  );
}
