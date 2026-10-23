import Header from "../components/Header";
import Footer from "./footer";
import { Link } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  EVENT_DATE_LABEL,
  EVENT_FORMAT_LABEL,
  EVENT_PRICE_PER_PERSON,
  EVENT_TAGLINE,
  EVENT_TITLE,
} from "../lib/retreat-config";
import {
  ArrowRight,
  BookOpen,
  CalendarCheck,
  HeartHandshake,
  MessagesSquare,
  Users,
} from "lucide-react";

const voices = [
  {
    name: "Minister Suzanna Griffiths",
    focus: "Positioned for the Kingdom",
    session: "Stewarding The Life God Entrusted To You.",
    description:
      "Your life is more than something to simply live; it is something you have been entrusted to steward. Minister Suzanna Griffiths will invite participants to examine how they are showing up in the life God has given them and whether their choices, relationships, gifts, and priorities are aligned with what they have been called to carry.",
    image: "/love-never-ends/suzanna-griffiths.jpeg",
  },
  {
    name: "Bishop Dr. Carla Dunbar",
    focus: "Purpose, Fulfillment & Alignment",
    session: "The Aligned Marriage: Where Purpose, Partnership & Fulfillment Meet",
    description:
      "What happens when two individual purposes must learn to move in one direction? Bishop Dr. Carla Dunbar will explore alignment within marriage and how couples can build partnerships where purpose, connection, and fulfillment can coexist.",
    image: "/love-never-ends/carla-dunbar.png",
  },
  {
    name: "Minister Chantaeu Munroe",
    focus: "Individual Healing & Restoration",
    session: "Restored From Within: The Healing That Rebuilds Your Marriage",
    description:
      "What you haven't healed is still showing up. Unresolved wounds can quietly influence how we communicate, love, respond to conflict, and experience connection. Minister Chantaeu Munroe will help participants explore how healing from within can begin changing what shows up in their relationships.",
    image: "/love-never-ends/chantaeu-munroe.jpg",
  },
  {
    name: "Coach Terry Njiru",
    focus: "Generational Restoration & Transformation",
    session:
      "The Family Curse Ends With Me: Choosing Healing, Restoration & Transformation",
    description:
      "Not everything you inherited has to be passed on. Coach Terry Njiru will lead a powerful conversation about recognizing generational patterns, confronting what needs to change, and intentionally choosing healing and restoration so that what affected yesterday does not have to define tomorrow.",
    image: "/love-never-ends/terry-njiru.jpeg",
  },
];

const experiences = [
  {
    title: "Interactive Sessions",
    body: "Participants didn't come just to listen. They had opportunities to engage, respond, reflect and participate.",
    icon: MessagesSquare,
  },
  {
    title: "Practical Tools & Insights",
    body: "Participants took what they learned beyond October 17 with practical strategies they could begin applying to their lives and relationships.",
    icon: BookOpen,
  },
  {
    title: "Real Conversations That Transform",
    body: "Honest conversations around healing, relationships, purpose, generational patterns and becoming whole.",
    icon: HeartHandshake,
  },
  {
    title: "Guided Breakout Sessions",
    body: "Move from the larger conference space into smaller, intentional conversations where you can explore, reflect, and engage more deeply.",
    icon: Users,
  },
];

const includes = [
  "Full access to the online interactive conference",
  "Four Featured Voice transformational sessions",
  "Interactive engagement activities",
  "Guided breakout sessions",
  "Reflection and self-discovery exercises",
  "Practical tools for life, relationships and legacy",
  "Digital conference workbook",
  "Meaningful conversation and connection",
  "A faith-rooted environment centered on healing, restoration and transformation",
];

const whoIsThisFor = [
  "It's for the person who knows there are patterns that need to change.",
  "It's for the individual doing the work of becoming whole.",
  "It's for the couple who wants to build with greater intention.",
  "It's for the person questioning whether what they inherited must become what they pass on.",
  "It's for the person seeking greater clarity around purpose, relationships, healing, and alignment.",
];

