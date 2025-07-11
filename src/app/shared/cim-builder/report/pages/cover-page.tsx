import Image from 'next/image';
import { SimplePageSection } from '../components';

interface CoverPageProps {
  data: any,
  sellerIntake: any,
  listing: any,
}

function CoverPage({ data, sellerIntake, listing }: CoverPageProps) {

  const coverPage = data.find((t: any) => t.order === 0)

  const businessPhoto = coverPage?.form?.businessPhotos?.[0]
  const companyLegalName = listing?.businessName;
  const dba = sellerIntake?.dba;
  const website = sellerIntake?.website;
  const ownerName = `${sellerIntake?.seller?.firstName} ${sellerIntake?.seller?.lastName}`
  const ownerContact = sellerIntake?.contact;

  return (
    <SimplePageSection className='cover-page'>
      <div>
        <div className="mx-auto">
          <div className="flex justify-around items-center my-8">
            <div className="flex space-x-1">
              <span className="w-3 h-3 bg-black inline-block rounded-full"></span>
              <span className="w-3 h-3 bg-gray-600 inline-block rounded-full"></span>
              <span className="w-3 h-3 bg-gray-400 inline-block rounded-full"></span>
            </div>
            <div className="text-2xl text-bold text-gray-600">CONFIDENTIAL MEMORANDUM</div>
            <div className="text-2xl custom-text-style">SEPTEMBER, 2024</div>
          </div>
          <div className="mb-8">
            {/* <Image
              src={businessPhoto}
              width={900}
              height={900}
              className='mx-auto w-full'
              alt='Alternative Text'
            /> */}
          </div>
          <div className="text-center mb-16">
            <div className="text-8xl font-black mb-2 uppercase">{companyLegalName}</div>
            <div className="text-6xl font-thin mt-6 text-gray-400 uppercase">{dba}</div>
          </div>
          <div className="w-full">
            <div className="text-center text-gray-600 custom-text-style mb-5 text-3xl ">PRESENTED FOR SALE BY:</div>
            <div className="text-center">
              {ownerName && <div className='text-2xl uppercase'>{ownerName}</div>}
              {website && <div className='text-2xl uppercase'>{website}</div>}
              {ownerContact && <div className='text-2xl uppercase'>{ownerContact}</div>}
            </div>
          </div>
        </div>
      </div>
    </SimplePageSection >
  )
}

export default CoverPage