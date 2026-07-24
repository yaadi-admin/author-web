export type CoachingPathwayId =
  | "identity-reset"
  | "survival-to-wholeness"
  | "purpose-alignment"
  | "covenant-preparedness"
  | "family-enrichment";

/** Per-pathway payment links. Registration is sent after payment is received. */
export const coachingPaymentUrls: Record<CoachingPathwayId, string> = {
  "identity-reset": "https://secure.ezeepayments.com/?PgxnCzx",
  "survival-to-wholeness": "https://secure.ezeepayments.com/?dBNwin3",
  "purpose-alignment": "https://secure.ezeepayments.com/?zeTrzlE",
  "covenant-preparedness": "https://secure.ezeepayments.com/?tnFwoYT",
  "family-enrichment": "https://secure.ezeepayments.com/?xv8poUf",
};

export interface CoachingPathway {
  id: CoachingPathwayId;
  number: number;
  title: string;
  tagline: string;
  image: string;
  idealFor: string;
  outcomes: string[];
  duration: string;
  sessionLength: string;
  investment: string;
  note?: string;
  ctaLabel: string;
  ctaNote?: string;
}

export const coachingPathways: CoachingPathway[] = [
  {
    id: "identity-reset",
    number: 1,
    title: "The Identity Reset",
    tagline: "Rebuild from the inside out.",
    image: "/coaching/identity-reset.jpg",
    idealFor:
      "Individuals who feel lost, disconnected, uncertain, or trapped in unhealthy emotional, relational, or behavioural patterns. This pathway is designed for those seeking to rediscover who they are and establish a strong foundation for lasting transformation.",
    outcomes: [
      "Stronger sense of self",
      "Improved self-worth and confidence",
      "Greater emotional awareness",
      "Healthier personal boundaries",
      "Increased confidence in self-leadership",
    ],
    duration: "4 Sessions",
    sessionLength: "90 Minutes Each",
    investment: "USD $200",
    ctaLabel: "Begin The Identity Reset",
  },
  {
    id: "survival-to-wholeness",
    number: 2,
    title: "From Survival to Wholeness",
    tagline: "Heal. Release. Rise.",
    image: "/coaching/survival-to-wholeness.jpg",
    idealFor:
      "Professional women and individuals navigating separation, divorce, toxic relationships, childhood trauma, abandonment, rejection, grief, or chronic emotional disappointment.",
    outcomes: [
      "Increased emotional regulation",
      "Greater self-awareness",
      "Reduced resentment and bitterness",
      "Healing from childhood wounds",
      "Improved relational health",
    ],
    duration: "6 Sessions",
    sessionLength: "90 Minutes Each",
    investment: "USD $300",
    note: "All coaching journeys begin with The Identity Reset, which provides the essential foundation for deeper healing and transformation before progressing into this pathway.",
    ctaLabel: "Choose This Pathway",
    ctaNote: "Your journey will begin with The Identity Reset.",
  },
  {
    id: "purpose-alignment",
    number: 3,
    title: "Purpose Alignment",
    tagline: "Live Your Purpose.",
    image: "/coaching/purpose-alignment.jpg",
    idealFor:
      "Individuals who sense they are called to more and are navigating career transitions, ministry assignments, entrepreneurship, retirement, or personal reinvention.",
    outcomes: [
      "Greater clarity about your purpose and assignment",
      "Discover your gifts and strengths",
      "Identify obstacles preventing forward movement",
      "Develop clear vision and meaningful goals",
      "Strengthen stewardship and intentional execution",
      "Live with greater purpose and direction",
    ],
    duration: "10 Sessions",
    sessionLength: "90 Minutes Each",
    investment: "USD $500",
    note: "All coaching journeys begin with The Identity Reset, ensuring you have a strong personal foundation before entering this specialized coaching pathway.",
    ctaLabel: "Choose This Pathway",
    ctaNote: "Your journey will begin with The Identity Reset.",
  },
  {
    id: "covenant-preparedness",
    number: 4,
    title: "Covenant Preparedness",
    tagline: "Prepare for the Right Love.",
    image: "/coaching/covenant-preparedness.jpg",
    idealFor:
      "Singles seeking healthy relationships, individuals recovering from heartbreak or divorce, and those preparing emotionally and spiritually for a healthy covenant relationship.",
    outcomes: [
      "Understand your attachment style",
      "Identify your emotional needs",
      "Recognize unhealthy relationship patterns",
      "Heal abandonment and rejection wounds",
      "Establish healthy relationship boundaries",
      "Define the standards for the relationship you desire",
    ],
    duration: "12 Sessions",
    sessionLength: "90 Minutes Each",
    investment: "USD $600",
    note: "All coaching journeys begin with The Identity Reset, providing the emotional and personal foundation necessary for healthy relationships.",
    ctaLabel: "Choose This Pathway",
    ctaNote: "Your journey will begin with The Identity Reset.",
  },
  {
    id: "family-enrichment",
    number: 5,
    title: "Family Enrichment",
    tagline: "Stronger Together.",
    image: "/coaching/family-enrichment.jpg",
    idealFor:
      "Couples, parents, blended families, and families seeking stronger communication, healthier relationships, and intentional legacy-building.",
    outcomes: [
      "Improved communication",
      "Stronger family relationships",
      "Greater emotional safety",
      "Healthy family boundaries",
      "Intentional family legacy",
    ],
    duration: "16 Sessions",
    sessionLength: "90 Minutes Each",
    investment: "USD $800",
    note: "All coaching journeys begin with The Identity Reset, creating a healthy personal foundation that strengthens every family relationship.",
    ctaLabel: "Choose This Pathway",
    ctaNote: "Your journey will begin with The Identity Reset.",
  },
];

