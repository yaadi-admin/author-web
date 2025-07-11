import { avatarIds } from '@/utils/get-avatar';
import { getRandomArrayElement } from '@/utils/get-random-array-element';

export const transactionTypes = {
  Cash: 'Cash',
  Bonds: 'Bonds',
  Equities: 'Equities',
  'Alternative Investments': 'Alternative Investments',
};

export const currencies = {
  USD: 'USD',
  CAD: 'CAD',
};

export const transactionStatuses = {
  Pending: 'Pending',
  NA: 'N/A',
  Completed: 'Completed',
  'Due Diligence': 'Due Diligence',
  Canceled: 'Canceled',
};

export const PaymentMethod = {
  Mastercard: 'Mastercard',
  Visa: 'Visa',
};

export type Type = keyof typeof transactionTypes;
export type StatusType = keyof typeof transactionStatuses;
export type PaymentMethodType = keyof typeof PaymentMethod;
export type CurrencyType = keyof typeof currencies;

export type RecentCustomersDataType = {
  id: string;
  user: {
    name: string;
    avatar: string;
    email: string;
  };
  date: Date;
  status: StatusType;
};

export type PaymentCardType = {
  cardType: string;
  lastCardNo: string;
};

export const transactionHistory = [
  {
    id: '3416',
    user: {
      name: 'Johnnie Kassulke',
      email: 'johnnie.kassulke@example.com',
      avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
        avatarIds
      )}.webp`,
    },
    type: 'Cash',
    date: '2024-11-10T06:22:01.621Z',
    status: 'Completed',
    amount: 3500.00,
    currency: 'USD',
    paymentMethod: {
      cardType: 'Mastercard',
      lastCardNo: '4242',
    },
    overall_match_score: 95,
  },
  {
    id: '3417',
    user: {
      name: 'Dr. Marcos McGlynn',
      email: 'marcos@example.com',
      avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
        avatarIds
      )}.webp`,
    },
    type: 'Bonds',
    date: '2025-02-06T17:46:26.713Z',
    status: 'Pending',
    amount: 4200.00,
    currency: 'CAD',
    paymentMethod: {
      cardType: 'Visa',
      lastCardNo: '5846',
    },
    overall_match_score: 88,
  },
  {
    id: '3418',
    user: {
      name: 'Omar Haag',
      email: 'omar@example.com',
      avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
        avatarIds
      )}.webp`,
    },
    type: 'Equities',
    date: '2024-03-06T05:10:57.625Z',
    status: 'Canceled',
    amount: 5000.00,
    currency: 'USD',
    paymentMethod: {
      cardType: 'Mastercard',
      lastCardNo: '4242',
    },
    overall_match_score: 72,
  },
  {
    id: '3419',
    user: {
      name: 'Susie Beatty',
      email: 'susie@example.com',
      avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
        avatarIds
      )}.webp`,
    },
    type: 'Alternative Investments',
    date: '2024-09-27T21:47:53.304Z',
    status: 'Completed',
    amount: 6000.00,
    currency: 'CAD',
    paymentMethod: {
      cardType: 'Mastercard',
      lastCardNo: '4242',
    },
    overall_match_score: 85,
  },
  {
    id: '3420',
    user: {
      name: 'Kristie Ziemann',
      email: 'kristie@example.com',
      avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
        avatarIds
      )}.webp`,
    },
    type: 'Cash',
    date: '2025-11-26T06:34:48.311Z',
    status: 'Canceled',
    amount: 3000.00,
    currency: 'USD',
    paymentMethod: {
      cardType: 'Visa',
      lastCardNo: '5846',
    },
    overall_match_score: 60,
  },
  {
    id: '3421',
    user: {
      name: 'Johnnie Kassulke',
      email: 'johnnie.kassulke@example.com',
      avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
        avatarIds
      )}.webp`,
    },
    type: 'Bonds',
    date: '2024-11-10T06:22:01.621Z',
    status: 'Pending',
    amount: 4500.00,
    currency: 'CAD',
    paymentMethod: {
      cardType: 'Mastercard',
      lastCardNo: '4242',
    },
    overall_match_score: 78,
  },
  {
    id: '3422',
    user: {
      name: 'Dr. Marcos McGlynn',
      email: 'marcos@example.com',
      avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
        avatarIds
      )}.webp`,
    },
    type: 'Equities',
    date: '2025-02-06T17:46:26.713Z',
    status: 'Completed',
    amount: 5200.00,
    currency: 'USD',
    paymentMethod: {
      cardType: 'Visa',
      lastCardNo: '5846',
    },
    overall_match_score: 90,
  },
  {
    id: '3423',
    user: {
      name: 'Omar Haag',
      email: 'omar@example.com',
      avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
        avatarIds
      )}.webp`,
    },
    type: 'Alternative Investments',
    date: '2024-03-06T05:10:57.625Z',
    status: 'Pending',
    amount: 4800.00,
    currency: 'CAD',
    paymentMethod: {
      cardType: 'Mastercard',
      lastCardNo: '4242',
    },
    overall_match_score: 82,
  },
  {
    id: '3424',
    user: {
      name: 'Susie Beatty',
      email: 'susie@example.com',
      avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
        avatarIds
      )}.webp`,
    },
    type: 'Cash',
    date: '2024-09-27T21:47:53.304Z',
    status: 'Canceled',
    amount: 3500.00,
    currency: 'USD',
    paymentMethod: {
      cardType: 'Mastercard',
      lastCardNo: '4242',
    },
    overall_match_score: 65,
  },
  {
    id: '3425',
    user: {
      name: 'Kristie Ziemann',
      email: 'kristie@example.com',
      avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
        avatarIds
      )}.webp`,
    },
    type: 'Bonds',
    date: '2025-11-26T06:34:48.311Z',
    status: 'Canceled',
    amount: 4000.00,
    currency: 'CAD',
    paymentMethod: {
      cardType: 'Visa',
      lastCardNo: '5846',
    },
    overall_match_score: 70,
  },
  {
    id: '3426',
    user: {
      name: 'Johnnie Kassulke',
      email: 'johnnie.kassulke@example.com',
      avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
        avatarIds
      )}.webp`,
    },
    type: 'Equities',
    date: '2024-11-10T06:22:01.621Z',
    status: 'Pending',
    amount: 4500.00,
    currency: 'USD',
    paymentMethod: {
      cardType: 'Mastercard',
      lastCardNo: '4242',
    },
    overall_match_score: 75,
  },
  {
    id: '3527',
    user: {
      name: 'Dr. Marcos McGlynn',
      email: 'marcos@example.com',
      avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
        avatarIds
      )}.webp`,
    },
    type: 'Alternative Investments',
    date: '2025-02-06T17:46:26.713Z',
    status: 'Canceled',
    amount: 5000.00,
    currency: 'CAD',
    paymentMethod: {
      cardType: 'Visa',
      lastCardNo: '5846',
    },
    overall_match_score: 68,
  },
  {
    id: '3428',
    user: {
      name: 'Omar Haag',
      email: 'omar@example.com',
      avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
        avatarIds
      )}.webp`,
    },
    type: 'Cash',
    date: '2024-03-06T05:10:57.625Z',
    status: 'Completed',
    amount: 5500.00,
    currency: 'USD',
    paymentMethod: {
      cardType: 'Mastercard',
      lastCardNo: '4242',
    },
    overall_match_score: 92,
  },
  {
    id: '3429',
    user: {
      name: 'Susie Beatty',
      email: 'susie@example.com',
      avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
        avatarIds
      )}.webp`,
    },
    type: 'Bonds',
    date: '2024-09-27T21:47:53.304Z',
    status: 'Completed',
    amount: 3000.00,
    currency: 'CAD',
    paymentMethod: {
      cardType: 'Mastercard',
      lastCardNo: '4242',
    },
    overall_match_score: 80,
  },
  {
    id: '3430',
    user: {
      name: 'Kristie Ziemann',
      email: 'kristie@example.com',
      avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
        avatarIds
      )}.webp`,
    },
    type: 'Equities',
    date: '2025-11-26T06:34:48.311Z',
    status: 'Canceled',
    amount: 4700.00,
    currency: 'USD',
    paymentMethod: {
      cardType: 'Visa',
      lastCardNo: '5846',
    },
    overall_match_score: 66,
  },
];