const faqs = [
  {
    question: "Is registration still open?",
    answer:
      "No. Love Never Ends: The First Step took place on Saturday, October 17, 2026, and registration is now closed. This page is kept as an archive of the experience.",
  },
  {
    question: "Was Love Never Ends: The First Step a webinar?",
    answer:
      "No. The First Step was an online interactive experience. In addition to sessions led by our Featured Voices, the experience incorporated engagement activities, guided reflection, and breakout sessions.",
  },
  {
    question: "Was this only for married couples?",
    answer:
      "No. The experience was designed for individuals and couples. Conversations explored individual healing, relationships, generational patterns, purpose, restoration and alignment.",
  },
  {
    question: "Was the experience faith-based?",
    answer:
      "Yes. Love Never Ends is rooted in faith-based principles and the belief that healing, restoration, and transformation are possible. The experience was designed to create a welcoming space for people who were ready to grow, reflect, and take meaningful steps forward.",
  },
  {
    question: "Did participants receive a workbook?",
    answer:
      "Yes. Registered participants received a digital conference workbook featuring exercises, reflection questions and practical tools connected to the Featured Voice sessions.",
  },
  {
    question: "Were there breakout sessions?",
    answer:
      "Yes. Breakout sessions formed part of the interactive experience and provided opportunities for deeper reflection, conversation and engagement.",
  },
  {
    question: "How much did registration cost?",
    answer: "Registration was $65 USD per person.",
  },
  {
    question: "Where was the conference held?",
    answer:
      "The experience was held fully online. Registered participants received access instructions and additional conference information before the event.",
  },
];

function ArchiveLinks({ variant = "pink" }: { variant?: "pink" | "white" }) {
  const primary =
    variant === "white"
      ? "bg-white text-[#741C82] hover:bg-white/90"
      : "bg-[#F84988] text-white hover:bg-[#e03a7a]";
  const secondary =
    variant === "white"
      ? "border border-white/60 text-white hover:bg-white/10"
      : "border border-[#F84988] text-[#F84988] hover:bg-[#F84988]/10";

  return (
    <div className="flex flex-col items-center gap-3 sm:flex-row">
      <Link
        to="/workshops"
        className={`inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 font-inter text-sm font-semibold shadow-lg transition-all hover:shadow-xl sm:text-base ${primary}`}
      >
        View Upcoming Engagements
        <ArrowRight className="h-4 w-4" />
      </Link>
      <Link
        to="/coaching"
        className={`inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 font-inter text-sm font-semibold transition-all sm:text-base ${secondary}`}
      >
        Explore Strategic Coaching
      </Link>
    </div>
  );
}