export const coachingFaqs = [
  {
    question: "Do I have to start with Identity Reset?",
    answer:
      "Yes. The Identity Reset is the required starting point for every new coaching client. This foundational pathway helps you develop greater self-awareness, strengthen your sense of identity, and uncover patterns that may be limiting your growth. By beginning here, you'll be better prepared to maximize the benefits of your chosen coaching pathway and experience deeper, more sustainable transformation.",
  },
  {
    question: "Are sessions online or in person?",
    answer:
      "All coaching sessions are currently conducted online via Zoom, allowing you to participate from the comfort and privacy of your own home, regardless of your location. Should in-person sessions become available, this will be communicated separately.",
  },
  {
    question: "Can I pay in installments?",
    answer:
      "Yes and No. It’s a one-time payment for Pathways 1 and 2. Flexible payment options may be available for the other coaching pathways. If you require an installment plan, please reach out after selecting your pathway and we will work with you to determine an option that best supports your journey.",
  },
  {
    question: "What if I'm unsure which pathway is right for me?",
    answer:
      "That's perfectly okay. Many clients know they want change but aren't sure where to begin. Because every client begins with The Identity Reset, start there. Suzanna will then work with you to identify the pathway that best aligns with your goals, current season, and desired outcomes before you move into specialized coaching.",
  },
  {
    question: "What happens after I pay?",
    answer:
      "Payment is your commitment to begin. Once payment has been received, you will be sent the registration form and next steps, including scheduling instructions and onboarding information. Once registration is complete, your coaching sessions will be confirmed, and you'll be ready to begin your transformation journey.",
  },
  {
    question: "How long are the sessions?",
    answer:
      "Each coaching session is 90 minutes in length. The number of sessions depends on the pathway you choose: The Identity Reset: 4 Sessions; From Survival to Wholeness: 6 Sessions; Purpose Alignment: 10 Sessions; Covenant Preparedness: 12 Sessions; Family Enrichment: 16 Sessions. Each pathway is intentionally designed to provide the time and support you need to achieve meaningful and lasting transformation.",
  },
  {
    question: "Is coaching confidential?",
    answer:
      "Absolutely. Your privacy is important. All coaching conversations are conducted in a safe, respectful, and confidential environment. Information shared during your sessions will remain confidential, except where disclosure is required by law or where there is a risk of harm to yourself or others.",
  },
  {
    question: "Is coaching the same as therapy or counseling?",
    answer:
      "No. Coaching is designed to help you move forward by increasing self-awareness, setting meaningful goals, and developing practical strategies for growth and transformation. It is not a substitute for therapy, counseling, or medical treatment. If you are experiencing a mental health crisis or require clinical support, we encourage you to seek assistance from a qualified mental health professional.",
  },
];

/**
 * Returns the payment URL for a pathway.
 * Top-of-page / Identity Reset CTAs use the Identity Reset payment link.
 */
export const getCoachingPaymentUrl = (
  pathway: CoachingPathwayId | "general" = "identity-reset",
) => {
  if (pathway === "general") {
    return coachingPaymentUrls["identity-reset"];
  }

  return coachingPaymentUrls[pathway];
};

/** @deprecated Prefer getCoachingPaymentUrl — payment is now the first step. */
export const getCoachingRegistrationUrl = getCoachingPaymentUrl;
