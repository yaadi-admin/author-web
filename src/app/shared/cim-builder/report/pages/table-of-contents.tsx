import React from 'react'
import { SimplePageSection, Title } from '../components'

function TableOfContents() {
  return (
    <SimplePageSection>
      <>
        <Title>TABLE OF CONTENTS</Title>
        <div className='text-div'>
          <ul>
            <li className='content-items'>1. Executive Summary & Highlights</li>
            <br />
            <li className='content-items'>2. Buyer Profile and Considerations</li>
            <br />
            <li className='content-items'>3. Business History & Overview</li>
            <br />
            <li className='content-items'>4. Industry and Competitive Landscape</li>
            <br />
            <li className='content-items'>5. Company Offerings (Products & Services)</li>
            <br />
            <li className='content-items'>6. Customers, Sales, and Marketing</li>
            <br />
            <li className='content-items'>7. Operations</li>
            <br />
            <li className='content-items'>8. People</li>
            <br />
            <li className='content-items'>9. Financials</li>
            <br />
            <li className='content-items'>10. Legal & Other Factors</li>
            <br />
            <li className='content-items'>11. Deal Terms</li>
            <br />
            <li className='content-items'>12. Deal Opportunity and Proposition</li>
            <br />
            <li className='content-items'>13. Appendix</li>
          </ul>
        </div>
      </>
    </SimplePageSection>
  )
}

export default TableOfContents