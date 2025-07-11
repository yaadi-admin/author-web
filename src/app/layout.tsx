import { Toaster } from 'react-hot-toast';
import GlobalDrawer from '@/app/shared/drawer-views/container';
import GlobalModal from '@/app/shared/modal-views/container';
import { ThemeProvider } from '@/app/shared/theme-provider';
import { siteConfig } from '@/config/site.config';
import { roboto, inter, lexendDeca, poppins } from '@/app/fonts';
import cn from '@/utils/class-names';
import NextProgress from '@/components/next-progress';

// styles
import '@/app/globals.css';

export const metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html
      lang="en"
      dir="ltr"
      // required this one for next-themes, remove it if you are not using next-theme
      suppressHydrationWarning
    >
      <body
        // to prevent any warning that is caused by third party extensions like Grammarly
        suppressHydrationWarning
        className={cn(
          inter.variable,
          roboto.variable,
          lexendDeca.variable,
          poppins.variable,
          'font-roboto')}
      >
        <ThemeProvider>
          <NextProgress />
          {children}
          <Toaster />
          <GlobalDrawer />
          <GlobalModal />
        </ThemeProvider>
      </body>
    </html>
  );
}
