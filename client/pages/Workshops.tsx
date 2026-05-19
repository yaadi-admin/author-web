import Header from "../components/Header";
import { Link } from "react-router-dom";
import {
  useState,
  useEffect,
  useCallback,
  useRef,
  type ChangeEvent,
  type FormEvent,
} from "react";
import { speakingReviews } from "../data/reviews";
import {
  getAllWorkshops,
  getWorkshopTemporalStatus,
  type Workshop,
} from "../data/workshops";
import {
  submitCoachingAssessment,
  submitCoachingIntake,
} from "../lib/coaching";
import { footerPictures } from "./Index";
import Footer from "./footer";
import type { CoachingActionLinks } from "@shared/api";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Clock3,
  ExternalLink,
  HandCoins,
  HeartHandshake,
  Loader2,
  MailCheck,
  ShieldCheck,
  Sparkles,
  Ticket,
  Users,
} from "lucide-react";

type CoachingIntakeFormState = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  serviceInterest: string;
  preferredSessionType: string;
  message: string;
  termsAccepted: boolean;
  communicationsOptIn: boolean;
};

type CoachingAssessmentFormState = {
  primaryChallenge: string;
  desiredOutcome: string;
  preferredTiming: string;
  priorCoachingExperience: string;
  sessionCommitment: string;
  prayerFocus: string;
};

const initialCoachingIntakeForm: CoachingIntakeFormState = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  serviceInterest: "1:1 healing coaching",
  preferredSessionType: "Virtual",
  message: "",
  termsAccepted: false,
  communicationsOptIn: false,
};

const initialCoachingAssessmentForm: CoachingAssessmentFormState = {
  primaryChallenge: "",
  desiredOutcome: "",
  preferredTiming: "Weekday evenings",
  priorCoachingExperience: "This is my first time",
  sessionCommitment: "Ready to begin now",
  prayerFocus: "",
};

const openInNewTab = (url: string) => {
  window.open(url, "_blank", "noopener,noreferrer");
};

const canOpenWorkshopUrl = (workshop: Workshop) =>
  !workshop.comingSoon && workshop.url.trim() !== "" && workshop.url.trim() !== "#";

const getWorkshopBadge = (workshop: Workshop) => {
  const temporalStatus = getWorkshopTemporalStatus(workshop);

  if (workshop.comingSoon) {
    return {
      label: "Coming Soon",
      className: "bg-[#111111] text-white border-[#111111]",
    };
  }

  if (temporalStatus === "past") {
    return {
      label: "Past Event",
      className: "bg-white text-[#9b2452] border-[#f3bdd1]",
    };
  }

  if (workshop.isActive) {
    return {
      label: "Registration Open",
      className: "bg-[#F84988] text-white border-[#F84988]",
    };
  }

  return {
    label: "Details Announced",
    className: "bg-[#fff4d8] text-[#7a4b00] border-[#ffd37b]",
  };
};

const getWorkshopActionLabel = (workshop: Workshop) => {
  const temporalStatus = getWorkshopTemporalStatus(workshop);

  if (temporalStatus === "past") {
    return "View Event";
  }

  if (workshop.isActive) {
    return "Reserve Your Spot";
  }

  return "View Details";
};

