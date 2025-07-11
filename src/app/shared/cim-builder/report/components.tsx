import cn from '@/utils/class-names';
import Image from 'next/image'; // Import Image from Next.js
import React from 'react';
import './style.css';



export const Title = ({ children }: { children: string }) => {
  return (
    <h1>{children}</h1>
  )
}

export const PageSection = ({ children, className }: { children: React.ReactElement, className?: string }) => {
  return (
    <div
      className={cn(
        'page-section shadow-md w-full',
        className
      )}
    >
      <div className="content h-full">{children}</div>
      <div className='p-8 text-gray-500 text-[10px] italic'>This Memorandum is confidential and private. Distribution is restricted. It may not be reproduced, copied or replicated in any form. Narro Technologies Corporation and the preparer has not made any independent investigation, verification or audit of the information contained in this Memorandum and makes no representations or warranties, expressed or implied, regarding the accuracy or completeness of the information contained herein.</div>
    </div>
  )

};

export const SimplePageSection = ({ children, className }: { children: React.ReactElement, className?: string }) => {
  return (
    <div
      className={cn(
        'page-section shadow-md w-full',
        className
      )}
    >
      <div className="content h-full">{children}</div>
    </div>
  )

};


interface ListItem {
  title: string;
  description: string;
}

interface SectionProps {
  title: string;
  content: React.ReactElement | string;
  content2?: string;
  content3?: string;
  image?: string;
  alt?: string;
  list?: ListItem[]; // Add list property
}

export const Section: React.FC<SectionProps> = ({ title, content, content2, content3, image, alt, list }) => {
  return (
    <div className='section'>
      {title &&
        <>
          <h3>{title}</h3>
        </>
      }
      {image && alt && (
        <div className='image-container'>
          <Image
            src={image}
            alt={alt} // Add alt attribute
            width={0}
            height={0}
            sizes="50vw"
            style={{ width: '50%', height: 'auto' }} // optional
          />
        </div>
      )}
      <p>{content}</p>
      {content2 && <p><br />{content2}</p>}
      {list && (
        <ul>
          {list.map((item, index) => (
            <li key={index} className='list-div'>
              <strong>{item.title}:</strong> {item.description}
            </li>
          ))}
        </ul>
      )}
      {content3 && <p>{content3}</p>}
    </div>
  );
};

export default Section;