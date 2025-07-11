import React from 'react'
import { SimplePageSection, Title } from '../components';

function Disclaimer({ sellerIntake, listing }: any) {
    return (
        <SimplePageSection>
            <div>
                <Title>Disclaimer and Notice</Title>
                <div className='p-6 pb-0 pt-0'>
                    <h2>Confidential and Private Information</h2>

                    <div className="mt-2 flex flex-col gap-4">
                        <p className="legal-notice">Legal Notice: Read this first before viewing this document.</p>
                        <p className=''>The purpose of this Confidential Information Memorandum (the “Memorandum”) is to acquaint and familiarize prospective buyers with a client of <b>{sellerIntake?.brokerIntake?.dba}</b> (the “Business Intermediary”).</p>
                        <p className=''>In order to properly obtain and read this Memorandum, you are required to sign a Confidentiality Agreement that was provided by the Business Intermediary. This Memorandum and any additional information provided by the Business Intermediary or contained in any online Data Room are provided subject to the Confidentiality Agreement.</p>
                        <p className=''>Do not read this Memorandum unless you have signed a Confidentiality Agreement furnished by the Business Intermediary or acknowledged the NDA with Narro on our platform. The Business Intermediary&apos;s contact information is provided at the bottom of this notice. Contact the Business Intermediary immediately in order to obtain and sign a Confidentiality Agreement or return this Memorandum to the Business Intermediary.</p>
                        <p className=''>This Memorandum is confidential and private. Distribution is restricted. It may not be reproduced, copied or replicated in any form including print and digital media without the express and written authorization of the Business Intermediary. This Memorandum is and at all times shall remain the exclusive property of the Business Intermediary. You are responsible for protecting the confidentiality and propriety of the information contained in this Memorandum. Improper disclosure may harm our Client and you will be held responsible for any damages resulting from an improper disclosure on your part.</p>
                        <p className=''>Should it become necessary to present this Memorandum to third parties as part of a due-diligence investigation or to obtain financing, you should advise the third parties that this Memorandum is confidential and that you have signed a Confidentiality Agreement in order to obtain it. You are responsible for maintaining and protecting the confidentiality of this Memorandum and that obligation extends to your employees, advisors, representatives, agents and any other third parties who subsequently receive this Memorandum and the information contained herein.</p>
                        <p className=''>The Business Intermediary, employees, representatives and agents have not made any independent investigation, verification or audit of any of the information contained in this Memorandum and any representation to the contrary is not authorized.</p>
                        <p className=''>No representations or warranties, expressed or implied, are made regarding the accuracy or completeness of the information contained herein and such representations and warranties by Business Intermediary are not authorized.</p>
                        <p className=''>This Memorandum contains statements, estimates and projections provided by the Client concerning anticipated future performance. Such statements, estimates and projections reflect assumptions by our Client concerning anticipated results, which may or may not prove to be correct. No representations, expressed or implied are made as to the accuracy of such statements, estimates and projections.</p>
                        <p className=''>The Business Intermediary represents the Seller(s). It is expressly understood that the Business Intermediary is not an agent or representative of any prospective buyer or recipient of this Memorandum and that the Business Intermediary is not acting and shall not act as a fiduciary of the Buyer.</p>
                        <p className=''>The Business Intermediary does not and shall not provide legal, tax, accounting and risk management advice. Prospective buyers are advised to seek and obtain the counsel of competent professionals.</p>
                    </div>
                    <div className=" flex gap-2 flex-col">
                        <h2>Additional Information:</h2>
                        <p>All communication regarding this Memorandum and requests for additional information should be directed to the Business Intermediary:</p>
                        {
                            sellerIntake?.broker?.firstName && sellerIntake?.broker?.lastName &&
                            <p><strong>{`${sellerIntake?.broker?.firstName} ${sellerIntake?.broker?.lastName}`}</strong></p>
                        }
                        {listing?.brokerIntake?.dba && <p><strong>{listing?.brokerIntake?.dba}</strong></p>}
                        {listing?.brokerIntake?.address && <p><strong>{listing?.brokerIntake?.address} {listing?.brokerIntake?.postalCode}</strong></p>}
                        {sellerIntake?.brokerIntake?.phone &&
                            <p><strong>{`${sellerIntake?.broker?.phone}`}</strong></p>
                        }
                        {sellerIntake?.brokerIntake?.email &&
                            <p><strong>{`${sellerIntake?.broker?.email}`}</strong></p>
                        }
                    </div>
                </div>
            </div>
        </SimplePageSection>
    )
}

export default Disclaimer