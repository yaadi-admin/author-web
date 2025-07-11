'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { routes } from '@/config/routes';
import DrawerHeader from '@/app/shared/drawer-header';
import { PiFilesBold } from 'react-icons/pi';
import Image from 'next/image';
import toast from 'react-hot-toast';
import { Badge, Button, Text } from 'rizzui';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const Drawer = dynamic(() => import('rizzui').then((module) => module.Drawer), {
    ssr: false,
});

type QVestDrawerViewProps = {
    title: string;
    isOpen: boolean;
    data: any;
    setOpenDrawer: (id: boolean) => void;
};

const InfoSection = ({ title, value }: { title: string; value: string }) => (
    <div className="w-full mb-2">
        <div className="grid gap-5 rounded-lg border border-muted p-4 @2xl:p-6 space-y-2.5">
            <div className="flex gap-2.5">
                <div>
                    <p className="text-base font-semibold text-gray-900 space-y-2.5">{title}</p>
                    <p className="text-base font-semibold text-gray-500 space-y-2.5">{value}</p>
                </div>
            </div>
        </div>
    </div>
);

const BadgeSection = ({ title, badges }: { title: string; badges: string[] }) => (
    <div className="w-full">
        <div className="grid gap-5 rounded-lg border border-muted p-4 @2xl:p-6 space-y-2.5">
            <div className="flex gap-2.5">
                <div>
                    <p className="text-base font-semibold text-gray-900 space-y-2.5">{title}</p>
                    {badges.map((badge, index) => (
                        <Badge key={index} variant="flat" color="info" rounded="md" className="mb-3 md:mb-2 mr-2">
                            {badge}
                        </Badge>
                    ))}
                </div>
            </div>
        </div>
    </div>
);

const ChartSection = ({ title, data }: { title: string; data: any[] }) => (
    <div className="w-full mb-2">
        <div className="grid gap-5 rounded-lg border border-muted p-4 @2xl:p-6 space-y-2.5">
            <div className="flex gap-2.5">
                <div>
                    <p className="text-base font-semibold text-gray-900 space-y-2.5">{title}</p>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="value" fill="#8884d8" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    </div>
);

