import { routes } from '@/config/routes';
import React, { useMemo, useState, useEffect } from "react";
import { ArrowRight } from 'react-feather';
import Image from 'next/image';
import { Button } from 'rizzui';
import { useRouter } from 'next/navigation';
import { CiMemoPad, CiMoneyBill } from 'react-icons/ci';
import firebase from "@/config/firebase.config";
import { collection, addDoc, serverTimestamp, getDocs } from "firebase/firestore";
import toast from 'react-hot-toast';

interface ProductCard {
    title: string;
    description: string;
    link: any;
    buttonTitle: string;
    image: string;
}

const products: ProductCard[] = [
    {
        title: "Topsoil, Promix , Plant pots",
        description: "Enhance your gardening and farming with our premium topsoil, Promix, and plant pots. Our topsoil is rich in nutrients, Promix provides the perfect growing medium, and our durable plant pots are ideal for all types of plants.",
        link: routes.signIn,
        buttonTitle: "Get Started",
        image: 'https://firebasestorage.googleapis.com/v0/b/cgcl-578a2.firebasestorage.app/o/external-Soil-gardening-goofy-color-kerismaker.png?alt=media&token=57d7b941-bb67-44cc-b362-e52657dc4cd0',
    },
    {
        title: "Seeds / Seedlings / Plants",
        description: "Discover our wide variety of seeds, seedlings, and plants to kickstart your agricultural projects. Our high-quality products ensure healthy growth and bountiful yields, supporting sustainable farming practices.",
        link: routes.signIn,
        buttonTitle: "Join our network",
        image: 'https://firebasestorage.googleapis.com/v0/b/cgcl-578a2.firebasestorage.app/o/external-Seeds-gardening-icongeek26-linear-colour-icongeek26.png?alt=media&token=a6f2bf50-f256-4d40-bcb5-35d6cb523eee',
    },
    {
        title: "Pesticides / Herbicides",
        description: "Protect your crops with our range of effective pesticides and herbicides. Our products are designed to control pests and weeds, ensuring the health and productivity of your agricultural operations.",
        link: routes.signIn,
        buttonTitle: "Join our network",
        image: 'https://firebasestorage.googleapis.com/v0/b/cgcl-578a2.firebasestorage.app/o/external-Herbs-pharmacy-(flat)-flat-andi-nur-abdillah.png?alt=media&token=356881c4-4509-4092-bda0-8bf5385a2ba3',
    },
    {
        title: "Regional Export",
        description: "Expand your market reach with our comprehensive regional export services. We facilitate the export of agricultural products, ensuring compliance with international standards and providing logistical support to help you tap into new markets efficiently.",
        link: routes.signIn,
        buttonTitle: "Join our network",
        image: 'https://firebasestorage.googleapis.com/v0/b/cgcl-578a2.firebasestorage.app/o/external-cargo-ship-transportation-justicon-flat-justicon.png?alt=media&token=9dd39501-d9b1-474e-a525-f583669364ac',
    },
];


// Helper function to validate email
function isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Investor Pay Pool
async function addInvestorToPool(email: string, type: string, collection_name: string, setEmail: any): Promise<void> {
    // Sanitize the email field by stripping out any HTML tags and trimming whitespace.
    const sanitizeEmail = (input: string): string => {
        return input.trim().replace(/<[^>]*>/g, '');
    };

    const sanitizedEmail = sanitizeEmail(email);

    if (!isValidEmail(sanitizedEmail)) {
        toast.error("Invalid email address.");
        return;
    }

    try {
        await addDoc(collection(firebase.firestore, collection_name), {
            email: sanitizedEmail,
            type: type,
            createdAt: serverTimestamp(),
            browser: navigator.userAgent,
            device: {
                width: window.screen.width,
                height: window.screen.height,
                pixelDepth: window.screen.pixelDepth,
                deviceName: navigator.platform || "unknown",
                network: (navigator as any).connection
                    ? {
                        effectiveType: (navigator as any).connection.effectiveType,
                        downlink: (navigator as any).connection.downlink,
                        rtt: (navigator as any).connection.rtt,
                        saveData: (navigator as any).connection.saveData,
                    }
                    : null,
            },
        });
        // toast.success("You have successfully joined the investor pool.", {
        //   position: "bottom-center",
        // });
        window.open("https://buy.stripe.com/28o00sgJgeO29gc8wy?prefilled_email=" + sanitizedEmail, "_blank");
        setEmail("");
    } catch (error) {
        console.error("Error Joining Investor Pool:", error);
        toast.error("Something went wrong, please try again.");
    }
}

function useInvestorPoolCount() {
    const [poolTotal, setPoolTotal] = useState(0);

    useEffect(() => {
        async function fetchInvestorPoolCount() {
            try {
                const querySnapshot = await getDocs(collection(firebase.firestore, "investor_pool"));
                setPoolTotal(querySnapshot.size);
            } catch (error) {
                console.error("Error fetching investor pool count:", error);
            }
        }

        fetchInvestorPoolCount();
    }, []);

    return poolTotal;
}

export function ProductHero() {
    const { push } = useRouter();
    const [investorEmail, setInvestorEmail] = React.useState("");
    const emailIsValid = isValidEmail(investorEmail);
    const poolTotal = useInvestorPoolCount();

    return (
        <section id='services' className="py-12 mt-[2%]">
            <div className="w-full items-center text-center">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-snug sm:leading-tight">
                    <span className="block">CGCL {" "}
                        <span className='text-green-600'>Products</span> {" "}
                        and {" "}
                        <span className='text-green-600'>Services</span>
                    </span>
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-gray-600 mt-4 mb-3 leading-relaxed">
                    We offer a wide range of insecticides, herbicides, fungicides, fertilizers, pet supplies, animal feeds (crack corn, pellets, etc.), seeds, seedlings and garden tools.
                </p>
            </div>
            {/* Grid: mobile single column (gap-6 = 24px), md two columns (gap-8 = 32px) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-7xl mx-auto">
                {products.map((product, index) => (
                    <div
                        key={product.title}
                        className="border border-gray-200 bg-gray-100 rounded-xl overflow-hidden shadow-lg transform transition duration-300 hover:shadow-xl hover:scale-[1.01]"
                        style={{ transitionDelay: `${index * 100}ms` }}
                    >
                        <Image
                            src={product.image}
                            alt={product.title}
                            width={500}
                            height={300}
                            className="w-full h-48 object-contain"
                        />
                        <div className="p-6">
                            <h3 className="text-xl font-semibold text-gray-900">{product.title}</h3>
                            <p className="text-gray-600 mt-2 leading-relaxed mb-4">
                                {product.description}
                            </p>

                            {/* {
                                <Button
                                    onClick={() => push(product.link)}
                                    className="inline-flex items-center text-white hover:text-white transition-colors duration-300 ease-in-out"
                                >
                                    {product.buttonTitle}
                                </Button>} */}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}