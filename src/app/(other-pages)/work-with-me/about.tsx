import React from 'react';
import { HiChartPie, HiUserGroup, HiShieldCheck, HiCash } from 'react-icons/hi';
import Image from 'next/image';
import { HiMiniBanknotes, HiMiniFolderOpen } from 'react-icons/hi2';
import { Button } from 'rizzui';
import { FaCircleArrowRight } from 'react-icons/fa6';
import { useRouter } from 'next/navigation';
import { routes } from '@/config/routes';

interface HeroVariantProps {
    active?: boolean;
    push: (url: string) => void;
    variantId?: number;
    email: string;
    setEmail: (email: string) => void;
    handleSubmit: (variant: number) => void;
    hash?: string;
}

const transitionClasses = 'transition-opacity transition-transform duration-300 ease-in-out';

const aboutContent = {
    principles: [
        {
            title: "Direct Sourcing",
            icon: HiChartPie,
            description: "We source and deliver agricultural products directly to customers across the Caribbean via sea or air freight, ensuring efficiency and reliability."
        },
        {
            title: "Competitive Pricing",
            icon: HiCash,
            description: "Our robust supply chain network enables us to offer highly competitive prices both locally and regionally, providing exceptional value."
        },
        {
            title: "Experienced Team",
            icon: HiUserGroup,
            description: "With over 20 years of industry experience, our highly qualified team possess extensive knowledge to support all your agricultural needs."
        },
        {
            title: "Credible Reputation",
            icon: HiShieldCheck,
            description: "We uphold the highest standards of business ethics, earning a credible reputation by prioritizing our customers' needs."
        }
    ],
    images: [
        { src: 'https://firebasestorage.googleapis.com/v0/b/yaadi-ltd.appspot.com/v0/b/yaadi-ltd.appspot.com/o/premium_photo-1697738734527-67cb121b9a66.avif?alt=media&token=b418c4a9-ec07-4115-a938-e354a2be519b', alt: 'SMB Image', width: 800, height: 600 },
        { src: 'https://firebasestorage.googleapis.com/v0/b/yaadi-ltd.appspot.com/o/SMB%20Categorization.png?alt=media&token=8c199767-ac0c-4ea5-9fbd-38e7edb12a67', alt: 'Business Stages Framework', width: 600, height: 400 },
        { src: 'https://firebasestorage.googleapis.com/v0/b/yaadi-ltd.appspot.com/o/GrowthStages.png?alt=media&token=91af6bf9-41d4-4d96-8dd3-56a6e87dfb74', alt: 'Growth Framework', width: 600, height: 400 }
    ]
};

export function AboutHero() {
    const { push } = useRouter();
    return (
        <div id="about-us" className={`max-w-6xl mx-auto space-y-12 p-4 mt-[12%] ${transitionClasses}`}>
            <div className="w-full items-center text-center">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-snug sm:leading-tight">
                    <span className="block">The {" "}
                        <span className='text-green-600'>Complete</span> {" "}
                        Way
                    </span>
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-gray-600 mt-4 mb-3 leading-relaxed">
                    Our mission is to prioritize our customers by offering expert advice and support, whether you are a seasoned farmer or a first-time gardener.
                </p>
            </div>

            {/* Principles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {aboutContent.principles.map((principle, idx) => {
                    const Icon = principle.icon;
                    return (
                        <div key={idx} className=" bg-gray-100 border rounded-xl p-6 hover:shadow-lg flex flex-col items-center text-center">
                            <Icon className="w-8 h-8 text-green-600 mb-4" />
                            <h4 className="text-xl font-semibold text-gray-900">{principle.title}</h4>
                            <p className="mt-2 text-gray-600">{principle.description}</p>
                        </div>
                    );
                })}
            </div>

            <div className="w-full items-center text-center">
                <Button 

                className="bg-green-600 hover:bg-green-700 text-white rounded-lg px-6 py-3 min-h-[28px]"
                >
                    Learn More <FaCircleArrowRight className="w-6 h-6 ml-2" />
                </Button>
            </div>
        </div>
    );
}