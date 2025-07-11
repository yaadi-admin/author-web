import React from 'react';
import { CiShop, CiSearch, CiPhone } from "react-icons/ci";
import { TbBriefcase2, TbTie } from "react-icons/tb";
import { LiaUserTieSolid } from "react-icons/lia";
import Image from 'next/image';

const posts = [
  {
    id: 1,
    title: 'Business Owners',
    subTitle: 'Easy Selling',
    href: '#',
    description:
      'Our platform guides you through every step—from strategic planning and marketing to due diligence',
    date: 'Mar 16, 2020',
    datetime: '2020-03-16',
    category: { title: 'Marketing', href: '#' },
    imageUrl:
      'https://firebasestorage.googleapis.com/v0/b/bizbridge-78490.appspot.com/o/bots%2Fcustomers%2FOWNER%20-%20older_small_business_owner_4.png?alt=media&token=89144123-1ba3-41a9-b5cc-970b765501c5',
    author: {
      name: '',
      role: '',
      href: '#',
      imageUrl:
        'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    backgroundColor: '#26475D'
  },
  {
    id: 2,
    title: 'Investors',
    subTitle: 'Discover Opportunities',
    href: '#',
    description:
      'Real-time alerts on businesses that match your investment criteria. Our tailored matching system connects you with high-potential SMBs',
    date: 'Apr 2, 2020',
    datetime: '2020-04-02',
    category: { title: 'Customer Success', href: '#' },
    imageUrl:
      'https://firebasestorage.googleapis.com/v0/b/bizbridge-78490.appspot.com/o/early_30s_ethnically_ambiguous_male_3%20(1).png?alt=media&token=056700f9-1ea7-4091-9c6a-9788ce87bb1e',
    author: {
      name: '',
      role: '',
      href: '#',
      imageUrl:
        'https://images.unsplash.com/photo-1585129799805-c42bfba5e913?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    backgroundColor: '#26475D'
  },
  {
    id: 3,
    title: 'Professionals',
    subTitle: 'Support When It Matters',
    href: '#',
    description:
      'Showcase your specialized services and connect with clients at critical deal stages. Help business owners and investors navigate the process with timely, expert advice.',
    date: 'May 10, 2020',
    datetime: '2020-05-10',
    category: { title: 'Productivity', href: '#' },
    imageUrl:
      'https://firebasestorage.googleapis.com/v0/b/bizbridge-78490.appspot.com/o/Three_middle-aged_ethnically_ambiguous_business_people.png?alt=media&token=981ba9a1-cd90-40e1-87bf-0ef54b77b07f',
    author: {
      name: '',
      role: '',
      href: '#',
      imageUrl:
        'https://images.unsplash.com/photo-1512482178885-84c0da4e28b3?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    backgroundColor: '#26475D'
  },
  {
    id: 4,
    title: 'Business Brokers',
    subTitle: 'Amplify Your Impact',
    href: '#',
    description:
      'Benefit from AI-driven insights, automated document management, and efficient transaction tracking to manage multiple clients and close deals faster.',
    date: 'May 10, 2020',
    datetime: '2020-05-10',
    category: { title: 'Productivity', href: '#' },
    imageUrl:
      'https://firebasestorage.googleapis.com/v0/b/bizbridge-78490.appspot.com/o/bots%2Fcustomers%2FBROKER%20-%20male_real_estate_broker_1.png?alt=media&token=1b5fe1f1-af82-46f1-97de-e875c5bc09b2',
    author: {
      name: '',
      role: '',
      href: '#',
      imageUrl:
        'https://images.unsplash.com/photo-1512482178885-84c0da4e28b3?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    backgroundColor: '#26475D'
  },
];

const BusinessDeals = () => {
  return (
    <div style={{
      backgroundImage:
        'linear-gradient(to bottom,rgb(255, 255, 255) 50%,rgb(1, 139, 102) 90%)', // Diagonal split background
    }} className="h-full dark:bg-dark-primary text-black dark:text-white pt-12">
      {/* First Row */}
      <div className="container mx-auto 4xs:px-0 md:px-4 lg:px-8 4xs:mb-10 lg:mb-20 4xs:mt-0 md:mt-20">
        <div className="w-full text-left">
          <div className="4xs:w-full md:w-[218px] text-[#0a0a19] text-[13px] font-medium font-['Plus Jakarta Sans'] uppercase leading-[18px] tracking-wide mb-4">
            Streamlined Investments
          </div>
        </div>
        <div className="w-full flex flex-col md:flex-row md:justify-between items-start">
          <div className="w-full md:w-[607px] text-[#0a0a19] 4xs:text-[48px] md:text-[57px] font-bold font-['Plus Jakarta Sans'] leading-[61.90px] mb-4 md:mb-0 text-left">
            Transforming Capital Deals with{" "}
            <span
              className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text font-bold text-6xl"
            >
              AI
            </span>
          </div>
          <div className="w-full md:w-[607px] text-center">
            <p className="text-lg text-[#000933] text-left">
              Leveraging cutting‑edge technology and deep market insights, we empower investors and business owners to seize opportunities and close successful deals.
            </p>
          </div>
        </div>
      </div>

      {/* Second Row (Blog Posts) */}
      <div className="h-full 4xs:pb-5 md:pb-0 4xs:flex md:container mx-auto 4xs:w-full md:max-w-10xl lg:px-8 md:text-center 4xs:pb-8">
        <div
          className="
            4xs:grid 4xs:grid-cols-2 4xs:h-full 
            md:flex justify-center items-center 
            4xs:gap-2 4xs:w-[90%] 4xs:mx-auto 
            md:gap-6 lg:gap-8
          "
        >
          {posts.map((post) => (
            <article
              key={post.id}
              className="
                flex flex-col items-center justify-between
                md:p-6 rounded transition duration-300 ease-in-out
                4xs:w-full 4xs:p-6 4xs:h-full md:w-[250px] md:h-[300px]
                bg-white shadow-lg mt-10
              "
              style={{
                transition: 'background-color 0.3s ease, transform 0.3s ease'
              }}
              onMouseEnter={(e) => {
                // Uncomment these lines to enable hover effects
                // e.currentTarget.style.backgroundColor = '#396A91';
                // e.currentTarget.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                // e.currentTarget.style.backgroundColor = post.backgroundColor;
                // e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              <div className="h-full flex flex-col">
                <div className="mx-auto md:-mt-32">
                  <Image
                    alt={`${post.title}`}
                    src={post.imageUrl}
                    width={170}
                    height={170}
                    className="relative rounded-full drop-shadow-lg"
                  />
                </div>
                <h3 className="mt-3 4xs:text-sm md:text-xl font-semibold leading-6 text-[#424242] text-center">
                  <span>{post.title}</span>
                </h3>
                <p className="mt-1 4xs:text-sm md:text-lg text-[#424242] font-medium text-center">
                  {post.subTitle}
                </p>
                <p className="mt-4 text-sm text-[#303030] 4xs:text-left md:text-center 4xs:font-extralight md:font-medium">
                  {post.description}
                </p>
              </div>
              <h1 className="mt-auto text-sm text-[#303030] text-center">
                {post.author.role}
              </h1>
            </article>
          ))}
        </div>
      </div>

      {/* Third Row */}
      <div className="4xs:hidden md:flex justify-center items-center">
        <div className="4xs:w-full md:w-[1320px] h-full pl-[176.95px] pr-[176.97px] pt-[120px] pb-[67.04px] flex flex-col items-center text-center gap-2">
          
        </div>
      </div>
    </div>
  );
};

export default BusinessDeals;
