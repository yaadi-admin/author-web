'use client';

import Header from '@/layouts/hydrogen/header';
import Sidebar from '@/layouts/hydrogen/sidebar';
import { useEffect, useState } from 'react';
import firebase from '@/config/firebase.config';
import { signOut } from "firebase/auth";
import { routes } from '@/config/routes';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { doc, onSnapshot, query, collection, getDocs, where } from "firebase/firestore";
import { currentSession } from '@/config/session';

export default function HydrogenLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const params = useSearchParams();
  // Gets the page URL and splits it to get the page ID, if the page ID is empty, the sidebar will not be displayed
  const currentUser = currentSession() as any;

  const routesWithoutSidebar = [
    'real-estate-seller/intake',
    'real-estate-seller/dialogue',
    'real-estate-seller/congratulations'
  ];

  const isRouteWithoutSidebar = (pathname: string) => {
    return routesWithoutSidebar.some(route => pathname.includes(route));
  };

  if (isRouteWithoutSidebar(pathname)) {
    return <main className="flex min-h-screen flex-grow">
      {/* {currentUser?.id && <Sidebar className="fixed hidden xl:block dark:bg-gray-50" />} */}
      <div className="flex 4xs:w-full flex-col xl:ms-[0px] xl:w-[100%] 2xl:ms-72 2xl:w-[100%]">
        {currentUser?.id && <Header />}
        <div className="flex flex-grow flex-col px-4 pb-6 pt-2 md:px-5 lg:px-6 lg:pb-8 3xl:px-8 3xl:pt-4 4xl:px-10 4xl:pb-9">
          {children}
        </div>
      </div>
    </main>
  }
  // const step = params?.get('step');

  // const isDialogue = step === 'dialogue';
  const layoutClassNames = 'bg-background px-4 pb-6 pt-2 md:px-5 lg:px-6 lg:pb-8 3xl:px-8 3xl:pt-4 4xl:px-10 4xl:pb-9';
  return (
    <main className="flex min-h-screen flex-grow ">
      {currentUser?.id && <Sidebar className="fixed hidden xl:block dark:bg-gray-50" />}
      <div className="flex 4xs:w-full flex-col xl:ms-[270px] xl:w-[calc(100%-270px)] 2xl:ms-72 2xl:w-[calc(100%-252px)]">
        {currentUser?.id && <Header />}
        <div className={`flex flex-grow flex-col ${layoutClassNames}`}>
          {children}
        </div>
      </div>
    </main>
  );
}