export default function Workshops() {
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const [workshopData, setWorkshopData] = useState<Workshop[]>([]);
  const [isLoadingWorkshops, setIsLoadingWorkshops] = useState(true);
  const [workshopsError, setWorkshopsError] = useState("");

  const [coachingIntakeForm, setCoachingIntakeForm] = useState<CoachingIntakeFormState>(
    initialCoachingIntakeForm,
  );
  const [coachingAssessmentForm, setCoachingAssessmentForm] =
    useState<CoachingAssessmentFormState>(initialCoachingAssessmentForm);
  const [isSubmittingIntake, setIsSubmittingIntake] = useState(false);
  const [isSubmittingAssessment, setIsSubmittingAssessment] = useState(false);
  const [intakeMessage, setIntakeMessage] = useState("");
  const [assessmentMessage, setAssessmentMessage] = useState("");
  const [coachingError, setCoachingError] = useState("");
  const [assessmentError, setAssessmentError] = useState("");
  const [coachingInquiryId, setCoachingInquiryId] = useState("");
  const [coachingLinks, setCoachingLinks] = useState<CoachingActionLinks | null>(null);
  const [usingFallbackLinks, setUsingFallbackLinks] = useState(false);
  const [showAssessmentForm, setShowAssessmentForm] = useState(false);
  const [showNextSteps, setShowNextSteps] = useState(false);

  const assessmentSectionRef = useRef<HTMLDivElement | null>(null);
  const nextStepsSectionRef = useRef<HTMLDivElement | null>(null);
  const resumeAutoScrollTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    let isCancelled = false;

    const loadWorkshops = async () => {
      setIsLoadingWorkshops(true);
      setWorkshopsError("");

      try {
        const workshops = await getAllWorkshops();
        if (!isCancelled) {
          setWorkshopData(workshops);
        }
      } catch (error) {
        console.error("Error loading workshops:", error);

        if (!isCancelled) {
          setWorkshopData([]);
          setWorkshopsError("Workshops could not be loaded right now. Please refresh and try again.");
        }
      } finally {
        if (!isCancelled) {
          setIsLoadingWorkshops(false);
        }
      }
    };

    void loadWorkshops();

    return () => {
      isCancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!isAutoScrolling) {
      return;
    }

    const interval = window.setInterval(() => {
      setCurrentReviewIndex((prev) => (prev + 1) % speakingReviews.length);
    }, 5000);

    return () => window.clearInterval(interval);
  }, [isAutoScrolling]);

  useEffect(() => {
    return () => {
      if (resumeAutoScrollTimeoutRef.current) {
        window.clearTimeout(resumeAutoScrollTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (showAssessmentForm) {
      assessmentSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [showAssessmentForm]);

  useEffect(() => {
    if (showNextSteps) {
      nextStepsSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [showNextSteps]);

  const pauseAutoScroll = useCallback(() => {
    setIsAutoScrolling(false);

    if (resumeAutoScrollTimeoutRef.current) {
      window.clearTimeout(resumeAutoScrollTimeoutRef.current);
    }

    resumeAutoScrollTimeoutRef.current = window.setTimeout(() => {
      setIsAutoScrolling(true);
    }, 10000);
  }, []);

  const nextReview = useCallback(() => {
    pauseAutoScroll();
    setCurrentReviewIndex((prev) => (prev + 1) % speakingReviews.length);
  }, [pauseAutoScroll]);

  const prevReview = useCallback(() => {
    pauseAutoScroll();
    setCurrentReviewIndex((prev) => (prev - 1 + speakingReviews.length) % speakingReviews.length);
  }, [pauseAutoScroll]);

  const handleIntakeInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = event.target;
    const checked = (event.target as HTMLInputElement).checked;

    setCoachingIntakeForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleAssessmentInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;

    setCoachingAssessmentForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCoachingIntakeSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setCoachingError("");
    setIntakeMessage("");

    if (!coachingIntakeForm.termsAccepted) {
      setCoachingError("Please accept the terms before continuing.");
      return;
    }

    setIsSubmittingIntake(true);

    try {
      const response = await submitCoachingIntake({
        firstName: coachingIntakeForm.firstName,
        lastName: coachingIntakeForm.lastName,
        email: coachingIntakeForm.email,
        phone: coachingIntakeForm.phone,
        serviceInterest: coachingIntakeForm.serviceInterest,
        preferredSessionType: coachingIntakeForm.preferredSessionType,
        message: coachingIntakeForm.message,
        termsAccepted: coachingIntakeForm.termsAccepted,
        communicationsOptIn: coachingIntakeForm.communicationsOptIn,
      });

      setCoachingInquiryId(response.inquiryId || "");
      setCoachingLinks(response.links || null);
      setUsingFallbackLinks(Boolean(response.usingFallbackLinks));
      setShowAssessmentForm(true);
      setShowNextSteps(false);
      setIntakeMessage(response.warning || response.message);
    } catch (error) {
      setCoachingError(
        error instanceof Error ? error.message : "Unable to start the coaching workflow.",
      );
    } finally {
      setIsSubmittingIntake(false);
    }
  };

  const handleAssessmentSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setAssessmentError("");
    setAssessmentMessage("");

    if (!coachingInquiryId) {
      setAssessmentError("Please start with the coaching request form first.");
      return;
    }

    setIsSubmittingAssessment(true);

    try {
      const response = await submitCoachingAssessment({
        inquiryId: coachingInquiryId,
        firstName: coachingIntakeForm.firstName,
        lastName: coachingIntakeForm.lastName,
        email: coachingIntakeForm.email,
        phone: coachingIntakeForm.phone,
        primaryChallenge: coachingAssessmentForm.primaryChallenge,
        desiredOutcome: coachingAssessmentForm.desiredOutcome,
        preferredTiming: coachingAssessmentForm.preferredTiming,
        priorCoachingExperience: coachingAssessmentForm.priorCoachingExperience,
        sessionCommitment: coachingAssessmentForm.sessionCommitment,
        prayerFocus: coachingAssessmentForm.prayerFocus,
      });

      setCoachingLinks(response.links || coachingLinks);
      setUsingFallbackLinks(Boolean(response.usingFallbackLinks));
      setShowNextSteps(true);
      setAssessmentMessage(response.warning || response.message);
    } catch (error) {
      setAssessmentError(
        error instanceof Error ? error.message : "Unable to submit the new client assessment.",
      );
    } finally {
      setIsSubmittingAssessment(false);
    }
  };

  return (
    <div className="overflow-x-hidden bg-gradient-to-br from-[#f9d9e5] via-[#f7c2d2] to-[#f7b350]">
      <Header whiteText={true} />

      <section className="relative flex min-h-[46vh] items-end justify-center overflow-hidden pt-24 sm:min-h-[52vh] md:min-h-[56vh]">
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "url(https://firebasestorage.googleapis.com/v0/b/suelyn-e82e4.firebasestorage.app/o/1X1A0235.jpg?alt=media&token=a5612b0e-c68f-428f-8179-e9f4fdeee5ff)",
              backgroundPosition: "center 20%",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-[#53112d]/60" />
        </div>

        <div className="relative z-10 w-full px-4 pb-10 text-center text-white sm:pb-14 md:pb-16">
          <div className="mx-auto max-w-5xl rounded-[2rem] border border-white/15 bg-black/20 px-6 py-8 backdrop-blur-md sm:px-10">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-white/90">
              <Sparkles className="h-4 w-4" />
              Live Engagements and Coaching
            </div>
            <h1 className="font-charm text-5xl font-bold leading-none sm:text-7xl md:text-8xl lg:text-[7rem]">
              Engagements
            </h1>
            <p className="mx-auto mt-4 max-w-3xl font-playfair text-lg leading-relaxed text-white/90 sm:text-2xl">
              Current events now lead the page, past engagements stay visible, and coaching
              inquiries can move straight into assessment, scheduling, and payment.
            </p>
          </div>
        </div>
      </section>

      {/* ===================== RETREAT FLYER ===================== */}
      <section className="bg-[#ffe6ef] px-4 py-8 sm:py-10">
        <div className="container mx-auto max-w-6xl">
          <Link to="/lover-never-ends" className="block group">
            <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#F84988] to-[#FFAC24] p-4 sm:p-6 md:p-8 shadow-[0_24px_80px_rgba(95,18,49,0.2)] transition-all duration-300 group-hover:shadow-[0_32px_100px_rgba(95,18,49,0.3)]">
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/3" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full blur-3xl transform -translate-x-1/3 translate-y-1/3" />
              </div>
              <div className="relative z-10 grid lg:grid-cols-[1.2fr_1fr] gap-6 items-center">
                {/* Flyer Image */}
                <div className="order-2 lg:order-1">
                  <div className="overflow-hidden rounded-xl sm:rounded-2xl shadow-xl ring-2 ring-white/20 transition-all duration-500 group-hover:ring-white/40 group-hover:scale-[1.01]">
                    <img
                      src="/Lover-never-ends-flyer.jpeg"
                      alt="Lover Never Ends Retreat Flyer"
                      className="w-full h-auto object-cover"
                      loading="lazy"
                    />
                  </div>
                </div>

                {/* Text Content */}
                <div className="order-1 lg:order-2 text-center lg:text-left">
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-2 text-sm font-semibold uppercase tracking-widest text-white mb-4">
                    <Sparkles className="h-4 w-4" />
                    Oct 19, 2026
                  </div>
                  <h2 className="font-charm text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-none mb-3">
                    Lover Never Ends
                  </h2>
                  <p className="font-playfair text-base sm:text-lg md:text-xl text-white/90 max-w-lg mb-6">
                    A Divine Design Experience for Couples — Healing, Restoration & Alignment Reset
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start items-center">
                    <span className="bg-white text-[#F84988] px-6 sm:px-8 py-3 rounded-full font-inter font-semibold text-sm sm:text-base hover:bg-white/90 transition-all shadow-lg">
                      View Retreat Details
                    </span>
                    <span className="text-white font-inter font-medium text-sm flex items-center gap-2">
                      Click to learn more
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </section>

      <section className="bg-[#ffe6ef] px-4 py-12 sm:py-16 md:py-20">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-10 text-center sm:mb-14">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#f3bdd1] bg-white px-4 py-2 text-sm font-semibold text-[#9b2452] shadow-sm">
              <CalendarDays className="h-4 w-4" />
              Most current at the top. Past events remain in the lineup.
            </div>
            <h2 className="font-playfair text-4xl font-semibold text-[#23121a] sm:text-5xl md:text-6xl">
              Workshops & Events
            </h2>
            <p className="mx-auto mt-4 max-w-3xl font-helvetica text-base leading-7 text-[#4d3340] sm:text-lg">
              Every engagement now reads with stronger contrast and clearer status, so the page
              feels published, current, and easy to trust on mobile.
            </p>
          </div>

          {isLoadingWorkshops && (
            <div className="grid gap-6">
              {[0, 1].map((item) => (
                <div
                  key={item}
                  className="animate-pulse rounded-[2rem] border border-[#f0bfd0] bg-white/80 p-6 shadow-[0_20px_60px_rgba(95,18,49,0.08)]"
                >
                  <div className="grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)]">
                    <div className="min-h-[280px] rounded-[1.5rem] bg-[#f5dbe5]" />
                    <div className="space-y-4">
                      <div className="h-6 w-40 rounded-full bg-[#f5dbe5]" />
                      <div className="h-12 w-4/5 rounded-xl bg-[#f5dbe5]" />
                      <div className="h-24 rounded-2xl bg-[#f7e6ec]" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {!isLoadingWorkshops && workshopsError && (
            <div className="rounded-[1.75rem] border border-[#f3bdd1] bg-white px-6 py-5 text-center text-[#8d2a52] shadow-sm">
              {workshopsError}
            </div>
          )}

          {!isLoadingWorkshops && !workshopsError && workshopData.length === 0 && (
            <div className="rounded-[1.75rem] border border-[#f3bdd1] bg-white px-6 py-8 text-center text-[#8d2a52] shadow-sm">
              No engagements have been published yet.
            </div>
          )}

          {!isLoadingWorkshops && workshopData.length > 0 && (
            <div className="space-y-8">
              {workshopData.map((workshop) => {
                const badge = getWorkshopBadge(workshop);
                const temporalStatus = getWorkshopTemporalStatus(workshop);

                return (
                  <article
                    key={workshop.id}
                    className="rounded-[2rem] border border-[#edbfd0] bg-white/95 p-4 shadow-[0_24px_80px_rgba(95,18,49,0.12)] backdrop-blur-sm sm:p-6 md:p-8"
                  >
                    <div className="grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)] lg:gap-8">
                      <div className="overflow-hidden rounded-[1.5rem] border border-[#f2c3d4] bg-[#fff3f8]">
                        <img
                          src={workshop.image}
                          alt={workshop.title}
                          className="h-full min-h-[280px] w-full object-contain"
                        />
                      </div>

                      <div className="flex flex-col justify-between">
                        <div>
                          <div className="mb-4 flex flex-wrap items-center gap-3">
                            <span
                              className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold ${badge.className}`}
                            >
                              <CheckCircle2 className="h-4 w-4" />
                              {badge.label}
                            </span>
                            <span className="inline-flex items-center gap-2 rounded-full border border-[#f3d3de] bg-[#fff8fb] px-4 py-2 text-sm font-semibold text-[#5d1532]">
                              <CalendarDays className="h-4 w-4" />
                              {workshop.date}
                            </span>
                            <span className="inline-flex items-center gap-2 rounded-full border border-[#f1e0b0] bg-[#fff5d9] px-4 py-2 text-sm font-semibold text-[#7a4b00]">
                              <Ticket className="h-4 w-4" />
                              {temporalStatus === "past"
                                ? "Archive still visible"
                                : workshop.isActive
                                  ? "Public and ready"
                                  : "Preview available"}
                            </span>
                          </div>

                          <h3 className="font-playfair text-3xl font-semibold leading-tight text-[#23121a] sm:text-4xl">
                            {workshop.title}
                          </h3>

                          <p className="mt-4 font-helvetica text-base leading-8 text-[#4d3340] sm:text-lg">
                            {workshop.description}
                          </p>

                          <div className="mt-6 grid gap-3 sm:grid-cols-3">
                            <div className="rounded-2xl border border-[#f4cad8] bg-[#fff8fb] p-4">
                              <div className="mb-2 flex items-center gap-2 text-[#9b2452]">
                                <CalendarDays className="h-4 w-4" />
                                <span className="text-sm font-semibold uppercase tracking-[0.18em]">
                                  Date
                                </span>
                              </div>
                              <p className="font-helvetica text-sm leading-6 text-[#2d1b23]">
                                {workshop.date}
                              </p>
                            </div>

                            <div className="rounded-2xl border border-[#f4cad8] bg-[#fff8fb] p-4">
                              <div className="mb-2 flex items-center gap-2 text-[#9b2452]">
                                <Clock3 className="h-4 w-4" />
                                <span className="text-sm font-semibold uppercase tracking-[0.18em]">
                                  Status
                                </span>
                              </div>
                              <p className="font-helvetica text-sm leading-6 text-[#2d1b23]">
                                {temporalStatus === "past"
                                  ? "Past engagement kept visible for social proof."
                                  : workshop.isActive
                                    ? "Current event with live registration."
                                    : "Visible now, with more details to follow."}
                              </p>
                            </div>

                            <div className="rounded-2xl border border-[#f4cad8] bg-[#fff8fb] p-4">
                              <div className="mb-2 flex items-center gap-2 text-[#9b2452]">
                                <Users className="h-4 w-4" />
                                <span className="text-sm font-semibold uppercase tracking-[0.18em]">
                                  Engagement
                                </span>
                              </div>
                              <p className="font-helvetica text-sm leading-6 text-[#2d1b23]">
                                Stronger event metadata and action styling for mobile visitors.
                              </p>
                            </div>
                          </div>
                        </div>

                        {canOpenWorkshopUrl(workshop) && (
                          <div className="mt-6 flex flex-wrap items-center gap-4">
                            <button
                              onClick={() => openInNewTab(workshop.url)}
                              className="inline-flex items-center gap-2 rounded-full bg-[#111111] px-6 py-3 font-helvetica text-sm font-semibold text-white transition-colors hover:bg-[#F84988] sm:text-base"
                            >
                              {getWorkshopActionLabel(workshop)}
                              <ArrowRight className="h-4 w-4" />
                            </button>
                            <a
                              href={workshop.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 font-helvetica text-sm font-semibold text-[#9b2452] underline-offset-4 hover:underline"
                            >
                              Open external event link
                              <ExternalLink className="h-4 w-4" />
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('https://firebasestorage.googleapis.com/v0/b/suelyn-e82e4.firebasestorage.app/o/1X1A0004.jpg?alt=media&token=24696ff6-d7d5-4598-b0df-b2828b939062')",
            backgroundPosition: "center 20%",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/80 to-[#290712]/85" />

        <div className="relative z-10 py-14 md:py-24 lg:py-28">
          <div className="container mx-auto px-4 text-center text-white">
            <div className="relative mb-8 flex min-h-[420px] items-center md:mb-12 md:min-h-[500px]">
              <div className="w-full">
                <button
                  onClick={prevReview}
                  className="absolute left-2 top-1/2 z-20 -translate-y-1/2 rounded-full border border-white/20 bg-white/10 p-3 backdrop-blur-sm transition hover:bg-white/20 md:left-8 lg:left-16"
                  aria-label="Previous review"
                >
                  <ArrowRight className="h-6 w-6 rotate-180 text-white" />
                </button>

                <div className="mx-auto max-w-4xl px-14 transition-all duration-700 ease-in-out md:px-24">
                  <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-white/80">
                    <HeartHandshake className="h-4 w-4" />
                    Speaking Impact
                  </div>

                  <h3 className="font-playfair text-3xl font-bold text-white md:text-4xl xl:text-5xl">
                    Grow. Overcome. Get Back Up.
                  </h3>

                  <p className="mx-auto mt-8 max-w-4xl font-playfair text-lg leading-relaxed text-white md:text-2xl xl:text-3xl">
                    {speakingReviews[currentReviewIndex].quote}
                  </p>

                  <div className="mt-8 font-playfair text-lg text-white md:text-xl xl:text-2xl">
                    <p className="font-bold">- {speakingReviews[currentReviewIndex].name}</p>
                    {speakingReviews[currentReviewIndex].role &&
                      speakingReviews[currentReviewIndex].company && (
                        <p className="mt-2 text-base text-white/80 md:text-lg">
                          {speakingReviews[currentReviewIndex].role},{" "}
                          {speakingReviews[currentReviewIndex].company}
                        </p>
                      )}
                  </div>
                </div>

                <button
                  onClick={nextReview}
                  className="absolute right-2 top-1/2 z-20 -translate-y-1/2 rounded-full border border-white/20 bg-white/10 p-3 backdrop-blur-sm transition hover:bg-white/20 md:right-8 lg:right-16"
                  aria-label="Next review"
                >
                  <ArrowRight className="h-6 w-6 text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-b from-[#f6e4bc] via-[#ffd58a] to-[#ffb545] px-4 py-14 sm:py-16 md:py-24">
        <div className="container mx-auto max-w-6xl">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#e4bb5f] bg-white/70 px-4 py-2 text-sm font-semibold text-[#704200]">
              <HeartHandshake className="h-4 w-4" />
              Connect With Suelyn
            </div>
            <h2 className="font-playfair text-4xl font-semibold text-[#22140d] sm:text-5xl md:text-6xl">
              Coaching Intake, Assessment, Scheduling, and Payment
            </h2>
            <p className="mt-5 font-helvetica text-base leading-8 text-[#4e3420] sm:text-lg">
              This section now works as a guided coaching workflow. A visitor can submit the first
              coaching request, move directly into a New Client Assessment Form, then continue to
              scheduling and payment without the old back-and-forth.
            </p>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-[1.05fr_minmax(0,1.2fr)]">
            <div className="rounded-[2rem] border border-[#f0c26f] bg-[#22140d] p-6 text-white shadow-[0_28px_80px_rgba(63,32,4,0.25)] sm:p-8">
              <h3 className="font-playfair text-3xl font-semibold">What happens now</h3>
              <div className="mt-6 space-y-4">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="mb-2 flex items-center gap-2 text-[#ffd179]">
                    <MailCheck className="h-5 w-5" />
                    <span className="font-semibold">Step 1</span>
                  </div>
                  <p className="font-helvetica text-sm leading-7 text-white/85">
                    A client fills out the coaching request so you receive the right context from the
                    start.
                  </p>
                </div>
                <div
                  ref={assessmentSectionRef}
                  id="new-client-assessment"
                  className={`rounded-2xl border p-4 transition ${
                    showAssessmentForm
                      ? "border-[#ffd179] bg-[#fff4dd] text-[#22140d]"
                      : "border-white/10 bg-white/5 text-white"
                  }`}
                >
                  <div className="mb-2 flex items-center gap-2">
                    <ShieldCheck className="h-5 w-5" />
                    <span className="font-semibold">Step 2</span>
                  </div>
                  <p
                    className={`font-helvetica text-sm leading-7 ${
                      showAssessmentForm ? "text-[#4e3420]" : "text-white/85"
                    }`}
                  >
                    The New Client Assessment Form opens automatically after the first submission so
                    the conversation stays moving.
                  </p>
                </div>
                <div
                  ref={nextStepsSectionRef}
                  className={`rounded-2xl border p-4 transition ${
                    showNextSteps
                      ? "border-[#ffd179] bg-[#fff4dd] text-[#22140d]"
                      : "border-white/10 bg-white/5 text-white"
                  }`}
                >
                  <div className="mb-2 flex items-center gap-2">
                    <HandCoins className="h-5 w-5" />
                    <span className="font-semibold">Step 3</span>
                  </div>
                  <p
                    className={`font-helvetica text-sm leading-7 ${
                      showNextSteps ? "text-[#4e3420]" : "text-white/85"
                    }`}
                  >
                    Once the assessment is complete, the visitor sees the scheduling and payment
                    action buttons right away.
                  </p>
                </div>
              </div>

              <div className="mt-8 rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
                <p className="font-helvetica text-sm leading-7 text-white/85">
                  Next month’s event gallery can build cleanly on top of this structure, since past
                  engagements are now preserved and clearly ordered instead of fading out.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-[2rem] border border-[#f3c473] bg-white/95 p-6 shadow-[0_24px_80px_rgba(95,18,49,0.14)] sm:p-8">
                <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <h3 className="font-playfair text-3xl font-semibold text-[#23121a]">
                      Coaching Request
                    </h3>
                    <p className="mt-2 font-helvetica text-sm leading-7 text-[#4d3340]">
                      Start here so the site can unlock the next step automatically.
                    </p>
                  </div>
                  {coachingInquiryId && (
                    <span className="rounded-full border border-[#f3bdd1] bg-[#fff8fb] px-4 py-2 text-sm font-semibold text-[#9b2452]">
                      Inquiry ID: {coachingInquiryId}
                    </span>
                  )}
                </div>

                <form onSubmit={handleCoachingIntakeSubmit} className="space-y-5">
                  <div className="grid gap-5 md:grid-cols-2">
                    <div>
                      <label htmlFor="firstName" className="mb-2 block text-sm font-semibold text-[#23121a]">
                        First Name
                      </label>
                      <input
                        id="firstName"
                        name="firstName"
                        value={coachingIntakeForm.firstName}
                        onChange={handleIntakeInputChange}
                        required
                        className="w-full rounded-2xl border border-[#ecc0cf] bg-[#fff9fb] px-4 py-3 text-[#23121a] outline-none transition focus:border-[#F84988] focus:ring-2 focus:ring-[#F84988]/20"
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="mb-2 block text-sm font-semibold text-[#23121a]">
                        Last Name
                      </label>
                      <input
                        id="lastName"
                        name="lastName"
                        value={coachingIntakeForm.lastName}
                        onChange={handleIntakeInputChange}
                        required
                        className="w-full rounded-2xl border border-[#ecc0cf] bg-[#fff9fb] px-4 py-3 text-[#23121a] outline-none transition focus:border-[#F84988] focus:ring-2 focus:ring-[#F84988]/20"
                      />
                    </div>
                  </div>

                  <div className="grid gap-5 md:grid-cols-2">
                    <div>
                      <label htmlFor="email" className="mb-2 block text-sm font-semibold text-[#23121a]">
                        Email
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={coachingIntakeForm.email}
                        onChange={handleIntakeInputChange}
                        required
                        className="w-full rounded-2xl border border-[#ecc0cf] bg-[#fff9fb] px-4 py-3 text-[#23121a] outline-none transition focus:border-[#F84988] focus:ring-2 focus:ring-[#F84988]/20"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="mb-2 block text-sm font-semibold text-[#23121a]">
                        Phone
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={coachingIntakeForm.phone}
                        onChange={handleIntakeInputChange}
                        className="w-full rounded-2xl border border-[#ecc0cf] bg-[#fff9fb] px-4 py-3 text-[#23121a] outline-none transition focus:border-[#F84988] focus:ring-2 focus:ring-[#F84988]/20"
                      />
                    </div>
                  </div>

                  <div className="grid gap-5 md:grid-cols-2">
                    <div>
                      <label
                        htmlFor="serviceInterest"
                        className="mb-2 block text-sm font-semibold text-[#23121a]"
                      >
                        Coaching Focus
                      </label>
                      <select
                        id="serviceInterest"
                        name="serviceInterest"
                        value={coachingIntakeForm.serviceInterest}
                        onChange={handleIntakeInputChange}
                        className="w-full rounded-2xl border border-[#ecc0cf] bg-[#fff9fb] px-4 py-3 text-[#23121a] outline-none transition focus:border-[#F84988] focus:ring-2 focus:ring-[#F84988]/20"
                      >
                        <option>1:1 healing coaching</option>
                        <option>Marriage and relationship coaching</option>
                        <option>Purpose and identity coaching</option>
                        <option>Workshop or group coaching</option>
                      </select>
                    </div>
                    <div>
                      <label
                        htmlFor="preferredSessionType"
                        className="mb-2 block text-sm font-semibold text-[#23121a]"
                      >
                        Session Format
                      </label>
                      <select
                        id="preferredSessionType"
                        name="preferredSessionType"
                        value={coachingIntakeForm.preferredSessionType}
                        onChange={handleIntakeInputChange}
                        className="w-full rounded-2xl border border-[#ecc0cf] bg-[#fff9fb] px-4 py-3 text-[#23121a] outline-none transition focus:border-[#F84988] focus:ring-2 focus:ring-[#F84988]/20"
                      >
                        <option>Virtual</option>
                        <option>In person</option>
                        <option>Either</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="mb-2 block text-sm font-semibold text-[#23121a]">
                      What kind of support do you need?
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={coachingIntakeForm.message}
                      onChange={handleIntakeInputChange}
                      required
                      className="w-full rounded-[1.5rem] border border-[#ecc0cf] bg-[#fff9fb] px-4 py-3 text-[#23121a] outline-none transition focus:border-[#F84988] focus:ring-2 focus:ring-[#F84988]/20"
                    />
                  </div>

                  <div className="space-y-3 rounded-[1.5rem] border border-[#f2d7a4] bg-[#fff8e8] p-4">
                    <label className="flex items-start gap-3 text-sm leading-7 text-[#4e3420]">
                      <input
                        type="checkbox"
                        name="termsAccepted"
                        checked={coachingIntakeForm.termsAccepted}
                        onChange={handleIntakeInputChange}
                        className="mt-1 h-4 w-4 rounded border-[#d7ab57] text-[#F84988] focus:ring-[#F84988]"
                      />
                      I accept the SueLyn Empowered Living terms, privacy expectations, and consent
                      to continue into the coaching workflow.
                    </label>
                    <label className="flex items-start gap-3 text-sm leading-7 text-[#4e3420]">
                      <input
                        type="checkbox"
                        name="communicationsOptIn"
                        checked={coachingIntakeForm.communicationsOptIn}
                        onChange={handleIntakeInputChange}
                        className="mt-1 h-4 w-4 rounded border-[#d7ab57] text-[#F84988] focus:ring-[#F84988]"
                      />
                      I’m open to follow-up communication about sessions, scheduling, and coaching
                      updates.
                    </label>
                  </div>

                  {coachingError && (
                    <div className="rounded-2xl border border-[#f3bdd1] bg-[#fff5f8] px-4 py-3 text-sm text-[#8d2a52]">
                      {coachingError}
                    </div>
                  )}

                  {intakeMessage && (
                    <div className="rounded-2xl border border-[#cfe8c8] bg-[#f5fff1] px-4 py-3 text-sm text-[#2d5b2a]">
                      {intakeMessage}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmittingIntake}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#111111] px-6 py-4 font-helvetica text-sm font-semibold text-white transition hover:bg-[#F84988] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:text-base"
                  >
                    {isSubmittingIntake ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Starting Your Workflow
                      </>
                    ) : (
                      <>
                        Continue to Assessment
                        <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </button>
                </form>
              </div>

              {showAssessmentForm && (
                <div className="rounded-[2rem] border border-[#f3c473] bg-white/95 p-6 shadow-[0_24px_80px_rgba(95,18,49,0.14)] sm:p-8">
                  <div className="mb-6">
                    <h3 className="font-playfair text-3xl font-semibold text-[#23121a]">
                      New Client Assessment Form
                    </h3>
                    <p className="mt-2 font-helvetica text-sm leading-7 text-[#4d3340]">
                      This step opens automatically after the coaching request so the client can keep
                      moving without waiting on manual follow-up.
                    </p>
                  </div>

                  <form onSubmit={handleAssessmentSubmit} className="space-y-5">
                    <div>
                      <label
                        htmlFor="primaryChallenge"
                        className="mb-2 block text-sm font-semibold text-[#23121a]"
                      >
                        What is the main challenge you want coaching support with?
                      </label>
                      <textarea
                        id="primaryChallenge"
                        name="primaryChallenge"
                        rows={4}
                        value={coachingAssessmentForm.primaryChallenge}
                        onChange={handleAssessmentInputChange}
                        required
                        className="w-full rounded-[1.5rem] border border-[#ecc0cf] bg-[#fff9fb] px-4 py-3 text-[#23121a] outline-none transition focus:border-[#F84988] focus:ring-2 focus:ring-[#F84988]/20"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="desiredOutcome"
                        className="mb-2 block text-sm font-semibold text-[#23121a]"
                      >
                        What breakthrough or outcome are you believing for?
                      </label>
                      <textarea
                        id="desiredOutcome"
                        name="desiredOutcome"
                        rows={4}
                        value={coachingAssessmentForm.desiredOutcome}
                        onChange={handleAssessmentInputChange}
                        required
                        className="w-full rounded-[1.5rem] border border-[#ecc0cf] bg-[#fff9fb] px-4 py-3 text-[#23121a] outline-none transition focus:border-[#F84988] focus:ring-2 focus:ring-[#F84988]/20"
                      />
                    </div>

                    <div className="grid gap-5 md:grid-cols-2">
                      <div>
                        <label
                          htmlFor="preferredTiming"
                          className="mb-2 block text-sm font-semibold text-[#23121a]"
                        >
                          Preferred Scheduling Window
                        </label>
                        <select
                          id="preferredTiming"
                          name="preferredTiming"
                          value={coachingAssessmentForm.preferredTiming}
                          onChange={handleAssessmentInputChange}
                          className="w-full rounded-2xl border border-[#ecc0cf] bg-[#fff9fb] px-4 py-3 text-[#23121a] outline-none transition focus:border-[#F84988] focus:ring-2 focus:ring-[#F84988]/20"
                        >
                          <option>Weekday mornings</option>
                          <option>Weekday afternoons</option>
                          <option>Weekday evenings</option>
                          <option>Weekends</option>
                          <option>Flexible</option>
                        </select>
                      </div>
                      <div>
                        <label
                          htmlFor="priorCoachingExperience"
                          className="mb-2 block text-sm font-semibold text-[#23121a]"
                        >
                          Prior Coaching Experience
                        </label>
                        <select
                          id="priorCoachingExperience"
                          name="priorCoachingExperience"
                          value={coachingAssessmentForm.priorCoachingExperience}
                          onChange={handleAssessmentInputChange}
                          className="w-full rounded-2xl border border-[#ecc0cf] bg-[#fff9fb] px-4 py-3 text-[#23121a] outline-none transition focus:border-[#F84988] focus:ring-2 focus:ring-[#F84988]/20"
                        >
                          <option>This is my first time</option>
                          <option>I have done a little coaching before</option>
                          <option>I have done coaching before</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid gap-5 md:grid-cols-2">
                      <div>
                        <label
                          htmlFor="sessionCommitment"
                          className="mb-2 block text-sm font-semibold text-[#23121a]"
                        >
                          Readiness to Start
                        </label>
                        <select
                          id="sessionCommitment"
                          name="sessionCommitment"
                          value={coachingAssessmentForm.sessionCommitment}
                          onChange={handleAssessmentInputChange}
                          className="w-full rounded-2xl border border-[#ecc0cf] bg-[#fff9fb] px-4 py-3 text-[#23121a] outline-none transition focus:border-[#F84988] focus:ring-2 focus:ring-[#F84988]/20"
                        >
                          <option>Ready to begin now</option>
                          <option>Within the next 30 days</option>
                          <option>I am praying about timing</option>
                        </select>
                      </div>
                      <div>
                        <label
                          htmlFor="prayerFocus"
                          className="mb-2 block text-sm font-semibold text-[#23121a]"
                        >
                          Prayer Focus
                        </label>
                        <input
                          id="prayerFocus"
                          name="prayerFocus"
                          value={coachingAssessmentForm.prayerFocus}
                          onChange={handleAssessmentInputChange}
                          className="w-full rounded-2xl border border-[#ecc0cf] bg-[#fff9fb] px-4 py-3 text-[#23121a] outline-none transition focus:border-[#F84988] focus:ring-2 focus:ring-[#F84988]/20"
                        />
                      </div>
                    </div>

                    {assessmentError && (
                      <div className="rounded-2xl border border-[#f3bdd1] bg-[#fff5f8] px-4 py-3 text-sm text-[#8d2a52]">
                        {assessmentError}
                      </div>
                    )}

                    {assessmentMessage && (
                      <div className="rounded-2xl border border-[#cfe8c8] bg-[#f5fff1] px-4 py-3 text-sm text-[#2d5b2a]">
                        {assessmentMessage}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={isSubmittingAssessment}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#F84988] px-6 py-4 font-helvetica text-sm font-semibold text-white transition hover:bg-[#d83c75] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:text-base"
                    >
                      {isSubmittingAssessment ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Submitting Assessment
                        </>
                      ) : (
                        <>
                          Unlock Scheduling and Payment
                          <ArrowRight className="h-4 w-4" />
                        </>
                      )}
                    </button>
                  </form>
                </div>
              )}

              {showNextSteps && coachingLinks && (
                <div className="rounded-[2rem] border border-[#f3c473] bg-[#23121a] p-6 text-white shadow-[0_28px_80px_rgba(63,32,4,0.25)] sm:p-8">
                  <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <h3 className="font-playfair text-3xl font-semibold">Next Steps</h3>
                      <p className="mt-2 font-helvetica text-sm leading-7 text-white/85">
                        The assessment is in. The client can move directly to the next action.
                      </p>
                    </div>
                    <span className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white/90">
                      Inquiry ID: {coachingInquiryId}
                    </span>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    {coachingLinks.schedulingUrl && (
                      <a
                        href={coachingLinks.schedulingUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5 transition hover:bg-white/10"
                      >
                        <div className="mb-3 flex items-center gap-3 text-[#ffd179]">
                          <CalendarDays className="h-5 w-5" />
                          <span className="font-semibold">
                            {usingFallbackLinks ? "Request Scheduling Link" : "Schedule Session"}
                          </span>
                        </div>
                        <p className="font-helvetica text-sm leading-7 text-white/85">
                          {usingFallbackLinks
                            ? "If your live scheduler is not connected yet, this opens a prefilled request so the scheduling handoff stays quick."
                            : "Open the scheduling page and secure the right time without waiting for a manual reply."}
                        </p>
                      </a>
                    )}

                    {coachingLinks.paymentUrl && (
                      <a
                        href={coachingLinks.paymentUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-[1.5rem] border border-[#ffd179] bg-[#fff4dd] p-5 text-[#22140d] transition hover:bg-[#ffe8b8]"
                      >
                        <div className="mb-3 flex items-center gap-3 text-[#7a4b00]">
                          <HandCoins className="h-5 w-5" />
                          <span className="font-semibold">
                            {usingFallbackLinks ? "Request Payment Link" : "Make Payment"}
                          </span>
                        </div>
                        <p className="font-helvetica text-sm leading-7 text-[#4e3420]">
                          {usingFallbackLinks
                            ? "A direct checkout URL is not configured yet, so this button requests the payment link with the inquiry ID already included."
                            : "Open the payment page and complete checkout right after scheduling."}
                        </p>
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="relative mt-[-8%] overflow-hidden bg-[#ffb545] px-4 pb-16 pt-24">
        <div className="container relative z-10 mx-auto max-w-5xl text-center">
          <h3 className="font-playfair text-3xl font-semibold text-[#23121a] sm:text-4xl md:text-5xl">
            Join The Empowered Space
          </h3>
          <p className="mx-auto mt-4 max-w-3xl font-playfair text-lg text-[#4e3420] sm:text-2xl">
            Your healing is holy. Your voice is needed. Your purpose is still alive.
          </p>

          <div className="mx-auto mt-8 max-w-4xl">
            <div className="grid gap-4 md:grid-cols-2">
              <input
                type="text"
                placeholder="Name"
                className="rounded-2xl border border-white/40 bg-black/70 px-6 py-4 text-base text-white placeholder:text-white/70 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <input
                type="email"
                placeholder="Email"
                className="rounded-2xl border border-white/40 bg-black/70 px-6 py-4 text-base text-white placeholder:text-white/70 focus:outline-none focus:ring-2 focus:ring-white"
              />
            </div>
            <button className="mt-5 rounded-full bg-black px-8 py-4 font-inter text-base text-white transition hover:bg-[#7a4b00]">
              Join the Empowered Space
            </button>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 left-1/2 h-screen w-screen -translate-x-1/2 transform">
            <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" fill="none">
              <defs>
                <linearGradient id="flippedGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#FFAC24" />
                  <stop offset="50%" stopColor="#F84988" />
                  <stop offset="100%" stopColor="#F84988" />
                </linearGradient>
              </defs>
              <path d="M0 0 L0 40 Q50 80 100 40 L100 0 Z" fill="url(#flippedGradient)" />
            </svg>
          </div>

          <div className="relative z-10 container mx-auto mt-[-50px] px-4">
            <div className="mb-[5%] text-center">
              <h3 className="mt-[5%] font-playfair text-4xl font-normal leading-none text-white sm:text-5xl md:text-6xl lg:text-5xl xl:text-5xl">
                The Bible Is The Manual For Life
              </h3>
              <p className="mx-auto mt-5 max-w-4xl font-playfair text-lg font-normal leading-tight text-white sm:text-xl md:text-3xl lg:text-3xl">
                &quot;This is what it looks like to live it out, everyday.&quot;
              </p>
            </div>

            <div className="flex justify-center gap-1 overflow-x-auto pb-4">
              {footerPictures.map((picture, index) => (
                <img
                  key={picture}
                  src={picture}
                  alt={`SueLyn gallery ${index + 1}`}
                  className="h-[25rem] w-60 flex-shrink-0 rounded-lg border-2 border-white object-contain"
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
