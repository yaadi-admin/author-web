'use client';

import Link from 'next/link';
import HamburgerButton from '@/layouts/hamburger-button';
import SearchWidget from '@/components/search/search';
import Sidebar from '@/layouts/hydrogen/sidebar';
import Logo from '@/components/logo';
import HeaderMenuRight from '@/layouts/header-menu-right';
import StickyHeader from '@/layouts/sticky-header';
import { currentSession } from '@/config/session';
import { routes } from '@/config/routes';
import { findDba } from './config';

import { useState, useEffect } from 'react';

export default function Header() {
  const currentUser = currentSession() as any;
  const [companyName, setCompanyName] = useState('Narro');
  const [navigateTo, setNavigateTo] = useState<string>('/');

  const handleNavigation = () => {
    if (currentUser) {
      if (currentUser?.role === "seller") {
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
      else if (currentUser?.role === "representative") {
        return routes?.searchAndFilter?.flight;
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
    async function fetchDba() {
      const l = await findDba(currentUser);
      setCompanyName(`${l}`);
    }
    if (currentUser) {
      handleState();
      fetchDba()
    }
  }, [currentUser.id]);


  return (
    <StickyHeader className="z-[990] 2xl:py-5 3xl:px-8  4xl:px-10">
      <div className="flex w-full max-w-2xl items-center">
        <HamburgerButton
          view={<Sidebar className="static w-full 2xl:w-full" />}
        />
        <Link
          href={navigateTo}
          aria-label="Site Logo"
          className="me-4 w-9 shrink-0 text-gray-800 hover:text-gray-900 lg:me-5 xl:hidden mb-0.5"
        >
          <Logo iconOnly={true}
            companyName={companyName}
          />
        </Link>

        <SearchWidget />
      </div>

      <HeaderMenuRight />
    </StickyHeader>
  );
}
