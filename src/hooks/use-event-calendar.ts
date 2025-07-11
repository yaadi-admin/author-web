'use client';

import { atom, useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import uniqueId from 'lodash/uniqueId';
import { CalendarEvent } from '@/types';
import firebase from '@/config/firebase.config';
import { doc, onSnapshot, setDoc, addDoc, query, collection, getDocs, where, serverTimestamp, deleteDoc, updateDoc } from "firebase/firestore";
import { currentSession } from '@/config/session';
import toast from 'react-hot-toast';
import { schedule } from '@/config/ref/schedule';


const defaultEvent = [
  {
    id: uniqueId(),
    start: new Date(),
    end: new Date(),
    allDay: false,
    virtual: false,
    title: 'Meeting with Paige',
    description: 'About Planning',
    location: `At Paige's place`,
  },
];

// export const eventAtom = atom<CalendarEvent[]>(event);

export default function useEventCalendar() {

  const event = schedule() as any;
  const currentUser = currentSession() as any;
  const [events, setEvents] = useState(event);


  async function createEvent(event: CalendarEvent) {
    const docRef = doc(collection(firebase.firestore, "events"));
    const updatedEvent = {
      ...event,
      scheduledBy: currentUser.id,
      id: docRef.id,
    };
    try {
      await setDoc(docRef, updatedEvent);
      toast.success("Meeting Scheduled Successfully", { position: "bottom-center" });
    } catch (e) {
      console.log(e)
      toast.error("Error Scheduling Meeting", { position: "bottom-center" });
    }
    // setEvents((prev) => [...prev, event]);
  }

  async function updateEvent(updatedEvent: any) {
    console.log(updatedEvent)
    const docRef = doc(collection(firebase.firestore, "events"), updatedEvent?.id);
    try {
      await updateDoc(docRef, updatedEvent);
      toast.success("Event Updated", { position: "bottom-center" });
    } catch (e) {
      console.log(e)
    }
    // Use map to replace the object with the same id
    // const updatedEvents = events.map((event: any) => {
    //   if (event.id === updatedEvent.id) {
    //     return updatedEvent; // replace with the updated object
    //   }
    //   return event; // keep the original object
    // });
    // setEvents(updatedEvents);
  }

  async function deleteEvent(eventID: string) {
    const docRef = doc(collection(firebase.firestore, "events"), eventID);
    try {
      await deleteDoc(docRef);
      toast.success("Event Deleted", { position: "bottom-center" });
    } catch (e) {
      console.log(e)
    }
    // Use filter to create a new array without the event to be deleted
    // const updatedEvents = events.filter((event: any) => event.id !== eventID);

    // Update the state with the new array of events
    // setEvents(updatedEvents);
  }

  return { event, setEvents, createEvent, updateEvent, deleteEvent };
}
