import Header from "../components/Header";
import Footer from "./footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";
import {
  coachingFaqs,
  coachingPathways,
  getCoachingRegistrationUrl,
  type CoachingPathway,
  type CoachingPathwayId,
} from "../data/coaching-pathways";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const processSteps = [
  {
    step: "1",
    title: "Select Your Intended Pathway",
    body: "Review the five coaching pathways and identify the one that most closely reflects your current needs and desired outcomes.",
  },
  {
    step: "2",
    title: "Complete the Registration Form",
    body: "Provide your contact information, answer a few introductory questions and indicate the pathway you are interested in pursuing.",
  },
  {
    step: "3",
    title: "Begin with The Identity Reset",
    body: "All clients begin with four 90-minute Identity Reset sessions to establish a healthy foundation for the coaching journey.",
  },
  {
    step: "4",
    title: "Continue Your Transformation",
    body: "After the Identity Reset, you and your coach will determine whether to continue in your selected pathway or pursue another that better supports your needs.",
  },
];

function RegisterButton({
  pathway,
  label,
  className = "",
}: {
  pathway?: CoachingPathwayId | "general";
  label: string;
  className?: string;
}) {
  return (
    <a
      href={getCoachingRegistrationUrl(pathway)}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 rounded-full bg-[#F84988] px-7 py-3.5 font-inter text-sm sm:text-base font-semibold text-white shadow-lg transition-all hover:bg-[#e03a7a] hover:shadow-xl ${className}`}
    >
      {label}
      <ArrowRight className="h-4 w-4" />
    </a>
  );
}

function PathwayCard({ pathway, reverse }: { pathway: CoachingPathway; reverse?: boolean }) {
  return (
    <article
      id={pathway.id}
      className="overflow-hidden rounded-3xl bg-white/70 border border-white/80 shadow-lg"
    >
      <div
        className={`grid lg:grid-cols-2 gap-0 items-stretch ${
          reverse ? "lg:[&>*:first-child]:order-2" : ""
        }`}
      >
        <div className="relative min-h-[280px] lg:min-h-full">
          <img
            src={pathway.image}
            alt={pathway.title}
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-black/10" />
          <div className="absolute bottom-4 left-4 right-4 lg:bottom-6 lg:left-6">
            <span className="inline-flex rounded-full bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#741C82]">
              Pathway {pathway.number}
            </span>
          </div>
        </div>

        <div className="p-6 sm:p-8 lg:p-10 space-y-5">
          <div>
            <h3 className="font-playfair text-2xl sm:text-3xl md:text-4xl font-bold text-black leading-tight">
              {pathway.title}
            </h3>
            <p className="font-playfair text-lg sm:text-xl italic text-[#F84988] mt-2">
              {pathway.tagline}
            </p>
          </div>

          <div>
            <p className="font-helvetica text-xs uppercase tracking-widest text-[#741C82] font-semibold mb-2">
              Ideal For
            </p>
            <p className="font-helvetica text-sm sm:text-base text-black/75 leading-relaxed">
              {pathway.idealFor}
            </p>
          </div>

          <div>
            <p className="font-helvetica text-xs uppercase tracking-widest text-[#741C82] font-semibold mb-3">
              Outcomes
            </p>
            <ul className="space-y-2">
              {pathway.outcomes.map((outcome) => (
                <li
                  key={outcome}
                  className="flex gap-2.5 font-helvetica text-sm sm:text-base text-black/80"
                >
                  <CheckCircle2 className="h-5 w-5 text-[#F84988] flex-shrink-0 mt-0.5" />
                  <span>{outcome}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 rounded-2xl bg-[#FFE4EE]/70 border border-[#F84988]/15 p-4">
            <div>
              <p className="text-xs uppercase tracking-wider text-black/50">Duration</p>
              <p className="font-playfair font-semibold text-black mt-1">{pathway.duration}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-black/50">Session Length</p>
              <p className="font-playfair font-semibold text-black mt-1">{pathway.sessionLength}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-black/50">Investment</p>
              <p className="font-playfair font-semibold text-black mt-1">{pathway.investment}</p>
            </div>
          </div>

          {pathway.note && (
            <p className="font-helvetica text-sm text-black/65 leading-relaxed border-l-4 border-[#741C82]/40 pl-4">
              <span className="font-semibold text-black">Please Note: </span>
              {pathway.note}
            </p>
          )}

          <div className="pt-1">
            <RegisterButton pathway={pathway.id} label={pathway.ctaLabel} />
            {pathway.ctaNote && (
              <p className="mt-3 font-helvetica text-sm text-black/60">{pathway.ctaNote}</p>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

export default function Coaching() {
  return (
    <div className="bg-gradient-to-r from-[#F1E6DB] via-[#E0B2F1] to-[#FFE4EE] min-h-screen">
      <Header whiteText={true} />

      {/* Hero */}
      <section className="relative min-h-[85vh] flex items-end sm:items-center overflow-hidden pt-24 pb-16">
        <div className="absolute inset-0 z-0">
          <img
            src="/coaching/hero.jpg"
            alt="Strategic Coaching Pathways"
            className="w-full h-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/45 to-black/70" />
        </div>

        <div className="relative z-10 container mx-auto px-4 max-w-5xl text-center sm:text-left">
          <p className="font-helvetica text-xs sm:text-sm uppercase tracking-[0.25em] text-white/85 mb-4">
            Strategic Coaching Pathways
          </p>
          <h1 className="font-charm text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-none mb-5">
            Your Journey. Your Healing. Your Transformation.
          </h1>
          <p className="font-playfair text-base sm:text-xl text-white/90 max-w-2xl mb-8">
            Structured, confidential coaching pathways designed to help you rebuild from within and
            move intentionally toward wholeness and purpose.
          </p>
          <RegisterButton pathway="general" label="Begin Your Journey" />
        </div>
      </section>

      {/* Welcome */}
      <section className="px-4 py-16 sm:py-20 md:py-24">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl font-bold text-black mb-6">
            Welcome to Your Coaching Journey
          </h2>
          <div className="space-y-5 font-helvetica text-base sm:text-lg text-black/75 leading-relaxed text-left sm:text-center">
            <p>
              You were never meant to remain stuck in cycles of uncertainty, emotional pain,
              unhealthy relationships or unfulfilled potential.
            </p>
            <p>
              The SueLyn Empowered Living Strategic Coaching Pathways are designed to help you gain
              clarity, rebuild from within, and take intentional steps toward healing, wholeness, and
              purposeful living.
            </p>
            <p>
              Whether you are navigating a personal transition, recovering from a difficult
              relationship, seeking clarity about your purpose, preparing for a healthy partnership
              or strengthening your family, there is a pathway designed to support your journey.
            </p>
            <p>
              Each coaching experience provides a structured, confidential, and supportive space in
              which you can reflect, grow, and develop practical strategies for lasting
              transformation.
            </p>
          </div>
        </div>
      </section>

      {/* Identity Reset foundation */}
      <section className="px-4 pb-16 sm:pb-20">
        <div className="container mx-auto max-w-6xl">
          <div className="rounded-[2rem] bg-gradient-to-br from-[#741C82] via-[#F84988] to-[#FFAC24] p-8 sm:p-10 md:p-14 text-white shadow-xl">
            <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-center">
              <div>
                <p className="font-helvetica text-xs sm:text-sm uppercase tracking-[0.22em] text-white/80 mb-3">
                  Required Starting Point
                </p>
                <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-5">
                  Every Journey Begins with The Identity Reset
                </h2>
                <div className="space-y-4 font-helvetica text-sm sm:text-base text-white/90 leading-relaxed">
                  <p>
                    Regardless of the pathway you ultimately wish to pursue, every client must begin
                    with The Identity Reset.
                  </p>
                  <p>
                    The Identity Reset establishes the foundation for the work that follows. It helps
                    you develop greater self-awareness, identify unhealthy patterns, strengthen your
                    sense of identity and prepare emotionally and mentally for the next stage of your
                    coaching journey.
                  </p>
                  <p>
                    During the registration process, you may indicate the pathway you are most
                    interested in pursuing. However, your first four coaching sessions will begin
                    with The Identity Reset.
                  </p>
                  <p>
                    After completing the Identity Reset, you and your coach will review your progress
                    and confirm the most appropriate next pathway.
                  </p>
                  <p className="font-playfair text-lg sm:text-xl italic text-white">
                    Your intended pathway is your destination. The Identity Reset is where your
                    transformation begins.
                  </p>
                </div>
                <div className="mt-8">
                  <a
                    href={getCoachingRegistrationUrl("identity-reset")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 font-inter text-sm sm:text-base font-semibold text-[#741C82] shadow-lg transition-all hover:bg-white/90"
                  >
                    Begin My Identity Reset
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
              <div className="overflow-hidden rounded-2xl ring-4 ring-white/20 shadow-2xl">
                <img
                  src="/coaching/identity-reset.jpg"
                  alt="The Identity Reset"
                  className="w-full h-auto object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pathways */}
      <section className="px-4 pb-16 sm:pb-24" id="pathways">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl font-bold text-black mb-4">
              Explore the Five Coaching Pathways
            </h2>
            <p className="font-helvetica text-base sm:text-lg text-black/70 max-w-3xl mx-auto">
              Choose the pathway that reflects where you are — and where you are ready to go. Every
              journey still begins with The Identity Reset.
            </p>
          </div>

          <div className="space-y-10 md:space-y-14">
            {coachingPathways.map((pathway, index) => (
              <PathwayCard
                key={pathway.id}
                pathway={pathway}
                reverse={index % 2 === 1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="px-4 pb-16 sm:pb-24">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl font-bold text-black mb-4">
              How the Coaching Process Works
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
            {processSteps.map((item) => (
              <div
                key={item.step}
                className="rounded-2xl bg-white/70 border border-white/80 p-6 shadow-md"
              >
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#F84988] text-white font-playfair font-bold">
                  {item.step}
                </div>
                <h3 className="font-playfair text-xl font-bold text-black mb-3">{item.title}</h3>
                <p className="font-helvetica text-sm text-black/70 leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-4 pb-20 sm:pb-28">
        <div className="container mx-auto max-w-3xl">
          <div className="text-center mb-10 md:mb-14">
            <p className="font-playfair text-[#F84988] text-sm sm:text-base uppercase tracking-widest mb-3">
              Got Questions?
            </p>
            <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl font-bold text-black">
              Frequently Asked Questions
            </h2>
          </div>
          <Accordion type="single" collapsible className="space-y-4">
            {coachingFaqs.map((faq, index) => (
              <AccordionItem
                key={faq.question}
                value={`faq-${index}`}
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

          <div className="mt-12 text-center">
            <p className="font-playfair text-xl sm:text-2xl text-black mb-6">
              Ready to take the first step?
            </p>
            <RegisterButton pathway="identity-reset" label="Begin My Identity Reset" />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
