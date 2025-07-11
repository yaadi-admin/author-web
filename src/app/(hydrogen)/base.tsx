'use client';
import { useEffect, useState } from 'react';
import firebase from '@/config/firebase.config';
import { signOut } from 'firebase/auth';
import { routes } from '@/config/routes';
import {
    doc,
    onSnapshot,
    getDocs,
    where,
    collection,
    query
} from 'firebase/firestore';
import { currentSession } from '@/config/session';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function Base() {
    const { push } = useRouter();
    const currentUser = currentSession() as any;
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        push(routes.welcome);

    }, [currentUser?.id, push]);

    return (
        <div className="flex items-center justify-center h-screen">
            {loading && (
                <Image
                    src="https://firebasestorage.googleapis.com/v0/b/mystery-mobile-detailing.firebasestorage.app/o/Untitled%20design%20(3).png?alt=media&token=afbac740-fac3-470d-b77d-898a46c01ba6"
                    width={500}
                    height={500}
                    style={{ marginLeft: '-20%' }}
                    className="object-contain"
                    priority
                    alt="load image logo"
                    sizes="(max-width: 480px) 100vw"
                />
            )}
        </div>
    );
}
