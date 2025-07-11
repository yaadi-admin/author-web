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
            title: "Mobile Service",
            icon: HiChartPie,
            description: "We bring professional car detailing services directly to your location, providing convenience and flexibility for our customers."
        },
        {
            title: "Premium Quality",
            icon: HiCash,
            description: "Using only the highest quality products and techniques, we deliver showroom-quality results for your vehicle."
        },
        {
            title: "Expert Technicians",
            icon: HiUserGroup,
            description: "Our team of certified detailing professionals brings years of experience and expertise to every service."
        },
        {
            title: "Customer Satisfaction",
            icon: HiShieldCheck,
            description: "We guarantee 100% satisfaction with our services, ensuring your vehicle receives the care it deserves."
        }
    ],
    images: [
        { src: 'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', alt: 'Professional Detailing', width: 800, height: 600 },
        { src: 'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', alt: 'Paint Correction', width: 600, height: 400 },
        { src: 'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', alt: 'Interior Detailing', width: 600, height: 400 }
    ]
};

export function AboutHero() {
    const { push } = useRouter();
    return (
        <div id="about-us" className={`max-w-6xl mx-auto space-y-12 p-4 mt-[12%] ${transitionClasses}`}>
            <div className="w-full items-center text-center">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-snug sm:leading-tight">
                    <span className="block">Professional {" "}
                        <span className='text-[#D4AF37]'>Mobile</span> {" "}
                        Car Detailing
                    </span>
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-gray-600 mt-4 mb-3 leading-relaxed">
                    Our mission is to provide exceptional mobile car detailing services that bring showroom-quality results to your doorstep. We combine convenience with professional expertise to keep your vehicle looking its best.
                </p>
            </div>

            {/* Principles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {aboutContent.principles.map((principle, idx) => {
                    const Icon = principle.icon;
                    return (
                        <div key={idx} className="bg-white/80 backdrop-blur-sm border border-black/10 rounded-xl p-6 hover:shadow-lg flex flex-col items-center text-center">
                            <Icon className="w-8 h-8 text-[#D4AF37] mb-4" />
                            <h4 className="text-xl font-semibold text-gray-900">{principle.title}</h4>
                            <p className="mt-2 text-gray-600">{principle.description}</p>
                        </div>
                    );
                })}
            </div>

            <div className="w-full items-center text-center">
                <Button 
                    onClick={() => window.location.href = 'tel:+16477063728'}
                    className="bg-black hover:bg-[#D4AF37] text-white rounded-full px-8 py-3 min-h-[28px] transition-all duration-300"
                >
                    Schedule a Service <FaCircleArrowRight className="w-6 h-6 ml-2" />
                </Button>
            </div>
        </div>
    );
}