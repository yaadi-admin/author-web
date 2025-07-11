import Link from 'next/link';
import { Fragment } from 'react';
import { usePathname } from 'next/navigation';
import { Title } from 'rizzui';
import cn from '@/utils/class-names';
import { menuItems } from '@/layouts/hydrogen/menu-items';
import StatusBadge from '@/components/get-status-badge';
import { currentSession } from '@/config/session';
import { routes } from '@/config/routes';

export function SidebarMenu() {
  const pathname = usePathname();
  const currentUser = currentSession() as any;

  const hasPermission = (item: any, currentUser: any): boolean => {
    if (currentUser?.brokerUsername) {
      const allowedRoutes = ['/real-estate-seller/dashboard'];
      return allowedRoutes.includes(item.href);
    }
    if (item.type) {
      if (currentUser.type !== 'Real Estate' && item.type !== 'Real Estate') {
        const allowedRoutes = ['/broker/dashboard'];
        return !allowedRoutes.includes(item.href);
      }
      const allowedRoutes = ['/real-estate-broker/dashboard'];
      return allowedRoutes.includes(item.href);
    }
    const access = currentUser?.lite ? 'lite' : 'premium';
    const allowedLiteRoutes = [
      '/seller/dashboard'
    ];

    if (currentUser?.lite) {
      return access === item.access
    } else if (!currentUser?.lite) {
      return !allowedLiteRoutes.includes(item.href)
    }
    return true;
  };




  return (
    <div className="mt-4 pb-3 3xl:mt-6">
      {menuItems.map((item: any, index: number) => {
        const isActive = pathname === (item?.href as string);
        const pathnameExistInDropdowns: any = (item.dropdownItems as any)?.filter(
          (dropdownItem: any) => dropdownItem.href === pathname
        );
        const isDropdownOpen = Boolean(pathnameExistInDropdowns?.length);

        const disabled = item.isDisabled && item.isDisabled(currentUser.isIntake) || false;

        const roleMatched = item?.role === currentUser?.role;


        return (
          <Fragment key={item.name + '-' + index}>
            {item?.href ? (
              <>
                {roleMatched && hasPermission(item, currentUser) && (
                  disabled ?
                    <div
                      className={cn(
                        'group relative mx-3 my-0.5 flex items-center justify-between rounded-md px-3 py-2 font-medium capitalize lg:my-1 2xl:mx-5 2xl:my-2 cursor-not-allowed',
                        isActive
                          ? 'before:top-2/5 text-primary before:absolute before:-start-3 before:block before:h-4/5 before:w-1 before:rounded-ee-md before:rounded-se-md before:bg-primary 2xl:before:-start-5'
                          : 'text-gray-700 transition-colors duration-200  dark:text-gray-700/90 opacity-50'
                      )}
                    >
                      <div className="flex items-center truncate">
                        {item?.icon && (
                          <span
                            className={cn(
                              'me-2 inline-flex h-5 w-5 items-center justify-center rounded-md [&>svg]:h-[20px] [&>svg]:w-[20px]',
                              isActive
                                ? 'text-primary'
                                : 'text-gray-800 dark:text-gray-500 dark:group-hover:text-gray-700'
                            )}
                          >
                            {item?.icon}
                          </span>
                        )}
                        <span className="truncate">{item.name}</span>
                      </div>
                      {item?.badge?.length ? (
                        <StatusBadge status={item?.badge} />
                      ) : null}
                    </div>
                    :
                    <Link
                      href={item?.href && item?.href !== ' ' ? item?.href : (item?.clickable === 'provider' ? routes?.providers?.listingDetails(currentUser?.providerID) : routes['business-marketplace'].item(currentUser?.sellerID))}
                      className={cn(
                        'group relative mx-3 my-0.5 flex items-center justify-between rounded-md px-3 py-2 font-medium capitalize lg:my-1 2xl:mx-5 2xl:my-2',
                        isActive
                          ? 'before:top-2/5 text-primary before:absolute before:-start-3 before:block before:h-4/5 before:w-1 before:rounded-ee-md before:rounded-se-md before:bg-primary 2xl:before:-start-5'
                          : 'text-gray-700 transition-colors duration-200 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-700/90'
                      )}
                    >
                      <div className="flex items-center truncate">
                        {item?.icon && (
                          <span
                            className={cn(
                              'me-2 inline-flex h-5 w-5 items-center justify-center rounded-md [&>svg]:h-[20px] [&>svg]:w-[20px]',
                              isActive
                                ? 'text-primary'
                                : 'text-gray-800 dark:text-gray-500 dark:group-hover:text-gray-700'
                            )}
                          >
                            {item?.icon}
                          </span>
                        )}
                        <span className="truncate">{item.name}</span>
                      </div>
                      {item?.badge?.length ? (
                        <StatusBadge status={item?.badge} />
                      ) : null}
                    </Link>
                )}
              </>
            ) : (roleMatched && hasPermission(item, currentUser) &&
              <Title
                as="h6"
                className={cn(
                  'mb-2 truncate px-6 text-xs font-normal uppercase tracking-widest text-gray-500 2xl:px-8',
                  index !== 0 && 'mt-6 3xl:mt-7'
                )}
              >
                {item.name}
              </Title>
            )}
          </Fragment>
        );
      })}
    </div >
  );
}
