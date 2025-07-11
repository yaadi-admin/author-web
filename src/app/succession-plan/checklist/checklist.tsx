'use client';
import React from 'react';
import { useForm, useFormContext, FormProvider } from 'react-hook-form';
import FormSummary from '../dialogue/form-summary';
import Loader from '@/components/ui/loader';
import Document from './document';
import { doc, onSnapshot, setDoc, addDoc, collection, query, where, serverTimestamp, updateDoc } from "firebase/firestore";
import firebase from '@/config/firebase.config';
import { currentSession } from '@/config/session';
import { useRouter } from 'next/navigation';
import { successionPlanCollections } from '@/config/ref/successionPlanCollections';
import { currentSuccessionPlan } from '@/config/succession-plan/succession-plan-user';
import { useCurrentSession } from '@/config/succession-session';


const documents = [
  { title: 'Business Incorporation Documents', info: `Business incorporation documents, such as the certificate of incorporation, partnership agreements, titles, and other necessary legal papers, are crucial for establishing and operating a business entity.`, isAlreadyPrepared: false, isEasyToAccess: false,NotAvailable: false, details: '' },
  { title: 'Key Contracts and Legal Documents', info: `Includes lease agreements, customer and supplier contracts, non-disclosure agreements, intellectual property (copyrights, patents, trademarks), loan/credit agreements, insurance policies (e.g., property, vehicular, product liability), and business licences and permits.`, isAlreadyPrepared: false, isEasyToAccess: false,NotAvailable: false, details: '' },
  { title: 'Will', isAlreadyPrepared: false, info: `A will details asset management and distribution after death, including the business, clarifying roles to prevent disputes. It facilitates strategic planning for an efficient transfer of assets to beneficiaries.`, isEasyToAccess: false,NotAvailable: false, details: '' },
  { title: 'Financial Statements (at least 3 years)', info: `Financial statements such as the Income Statement, Balance Sheet, and Cash Flow Statement summarise a company's financial performance and position.`, isAlreadyPrepared: false, isEasyToAccess: false, NotAvailable: false,details: '' },
  {
    title: 'Tax returns (at least 3 years)', info: `Filings with the tax authorities for business income taxes, withholding taxes, and any other documentation received or sent to tax authorities.
`, isAlreadyPrepared: false, isEasyToAccess: false, NotAvailable: false,details: ''
  },
  { title: 'Supporting documents (at least 3 years)', info: `Supporting documents include all relevant records pertaining to transactions, receipts, invoices, and other supporting documents for both income and expenses are included. `, isAlreadyPrepared: false, isEasyToAccess: false,NotAvailable: false, details: '' },
  { title: 'Business valuation statement (less than 1 year old)', info: `Business valuation statements are prepared estimates by third parties of a business's economic value based on financial analysis, market conditions, and industry trends. `, isAlreadyPrepared: false, isEasyToAccess: false, NotAvailable: false,details: '' },
  { title: 'Employee manual or handbook', isAlreadyPrepared: false, info: `Employee manuals and handbooks serve as comprehensive guides for employees, covering a range of crucial topics such as expected conduct, job instructions, benefits, and promotion criteria.`, isEasyToAccess: false,NotAvailable: false, details: '' },
  { title: 'SOPs (standard operating procedure)', info: `Standard Operating Procedures (SOPs) cover critical business areas including sales, customer support, purchasing, inventory management, finances, operations, and compliance, outlining the people, processes, timing, inputs, and performance indicators to those processes. `, isAlreadyPrepared: false, isEasyToAccess: false,NotAvailable: false, details: '' },

];

export default function ChecklistWrapper(props: any) {
  const { successionPlan } = successionPlanCollections() as any;

  const template = successionPlan[0];

  const methods = useForm({});

  if (!template) return <Loader />;

  return (
    <FormProvider {...methods}>
      <Checklist {...props} card={template} />
    </FormProvider>
  )
}


function Checklist(props: { card: any; }) {
  const { card } = props;
  const { register, handleSubmit } = useFormContext();
  const currentUser = currentSession() as any;
  const { push } = useRouter();
  const { updateUser } = currentSuccessionPlan() as any;
  const { updateIntake } = useCurrentSession();


  const onSubmit = async (data: any) => {
    const docRef = doc(collection(firebase.firestore, "succession_plan"), currentUser?.id);
    const nextData = Object.entries(data.documents).map(([document, details]) => ({
      document,
      // @ts-ignore
      ...details
    }));
    await updateDoc(docRef, {
      checklist: nextData,
    });
    await updateIntake(
      {
        status: 'active',
      }
    )
    await updateUser({ checklist: true })
    push('/succession-plan/preview')
  };
  if (card?.section4) {
    const title =
      <div className='flex'>
        <div className=''>
          {card?.section4?.title}
        </div>
      </div>;
    return (
      <div style={{ height: 'inherit' }} className='col-span-full flex'>
        <div className="ml-10 pt-0 flex flex-col w-full mr-10">
          <h2 className='text-primary'>Checklist</h2>
          <h3 className='mt-2'>{card.section4.title}</h3>
          <p className='mt-3'>{card.section4.description}</p>
          <p className='mt-3'>Having these documents in place ensures a clear, legally binding transition of ownership and helps prevent disputes or misunderstandings. <b>Please complete the table below by checking the boxes if you agree with the questions and provide your input for the final column.</b></p>
          <form
            id={`rhf-checklist`}
            onSubmit={handleSubmit(onSubmit)}
            className=" "
          >
            <div className='col-span-full'>

              <table className='mt-10 col-span-full min-w-full bg-white border border-gray-200 mb-[300px]'>

                <thead>
                  <tr>
                    <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">Document</th>
                    <th className="px-2 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">Already Prepared?</th>

                   

                    <th className="px-2 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">Easy to Access?</th>
                    <th className="px-2 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">Not Available</th>
                    <th className="px-2 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">Who is in possession / Where can they be found?</th>
                  </tr>
                </thead>
                <tbody>

                  {documents.map((document, index) => (
                    <Document key={index} document={document} index={index} />
                  ))}

                </tbody>
              </table>
            </div>
          </form>
        </div>

      </div>
    );
  } else {
    return <Loader />
  }
}

