import React from 'react'
import Image from 'next/image';
import { PageSection, Title, Section } from '../components'

function ExecutiveSummary({ data }: any) {
  return (

    <PageSection>
      <>
        <Title>EXECUTIVE SUMMARY & HIGHLIGHTS</Title>
        <div className='text-div'>
          <h2>History</h2>
          <hr className='horizontal-line' />
          <p>
            Comfy Cafe is a thriving café in downtown Toronto, known for its artisanal coffee, fresh pastries, and welcoming atmosphere. Since its establishment in 2018, the café has built a loyal customer base and a strong brand reputation, driven by its commitment to quality and sustainability. With steady revenue growth and a prime location, Comfy Cafe is poised for expansion, offering potential investors a promising opportunity.
          </p>
          <h2>Corporate Structure</h2>
          <hr className='horizontal-line' />
          <div className='image-container'>
            <Image
              src={data?.[10].form?.organisationalChart?.[0]}
              // src="https://firebasestorage.googleapis.com/v0/b/bizbridge-78490.appspot.com/o/cim-builder%2Fcorporate_structure.png?alt=media&token=533caf3f-dc90-4620-ad0c-1d34515b377e"
              alt="Corporate Structure"
              width={0}
              height={0}
              sizes="50vw"
              style={{ width: '50%', height: 'auto' }} // optional
            />
          </div>
        </div>

        <div className='text-div'>
          <h2>Products, services, and customers</h2>
          <hr className='horizontal-line' />
          <h2 className='subheading'>Key products and market positioning</h2>
          <p>
            Comfy Cafe specializes in offering a curated selection of high-quality coffee and fresh pastries, catering to a diverse and discerning customer base. Our key products include:
          </p>

          <ul className='list-div'>
            <li>
              <strong>Specialty Coffee:</strong> Sourced from ethical and sustainable farms, our coffee beans are carefully selected and roasted to perfection. We offer a variety of beverages, from classic espresso-based drinks to seasonal specialties, appealing to both traditional coffee lovers and those seeking unique flavors.
            </li>
            <li>
              <strong>Artisanal Pastries:</strong> Our in-house bakery produces a range of fresh pastries daily, including croissants, muffins, and scones. We also offer a selection of vegan and gluten-free options to accommodate different dietary needs.
            </li>
            <li>
              <strong>Signature Blends:</strong> Comfy Cafe offers proprietary coffee blends that are available for purchase in-store and online, allowing customers to enjoy our distinctive flavors at home.
            </li>
          </ul>

          <p>
            Comfy Cafe stands out as Toronto&apos;s premier café, blending premium, ethically sourced coffee with artisanal pastries in a vibrant, community-focused setting. Our commitment to quality and sustainability creates a unique customer experience that drives loyalty and growth. For potential buyers, Comfy Cafe offers a distinctive brand with strong market appeal and significant expansion potential.
          </p>
        </div>

        <div className='text-div'>
          <h2>Operations and team</h2>
          <hr className='horizontal-line' />
          <h2 className='subheading'>Summary of operations</h2>
          <p>
            Comfy Cafe operates as a premium café in downtown Toronto, offering a range of specialty coffee beverages and artisanal pastries. Our operations are centered around maintaining high-quality standards for both products and customer service. We source coffee beans from ethical farms and manage an in-house bakery to ensure freshness and quality. The café’s layout fosters a welcoming atmosphere for customers to socialize or work. Daily operations include product preparation, customer service, inventory management, and sustainability practices. We also leverage technology for efficient order management and customer engagement, positioning us for scalable growth.

          </p>
          <Section
            title="Key staff and management"
            content={`Comfy Cafe's management team combines extensive experience in the café industry with a passion for exceptional service and sustainable practices.`}
            list={[{ title: 'John Doe', description: 'CEO' }]}
            content3='Together, this team’s expertise and dedication contribute to Comfy Cafe’s success, ensuring a high-quality customer experience and positioning the café for continued growth.'
          />
          <Section
            title="Key assets included (equipment, property, inventory, etc.)"
            content={`Comfy Cafe's key assets include state-of-the-art coffee machines, grinders, and brewing equipment for high-quality beverage preparation, along with commercial ovens and bakery equipment for in-house pastry production. The café is located in prime retail space in downtown Toronto, featuring an inviting interior designed to enhance the customer experience. The inventory consists of premium coffee beans sourced from ethical farms, artisanal pastries, packaging materials, and branded merchandise. Technology assets include integrated POS and order management systems that streamline operations and customer service, while the established brand identity, logos, marketing materials, and strong social media presence drive customer loyalty and market recognition.`}
            list={[{ title: 'Coffee Machines', description: '1000' }]}
          />
        </div>

        <div className='text-div'>
          <h2>Key financials and company drivers</h2>
          <hr className='horizontal-line' />
          <Section
            title="Most Recent EBITDA"
            content={`Comfy Cafe, with a recent EBITDA of $225,000, stands out as a highly attractive investment opportunity due to its robust revenue growth, loyal customer base, and strategic downtown location. The café's premium offerings and strong market position create significant potential for expanding revenue streams and improving margins. While there are risks such as market competition and operational costs, the established brand and proven success offer a solid foundation for overcoming these challenges. This is a prime opportunity to acquire a thriving business with substantial growth potential and capitalize on a well-positioned asset in a dynamic market.`}
          />
          <Section
            title="Most Recent Cash Flow"
            content={`Comfy Cafe's most recent cash flow stands at $200,000, reflecting strong operational efficiency and financial stability. This figure is derived from a net income of $200,000, with adjustments for $10,000 in depreciation and amortization, a $5,000 improvement in working capital, and $15,000 in capital expenditures. The positive cash flow demonstrates the café's robust profitability, effective management of capital investments, and operational performance, making it an attractive investment opportunity with substantial potential for growth and sustained financial health.`}
          />
          <Section
            title="Income Statement and Balance Sheet highlights"
            content={`Comfy Cafe's financial highlights showcase a strong performance, with a recent income statement reporting revenue of $400,000 and a net income of $200,000, supported by efficient cost management and an EBITDA of $225,000. The balance sheet reveals total assets of $500,000, including $50,000 in cash and $150,000 in equipment, against liabilities of $150,000, resulting in a solid net equity of $300,000. These figures underscore the café's robust profitability, financial stability, and strong potential for future growth.`}
          />
        </div>

        <div className='text-div'>
          <h2>Key deal terms</h2>
          <hr className='horizontal-line' />
          <Section
            title="Asking price"
            content={`The asking price for Comfy Cafe is $1.2 million. This valuation reflects the café’s strong financial performance, including a recent revenue of $400,000, an EBITDA of $225,000, and a solid balance sheet with net equity of $300,000. The asking price is based on the business's profitability, growth potential, and strategic location, offering a compelling opportunity for potential buyers.`}
          />
          <Section
            title="Deal horizon"
            content={`The deal horizon for Comfy Cafe is set at 60 days, providing a structured timeline for potential buyers to conduct due diligence, finalize financing, and complete the acquisition process. This period allows for thorough review of financial statements, operational details, and legal agreements, ensuring a smooth and efficient transition of ownership. The 60-day timeframe is designed to accommodate both the buyer's evaluation and the necessary preparations for a successful handover.`}
          />
          <Section
            title="Seller financing and other buyer support options"
            content={`To facilitate the acquisition, the seller offers financing terms covering up to 30% of the purchase price, or $360,000, with a competitive interest rate and a repayment period of up to 5 years. This arrangement allows buyers to manage cash flow while investing in the business. Additionally, the seller provides comprehensive support during the transition, including a 6-month period of post-sale operational and strategic guidance. This support includes training for key staff, assistance with integrating new systems, and ongoing advice to ensure a seamless handover and continued success of Comfy Cafe.`}
          />
        </div>

        <div className='text-div'>
          <Section
            title="Key investment considerations"
            content={`Investing in Comfy Cafe presents several compelling opportunities. The café boasts a strong financial track record, with recent revenues of $400,000 and an EBITDA of $225,000, indicating solid profitability and operational efficiency. Its prime downtown location and loyal customer base underpin its market position and growth potential. The business benefits from a robust brand and commitment to quality, offering opportunities for revenue expansion through new products and additional locations. The proposed seller financing and transition support further mitigate investment risk by easing the financial burden and ensuring a smooth ownership transition. However, prospective buyers should consider market competition and operational costs, which can impact profitability. Overall, Comfy Cafe represents a strategically positioned, financially sound investment with significant upside potential.`}
          />
        </div>
      </>

    </PageSection>
  )
}

export default ExecutiveSummary