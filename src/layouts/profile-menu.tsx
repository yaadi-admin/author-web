'use client';

import { Title, Text, Avatar, Button, Popover } from 'rizzui';
import cn from '@/utils/class-names';
import { routes } from '@/config/routes';
import { doc, onSnapshot, query, collection, getDocs, where } from "firebase/firestore";
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import firebase from '@/config/firebase.config';
import { currentSession } from '@/config/session';
import { signOut } from "firebase/auth";


export default function ProfileMenu({
  buttonClassName,
  avatarClassName,
  username = false,
  hideAccount = false,
}: {
  buttonClassName?: string;
  avatarClassName?: string;
  hideAccount?: boolean;
  username?: boolean;
}) {

  const currentUser = currentSession() as any;

  return (
    <ProfileMenuPopover>
      <Popover.Trigger>
        <button
          className={cn(
            'w-9 shrink-0 rounded-full outline-none focus-visible:ring-[1.5px] focus-visible:ring-gray-400 focus-visible:ring-offset-2 active:translate-y-px sm:w-10',
            buttonClassName
          )}
        >
          <Avatar
            src={currentUser?.profilePictureURL}
            name="John Doe"
            className={cn('!h-9 w-9 sm:!h-10 sm:!w-10', avatarClassName)}
          />
          {!!username && (
            <span className="username hidden text-gray-200 dark:text-gray-700 md:inline-flex">
              Hi, {currentUser?.firstName}
            </span>
          )}
        </button>
      </Popover.Trigger>

      <Popover.Content className="z-[9999] p-0 dark:bg-gray-100 [&>svg]:dark:fill-gray-100">
        <DropdownMenu hideAccount={hideAccount} />
      </Popover.Content>
    </ProfileMenuPopover>
  );
}

function ProfileMenuPopover({ children }: React.PropsWithChildren<{}>) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <Popover
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      shadow="sm"
      placement="bottom-end"
    >
      {children}
    </Popover>
  );
}

const menuItems = [
  // {
  //   name: 'My Profile',
  //   href: routes.profile,
  // },
  {
    name: 'Account',
    href: routes.forms.profileSettings,
  },
  // {
  //   name: 'Activity Log',
  //   href: '#',
  // },
];

function DropdownMenu({ hideAccount }: { hideAccount?: boolean }) {
  const currentUser = currentSession() as any;
  const { push } = useRouter();

  const logOut = async () => {
    try {
      await signOut(firebase?.auth); // Sign the user out
      localStorage.removeItem('usrdt')
      console.log('User signed out');
      if (hideAccount) {
        push('/succession-plan')
      } else {
        push(routes.signIn);
      }
      // You can also clear any client-side user data or redirect to a different page here
    } catch (error) {
      console.error("Error logging out:", error);
      // Handle the error as needed, e.g., show a notification to the user
    }
  };


  return (
    <div className="w-64 text-left rtl:text-right">
      <div className="flex items-center border-b border-gray-300 px-6 pb-5 pt-6">
        <Avatar
          src={currentUser?.profilePictureURL}
          name={'John Doe'}
          className='w-1/5'
        />
        <div className="ms-3 w-4/5">
          <Title as="h6" className="font-semibold">
            {`${currentUser?.firstName} ${currentUser?.lastName}`}
          </Title>
          <Text className="truncate text-gray-600">{`${currentUser?.email}`}</Text>

        </div>
      </div>
      {!hideAccount &&
        <div className="grid px-3.5 py-3.5 font-medium text-gray-700">

          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="group my-0.5 flex items-center rounded-md px-2.5 py-2 hover:bg-gray-100 focus:outline-none hover:dark:bg-gray-50/50"
            >
              {item.name}
            </Link>
          ))}
        </div>
      }
      <div className={`${!hideAccount && 'border-t border-gray-300'}  px-6 pb-6 pt-5`}>
        <Button
          className="h-auto w-full justify-start p-0 font-medium text-gray-700 outline-none focus-within:text-gray-600 hover:text-gray-900 focus-visible:ring-0"
          variant="text"
          onClick={() => logOut()}
        >
          Sign Out
        </Button>
      </div>
    </div>
  );
}
