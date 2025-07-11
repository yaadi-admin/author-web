import { Metadata } from 'next';
import logoImg from '@public/biz-logo.png';
import { LAYOUT_OPTIONS } from '@/config/enums';
import logoIconImg from '@public/logo-short.png';
import { OpenGraph } from 'next/dist/lib/metadata/types/opengraph-types';

enum MODE {
  DARK = 'dark',
  LIGHT = 'light',
}

export const siteConfig = {
  title: 'SueLyn Empowered Living',
  description: `SueLyn Empowered Living is where faith meets personal transformation. Led by Suzanna Griffiths, this space is designed to help men and women heal from emotional wounds, align with God's Word, and walk in their divine purpose - boldly and whole.`,
  logo: logoImg,
  icon: 'https://firebasestorage.googleapis.com/v0/b/suelyn-e82e4.firebasestorage.app/o/SueLyn_logo.png?alt=media&token=0154d66d-0020-458f-921c-08ce964d57f9',
  mode: MODE.LIGHT,
  layout: LAYOUT_OPTIONS.HYDROGEN,
  // TODO: favicon
};

export const metaObject = (
  title?: string,
  openGraph?: OpenGraph,
  description: string = siteConfig.description
): Metadata => {
  return {
    title: title ? `${title}` : siteConfig.title,
    description,
    openGraph: openGraph ?? {
      title: title ? `${title}` : title,
      description,
      url: 'https://suelynempoweredliving.com',
      siteName: 'SueLyn Empowered Living', // https://developers.google.com/search/docs/appearance/site-names
      images: {
        url: 'https://firebasestorage.googleapis.com/v0/b/mystery-mobile-detailing.firebasestorage.app/o/Mystery_logo.png?alt=media&token=0154d66d-0020-458f-921c-08ce964d57f9',
        width: 1200,
        height: 630,
      },
      locale: 'en_US',
      type: 'website',
    },
  };
};
