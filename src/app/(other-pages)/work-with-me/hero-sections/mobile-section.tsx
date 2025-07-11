'use client';

import React, { useMemo, useState } from "react";
import firebase from "@/config/firebase.config";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import toast from 'react-hot-toast';

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
const containerClasses = `absolute inset-0 ${transitionClasses}`;

// Helper function to validate email
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

async function addToPool(email: string, type: string, collection_name: string, setEmail: any): Promise<void> {
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
    toast.success("You have successfully joined the investor pool.", {
      position: "bottom-center",
    });
    setEmail("");
  } catch (error) {
    console.error("Error Joining Investor Pool:", error);
    toast.error("Something went wrong, please try again.");
  }
}

export function HeroOneMobile() {
  const [investorEmail, setInvestorEmail] = useState("");
  const emailIsValid = isValidEmail(investorEmail);

  return (
    <>
      <div
        className={`w-full items-center justify-center h-full py-8`}
      >
        <div className="w-full max-w-lg px-4">
          <h1 className="text-3xl font-bold text-gray-900 text-center">
            Step into a realm where precision meets prestige
          </h1>
          <p className="mt-4 text-base text-gray-600 text-center">
            Experience an investment platform so finely tuned that every connection propels you toward monumental success.
          </p>
          <div className="flex flex-col gap-2 mt-6">
            <input
              type="email"
              onChange={(e) => setInvestorEmail(e.target.value)}
              placeholder="Email"
              className="rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              disabled={!emailIsValid}
              onClick={() =>
                addToPool(investorEmail, "investor", "investor_pool", setInvestorEmail)
              }
              className={`bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-6 py-3 ${!emailIsValid && 'opacity-50 cursor-not-allowed'}`}
            >
              Join Investor Pool
            </button>
          </div>
        </div>
        <div className="w-full mt-8 px-4">
          <div className="relative w-full shadow-xl rounded-2xl overflow-hidden">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/yaadi-ltd.appspot.com/o/premium_photo-1696942354036-7055974c7cc7.avif?alt=media&token=dd4545bd-485e-4591-a817-47624729358e"
              alt="Hero"
              loading="lazy"
              className="object-cover w-full h-64"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 p-4">
              <p className="text-white font-semibold text-center">Unparalleled Opportunities</p>
              <p className="text-white text-sm text-center">Elevate your investment portfolio</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
