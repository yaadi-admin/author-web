import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  Timestamp,
} from "firebase/firestore";
import { z } from "zod";
import firebase from "../lib/firebase";

export interface Registration {
  id: string;
  fullName: string;
  partnerName?: string;
  email: string;
  phone?: string;
  packageSelection: string;
  emergencyContact?: string;
  paymentPlanRequest?: string;
  createdAt: string;
  source: string;
}

const registrationsCollection = collection(firebase.firestore, "registrations");

const registrationSchema = z.object({
  fullName: z.string().trim().min(1, "Full name is required."),
  partnerName: z.string().trim().optional(),
  email: z.string().trim().email("A valid email address is required."),
  phone: z.string().trim().optional(),
  packageSelection: z.string().trim().min(1, "Package selection is required."),
  emergencyContact: z.string().trim().optional(),
  paymentPlanRequest: z.string().trim().optional(),
  source: z.string().default("Retreat Registration Form"),
});

export type RegistrationInput = z.infer<typeof registrationSchema>;

export const addRegistration = async (
  input: RegistrationInput,
): Promise<Registration> => {
  const parsed = registrationSchema.safeParse(input);

  if (!parsed.success) {
    const firstIssue = parsed.error.issues[0];
    throw new Error(firstIssue?.message ?? "Invalid registration data.");
  }

  const payload = {
    ...parsed.data,
    createdAt: Timestamp.now(),
  };

  const docRef = await addDoc(registrationsCollection, payload);

  return {
    id: docRef.id,
    fullName: parsed.data.fullName,
    partnerName: parsed.data.partnerName,
    email: parsed.data.email,
    phone: parsed.data.phone,
    packageSelection: parsed.data.packageSelection,
    emergencyContact: parsed.data.emergencyContact,
    paymentPlanRequest: parsed.data.paymentPlanRequest,
    createdAt: new Date().toISOString(),
    source: parsed.data.source,
  };
};

export const getAllRegistrations = async (): Promise<Registration[]> => {
  try {
    const querySnapshot = await getDocs(
      query(registrationsCollection, orderBy("createdAt", "desc")),
    );

    const registrations: Registration[] = [];

    querySnapshot.forEach((document) => {
      const data = document.data();
      registrations.push({
        id: document.id,
        fullName: String(data.fullName ?? ""),
        partnerName: data.partnerName ? String(data.partnerName) : undefined,
        email: String(data.email ?? ""),
        phone: data.phone ? String(data.phone) : undefined,
        packageSelection: String(data.packageSelection ?? ""),
        emergencyContact: data.emergencyContact
          ? String(data.emergencyContact)
          : undefined,
        paymentPlanRequest: data.paymentPlanRequest
          ? String(data.paymentPlanRequest)
          : undefined,
        createdAt:
          data.createdAt instanceof Timestamp
            ? data.createdAt.toDate().toISOString()
            : new Date().toISOString(),
        source: String(data.source ?? "Retreat Registration Form"),
      });
    });

    return registrations;
  } catch (error) {
    console.error("Error fetching registrations:", error);
    return [];
  }
};
