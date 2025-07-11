import FileDashboard from '@/app/shared/file/dashboard';
import EcommerceDashboard from '@/app/shared/ecommerce/dashboard';
import { metaObject } from '@/config/site.config';
import Base from './base';
// import { useEffect, useState } from 'react';
// import firebase from '@/config/firebase.config';
// import { signOut } from "firebase/auth";
// import { routes } from '@/config/routes';
// import { useRouter } from 'next/router';
// import { doc, onSnapshot, query, collection, getDocs, where } from "firebase/firestore";

export const metadata = {
  ...metaObject(),
};

export default function FileDashboardPage() {

  return <Base />;
}