export function QVestDrawerView({
    title,
    isOpen,
    setOpenDrawer,
    data,
}: QVestDrawerViewProps) {

    const { push } = useRouter();

    const handleSendCIM = () => {
        toast.success("Successfully sent CIM", {
            position: "bottom-center",
        });
        // push(routes.file.dashboard);
    }

    const investmentSizeData = [
        { name: 'Min', value: data?.investmentSize?.min || 0 },
        { name: 'Max', value: data?.investmentSize?.max || 0 },
    ];

    return (
        <div className="flex h-full w-full flex-col">
            <DrawerHeader
                heading=""
                onClose={() => setOpenDrawer(false)}
            />
            <div className="flex">
                <div style={{ overflow: 'scroll', msOverflowStyle: 'none', scrollbarWidth: 'none', marginLeft: '2.5%', }} className="w-full h-screen">
                    <div style={{ paddingRight: '2.5%' }} className="flex w-full gap-4 items-center">
                        <div style={{ marginBottom: '0%', }} className="grid gap-5 rounded-lg border-muted py-4 ">
                            <div style={{ marginBottom: '0%', }} className="grid gap-5 rounded-lg border-muted">
                                <div className="flex items-center">
                                    <Image
                                        src={data?.profilePictureURL ? data?.profilePictureURL : '/images/qvest.png'}
                                        alt="QVest"
                                        style={{
                                            borderRadius: '50%',
                                            width: '240px',
                                        }}
                                        width={240}
                                        height={240}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-1">
                            <h1>{title}</h1>
                            <h3 className='text-gray-500 font-medium'>Investor</h3>
                            <h1 className={`mr-auto mt-2 flex items-center text-xl font-bold ${data?.score ? (data?.score > 70 ? `text-green` : (data?.score > 50 ? `text-yellow-600` : `text-red`)) : `text-gray-700`}`}>
                                {data?.score ? data?.score + '%' : '80%'} match
                            </h1>
                        </div>
                    </div>

                    <div className='flex flex-col gap-5 w-1/2 mx-auto mt-6'>
                        <Button className="w-full gap-3 @lg:w-auto" variant={"solid"}>
                            <PiFilesBold className="h-4 w-4" />
                            Request Meeting
                        </Button>

                        <span className="text-gray-400 text-center">or</span>
                        <Button onClick={handleSendCIM} className="w-full gap-3 @lg:w-auto" variant={"outline"}>
                            <PiFilesBold className="h-4 w-4" />
                            Share CIM
                        </Button>
                    </div>

                    <p style={{ fontSize: 18, marginBottom: '2.5%', marginTop: '5%', }} className="text-base font-semibold text-gray-900 space-y-2.5">How they match with you</p>

                    <div className="flex flex-wrap justify-evenly">
                        <InfoSection title="Over 100% indicates they've earned 'bonus points' for more favorable pricing or deal terms" value={`${data?.score ? data?.score + '%' : '85%'}`} />
                        <InfoSection title="Financial Score" value={`${data?.financialScore ? data?.financialScore : '100%'}`} />
                        <InfoSection title="Deal Terms Score" value={`${data?.dealTermsScore ? data?.dealTermsScore : '74%'}`} />
                        <InfoSection title="Experience Score" value={`${data?.experienceScore ? data?.experienceScore : '100%'}`} />
                        <InfoSection title="Leadership & Culture Score" value={`${data?.leadershipCultureScore ? data?.leadershipCultureScore : '80%'}`} />
                    </div>

                    <p style={{ fontSize: 18, marginTop: '5%', marginBottom: '2.5%' }} className="text-base font-semibold text-gray-900 space-y-2.5">Financial and Deal Terms</p>

                    <div className="flex flex-wrap justify-evenly">
                        <InfoSection title="Deal Horizon" value={`${data?.dealHorizon ? data?.dealHorizon : '3-6 Months'}`} />
                        <InfoSection title="Seller Financing" value={`${data?.sellerFinancing ? data?.sellerFinancing : 'Yes'}`} />
                        <InfoSection title="Budget Fit" value={`${data?.budgetFit ? data?.budgetFit : 'Yes'}`} />
                        <InfoSection title="Financing Methods" value={`${data?.financingMethod ? data?.financingMethod : 'Cash'}`} />
                        <InfoSection title="Acquisition Type" value={`${data?.acquisitionType ? data?.acquisitionType : 'Either (asset or shape purchase)'}`} />
                    </div>

                    <ChartSection title="Investment Size" data={investmentSizeData} />

                    <p style={{ fontSize: 18, marginTop: '5%', marginBottom: '2.5%' }} className="text-base font-semibold text-gray-900 space-y-2.5">Biographical information</p>

                    <div className="flex flex-wrap justify-evenly">
                        <InfoSection title="Email" value={`${data?.contactInfo?.email}`} />
                        <InfoSection title="Citizenship" value={`${data?.citizenship ? data?.citizenship : 'Canadian Citizen/Permanent Resident'}`} />
                        <InfoSection title="Buyer City" value={`${data?.baseLocation?.city ? data?.baseLocation?.city : 'Toronto'}`} />
                        <InfoSection title="Buyer Province" value={`${data?.baseLocation?.country ? data?.baseLocation?.country : 'Ontario'}`} />
                    </div>

                    <p style={{ fontSize: 18, marginBottom: '2.5%', marginTop: '5%', }} className="text-base font-semibold text-gray-900 space-y-2.5">Work Experience</p>

                    <div className="flex flex-wrap justify-evenly">
                        <BadgeSection title="Buyer Sector of Experience" badges={data?.sectorPreferences || ['Retail', 'Real Estate', 'Manufacturing']} />
                        <BadgeSection title="Years of Sector Experience" badges={[data?.experienceYears || '10+']} />
                        <InfoSection title="Linkedin Profile" value={`${data?.contactInfo?.linkedin ? data?.contactInfo?.linkedin : 'www.linkedin.com/in/doe'}`} />
                    </div>

                    <div className="flex flex-wrap justify-evenly">
                        <div className="w-full h-full">
                            <div className="grid gap-5 rounded-lg border-muted @2xl:p-6 space-y-2.5">
                                <div>
                                    <p style={{ fontSize: 18, marginTop: '5%', marginBottom: '2.5%' }} className="text-base font-semibold text-gray-900 space-y-2.5">Resume</p>
                                    <div>
                                        <embed src={data?.profileUrl ? data?.profileUrl : `https://firebasestorage.googleapis.com/v0/b/bizbridge-78490.appspot.com/o/Jaime%20Hackett_QualiBuy%20CV.pdf?alt=media&token=e1335fd1-348b-4fb7-9d69-c7d5e5238f46`} type="application/pdf" width="100%" height="400" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex mt-6">
                        <Text className='text-xs text-center w-full m-auto'>
                            Disclaimer: Narro makes no guarantee, warranty or representation about the buyers on our site. It is your responsibility to independently confirm the claims made by individuals and companies listed here.
                        </Text>
                    </div>
                    <div style={{ justifyContent: 'space-between', height: 100 }} />
                </div>
            </div>
        </div >
    );
}
