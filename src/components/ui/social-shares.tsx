import {
  PiFacebookLogoFill,
  PiInstagramLogoFill,
  PiLinkedinLogoFill,
  PiTwitterLogoFill,
  PiYoutubeLogoFill,
} from 'react-icons/pi';

const socialData = [
  {
    title: 'Facebook',
    icon: <PiFacebookLogoFill className="h-auto w-4" />,
    link: 'https://www.facebook.com/thenarro.com/',
  },
  {
    title: 'Linkedin',
    icon: <PiLinkedinLogoFill className="h-auto w-4" />,
    link: 'https://www.linkedin.com/company/bizbridge-io/',
  },
  {
    title: 'Instagram',
    icon: <PiInstagramLogoFill className="h-auto w-4" />,
    link: 'http://www.instagram.com/bizbridge_io',
  },
  {
    title: 'Youtube',
    icon: <PiYoutubeLogoFill className="h-auto w-4" />,
    link: 'https://www.youtube.com/channel/UCb7aBeSYuRmPKZRVdDQZqRA',
  },
];

export default function SocialItems() {
  return (
    <div className="mt-8 flex items-center justify-center gap-6 py-6 md:mt-10 lg:mt-0 xl:py-8">
      {socialData.map((item) => (
        <a
          key={item.title}
          href={item.link}
          rel="norefferer"
          target="_blank"
          className="social-btn-shadow inline-block rounded-full bg-white p-3 text-gray-500 transition-all duration-300 hover:text-gray-1000 dark:bg-gray-100 dark:text-gray-700 dark:hover:text-gray-1000"
        >
          {item.icon}
        </a>
      ))}
    </div>
  );
}
