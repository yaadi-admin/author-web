import React, { useState, useEffect } from 'react';
import { Text, Button, ActionIcon, Tooltip, Drawer, Popover } from 'rizzui';
import cn from '@/utils/class-names';
import AvatarCard from '@/components/ui/avatar-card';
import DateCell from '@/components/ui/date-cell';
import ChatSolidIcon from '@/components/icons/chat-solid';
import ParcelMapIcon from '@/components/icons/parcel-map';
import DeletePopover from '@/app/shared/delete-popover';
import UserAvatarIcon from '@/components/icons/user-avatar';
import SendMessage from '@/components/ui/containers/SendMessage';
import { useRouter } from 'next/navigation';
import { routes } from '@/config/routes';
import { useModal } from '@/app/shared/modal-views/use-modal';
import { InvestorMatchSummary } from './profile-old';
import { getFirestore, doc, getDoc, setDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import firebase from '@/config/firebase.config';
import { BusinessMatchSummary } from './profile';

const handleOpenMessenger = (user: any, hello: any) => {
    hello.openModal({
        customSize: '600px',
        view: <SendMessage user={user} />,
    });
};

interface ActionsProps {
    row: any;
    onDeleteItem: (id: string) => void;
}

export function Actions({ row, onDeleteItem }: ActionsProps) {
    const { push } = useRouter();
    const [openDrawer, setOpenDrawer] = useState(false);
    const [isInterestedDisabled, setIsInterestedDisabled] = useState(false);
    const hello = useModal();

    // Check if the offer already exists for the investor and if due diligence is approved
    useEffect(() => {
        const checkOffer = async () => {
            const offerDocRef = doc(firebase.firestore, 'offers', row.id);
            try {
                const docSnap = await getDoc(offerDocRef);
                if (docSnap.exists()) {
                    const existingOffer = docSnap.data();
                    if (
                        existingOffer.cimRequest === 'approved' &&
                        existingOffer.ddRequest === 'approved'
                    ) {
                        setIsInterestedDisabled(true);
                        return;
                    }
                    if (
                        existingOffer.listingID === row.business?.data?.id &&
                        existingOffer.userID === row.investor.data.id
                    ) {
                        setIsInterestedDisabled(true);
                    }
                }
            } catch (error) {
                console.error('Error checking offer:', error);
            }
        };
        checkOffer();
    }, [row]);

    // New function to handle "I'm Interested" action with Firebase.
    const handleInterested = async (row: any) => {
        const offerDocRef = doc(firebase.firestore, 'offers', row.id);
        try {
            const docSnap = await getDoc(offerDocRef);
            const offerData = {
                ...row,
                interestDate: serverTimestamp(),
                approvedDate: serverTimestamp(),
                cimRequest: 'approved',
                ddRequest: 'approved'
            };
            if (docSnap.exists()) {
                await updateDoc(offerDocRef, offerData);
            } else {
                await setDoc(offerDocRef, offerData);
            }
            setIsInterestedDisabled(true);
            setOpenDrawer(true);
        } catch (error) {
            console.error('Error processing offer:', error);
        }
    };

    const handleSelected = (item: any) => {
        setOpenDrawer(true);
    };

    return (
        <>
            <div className="flex items-center justify-end gap-3 pe-3">
                <Popover placement="left">
                    <Popover.Trigger>
                        <Button variant="outline" size="sm" disabled={isInterestedDisabled}>
                            Share Files & Data
                        </Button>
                    </Popover.Trigger>
                    <Popover.Content className="z-0">
                        {({ setOpen }) => (
                            <div className="w-56 pb-2 pt-1 text-left rtl:text-right">
                                <h6 className="mb-0.5 flex items-center text-sm font-bold text-gray-700">
                                    Confirm Due Diligence
                                </h6>
                                <Text className="mb-2 leading-relaxed text-gray-500">
                                    Sharing due diligence with {row.business.data.companyName}{' '}
                                    will grant the business access to your profile and files.
                                </Text>
                                <div className="flex items-center justify-end">
                                    <Button
                                        size="sm"
                                        className="me-1.5 h-7"
                                        onClick={() => {
                                            setOpen(false);
                                            handleInterested(row);
                                        }}
                                    >
                                        Yes
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        className="h-7"
                                        onClick={() => setOpen(false)}
                                    >
                                        No
                                    </Button>
                                </div>
                            </div>
                        )}
                    </Popover.Content>
                </Popover>

                {isInterestedDisabled && (
                    <Tooltip size="sm" content="View Business Documents" placement="top" color="invert">
                        <ActionIcon
                            as="span"
                            size="sm"
                            variant="outline"
                            aria-label="View Business Documents"
                            className="hover:!border-gray-900 hover:text-gray-700"
                            onClick={() =>
                                push(routes.seller.investorDueDiligence(row.business.data.id))
                            }
                        >
                            <ParcelMapIcon className="h-4 w-4" />
                        </ActionIcon>
                    </Tooltip>
                )}

                <Tooltip size="sm" content="Chat" placement="top" color="invert">
                    <ActionIcon
                        as="span"
                        size="sm"
                        variant="outline"
                        aria-label="Chat"
                        className="hover:!border-gray-900 hover:text-gray-700"
                        onClick={() => handleOpenMessenger(row?.business?.data?.user, hello)}
                    >
                        <ChatSolidIcon className="h-4 w-4" />
                    </ActionIcon>
                </Tooltip>
                <Tooltip size="sm" content="View Profile" placement="top" color="invert">
                    <ActionIcon
                        as="span"
                        size="sm"
                        variant="outline"
                        aria-label="View Profile"
                        className="hover:!border-gray-900 hover:text-gray-700"
                        onClick={() => handleSelected(row)}
                    >
                        <UserAvatarIcon className="h-4 w-4" />
                    </ActionIcon>
                </Tooltip>
                <DeletePopover
                    title={`Remove ${row.business.data.companyName}?`}
                    description="Are you sure you want to remove this business from the list?"
                    onDelete={() => onDeleteItem(row.id)}
                />
            </div>
            <Drawer
                isOpen={openDrawer ?? false}
                onClose={() => setOpenDrawer(false)}
                overlayClassName="dark:bg-opacity-20 dark:backdrop-blur-md"
                containerClassName="dark:bg-gray-100"
                className="z-[9999]"
                customSize="40%"
            >
                <BusinessMatchSummary
                    data={row}
                    chat={() => handleOpenMessenger(row?.business?.data?.user, hello)}
                />
            </Drawer>
        </>
    );
}