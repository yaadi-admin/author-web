
import { TbBusinessplan } from "react-icons/tb";

import { FaBrain, FaBusinessTime } from 'react-icons/fa';
import { GiMoneyStack } from 'react-icons/gi';
import { GrScorecard } from "react-icons/gr";
import { IoBusiness, IoDocumentTextOutline } from 'react-icons/io5';
import { MdRealEstateAgent } from 'react-icons/md';
import { RiTeamFill } from 'react-icons/ri';

import { SvgContent } from "iblis-react-undraw";
import styles from './table-of-contents.module.css';
import Undraw from "@/components/undraw";

interface TableOfContentsProps {
  primaryColor: string;
}

function TableOfContents({ primaryColor }: TableOfContentsProps) {


  const sections = [
    { title: '01. Company Overview', label: 'Company Overview', content: ['Company details and the owner'], icon: <IoBusiness className='h-8 w-8' /> },
    { title: '02. Advisory Team', label: 'Advisory Team', content: ['Advisors (lawyers, realtor, banker)'], icon: <RiTeamFill className='h-8 w-8' /> },
    { title: '03. Succession Strategy Readiness Score', label: 'Succession Strategy Readiness Score', content: ['Succession Strategy Readiness Overall Score'], icon: <GrScorecard className='h-8 w-8' /> },
    { title: '04. Your Mindset Today', label: 'Your Mindset Today', content: ['Business history, legacy, personal, and succession goals'], icon: <FaBrain className='h-8 w-8' /> },
    { title: '05. Business Overview & Strategic Direction', label: 'Business Overview & Strategic Direction', content: ['Financial goals, business value, and value optimization'], icon: <GiMoneyStack className='h-8 w-8' /> },
    { title: '06. Ownership and Successor Planning', label: 'Ownership and Successor Planning', content: ['Succession roles, key candidates, risk mitigation, and measurement'], icon: <TbBusinessplan className='h-8 w-8' /> },
    { title: '07. Management Transition & Team Development', label: 'Management Transition & Team Development', content: ['Succession steps before and after transition'], icon: <RiTeamFill className='h-8 w-8' /> },
    { title: '08. Financial & Valuation Considerations', label: 'Financial & Valuation Considerations', content: ['Supporting successors, training, and skills development'], icon: <GiMoneyStack className='h-8 w-8' /> },
    { title: '09. Contingency Planning', label: 'Contingency Planning', content: ['Contingency scenarios and risk mitigation strategies'], icon: <FaBusinessTime className='h-8 w-8' /> },
    { title: '10. Tax, Legal, and Estate Considerations', label: 'Tax, Legal, and Estate Considerations', content: ['Legal readiness, tax, and estate planning strategies'], icon: <MdRealEstateAgent className='h-8 w-8' /> },
    { title: '11. Essential Documents', label: 'Essential Documents', content: ['A checklist of what you have access to and where to find it'], icon: <IoDocumentTextOutline className='h-8 w-8' /> },
  ];

  const gridTemplateRowsStyle: React.CSSProperties = {
    // display: 'grid',
    // gridTemplateColumns: 'repeat(1, 1fr)',
    // gap: '1rem',
    // maxWidth: '1200px',
    // margin: '0 auto',
    display: 'flex',
    flexDirection: 'column'
  };


  return (
    <div className={styles.page} >
      <div className="flex items-center justify-center">
        <h1 className='mb-10' id="table-of-contents">Table of Contents</h1>
        <Undraw
          primaryColor={primaryColor}
          Illustration={SvgContent}
          className="w-1/6 ml-auto mb-2"
        />
      </div>

      <div className="mt-10 container" style={gridTemplateRowsStyle}>
        {sections.map((section, index) => {
          return (
            <div key={index} className={styles.box} >
              <div className='flex'>

                <a href={`#${section.label}`} >
                  <h5 className="font-bold mb-2" style={{ color: primaryColor }}>{section.title}</h5>
                </a>
                <div className='ml-auto'>
                  {section.icon}
                </div>
              </div>
              {section.content.length > 0 && (
                <ul className="list-disc pl-5">
                  {section.content.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default TableOfContents