export default function LoverNeverEnds() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-gradient-to-b from-[#FFF0F6] via-[#FFE4EE] to-[#FFF8EB]">
      <Header whiteText={false} />

      {/* Hero */}
      <section className="relative overflow-hidden pt-24 pb-10 sm:pb-16">
        <div className="absolute inset-0 bg-gradient-to-br from-[#F84988] via-[#FF7A59] to-[#FFAC24]" />
        <div className="absolute inset-0 opacity-30">
          <div className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-white blur-[100px]" />
          <div className="absolute -right-16 bottom-0 h-80 w-80 rounded-full bg-[#741C82] blur-[120px]" />
        </div>

        <div className="relative z-10 container mx-auto max-w-6xl px-4">
          <div className="grid items-center gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-12">
            <div className="order-2 text-center text-white lg:order-1 lg:text-left">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em]">
                <CalendarCheck className="h-4 w-4" />
                Event Concluded — {EVENT_DATE_LABEL}
              </div>
              <h1 className="font-charm text-4xl font-bold leading-none sm:text-5xl md:text-6xl lg:text-7xl">
                {EVENT_TITLE}
              </h1>
              <p className="mt-3 font-playfair text-lg italic text-white/90 sm:text-xl md:text-2xl">
                {EVENT_TAGLINE}
              </p>
              <p className="mt-2 font-helvetica text-sm uppercase tracking-[0.18em] text-white/80 sm:text-base">
                {EVENT_DATE_LABEL} | {EVENT_FORMAT_LABEL}
              </p>

              <div className="mt-8 space-y-4 font-helvetica text-sm leading-relaxed text-white/90 sm:text-base">
                <p>
                  Healing doesn't always begin with having all the answers. Sometimes, it
                  begins with the courage to recognize what needs to change and taking the
                  first step.
                </p>
                <p>
                  Love Never Ends: The First Step was a dynamic online interactive experience
                  created for individuals and couples ready to examine the patterns shaping
                  their lives, relationships, and legacy.
                </p>
                <p>
                  Through transformational conversations, practical tools, guided reflection,
                  and meaningful interaction, four powerful Voices led participants through
                  conversations around generational restoration, purpose and alignment,
                  individual healing, relationships, and positioning for what comes next.
                </p>
                <p className="font-playfair text-base italic text-white sm:text-lg">
                  This wasn't a webinar where participants simply logged in and listened. They
                  came prepared to engage. To reflect. To participate. And most importantly, to
                  take their first step.
                </p>
              </div>

              <div className="mt-8 rounded-2xl border border-white/25 bg-white/15 p-5 text-center backdrop-blur-sm lg:text-left">
                <p className="font-playfair text-xl font-semibold text-white">
                  This event has concluded.
                </p>
                <p className="mt-1 font-helvetica text-sm text-white/85">
                  Registration is closed. Thank you to everyone who joined us for The First
                  Step — this page remains as a record of the experience.
                </p>
              </div>

              <div className="mt-6 flex justify-center lg:justify-start">
                <ArchiveLinks variant="white" />
              </div>
            </div>

            <div className="order-1 mx-auto w-full max-w-md lg:order-2 lg:max-w-none">
              <div className="overflow-hidden rounded-[1.75rem] bg-black/10 shadow-2xl ring-4 ring-white/20">
                <img
                  src="/love-never-ends/hero.jpg"
                  alt="Love Never Ends: The First Step"
                  className="h-auto w-full object-contain"
                  loading="eager"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* More than a conference */}
      <section className="px-4 py-16 sm:py-20">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="font-playfair text-3xl font-bold text-[#23121a] sm:text-4xl md:text-5xl">
            This Is More Than an Online Conference
          </h2>
          <div className="mt-8 space-y-5 text-left font-helvetica text-base leading-relaxed text-[#4d3340] sm:text-center sm:text-lg">
            <p>
              The vision behind Love Never Ends has always been about creating space for
              healing, restoration, reconnection, and alignment.
            </p>
            <p>That vision hasn't changed. The way we're beginning has.</p>
            <p>
              Love Never Ends begins with The First Step — an accessible, interactive online
              experience bringing people together from wherever they are.
            </p>
            <p>
              Throughout the experience, participants didn't simply hear from our Featured
              Voices. They were invited into the conversation through reflection, practical
              exercises, breakout sessions, and intentional moments designed to help them
              examine where they are, what may be holding them back, and what their next
              step could look like.
            </p>
            <p className="font-playfair text-lg italic text-[#741C82] sm:text-xl">
              Transformation doesn't happen simply because we heard something powerful. It
              begins when we decide to do something with what we've heard.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Voices */}
      <section className="px-4 pb-16 sm:pb-20">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <p className="mb-3 font-helvetica text-xs uppercase tracking-[0.22em] text-[#F84988] sm:text-sm">
              Four Transformational Voices
            </p>
            <h2 className="font-playfair text-3xl font-bold text-[#23121a] sm:text-4xl md:text-5xl">
              One Divine Assignment
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {voices.map((voice) => (
              <article
                key={voice.name}
                className="overflow-hidden rounded-[1.75rem] border border-[#f3bdd1] bg-white/90 shadow-[0_20px_60px_rgba(95,18,49,0.08)]"
              >
                <div className="aspect-[4/5] overflow-hidden bg-[#1a0a12]">
                  <img
                    src={voice.image}
                    alt={voice.name}
                    className="h-full w-full object-cover object-top"
                    loading="lazy"
                  />
                </div>
                <div className="space-y-3 p-6">
                  <p className="font-helvetica text-xs font-semibold uppercase tracking-[0.18em] text-[#F84988]">
                    {voice.focus}
                  </p>
                  <h3 className="font-playfair text-2xl font-bold text-[#23121a]">
                    {voice.name}
                  </h3>
                  <p className="font-playfair text-base italic text-[#741C82]">
                    {voice.session}
                  </p>
                  <p className="font-helvetica text-sm leading-relaxed text-[#4d3340] sm:text-base">
                    {voice.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* What you'll experience */}
      <section className="bg-gradient-to-br from-[#741C82] via-[#F84988] to-[#FFAC24] px-4 py-16 sm:py-20">
        <div className="container mx-auto max-w-6xl">
          <h2 className="mb-10 text-center font-playfair text-3xl font-bold text-white sm:text-4xl md:text-5xl">
            What Participants Experienced
          </h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {experiences.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-white/20 bg-white/10 p-6 text-white backdrop-blur-sm"
              >
                <item.icon className="mb-4 h-8 w-8 text-white" />
                <h3 className="mb-3 font-playfair text-xl font-bold">{item.title}</h3>
                <p className="font-helvetica text-sm leading-relaxed text-white/85">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Includes */}
      <section className="px-4 py-16 sm:py-20">
        <div className="container mx-auto max-w-5xl">
          <div className="rounded-[2rem] border border-[#f3bdd1] bg-white/85 p-8 shadow-xl sm:p-10 md:p-12">
            <div className="text-center">
              <h2 className="font-playfair text-3xl font-bold text-[#23121a] sm:text-4xl md:text-5xl">
                What the Experience Included
              </h2>
            </div>
            <ul className="mt-10 grid gap-4 sm:grid-cols-2">
              {includes.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 font-helvetica text-sm text-[#4d3340] sm:text-base"
                >
                  <span className="mt-1 inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[#F84988] text-[10px] font-bold text-white">
                    ✓
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-10 text-center font-helvetica text-sm text-[#4d3340] sm:text-base">
              {EVENT_DATE_LABEL} · {EVENT_FORMAT_LABEL} · Registration was{" "}
              {EVENT_PRICE_PER_PERSON}
            </p>
          </div>
        </div>
      </section>

      {/* Who is this for */}
      <section className="px-4 pb-16 sm:pb-20">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="font-playfair text-3xl font-bold text-[#23121a] sm:text-4xl md:text-5xl">
            Who Love Never Ends: The First Step Was For
          </h2>
          <p className="mx-auto mt-6 max-w-2xl font-helvetica text-base text-[#4d3340] sm:text-lg">
            This experience wasn't only for people whose relationships were in crisis.
          </p>
          <div className="mt-8 space-y-4 text-left">
            {whoIsThisFor.map((line) => (
              <p
                key={line}
                className="rounded-2xl border border-[#f3bdd1] bg-white/70 px-5 py-4 font-helvetica text-sm text-[#4d3340] sm:text-base"
              >
                {line}
              </p>
            ))}
          </div>
          <p className="mt-8 font-playfair text-xl italic text-[#741C82] sm:text-2xl">
            And it's for anyone who knows: Something needs to change—and I'm ready to take
            my first step.
          </p>
        </div>
      </section>

      {/* What comes next */}
      <section className="px-4 pb-16 sm:pb-20">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="font-playfair text-3xl font-bold text-[#23121a] sm:text-4xl md:text-5xl">
            The First Step Is Only the Beginning
          </h2>
          <div className="mt-8 space-y-5 font-helvetica text-base leading-relaxed text-[#4d3340] sm:text-lg">
            <p>
              Love Never Ends: The First Step was exactly what its name says — the beginning.
            </p>
            <p>
              October marked the official launch of the Love Never Ends Experience and opened
              the door to a deeper journey of healing, restoration, alignment, and
              intentional relationships.
            </p>
            <p>
              For those ready to continue beyond the online experience, Love Never Ends will
              culminate in an immersive in-person experience in February 2027, designed to
              take the conversations and connections started here even deeper.
            </p>
            <p>
              More details about the in-person experience will be shared in the months ahead.
            </p>
            <p className="font-playfair text-xl italic text-[#F84988] sm:text-2xl">
              But every journey begins somewhere. This was The First Step.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-4 pb-16 sm:pb-20">
        <div className="container mx-auto max-w-3xl">
          <h2 className="mb-10 text-center font-playfair text-3xl font-bold text-[#23121a] sm:text-4xl md:text-5xl">
            Frequently Asked Questions
          </h2>
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={faq.question}
                value={`faq-${index}`}
                className="rounded-xl border border-[#f3bdd1] bg-white/80 px-5 sm:px-6"
              >
                <AccordionTrigger className="py-5 text-left font-playfair text-base font-semibold text-[#23121a] hover:no-underline sm:text-lg">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="pb-5 font-helvetica text-sm leading-relaxed text-[#4d3340] sm:text-base">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-4 pb-20 sm:pb-24">
        <div className="container mx-auto max-w-4xl overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#F84988] via-[#FF7A59] to-[#FFAC24] p-8 text-center text-white shadow-2xl sm:p-12">
          <h2 className="font-playfair text-3xl font-bold sm:text-4xl md:text-5xl">
            Maybe You've Been Waiting for a Sign to Begin.
          </h2>
          <div className="mx-auto mt-6 max-w-2xl space-y-2 font-helvetica text-sm text-white/90 sm:text-base">
            <p>To heal what keeps showing up.</p>
            <p>To confront the pattern.</p>
            <p>To realign.</p>
            <p>To rebuild.</p>
            <p>To step into purpose.</p>
            <p>
              To make a different decision for yourself, your relationship or the generations
              coming behind you.
            </p>
          </div>
          <p className="mx-auto mt-8 max-w-xl font-playfair text-lg italic text-white sm:text-xl">
            You don't have to figure out the entire journey today. You just have to take the
            first step.
          </p>
          <p className="mt-8 font-helvetica text-sm uppercase tracking-[0.18em] text-white/80">
            Held {EVENT_DATE_LABEL}
          </p>
          <h3 className="mt-3 font-charm text-4xl font-bold sm:text-5xl">{EVENT_TITLE}</h3>
          <p className="mt-2 font-playfair text-lg text-white/90">
            Online. Interactive. Transformational.
          </p>
          <div className="mt-8 flex justify-center">
            <ArchiveLinks variant="white" />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
