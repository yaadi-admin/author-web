'use client';

// import Preview from '@/app/shared/cim-builder/preview/index';
import Report from '@/app/shared/cim-builder/report/page';
import { LoadingSpinner } from '@/components/ui/file-upload/upload-zone';
import { useOffers } from '@/config/broker/useOffers';
import { cim } from '@/config/seller/cim';
import { currentSession } from '@/config/session';
import { collection, doc, getDocs, where, query, serverTimestamp, updateDoc } from "firebase/firestore";
import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import firebase from '@/config/firebase.config';
import AccessDeniedPage from './acessDenied';
export default function CIMPageMain() {
    return (
        <Suspense>
            <CIMPage />
        </Suspense>
    )
}
function CIMPage() {
    const searchParams = useSearchParams();
    const listingId = searchParams.get('listingId');
    const { data } = useOffers(`${listingId}`)
    const currentUser = currentSession();

    const [cimRequest, setcimRequest] = useState();

    const { getAllCards, getListing, getIntake } = cim(`${listingId}`)

    const [cardsData, setCardData] = useState<any>(null);
    const [listingData, setListingData] = useState<any>(null);
    const [sellerIntake, setSellerIntake] = useState<any>(null);

    useEffect(() => {

        async function fetchCardData() {
            const data: any = await getAllCards({ listingId: `${listingId}` });
            const nextData = data.sort((a: any, b: any) => a.order - b.order);
            setCardData(nextData);
            const cim = await getListing(`${listingId}`)
            const intake = await getIntake(cim?.sellerID)
            setSellerIntake(intake);
            setListingData(cim?.listing);
            console.log(nextData)
        }
        fetchCardData();
    }, []);


    const userAccess = async () => {
        if (currentUser?.id) {

            const q = query(collection(firebase.firestore, "offers"), where("listingID", "==", listingId));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                setcimRequest(doc.data().cimRequest);

            });
        }




    }
    userAccess();
    if ((!currentUser?.id || cimRequest !== 'approved') && listingData?.sellerID !== currentUser?.id) {
        return (
            <AccessDeniedPage />
        )
    }


    // seller approves your access
    // if() {

    // }
    if (!cardsData) return

    <Suspense>
        <LoadingSpinner />
    </Suspense>


    return (
        <Suspense>
            <div className='bg-white h-full'>
                <Report
                    data={cardsData}
                    listing={listingData}
                    sellerIntake={sellerIntake}
                />
            </div>
        </Suspense>
    );
}
