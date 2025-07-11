'use client'

import { useState, useEffect } from 'react'
import { Title } from 'rizzui'
export default function Accordion({ body, title, isOpen, onChange, }: {
  title: React.ReactElement | string,
  body: React.ReactElement | string,
  isOpen: boolean,
  onChange: () => void,
}) {

  const [accordionOpen, setAccordionOpen] = useState<boolean>(false)

  useEffect(() => {
    setAccordionOpen(false)
  }, [])

  useEffect(() => {
    setAccordionOpen(isOpen)
  }, [isOpen]);


  return (
    <div className="py-4 border-b">
      <button
        className="flex items-center justify-between text-left w-full py-2"
        onClick={(e) => { e.preventDefault(); setAccordionOpen(!accordionOpen); onChange(); }}
        aria-expanded={accordionOpen}
        aria-controls={`accordion-text-01`}
      >
        <Title as="h6" className="font-semibold 4xs:text-sm sm:text-xl">{title}</Title>
        <svg
          xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path
            className={`transform origin-center transition duration-200 ease-out ${accordionOpen && '!rotate-180'}`}
            strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
        </svg>
      </button>
      <div
        id={`accordion-text-01`}
        role="region"
        aria-labelledby={`accordion-title-01`}
        className={`grid text-sm text-gray-600 overflow-hidden transition-all duration-300 ease-in-out ${accordionOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
      >
        <div className="overflow-hidden">
          <div className="py-6">
            {body}
          </div>
        </div>
      </div>
    </div>
  )
}