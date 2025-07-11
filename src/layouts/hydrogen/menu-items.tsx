import { routes } from '@/config/routes';
import {
  PiBriefcaseDuotone,
  PiBrowserDuotone,
  PiCalendarPlusDuotone,
  PiFileLockDuotone,
  PiFilesDuotone,
  PiFolderDuotone,
  PiHeartDuotone,
  PiHouseLineDuotone,
  PiListNumbersDuotone,
  PiMessengerLogo,
  PiPlant,
  PiBuildingApartmentDuotone,
  PiShieldPlusDuotone,
  PiBookmarksSimpleDuotone,
  PiShootingStarDuotone,
  PiStepsDuotone,
  PiUserDuotone,
  PiUsersDuotone,
  PiPipe,
  PiChartBar,
  PiRankingDuotone,
  PiFilmReelDuotone,
  PiHandDepositDuotone,
  PiUsersFourDuotone,
  PiUsersThreeDuotone
} from 'react-icons/pi';

const isIntakeDone = (isIntake: boolean): boolean => {
  return !isIntake;
}

// Note: do not add href in the label object, it is rendering as label
export const menuItems = [


  // *************************************************************************************************************************************
  // Client
  // *************************************************************************************************************************************

  {
    name: 'Dashboard',
    href: routes.client.dashboard,
    icon: <PiBriefcaseDuotone />,
    role: 'client',
    type: 'Business',
    access: 'lite',
  },
  {
    name: 'Messages',
    href: routes.chat.inbox,
    icon: <PiMessengerLogo />,
    role: 'client',
    access: 'lite',
  },
  {
    name: 'Provider Marketplace',
    href: routes.searchAndFilter.provider,
    icon: <PiShootingStarDuotone />,
    role: 'client',
    // isDisabled: (isIntake: boolean) => isIntakeDone(isIntake),
    access: 'lite',
  },
  {
    name: 'Contact Us',
    href: routes['contact-us']['contact-us'],
    icon: <PiBrowserDuotone />,
    role: 'client',
    access: 'lite',
  },

  {
    name: 'Report',
    role: 'client',
    access: 'lite',
  },
  {
    name: 'Succession Report',
    href: routes.client.report,
    icon: <PiBriefcaseDuotone />,
    role: 'client',
    type: 'Business',
    access: 'lite',
  },
  {
    name: 'Action Plan',
    href: routes.client.schedule,
    icon: <PiCalendarPlusDuotone />,
    role: 'client',
    access: 'lite',
  },

  // *************************************************************************************************************************************
  // Advisor
  // *************************************************************************************************************************************

  {
    name: 'Dashboard',
    href: routes.advisor.dashboard,
    icon: <PiBriefcaseDuotone />,
    role: 'advisor',
    type: 'Business',
    access: 'lite',
  },
  {
    name: 'Messages',
    href: routes.chat.inbox,
    icon: <PiMessengerLogo />,
    role: 'advisor',
    access: 'lite',
  },

  {
    name: 'Help Center',
    role: 'advisor',
    access: 'lite',
  },

  {
    name: 'Contact Us',
    href: routes['contact-us']['contact-us'],
    icon: <PiBrowserDuotone />,
    role: 'advisor',
    type: 'Business',
    access: 'lite',
  },


  // *************************************************************************************************************************************
  // Real Estate Seller
  // *************************************************************************************************************************************

  {
    name: 'Dashboard',
    href: routes.realEstateSeller.dashboard,
    icon: <PiBriefcaseDuotone />,
    role: 'seller',
    type: 'Real Estate',
    access: 'lite',
  },

  // *************************************************************************************************************************************
  // Seller
  // *************************************************************************************************************************************


  {
    name: 'Dashboard',
    href: routes.seller.dashboard,
    icon: <PiBriefcaseDuotone />,
    role: 'seller',
    access: 'lite',
  },
  {
    name: 'Messages',
    href: routes.chat.inbox,
    icon: <PiMessengerLogo />,
    role: 'seller',
    access: 'lite',
  },
  {
    name: 'Cimplified',
    href: routes.cimplified.list,
    icon: <PiFileLockDuotone />,
    role: 'seller',
    access: 'premium',
  },
  // {
  //   name: 'Agents',
  //   href: routes.support.dashboard,
  //   icon: <PiUserDuotone />,
  //   badge: 'Ai',
  //   role: 'seller',
  //   access: 'premium',
  // },
  // {
  //   name: 'SellerSpan™',
  //   href: routes.logistics.dashboard,
  //   icon: <PiStepsDuotone />,
  //   role: 'seller',
  //   isDisabled: (isIntake: boolean) => isIntakeDone(isIntake),
  //   access: 'premium',
  // },
  // {
  //   name: 'My Advisors',
  //   href: routes.appointment.dashboard,
  //   icon: <PiUsersDuotone />,
  //   role: 'seller',
  //   isDisabled: (isIntake: boolean) => isIntakeDone(isIntake),
  //   access: 'premium',
  // },

  {
    name: 'QVest',
    href: routes.seller.qvest,
    icon: <PiRankingDuotone />,
    role: 'seller',
    isDisabled: (isIntake: boolean) => isIntakeDone(isIntake),
    access: 'lite',
  },

  {
    name: 'Capital Market',
    role: 'seller',
    access: 'lite',
  },
  {
    name: 'Listing Profile',
    href: routes.seller.listing,
    clickable: 'seller',
    icon: <PiHouseLineDuotone />,
    role: 'seller',
    isDisabled: (isIntake: boolean) => isIntakeDone(isIntake),
    access: 'lite',
  },
  {
    name: 'Interested',
    href: routes.seller.interested,
    clickable: 'seller',
    icon: <PiUsersDuotone />,
    role: 'seller',
    isDisabled: (isIntake: boolean) => isIntakeDone(isIntake),
    access: 'lite',
  },
  {
    name: 'Investment Memo',
    role: 'seller',
    access: 'lite',
  },
  {
    name: 'Investment Memo',
    href: routes.seller.investmentMemo,
    clickable: 'seller',
    icon: <PiHandDepositDuotone />,
    role: 'seller',
    isDisabled: (isIntake: boolean) => isIntakeDone(isIntake),
    access: 'lite',
  },

  {
    name: 'Files & Data',
    role: 'seller',
    access: 'lite',
  },

  {
    name: 'Data Room',
    href: routes.ddDataRoom.list,
    icon: <PiFolderDuotone />,
    role: 'seller',
    isDisabled: (isIntake: boolean) => isIntakeDone(isIntake),
    access: 'lite',
  },
  {
    name: 'Schedule',
    href: routes.eventCalendar,
    icon: <PiCalendarPlusDuotone />,
    role: 'seller',
    isDisabled: (isIntake: boolean) => isIntakeDone(isIntake),
    access: 'lite',
  },
  {
    name: 'Help Center',
    role: 'seller',
    access: 'lite',
  },
  {
    name: 'Contact Us',
    href: routes['contact-us']['contact-us'],
    icon: <PiBrowserDuotone />,
    role: 'seller',
    access: 'lite',
  },



  // *************************************************************************************************************************************
  // Real Estate Broker
  // *************************************************************************************************************************************
  {
    name: 'Dashboard',
    href: routes.realEstateBroker.dashboard,
    icon: <PiBriefcaseDuotone />,
    role: 'broker',
    type: 'Real Estate',
    access: 'lite',
  },


  // *************************************************************************************************************************************
  // Broker
  // *************************************************************************************************************************************
  {
    name: 'Dashboard',
    href: routes.broker.dashboard,
    icon: <PiBriefcaseDuotone />,
    role: 'broker',
    type: 'Business',
    access: 'lite',
  },
  {
    name: 'Messages',
    href: routes.chat.inbox,
    icon: <PiMessengerLogo />,
    role: 'broker',
    type: 'Business',
    access: 'lite',
  },
  {
    name: 'Files & Data',
    role: 'broker',
    type: 'Business',
    access: 'lite',
  },
  {
    name: 'Data Room',
    href: routes.ddDataRoom.list,
    icon: <PiFolderDuotone />,
    role: 'broker',
    isDisabled: (isIntake: boolean) => isIntakeDone(isIntake),
    type: 'Business',
    access: 'lite',
  },
  {
    name: 'Schedule',
    href: routes.eventCalendar,
    icon: <PiCalendarPlusDuotone />,
    role: 'broker',
    isDisabled: (isIntake: boolean) => isIntakeDone(isIntake),
    type: 'Business',
    access: 'lite',
  },
  {
    name: 'Marketplace',
    role: 'broker',
    type: 'Business',
    access: 'lite',
  },
  {
    name: 'Capital Market',
    href: routes['business-marketplace'].home,
    icon: <PiHouseLineDuotone />,
    role: 'broker',
    type: 'Business',
    access: 'lite',
  },
  {
    name: 'Help Center',
    role: 'broker',
    type: 'Business',
    access: 'lite',
  },
  {
    name: 'Contact Us',
    href: routes['contact-us']['contact-us'],
    icon: <PiBrowserDuotone />,
    role: 'broker',
    access: 'lite',
  },

  // *************************************************************************************************************************************
  // Buyer
  // *************************************************************************************************************************************
  {
    name: 'Dashboard',
    href: routes.buyer.dashboard,
    icon: <PiBriefcaseDuotone />,
    role: 'buyer',
    access: 'lite',
  },
  {
    name: 'Messages',
    href: routes.chat.inbox,
    icon: <PiMessengerLogo />,
    role: 'buyer',
    isDisabled: (isIntake: boolean) => isIntakeDone(isIntake),
    access: 'lite',
  },

  {
    name: 'My Journey',
    role: 'buyer',
    access: 'lite',
  },
  {
    name: 'Matches',
    href: routes.buyer.matches,
    icon: <PiUsersThreeDuotone />,
    role: 'buyer',
    isDisabled: (isIntake: boolean) => isIntakeDone(isIntake),
    access: 'lite',
  },
  {
    name: 'My Interested Listings',
    href: routes.buyer.interests,
    icon: <PiBookmarksSimpleDuotone />,
    role: 'buyer',
    isDisabled: (isIntake: boolean) => isIntakeDone(isIntake),
    access: 'lite',
  },
  {
    name: 'Investment Memos',
    href: routes.buyer.memos,
    icon: <PiFileLockDuotone />,
    role: 'buyer',
    isDisabled: (isIntake: boolean) => isIntakeDone(isIntake),
    access: 'lite',
  },
  {
    name: 'My Profile',
    href: routes.buyer.profile,
    icon: <PiUserDuotone />,
    role: 'buyer',
    isDisabled: (isIntake: boolean) => isIntakeDone(isIntake),
    access: 'lite',
  },
  {
    name: 'Marketplace',
    role: 'buyer',
    access: 'lite',
  },
  {
    name: 'Capital Market',
    href: routes['business-marketplace'].home,
    icon: <PiHouseLineDuotone />,
    role: 'buyer',
    isDisabled: (isIntake: boolean) => isIntakeDone(isIntake),
    access: 'lite',
  },
  {
    name: 'Professional Services',
    role: 'buyer',
    access: 'lite',
  },
  {
    name: 'Hire',
    href: routes.searchAndFilter.provider,
    icon: <PiShootingStarDuotone />,
    role: 'buyer',
    isDisabled: (isIntake: boolean) => isIntakeDone(isIntake),
    access: 'lite',
  },
  {
    name: 'Events & Data',
    role: 'buyer',
    access: 'lite',
  },
  {
    name: 'Data Room',
    href: routes.ddDataRoom.list,
    icon: <PiFolderDuotone />,
    role: 'buyer',
    isDisabled: (isIntake: boolean) => isIntakeDone(isIntake),
    access: 'lite',
  },
  {
    name: 'Schedule',
    href: routes.eventCalendar,
    icon: <PiCalendarPlusDuotone />,
    role: 'buyer',
    isDisabled: (isIntake: boolean) => isIntakeDone(isIntake),
    access: 'lite',
  },
  {
    name: 'Help Center',
    role: 'buyer',
    access: 'lite',
  },
  {
    name: 'Contact Us',
    href: routes['contact-us']['contact-us'],
    icon: <PiBrowserDuotone />,
    role: 'buyer',
    access: 'lite',
  },



  // *************************************************************************************************************************************
  // Provider
  // *************************************************************************************************************************************
  {
    name: 'Dashboard',
    href: routes.provider.dashboard,
    icon: <PiBriefcaseDuotone />,
    role: 'provider',
    access: 'lite',
  },
  {
    name: 'Messages',
    href: routes.chat.inbox,
    icon: <PiMessengerLogo />,
    role: 'provider',
    access: 'lite',
  },
  {
    name: 'Clients',
    href: routes.clients.dashboard,
    icon: <PiUsersDuotone />,
    role: 'provider',
    isDisabled: (isIntake: boolean) => isIntakeDone(isIntake),
    access: 'lite',
  },
  // {
  //   name: 'My Team',
  //   href: routes.appointment.dashboard,
  //   icon: <PiUsersDuotone />,
  //   role: 'provider',
  // },
  {
    name: 'File Manager',
    href: routes.file.manager,
    icon: <PiFolderDuotone />,
    role: 'provider',
    isDisabled: (isIntake: boolean) => isIntakeDone(isIntake),
    access: 'premium',
  },
  {
    name: 'Schedule',
    href: routes.eventCalendar,
    icon: <PiCalendarPlusDuotone />,
    role: 'provider',
    isDisabled: (isIntake: boolean) => isIntakeDone(isIntake),
    access: 'premium',
  },
  {
    name: 'Profile',
    role: 'provider',
    isDisabled: (isIntake: boolean) => isIntakeDone(isIntake),
    access: 'lite',
  },
  {
    name: 'Your Business Profile',
    href: ' ',
    clickable: 'provider',
    icon: <PiHouseLineDuotone />,
    role: 'provider',
    isDisabled: (isIntake: boolean) => isIntakeDone(isIntake),
    access: 'lite',
  },
  {
    name: 'Provider Marketplace',
    href: routes.searchAndFilter.provider,
    icon: <PiShootingStarDuotone />,
    role: 'provider',
    isDisabled: (isIntake: boolean) => isIntakeDone(isIntake),
    access: 'lite',
  },

  {
    name: 'Help Center',
    role: 'provider',
    access: 'lite',
  },
  {
    name: 'Contact Us',
    href: routes['contact-us']['contact-us'],
    icon: <PiBrowserDuotone />,
    role: 'provider',
    access: 'lite',
  },

  // *************************************************************************************************************************************
  // Admin
  // *************************************************************************************************************************************

  {
    name: 'Dashboard',
    href: routes.rolesPermissions,
    icon: <PiBrowserDuotone />,
    role: 'admin',
    access: 'lite',
  },

  {
    name: 'DB & Collections',
    href: routes.assistant,
    icon: <PiUserDuotone />,
    // badge: 'Ai',
    role: 'admin',
    access: 'lite',
  },

  {
    name: 'Agent Builder',
    href: routes.agent.dashboard,
    icon: <PiUserDuotone />,
    badge: 'AI',
    role: 'admin',
    access: 'lite',
  },

  {
    name: 'Succession Builder',
    href: routes['succession-builder'],
    icon: <PiPlant />,
    role: 'admin',
    access: 'lite',
  },
  {
    name: 'Listing Builder',
    href: routes['succession-builder-lite'],
    icon: <PiPipe />,
    badge: 'Active',
    role: 'admin',
    access: 'lite',
  },
  {
    name: 'Investment Builder',
    href: routes['investment-builder-lite'],
    icon: <PiChartBar />,
    role: 'admin',
    access: 'lite',
  },
  {
    name: 'Dialogix',
    href: routes.whiteLabel.whiteLabel,
    icon: <PiBuildingApartmentDuotone />,
    role: 'admin',
    access: 'lite',
  },
  {
    name: 'CIM Builder',
    href: routes['cim-builder'],
    icon: <PiFilesDuotone />,
    role: 'admin',
    access: 'lite',
  },

  {
    name: 'SellerSpan',
    href: routes.adminSellerSpan,
    icon: <PiStepsDuotone />,
    role: 'admin',
    access: 'lite',
  },

  {
    name: 'Support Centre',
    href: routes.supportCentre,
    icon: <PiShieldPlusDuotone />,
    role: 'admin',
    access: 'lite',
  },

  {
    name: 'Users',
    href: routes.allUsers,
    icon: <PiUsersDuotone />,
    role: 'admin',
    access: 'lite',
  },

  {
    name: 'Listings',
    role: 'admin',
    access: 'lite',
  },
  {
    name: 'Provider Marketplace',
    href: routes.searchAndFilter.provider,
    icon: <PiShootingStarDuotone />,
    role: 'admin',
    access: 'lite',
  },
  {
    name: 'Capital Market',
    href: routes['business-marketplace'].home,
    icon: <PiHouseLineDuotone />,
    role: 'admin',
    access: 'lite',
  },
  {
    name: 'Tools & Events',
    role: 'admin',
    access: 'lite',
  },
  {
    name: 'File Manager',
    href: routes.file.manager,
    icon: <PiFolderDuotone />,
    role: 'admin',
    access: 'lite',
  },
  {
    name: 'Schedule',
    href: routes.eventCalendar,
    icon: <PiCalendarPlusDuotone />,
    role: 'admin',
    access: 'lite',
  },

];
