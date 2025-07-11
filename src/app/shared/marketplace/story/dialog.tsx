'use client';

import React from "react";
import ChatDialog from "./chat/dialog";
import { NarroDialogue, replacePlaceholders } from "../../narro-dialogue";
import { sellerSpanCollection } from "@/config/ref/sellerSpanLiteCollections";
import firebase from "@/config/firebase.config";
import { collection, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { currentSession } from "@/config/session";
import axios from "axios";
import { BASE_URL, ROSETTA_ID } from "@/config/bots";
import { sellerSpanLite } from "@/config/seller/sellerSpanLite";
import { ThreadEvents } from "./chat/types";
import { useListings } from "@/config/seller/useListings";
import { routes } from "@/config/routes";

interface Dialog1Props {
  card: any;
  listingData?: any;
  setLoading: (val: boolean) => void;
}

export default function Dialog(props: Dialog1Props) {
  const {
    card,
    setLoading,
    listingData,
  } = props;

  // Use the card prop as the configuration document.
  const configCardData = card;
  const dialogueSection = configCardData
    ? configCardData.section2
    : { aigent: "", aigentPrompt: "", title: "", info: "" };

  // Memoize the promptWithIntake unconditionally.
  const promptWithIntake = React.useMemo(
    () =>
      dialogueSection.aigentPrompt
        ? replacePlaceholders(dialogueSection.aigentPrompt, {})
        : "",
    [dialogueSection.aigentPrompt]
  );

  if (!configCardData) {
    console.error("Config card data is missing.");
    return null;
  }

  const onStart = async (): Promise<string | null> => {
    // Optionally handle already existing thread logic.
    return null;
  };

  const onThreadCreated = () => {
    // Placeholder for thread creation logic.
    // You can use this callback to perform any actions after the thread is created.
    // maybe store the thread to the database so the user can continue later
    // console.log("Thread created");
  };

  const onSubmit = async (threadId: string, onFinish: () => void) => {
    setLoading(true);
    try {
      // Submission logic goes here. For example, call an API, update state, etc.
      // ...
    } catch (error) {
      console.error("Error in onSubmit:", error);
    } finally {
      setLoading(false);
      onFinish();
    }
  };

  return (
    <div className="col-span-full">
      <NarroDialogue
        id={"1"}
        step={1}
        onStart={onStart}
        onThreadCreated={onThreadCreated}
        aigent={dialogueSection.aigent}
        injectData={listingData}
        prompt={promptWithIntake}
        title={dialogueSection.title}
        info={dialogueSection.info}
        onSubmit={onSubmit}
        wisdomMessages={["Summarizing your conversation"]}
        estimatedTime={15}
      />
    </div>
  );
}

