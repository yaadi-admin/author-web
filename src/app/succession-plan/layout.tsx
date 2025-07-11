'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import { Button, ActionIcon } from 'rizzui';
import cn from '@/utils/class-names';
import { usePathname, useRouter } from 'next/navigation';
import { siteConfig } from '@/config/site.config';
import { routes } from '@/config/routes';
import { useCurrentSession } from '@/config/succession-session';
import ProfileMenu from '@/layouts/profile-menu';
import Link from 'next/link';
import Sidebar from '@/layouts/hydrogen/sidebar';
import Header from '@/layouts/hydrogen/header';

const ignoreBackButtonRoutes = [routes.accessDenied, routes.notFound];
export default function OtherPagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathName = usePathname();
  const { push } = useRouter();
  const [isHamburgerOpen, setHamburgerOpen] = useState<boolean>(false);
  const { session, loading } = useCurrentSession();
  let notIn = !ignoreBackButtonRoutes.includes(pathName);

  const genericHamburgerLine = `h-1 w-6 my-1 rounded-full bg-black transition ease transform duration-300`;
  const isLoggedIn = session?.id;

  const customClassName = !isLoggedIn ? 'w-full' : 'flex 4xs:w-full flex-col xl:ms-[270px] xl:w-[calc(100%-270px)] 2xl:ms-72 2xl:w-[calc(100%-288px)]'
  const childrenClassName = !isLoggedIn ? 'w-full' : 'flex flex-grow flex-col px-4 pb-6 pt-2 md:px-5 lg:px-6 lg:pb-8 3xl:px-8 3xl:pt-4 4xl:px-10 4xl:pb-9';
  // console.log(isLoggedIn);
  // return (
  //   <main className="flex min-h-screen flex-grow">
  //     {isLoggedIn && <Sidebar className="fixed hidden xl:block dark:bg-gray-50" />}
  //     <div className={customClassName}>
  //       {isLoggedIn && <Header />}
  //       <div style={{ backgroundColor: 'white', height: 80, borderBottom: '0.5px solid #cecece' }}
  //         className="p-6 pt-8 w-full">
  //         <div
  //           style={{ marginTop: '-1%' }}
  //           className={cn(
  //             'mx-auto flex max-w-[1520px] items-center',
  //             notIn ? 'justify-between' : 'justify-center'
  //           )}
  //         >
  //           <Link href="/succession-plan">
  //             <Image
  //               src={siteConfig.logo}
  //               alt={siteConfig.title}
  //               className="dark:invert"
  //               width={225}
  //               height={225}
  //               quality={100}
  //               priority
  //             />
  //           </Link>


  //           <div className="grid ml-auto 2x:grid xs:grid sm:hidden md:hidden lg:hidden">
  //             <ActionIcon
  //               aria-label="Open Navigation Menu"
  //               variant="text"
  //               className="flex flex-col h-12 w-12 rounded justify-center items-center group"
  //               onClick={() => setHamburgerOpen(!isHamburgerOpen)}
  //             >
  //               <div
  //                 className={`${genericHamburgerLine} ${isHamburgerOpen
  //                   ? "rotate-45 translate-y-3  group-hover:opacity-100"
  //                   : ""
  //                   }`}
  //               />
  //               <div className={`${genericHamburgerLine} ${isHamburgerOpen ? "opacity-0" : "opacity-100"}`} />
  //               <div
  //                 className={`${genericHamburgerLine} ${isHamburgerOpen
  //                   ? "-rotate-45 -translate-y-3 "
  //                   : "group-hover:opacity-100"
  //                   }`}
  //               />
  //             </ActionIcon>
  //           </div>
  //           {Object.keys(session).length === 0 ? (
  //             <>
  //               {!(pathName.includes('signin') || pathName.includes('signup')) &&
  //                 <div className="grid grid-cols-2 gap-2 4xs:hidden 2xs:hidden xs:hidden sm:grid md:grid lg:grid">
  //                   <Button
  //                     variant="outline"
  //                     size="sm"
  //                     className="rounded-full md:h-10 md:px-4 md:text-base"
  //                     style={{ marginRight: '2.5%' }}
  //                     onClick={() => push('/succession-plan/signin')}
  //                   >
  //                     <p className='font-semibold'>Login</p>
  //                   </Button>
  //                   <Button
  //                     variant="solid"
  //                     size="sm"
  //                     className="rounded-full md:h-10 md:px-4 md:text-base"
  //                     onClick={() => push('/succession-plan/signup')}
  //                   >
  //                     <p className='font-semibold'>Sign Up</p>
  //                   </Button>
  //                 </div>
  //               }
  //             </>

  //           ) : <div className='flex items-center gap-5'>
  //             <Button variant="text" onClick={() => push('/succession-plan/contact')}>Contact Us</Button>
  //             <ProfileMenu hideAccount />
  //           </div>
  //           }

  //         </div>
  //       </div>
  //       <div className={childrenClassName}>
  //         {children}
  //       </div>
  //     </div>
  //   </main>
  // )
  return (
    <div className="flex min-h-screen flex-col bg-[#F8FAFC] dark:bg-gray-50">
      {/* sticky top header  */}
      <div style={{ backgroundColor: 'white', height: 80, borderBottom: '0.5px solid #cecece' }}
        className="p-6 pt-8 w-full">
        <div
          style={{ marginTop: '-1%' }}
          className={cn(
            'mx-auto flex max-w-[1520px] items-center',
            notIn ? 'justify-between' : 'justify-center'
          )}
        >
          <Link href="/succession-plan">
            <Image
              src={siteConfig.logo}
              alt={siteConfig.title}
              className="dark:invert"
              width={225}
              height={225}
              quality={100}
              priority
            />
          </Link>


          <div className="grid ml-auto 2x:grid xs:grid sm:hidden md:hidden lg:hidden">
            <ActionIcon
              aria-label="Open Navigation Menu"
              variant="text"
              className="flex flex-col h-12 w-12 rounded justify-center items-center group"
              onClick={() => setHamburgerOpen(!isHamburgerOpen)}
            >
              <div
                className={`${genericHamburgerLine} ${isHamburgerOpen
                  ? "rotate-45 translate-y-3  group-hover:opacity-100"
                  : ""
                  }`}
              />
              <div className={`${genericHamburgerLine} ${isHamburgerOpen ? "opacity-0" : "opacity-100"}`} />
              <div
                className={`${genericHamburgerLine} ${isHamburgerOpen
                  ? "-rotate-45 -translate-y-3 "
                  : "group-hover:opacity-100"
                  }`}
              />
            </ActionIcon>
          </div>
          {Object.keys(session).length === 0 ? (
            <>
              {!(pathName.includes('signin') || pathName.includes('signup')) &&
                <div className="grid grid-cols-2 gap-2 4xs:hidden 2xs:hidden xs:hidden sm:grid md:grid lg:grid">
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-full md:h-10 md:px-4 md:text-base"
                    style={{ marginRight: '2.5%' }}
                    onClick={() => push('/signin')}
                  >
                    <p className='font-semibold'>Login</p>
                  </Button>
                  <Button
                    variant="solid"
                    size="sm"
                    className="rounded-full md:h-10 md:px-4 md:text-base"
                    onClick={() => push('/signup')}
                  >
                    <p className='font-semibold'>Sign Up</p>
                  </Button>
                </div>
              }
            </>

          ) : <div className='flex items-center gap-5'>
            <Button variant="text" onClick={() => push('/succession-plan/contact')}>Contact Us</Button>
            <ProfileMenu hideAccount />
          </div>
          }

        </div>
        {/* {isHamburgerOpen && (
          <div className="2x:flex xs:flex sm:hidden md:hidden lg:hidden flex flex-col bg-white items-center gap-2 py-8" aria-label="mobile">
            {notIn && (
              <Button
                variant="outline"
                size="xl"
                style={{ width: '140px' }}
                onClick={() => push('/succession-plan/signin')}
                className='rounded-full'
              >
                <p className='font-semibold'>Login</p>
              </Button>
            )}
            <Button
              variant="solid"
              color="primary"
              size="xl"
              style={{ width: '140px' }}
              onClick={() => push('/succession-plan/signup')}
              className='rounded-full'
            >
              <p className='font-semibold'>Sign Up</p>
            </Button>
          </div>
        )} */}
      </div>
      {children}
      {/* <SocialItems /> */}
    </div>
  );
}