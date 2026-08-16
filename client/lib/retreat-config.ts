/**
 * Love Never Ends: The First Step — shared event config.
 * Update here to keep homepage, engagements, and event page in sync.
 */

export const EVENT_DATE = new Date("2026-10-17T09:00:00-05:00");

/** @deprecated Use EVENT_DATE */
export const RETREAT_DATE = EVENT_DATE;

export const EVENT_REGISTRATION_URL = "https://secure.ezeepayments.com/?kxbc3XX";

export const EVENT_PRICE_LABEL = "$65 USD";
export const EVENT_PRICE_PER_PERSON = "USD $65 per person";
export const EVENT_TITLE = "Love Never Ends: The First Step";
export const EVENT_TAGLINE = "The First Step to the Divine Design";
export const EVENT_DATE_LABEL = "Saturday, October 17, 2026";
export const EVENT_FORMAT_LABEL = "Online Interactive Experience";
export const EVENT_PATH = "/love-never-ends";

/** Legacy package links kept only for reference — not used on the live page. */
export const REGISTRATION_LINKS = {
  singles: EVENT_REGISTRATION_URL,
  couples: EVENT_REGISTRATION_URL,
  firstStep: EVENT_REGISTRATION_URL,
} as const;
