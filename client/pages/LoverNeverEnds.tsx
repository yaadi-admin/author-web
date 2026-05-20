import Header from "../components/Header";
import Footer from "./footer";
import {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from "react";
import { submitContactForm } from "../lib/contact";
import { addRegistration } from "../data/registrations";
import { toast } from "../hooks/use-toast";
import { useCountdown } from "../hooks/use-countdown";
import { RETREAT_DATE, REGISTRATION_LINKS } from "../lib/retreat-config";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { speakingReviews } from "../data/reviews";

/* ------------------------------------------------------------------ */
/*  DATA                                                              */
/* ------------------------------------------------------------------ */

interface Speaker {
  name: string;
  title: string;
  sessionTitle: string;
  focus: string;
  bio: string;
  color: string;
}

const speakers: Speaker[] = [
  {
    name: "Coach SueLyn",
    title: "Visionary & Host",
    sessionTitle: "Divine Design for Couples",
    focus: "Purpose-driven partnership and spiritual alignment in marriage.",
    bio: "Suzanna D. Griffiths is a certified leader, faith-fueled mentor, and bold storyteller called to help individuals heal, rise, and walk in wholeness while enjoying fulfilling relationships and marriage.",
    color: "#F84988",
  },
  {
    name: "Bishop Dr. Carla Dunbar",
    title: "Featured Voice",
    sessionTitle: "Session details coming soon",
    focus: "Powerful teachings on faith, family, and Kingdom relationships.",
    bio: "Bishop Dr. Carla Dunbar brings decades of ministry leadership and a passion for seeing families thrive through faith-centered principles.",
    color: "#FFAC24",
  },
  {
    name: "Chantaeu Munroe",
    title: "Trauma-Informed Specialist",
    sessionTitle: "Restored From Within: The Healing That Rebuilds Your Marriage",
    focus: "What You Haven't Healed Is Still Showing Up",
    bio: "Chantaeu Munroe, Author of Layers of Healing: Discovering Purpose in Pain and Trauma, is a Certified Trauma-Informed and Christian Life Coach, and the CEO & Founder of CKM Healing Consultancy. She empowers organizations, individuals, and families to heal from trauma and break destructive cycles through faith-based, holistic approaches.",
    color: "#8B5CF6",
  },
  {
    name: "Coach Terri Samy",
    title: "Featured Voice",
    sessionTitle: "Session details coming soon",
    focus: "Practical relationship tools and coaching for lasting transformation.",
    bio: "Coach Terri Samy is a dedicated relationship coach committed to helping couples build strong, healthy, and purpose-filled partnerships.",
    color: "#10B981",
  },
];

interface PackageOption {
  name: string;
  price: string;
  badge?: string;
  features: string[];
  highlighted?: boolean;
}

const packages: PackageOption[] = [
  {
    name: "Online Experience Pass",
    price: "$150 USD",
    features: [
      "Full virtual access to all 4 days",
      "Session recordings",
      "Retreat materials",
      "SueLyn Empowered Community access",
    ],
  },
  {
    name: "Online + 2 Coaching Sessions",
    price: "$250 USD",
    badge: "Most Popular",
    highlighted: true,
    features: [
      "Everything in the Online Experience Pass",
      "Two personalized coaching sessions",
    ],
  },
  {
    name: "Transformation Experience",
    price: "$500 USD",
    features: [
      "Everything in the Online Experience Pass",
      "Four personalized coaching sessions",
      "A copy of B.A.N.T.T.E. (Build a Nation Not Two Empires)",
    ],
  },
  {
    name: "One-Day In-Person",
    price: "$650 USD",
    features: [
      "One day in-person access",
      "Meals included",
      "Session materials",
      "Activities",
    ],
  },
  {
    name: "Full In-Person Retreat",
    price: "$2,600 USD + $180 Registration Fee",
    badge: "Premium Experience",
    features: [
      "4 Days / 3 Nights accommodation",
      "All meals included",
      "Full retreat access",
      "Exclusive retreat bonuses",
    ],
  },
  {
    name: "Church Group Virtual",
    price: "$100,000 JMD",
    features: [
      "Virtual access for 10 persons",
      "Group participation experience",
      "Retreat materials",
    ],
  },
];

const faqs = [
  {
    question: "Is this experience faith-based?",
    answer:
      "Yes. Faith-centered principles will be incorporated throughout the experience, creating a sacred space for spiritual, emotional, and relational growth.",
  },
  {
    question: "What is the registration fee?",
    answer:
      "Singles Registration is $100 USD and Couples Registration is $180 USD. This secures your spot and covers your initial retreat access.",
  },
  {
    question: "Is the registration fee non-refundable?",
    answer:
      "Yes, the registration fee is non-refundable. Please review our full Retreat Policies & Terms section for complete details.",
  },
  {
    question: "Are payment plans available?",
    answer:
      "Yes. Payment plans are available for the Full In-Person Retreat package. For other packages, contact the SueLyn Empowered Living team to discuss possible arrangements. All payments are due by August 31st, 2026.",
  },
  {
    question: "Which packages will allow payment plans?",
    answer:
      "Payment plans are primarily available for the Full In-Person Retreat package. Contact our team after registration to discuss personalized payment arrangements for other packages.",
  },
  {
    question: "What payment methods will be accepted?",
    answer:
      "We accept all major debit and credit cards, PayPal, bank transfer, Lynk, and other secure payment methods through our payment portal.",
  },
  {
    question: "Does the NDA need to be signed before payment plan details are shared, or after?",
    answer:
      "We recommend the following flow: complete your registration fee first, then fill out the retreat form and sign the NDA. Payment plan details will be shared after these steps are completed.",
  },
  {
    question: "Will recordings be available?",
    answer:
      "Yes. Online attendees will receive access to session recordings so you can revisit the teachings at your own pace.",
  },
  {
    question: "Is accommodation included in all packages?",
    answer:
      "Accommodation is only included in the Full In-Person Retreat package. The One-Day In-Person Experience includes meals and activities but does not include overnight accommodation.",
  },
  {
    question: "Can I upgrade my package later?",
    answer:
      "Yes, subject to availability. Contact the SueLyn Empowered Living team to discuss upgrade options.",
  },
  {
    question: "What is the refund policy?",
    answer:
      "Registration fees are non-refundable. Please review our full Retreat Policies & Terms section for complete details.",
  },
];

const audienceList = [
  { label: "Married & Engaged Couples", icon: "💍" },
  { label: "Couples Seeking Restoration", icon: "🤝" },
  { label: "Parents", icon: "🏠" },
  { label: "Church Leaders & Family Ministry", icon: "⛪" },
  { label: "Police Officers & Counselors", icon: "🛡️" },
  { label: "Individuals Desiring Healthier Patterns", icon: "🌱" },
];

const experienceFeatures = [
  "Transformational Teaching Sessions",
  "Healing & Restoration Conversations",
  "Guided Couple Exercises",
  "Coaching & Reflection Moments",
  "Community & Connection",
  "Spiritual & Emotional Alignment",
  "Practical Relationship Tools",
];

/* ------------------------------------------------------------------ */
/*  COMPONENT                                                         */
/* ------------------------------------------------------------------ */

export default function LoverNeverEnds() {
  const countdown = useCountdown(RETREAT_DATE);
  const [scrollY, setScrollY] = useState(0);

  /* Review carousel state */
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const resumeAutoScrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* Form state */
  const [formData, setFormData] = useState({
    fullName: "",
    partnerName: "",
    email: "",
    phone: "",
    packageSelection: "",
    emergencyContact: "",
    paymentPlanRequest: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  /* Scroll tracking */
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* Review carousel */
  useEffect(() => {
    if (!isAutoScrolling) return;
    const interval = setInterval(() => {
      setCurrentReviewIndex((prev) => (prev + 1) % speakingReviews.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoScrolling]);

  const nextReview = useCallback(() => {
    setIsAutoScrolling(false);
    setCurrentReviewIndex((prev) => (prev + 1) % speakingReviews.length);
    if (resumeAutoScrollTimeoutRef.current) clearTimeout(resumeAutoScrollTimeoutRef.current);
    resumeAutoScrollTimeoutRef.current = setTimeout(() => setIsAutoScrolling(true), 10000);
  }, []);

  const prevReview = useCallback(() => {
    setIsAutoScrolling(false);
    setCurrentReviewIndex(
      (prev) => (prev - 1 + speakingReviews.length) % speakingReviews.length
    );
    if (resumeAutoScrollTimeoutRef.current) clearTimeout(resumeAutoScrollTimeoutRef.current);
    resumeAutoScrollTimeoutRef.current = setTimeout(() => setIsAutoScrolling(true), 10000);
  }, []);

  /* Form handlers */
  const handleFormChange = useCallback(
    (field: string, value: string) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
    },
    []
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!formData.fullName.trim() || !formData.email.trim()) {
        toast({
          title: "Missing Information",
          description: "Please fill in your full name and email address.",
          variant: "destructive",
        });
        return;
      }
      if (!formData.packageSelection) {
        toast({
          title: "Package Required",
          description: "Please select a retreat package.",
          variant: "destructive",
        });
        return;
      }

      setIsSubmitting(true);
      try {
        // Persist to Firestore first
        await addRegistration({
          fullName: formData.fullName,
          partnerName: formData.partnerName || undefined,
          email: formData.email,
          phone: formData.phone || undefined,
          packageSelection: formData.packageSelection,
          emergencyContact: formData.emergencyContact || undefined,
          paymentPlanRequest: formData.paymentPlanRequest || undefined,
          source: "Lover Never Ends Retreat Registration",
        });

        const messageBody = [
          `Full Name: ${formData.fullName}`,
          `Spouse/Partner Name: ${formData.partnerName || "Not provided"}`,
          `Phone: ${formData.phone || "Not provided"}`,
          `Package: ${formData.packageSelection}`,
          `Emergency Contact: ${formData.emergencyContact || "Not provided"}`,
          `Payment Plan Request: ${formData.paymentPlanRequest || "Not requested"}`,
        ].join("\n");

        await submitContactForm({
          name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          title: "Lover Never Ends Retreat Registration",
          source: "Retreat Registration Form",
          message: messageBody,
        });

        toast({
          title: "Registration Submitted",
          description:
            "Thank you! We have received your registration and will contact you shortly with next steps.",
        });

        setFormData({
          fullName: "",
          partnerName: "",
          email: "",
          phone: "",
          packageSelection: "",
          emergencyContact: "",
          paymentPlanRequest: "",
        });
      } catch (error) {
        toast({
          title: "Submission Failed",
          description:
            error instanceof Error
              ? error.message
              : "Failed to submit registration. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsSubmitting(false);
      }
    },
    [formData]
  );

  const scrollToRegistration = useCallback(() => {
    const el = document.getElementById("registration-form");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }, []);

  const scrollToPackages = useCallback(() => {
    const el = document.getElementById("packages");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }, []);

  /* Marquee text */
  const marqueeText = useMemo(() => "LOVER NEVER ENDS ".repeat(60), []);

  return (
    <div className="bg-gradient-to-b from-[#FFE4EE] via-[#FFE4EE] to-[#FFE4EE] overflow-x-hidden">
      <Header whiteText={true} />

      {/* ===================== HERO ===================== */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 w-full h-[120%]"
            style={{
              backgroundImage:
                "url(https://firebasestorage.googleapis.com/v0/b/suelyn-e82e4.firebasestorage.app/o/1X1A0235.jpg?alt=media&token=a5612b0e-c68f-428f-8179-e9f4fdeee5ff)",
              backgroundSize: "cover",
              backgroundPosition: "center 30%",
              transform: `translateY(${scrollY * 0.3}px)`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
        </div>

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto pt-24 pb-16">
          <p className="font-playfair text-sm sm:text-base md:text-lg text-white/80 tracking-widest uppercase mb-4">
            A Divine Design Experience
          </p>
          <h1 className="font-charm text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-white leading-none mb-4">
            Lover Never Ends
          </h1>
          <h2 className="font-playfair text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white/90 font-medium mb-6">
            A Healing, Restoration & Alignment Reset for Couples
          </h2>
          <p className="font-helvetica text-base sm:text-lg md:text-xl text-white/80 leading-relaxed max-w-3xl mx-auto mb-10">
            Whether you are rebuilding, reconnecting, healing, or simply seeking
            deeper alignment in your relationship, this experience is designed to
            pour back into you both intentionally — spiritually, emotionally, and
            relationally.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={scrollToRegistration}
              className="bg-suelyn-pink text-white px-8 py-4 rounded-full font-inter font-semibold text-base sm:text-lg hover:bg-suelyn-pink/90 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Reserve Your Spot
            </button>
            <button
              onClick={scrollToPackages}
              className="bg-white/10 backdrop-blur-sm text-white border border-white/30 px-8 py-4 rounded-full font-inter font-semibold text-base sm:text-lg hover:bg-white/20 transition-all"
            >
              View Packages
            </button>
          </div>

          {/* Countdown */}
          <div className="mt-12 sm:mt-16">
            <p className="font-playfair text-white/70 text-sm uppercase tracking-widest mb-4">
              Experience begins in
            </p>
            <div className="flex justify-center gap-3 sm:gap-6">
              {[
                { value: countdown.days, label: "Days" },
                { value: countdown.hours, label: "Hours" },
                { value: countdown.minutes, label: "Minutes" },
                { value: countdown.seconds, label: "Seconds" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 sm:px-6 sm:py-4 min-w-[70px] sm:min-w-[90px]"
                >
                  <div className="font-playfair text-2xl sm:text-3xl md:text-4xl font-bold text-white">
                    {String(item.value).padStart(2, "0")}
                  </div>
                  <div className="font-inter text-xs sm:text-sm text-white/60 uppercase tracking-wider">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===================== FLYER SHOWCASE ===================== */}
      <section className="py-12 sm:py-16 md:py-20 px-4 bg-gradient-to-b from-[#FFE4EE] to-[#F1E6DB]">
        <div className="container mx-auto max-w-4xl">
          <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl shadow-2xl ring-4 ring-white/20">
            <img
              src="/Lover-never-ends-flyer.jpeg"
              alt="Lover Never Ends Retreat Flyer"
              className="w-full h-auto object-cover"
              loading="eager"
            />
          </div>
          <p className="text-center font-inter text-sm text-black/50 mt-4">
            October 19, 2026 · A Divine Design Experience for Couples
          </p>
        </div>
      </section>

      {/* ===================== ABOUT ===================== */}
      <section className="py-16 sm:py-20 md:py-28 px-4 bg-gradient-to-b from-[#F1E6DB] to-[#F1E6DB]">
        <div className="container mx-auto max-w-4xl text-center">
          <p className="font-playfair text-suelyn-pink text-sm sm:text-base uppercase tracking-widest mb-4">
            About The Experience
          </p>
          <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-8 leading-tight">
            More Than a Retreat.
            <br />
            <span className="text-suelyn-pink">A Sacred Space.</span>
          </h2>
          <p className="font-helvetica text-base sm:text-lg md:text-xl text-black/70 leading-relaxed mb-6">
            <em className="font-playfair">Lover Never Ends: A Divine Design Experience</em> is
            intentionally created for couples to pause, reconnect, heal, and realign.
          </p>
          <p className="font-helvetica text-base sm:text-lg md:text-xl text-black/70 leading-relaxed mb-6">
            Through powerful sessions, guided conversations, transformational teachings,
            coaching, reflection moments, and community, couples will experience practical
            tools and emotional breakthroughs designed to strengthen both individual healing
            and relational growth.
          </p>
          <p className="font-helvetica text-base sm:text-lg md:text-xl text-black/70 leading-relaxed">
            Whether attending virtually or in person, each participant will walk away with
            renewed clarity, deeper connection, and actionable strategies to nurture healthier
            relationships.
          </p>
        </div>
      </section>

      {/* ===================== WHO THIS IS FOR ===================== */}
      <section className="py-16 sm:py-20 md:py-28 px-4 bg-gradient-to-b from-[#F1E6DB] to-[#FFE4EE]">
        <div className="container mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <p className="font-playfair text-suelyn-pink text-sm sm:text-base uppercase tracking-widest mb-4">
              Who Is This For?
            </p>
            <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-black">
              Designed For Every Stage
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
            {audienceList.map((item) => (
              <div
                key={item.label}
                className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 sm:p-8 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-white/50"
              >
                <div className="text-4xl sm:text-5xl mb-4">{item.icon}</div>
                <h3 className="font-playfair text-lg sm:text-xl font-bold text-black">
                  {item.label}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== WHAT YOU'LL EXPERIENCE ===================== */}
      <section className="py-16 sm:py-20 md:py-28 px-4 bg-gradient-to-b from-[#FFE4EE] to-[#FFE4EE]">
        <div className="container mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <p className="font-playfair text-suelyn-pink text-sm sm:text-base uppercase tracking-widest mb-4">
              The Experience
            </p>
            <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-black">
              What You&apos;ll Experience
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
            {experienceFeatures.map((feature) => (
              <div
                key={feature}
                className="flex items-start gap-4 bg-white/50 rounded-xl p-5 sm:p-6 border border-white/60"
              >
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-suelyn-pink flex items-center justify-center mt-0.5">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <span className="font-helvetica text-base sm:text-lg text-black/80 leading-snug">
                  {feature}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== FEATURED VOICES ===================== */}
      <section className="py-16 sm:py-20 md:py-28 px-4 bg-gradient-to-b from-[#FFE4EE] to-[#F1E6DB]">
        <div className="container mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <p className="font-playfair text-suelyn-pink text-sm sm:text-base uppercase tracking-widest mb-4">
              Meet The Voices
            </p>
            <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-black">
              Featured Voices
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 max-w-5xl mx-auto">
            {speakers.map((speaker) => (
              <div
                key={speaker.name}
                className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-white/60 hover:shadow-xl transition-all duration-300"
              >
                {/* Placeholder headshot */}
                <div
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-full mx-auto mb-5 flex items-center justify-center text-white font-playfair text-2xl sm:text-3xl font-bold shadow-lg"
                  style={{ backgroundColor: speaker.color }}
                >
                  {speaker.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div className="text-center mb-4">
                  <h3 className="font-playfair text-xl sm:text-2xl font-bold text-black">
                    {speaker.name}
                  </h3>
                  <p className="font-inter text-sm text-suelyn-pink font-semibold uppercase tracking-wider mt-1">
                    {speaker.title}
                  </p>
                </div>
                <div className="mb-4">
                  <p className="font-inter text-xs uppercase tracking-wider text-black/40 mb-1">
                    Session
                  </p>
                  <p className="font-playfair text-base sm:text-lg font-semibold text-black">
                    {speaker.sessionTitle}
                  </p>
                </div>
                {speaker.focus && (
                  <div className="mb-4">
                    <p className="font-inter text-xs uppercase tracking-wider text-black/40 mb-1">
                      Focus
                    </p>
                    <p className="font-helvetica text-sm sm:text-base text-black/70 italic">
                      &ldquo;{speaker.focus}&rdquo;
                    </p>
                  </div>
                )}
                <p className="font-helvetica text-sm sm:text-base text-black/60 leading-relaxed">
                  {speaker.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== PACKAGES ===================== */}
      <section id="packages" className="py-16 sm:py-20 md:py-28 px-4 bg-gradient-to-b from-[#F1E6DB] to-[#FFE4EE]">
        <div className="container mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <p className="font-playfair text-suelyn-pink text-sm sm:text-base uppercase tracking-widest mb-4">
              Investment
            </p>
            <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-4">
              Package Options
            </h2>
            <p className="font-helvetica text-base sm:text-lg text-black/60 max-w-2xl mx-auto">
              Choose the experience that best fits your journey. Every package includes
              transformational value designed to meet you where you are.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
            {packages.map((pkg) => (
              <div
                key={pkg.name}
                className={`relative rounded-2xl p-6 sm:p-8 border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col ${
                  pkg.highlighted
                    ? "bg-gradient-to-br from-suelyn-pink/10 to-suelyn-purple/10 border-suelyn-pink/30 scale-[1.02]"
                    : "bg-white/60 border-white/60"
                }`}
              >
                {pkg.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-suelyn-pink text-white text-xs font-inter font-bold uppercase tracking-wider px-4 py-1 rounded-full shadow-md">
                    {pkg.badge}
                  </div>
                )}
                <h3 className="font-playfair text-xl sm:text-2xl font-bold text-black mb-2">
                  {pkg.name}
                </h3>
                <p className="font-playfair text-2xl sm:text-3xl font-bold text-suelyn-pink mb-6">
                  {pkg.price}
                </p>
                <ul className="space-y-3 mb-8 flex-1">
                  {pkg.features.map((f) => (
                    <li key={f} className="flex items-start gap-3">
                      <svg
                        className="w-5 h-5 text-suelyn-pink flex-shrink-0 mt-0.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="font-helvetica text-sm sm:text-base text-black/70">
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={scrollToRegistration}
                  className={`w-full py-3 rounded-full font-inter font-semibold text-sm sm:text-base transition-all ${
                    pkg.highlighted
                      ? "bg-suelyn-pink text-white hover:bg-suelyn-pink/90 shadow-lg"
                      : "bg-black/5 text-black hover:bg-black/10"
                  }`}
                >
                  Select Package
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== WHAT MAKES THIS DIFFERENT ===================== */}
      <section className="py-16 sm:py-20 md:py-28 px-4 bg-gradient-to-b from-[#FFE4EE] to-[#F1E6DB]">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-gradient-to-br from-suelyn-pink to-suelyn-purple rounded-3xl p-8 sm:p-12 md:p-16 text-white text-center shadow-2xl">
            <p className="font-playfair text-white/80 text-sm sm:text-base uppercase tracking-widest mb-4">
              Why This Experience?
            </p>
            <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
              What Makes This Different?
            </h2>
            <p className="font-helvetica text-base sm:text-lg md:text-xl leading-relaxed text-white/90 max-w-3xl mx-auto mb-6">
              This is not just another relationship seminar.
            </p>
            <p className="font-helvetica text-base sm:text-lg md:text-xl leading-relaxed text-white/90 max-w-3xl mx-auto">
              <em className="font-playfair">Lover Never Ends</em> combines transformational
              teaching, coaching support, guided reflection, healing conversations, practical
              relationship tools, and immersive experiences designed to create long-lasting
              impact for couples.
            </p>
          </div>
        </div>
      </section>

      {/* ===================== WHY THIS MATTERS ===================== */}
      <section className="py-16 sm:py-20 md:py-28 px-4 bg-gradient-to-b from-[#F1E6DB] to-[#FFE4EE]">
        <div className="container mx-auto max-w-4xl text-center">
          <p className="font-playfair text-suelyn-pink text-sm sm:text-base uppercase tracking-widest mb-4">
            The Heart Behind It
          </p>
          <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-8">
            Why This Experience Matters
          </h2>
          <p className="font-helvetica text-base sm:text-lg md:text-xl text-black/70 leading-relaxed mb-6">
            Relationships require intentional investment.
          </p>
          <p className="font-helvetica text-base sm:text-lg md:text-xl text-black/70 leading-relaxed mb-6">
            In the middle of life, responsibilities, emotional wounds, and daily pressures,
            couples often lose connection — not because love disappeared, but because healing,
            communication, and alignment were neglected.
          </p>
          <p className="font-helvetica text-base sm:text-lg md:text-xl text-black/70 leading-relaxed">
            This experience was created to help couples reconnect with themselves, with each
            other, and with the divine design intended for healthy relationships.
          </p>
        </div>
      </section>

      {/* ===================== TESTIMONIALS ===================== */}
      <section className="relative overflow-hidden min-h-[70vh] flex items-center">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url(https://firebasestorage.googleapis.com/v0/b/suelyn-e82e4.firebasestorage.app/o/1X1A0004.jpg?alt=media&token=24696ff6-d7d5-4598-b0df-b2828b939062)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/80 to-black/70" />
        <div className="relative z-10 container mx-auto px-4 py-12 md:py-24">
          <div className="text-center mb-8 md:mb-12">
            <p className="font-playfair text-white/70 text-sm uppercase tracking-widest mb-2">
              Testimonials
            </p>
            <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl font-bold text-white">
              Words That Inspire
            </h2>
          </div>
          <div className="relative min-h-[300px] md:min-h-[400px] flex items-center">
            <button
              onClick={prevReview}
              className="absolute left-2 md:left-8 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all backdrop-blur-sm border border-white/20"
              aria-label="Previous review"
            >
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <div className="max-w-4xl mx-auto px-12 md:px-24 text-center transition-all duration-700 ease-in-out">
              <p className="font-playfair text-lg sm:text-xl md:text-2xl lg:text-3xl text-white font-medium leading-relaxed mb-6 md:mb-8">
                &ldquo;{speakingReviews[currentReviewIndex].quote}&rdquo;
              </p>
              <div className="font-playfair text-lg sm:text-xl text-white">
                <p className="font-bold mb-1">
                  — {speakingReviews[currentReviewIndex].name}
                </p>
                {speakingReviews[currentReviewIndex].role &&
                  speakingReviews[currentReviewIndex].company && (
                    <p className="text-sm md:text-base opacity-80">
                      {speakingReviews[currentReviewIndex].role},{" "}
                      {speakingReviews[currentReviewIndex].company}
                    </p>
                  )}
              </div>
            </div>
            <button
              onClick={nextReview}
              className="absolute right-2 md:right-8 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all backdrop-blur-sm border border-white/20"
              aria-label="Next review"
            >
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* ===================== MARQUEE ===================== */}
      <section className="py-8 sm:py-12 bg-gradient-to-b from-[#FFE4EE] to-[#FFE4EE] overflow-hidden">
        <div className="w-full overflow-hidden">
          <div className="animate-marquee whitespace-nowrap">
            <span className="font-playfair text-4xl sm:text-6xl md:text-8xl lg:text-[120px] font-bold text-black/10 leading-tight mx-4">
              {marqueeText}
            </span>
          </div>
        </div>
        <style>{`
          @keyframes marquee-slide {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee {
            animation: marquee-slide 40s linear infinite;
          }
        `}</style>
      </section>

      {/* ===================== FAQ ===================== */}
      <section className="py-16 sm:py-20 md:py-28 px-4 bg-gradient-to-b from-[#FFE4EE] to-[#F1E6DB]">
        <div className="container mx-auto max-w-3xl">
          <div className="text-center mb-12 md:mb-16">
            <p className="font-playfair text-suelyn-pink text-sm sm:text-base uppercase tracking-widest mb-4">
              Got Questions?
            </p>
            <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl font-bold text-black">
              Frequently Asked Questions
            </h2>
          </div>
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="bg-white/60 backdrop-blur-sm rounded-xl px-5 sm:px-6 border border-white/60"
              >
                <AccordionTrigger className="font-playfair text-base sm:text-lg font-semibold text-black text-left hover:no-underline py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="font-helvetica text-sm sm:text-base text-black/70 leading-relaxed pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* ===================== REGISTRATION FORM ===================== */}
      <section
        id="registration-form"
        className="py-16 sm:py-20 md:py-28 px-4 bg-gradient-to-b from-[#F1E6DB] to-[#FFE4EE]"
      >
        <div className="container mx-auto max-w-3xl">
          <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 sm:p-12 md:p-16 border border-white/60 shadow-xl">
            <div className="text-center mb-10">
              <p className="font-playfair text-suelyn-pink text-sm sm:text-base uppercase tracking-widest mb-4">
                Step 1 of 2
              </p>
              <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl font-bold text-black mb-4">
                Share Your Details
              </h2>
              <p className="font-helvetica text-base sm:text-lg text-black/60">
                Let us know who you are and which package you're interested in. Then pay your
                registration fee below to secure your spot.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block font-inter text-sm font-semibold text-black mb-2">
                    Full Name <span className="text-suelyn-pink">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => handleFormChange("fullName", e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-black/10 bg-white/80 font-helvetica text-black focus:outline-none focus:ring-2 focus:ring-suelyn-pink/50 transition-all"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label className="block font-inter text-sm font-semibold text-black mb-2">
                    Spouse / Partner Name
                  </label>
                  <input
                    type="text"
                    value={formData.partnerName}
                    onChange={(e) => handleFormChange("partnerName", e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-black/10 bg-white/80 font-helvetica text-black focus:outline-none focus:ring-2 focus:ring-suelyn-pink/50 transition-all"
                    placeholder="Partner's name"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block font-inter text-sm font-semibold text-black mb-2">
                    Email Address <span className="text-suelyn-pink">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => handleFormChange("email", e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-black/10 bg-white/80 font-helvetica text-black focus:outline-none focus:ring-2 focus:ring-suelyn-pink/50 transition-all"
                    placeholder="you@example.com"
                  />
                </div>
                <div>
                  <label className="block font-inter text-sm font-semibold text-black mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleFormChange("phone", e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-black/10 bg-white/80 font-helvetica text-black focus:outline-none focus:ring-2 focus:ring-suelyn-pink/50 transition-all"
                    placeholder="(555) 123-4567"
                  />
                </div>
              </div>

              <div>
                <label className="block font-inter text-sm font-semibold text-black mb-2">
                  Package Selection <span className="text-suelyn-pink">*</span>
                </label>
                <select
                  required
                  value={formData.packageSelection}
                  onChange={(e) => handleFormChange("packageSelection", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-black/10 bg-white/80 font-helvetica text-black focus:outline-none focus:ring-2 focus:ring-suelyn-pink/50 transition-all appearance-none"
                >
                  <option value="">Select your package</option>
                  {packages.map((pkg) => (
                    <option key={pkg.name} value={pkg.name}>
                      {pkg.name} — {pkg.price}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-inter text-sm font-semibold text-black mb-2">
                  Emergency Contact
                </label>
                <input
                  type="text"
                  value={formData.emergencyContact}
                  onChange={(e) => handleFormChange("emergencyContact", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-black/10 bg-white/80 font-helvetica text-black focus:outline-none focus:ring-2 focus:ring-suelyn-pink/50 transition-all"
                  placeholder="Name and phone number"
                />
              </div>

              <div>
                <label className="block font-inter text-sm font-semibold text-black mb-2">
                  Payment Plan Request
                </label>
                <textarea
                  rows={3}
                  value={formData.paymentPlanRequest}
                  onChange={(e) => handleFormChange("paymentPlanRequest", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-black/10 bg-white/80 font-helvetica text-black focus:outline-none focus:ring-2 focus:ring-suelyn-pink/50 transition-all resize-none"
                  placeholder="Describe your preferred payment arrangement (if applicable)"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-suelyn-pink text-white py-4 rounded-full font-inter font-semibold text-base sm:text-lg hover:bg-suelyn-pink/90 transition-all shadow-lg hover:shadow-xl disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Submitting..." : "Submit My Details"}
              </button>
            </form>

            {/* Step 2: Registration Fee */}
            <div className="mt-10 pt-10 border-t border-black/10">
              <div className="text-center mb-6">
                <p className="font-playfair text-suelyn-pink text-sm sm:text-base uppercase tracking-widest mb-2">
                  Step 2 of 2
                </p>
                <h3 className="font-playfair text-2xl sm:text-3xl font-bold text-black mb-2">
                  Pay Your Registration Fee
                </h3>
                <p className="font-helvetica text-sm sm:text-base text-black/60 max-w-lg mx-auto">
                  This non-refundable fee secures your spot. Package balance is due by August 31st, 2026.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a
                  href={REGISTRATION_LINKS.singles}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto bg-suelyn-pink text-white px-8 py-4 rounded-full font-inter font-semibold text-base sm:text-lg hover:bg-suelyn-pink/90 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-center"
                >
                  Register Here — Singles $100 USD
                </a>
                <a
                  href={REGISTRATION_LINKS.couples}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto bg-[#FFAC24] text-[#111111] px-8 py-4 rounded-full font-inter font-semibold text-base sm:text-lg hover:bg-[#e69920] transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-center"
                >
                  Register Here — Couples $180 USD
                </a>
              </div>

              <p className="text-center font-helvetica text-xs text-black/40 mt-4">
                Registration fee is non-refundable. You'll receive next steps via email within 24 hours.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== PAYMENT PLAN ===================== */}
      <section className="py-16 sm:py-20 md:py-28 px-4 bg-gradient-to-b from-[#FFE4EE] to-[#F1E6DB]">
        <div className="container mx-auto max-w-3xl text-center">
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 sm:p-12 border border-white/60">
            <h3 className="font-playfair text-2xl sm:text-3xl md:text-4xl font-bold text-black mb-6">
              Flexible Payment Options
            </h3>
            <p className="font-helvetica text-base sm:text-lg text-black/70 leading-relaxed mb-4">
              Flexible payment options are available for select packages, making this
              transformational experience more accessible.
            </p>
            <p className="font-helvetica text-base sm:text-lg text-black/70 leading-relaxed mb-6">
              <strong>All payments are due by August 31st, 2026.</strong>
            </p>
            <p className="font-helvetica text-base sm:text-lg text-black/70 leading-relaxed">
              For additional details regarding payment arrangements, please contact the
              SueLyn Empowered Living team directly at{" "}
              <a
                href="mailto:suegriffiths.author@gmail.com"
                className="text-suelyn-pink hover:underline font-semibold"
              >
                suegriffiths.author@gmail.com
              </a>
              .
            </p>
          </div>
        </div>
      </section>

      {/* ===================== POLICIES ===================== */}
      <section className="py-16 sm:py-20 md:py-28 px-4 bg-gradient-to-b from-[#F1E6DB] to-[#FFE4EE]">
        <div className="container mx-auto max-w-3xl">
          <div className="text-center mb-10">
            <h3 className="font-playfair text-2xl sm:text-3xl md:text-4xl font-bold text-black mb-4">
              Retreat Policies & Terms
            </h3>
          </div>
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 sm:p-10 border border-white/60 space-y-4">
            {[
              "Registration fees are non-refundable.",
              "Payment plans must be completed by August 31, 2026.",
              "Speakers and schedule are subject to change if necessary.",
              "Participants consent to event photography and video coverage for promotional purposes.",
              "You will be required to sign an NDA. This will be sent after your registration fee is received and your retreat form is completed.",
            ].map((policy) => (
              <div key={policy} className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-suelyn-pink flex-shrink-0 mt-2" />
                <p className="font-helvetica text-sm sm:text-base text-black/70">{policy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== FINAL CTA ===================== */}
      <section className="py-16 sm:py-20 md:py-28 px-4 bg-gradient-to-b from-[#FFE4EE] to-[#F84988]">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Your Relationship Deserves Intentional Investment
          </h2>
          <p className="font-helvetica text-base sm:text-lg md:text-xl text-white/90 leading-relaxed max-w-3xl mx-auto mb-4">
            This is your opportunity to pause, reconnect, heal, and grow together
            intentionally.
          </p>
          <p className="font-playfair text-xl sm:text-2xl md:text-3xl text-white font-bold mb-10">
            Spaces are limited.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={scrollToRegistration}
              className="bg-white text-suelyn-pink px-10 py-4 rounded-full font-inter font-bold text-base sm:text-lg hover:bg-white/90 transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-0.5"
            >
              Register Now
            </button>
            <a
              href="mailto:suegriffiths.author@gmail.com"
              className="bg-white/10 backdrop-blur-sm text-white border border-white/30 px-10 py-4 rounded-full font-inter font-semibold text-base sm:text-lg hover:bg-white/20 transition-all"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>

      {/* ===================== STICKY MOBILE CTA ===================== */}
      <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-gradient-to-t from-black/80 to-transparent md:hidden">
        <button
          onClick={scrollToRegistration}
          className="w-full bg-suelyn-pink text-white py-3.5 rounded-full font-inter font-bold text-base shadow-xl active:scale-[0.98] transition-transform"
        >
          Reserve Your Spot
        </button>
      </div>

      {/* ===================== FOOTER ===================== */}
      <Footer />
    </div>
  );
}
