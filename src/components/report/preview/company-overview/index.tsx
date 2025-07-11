import UndrawComponent from "@/components/undraw";
import { SvgBuilding } from "iblis-react-undraw";
import { FaUserTie, } from "react-icons/fa6";
import OwnershipPieChart from '../piechart';
import styles from './company-overview.module.css';

interface CompanyOverviewProps {
  intake: any,
  primaryColor: string,
  secondaryColor: string,
}

function CompanyOverview(props: CompanyOverviewProps) {
  const { intake, primaryColor, secondaryColor } = props;

  return (

    <div className={styles.page} id="Company Overview">
      <div className="flex flex-col gap-5">


        <div className={styles.header}>
          <h1 id="Company Overview" className="mb-2">Company Overview</h1>
          <UndrawComponent
            primaryColor={primaryColor}
            Illustration={SvgBuilding}
            className="w-1/6 ml-auto mb-2"
          />
        </div>

        <div className='flex bg-white'>
          <div className="w-1/2">
            <div className="mb-2">

              <span className="font-semibold">Company Name: </span>
              {intake?.companyName}
            </div>

            <div className="mb-2">
              <span className="font-semibold">Year Incorporated: </span>
              {intake?.yearIncorporated}
            </div>
            <div className="mb-2">
              <span className="font-semibold">Legal Structure: </span>
              {intake?.legalStructure}
            </div>
            <div className="mb-2">
              <span className="font-semibold">Province: </span>
              {intake?.province}
            </div>
            <div className="mb-2">
              <span className="font-semibold">Business Number: </span>
              {intake?.registrationNumber}
            </div>
            <div className="mb-2">
              <span className="font-semibold">Contact: </span>
              {intake?.contact}
            </div>
            <div className="mb-2">
              <span className="font-semibold">Website: </span>
              <a href={intake?.website} className="hover:underline" style={{ color: '#236C95' }}>{intake?.website}
              </a>
            </div>

            <div className="flex items-center mb-4 mt-10">
              <div className="mr-2" style={{ color: primaryColor }}>
                <FaUserTie className="h-8 w-8" />
              </div>
              <h2 className="text-gray-800 font-semibold text-lg" style={{ color: primaryColor }}>Leadership Team</h2>
            </div>

            <div className="space-y-4">
              {intake.leadershipTeam.map((member: any) => (
                <div key={member.id} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-12 h-12 flex items-center justify-center rounded-full bg-[#dfe0e0] text-gray-500 font-bold">
                      {member.name.charAt(0)}
                    </div>
                    <div className="ml-4">
                      <p className="text-gray-800 font-semibold">{member.name}</p>
                      <p className="text-gray-500 text-sm">{member.position}</p>
                    </div>
                  </div>

                </div>
              ))}
            </div>

          </div>




          {/* <div className={styles.chart}> */}
          <div className='w-1/2'>
            <div className={styles.owners}>
              <div className='w-full'>
                <div className="mb-2">
                  <span className="font-semibold">Current Owner: </span>
                  {intake?.currentOwner}
                </div>

                <div className='font-semibold'>Other owners:</div>

                <table className='mt-2 col-span-full min-w-full bg-white border border-gray-200 '>
                  <thead>
                    <tr>
                      <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 tracking-wider" style={{ color: primaryColor }}>Name</th>
                      <th className="px-2 py-3 border-b-2 border-gray-300 text-left leading-4 tracking-wider" style={{ color: primaryColor }}>Percentage</th>
                    </tr>
                  </thead>
                  <tbody>
                    {intake?.otherOwners?.map((owner: any, index: number) => {
                      if (!owner.ownerName.trim().length) return null;
                      return (
                        <tr key={`owner.ownerName-${index}`}>
                          <td className="px-2 py-3">{owner.ownerName}</td>
                          <td className="px-2 py-3">{owner.percentage ? `${owner.percentage}%` : ''}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>


            </div>
            <div className='mt-5'>
              <span className="font-semibold ">Equity Ownership Chart: </span>
              <OwnershipPieChart intake={intake} primaryColor={primaryColor} secondaryColor={secondaryColor} />
            </div>
          </div>
          {/* </div> */}
        </div>
      </div>


      <footer className={`${styles.footer}`}>
        <div className="flex flex-col text-gray-600 ">
          <div className="text-white rounded-md w-100 h-32 flex flex-col justify-center items-center text-center p-6 shadow-lg" style={{ backgroundColor: primaryColor }}>

            {/* <IoLocationOutline className="h-8 w-8" /> */}

            {/* <h2 className="text-lg text-white font-semibold mb-2">Reach Us</h2>
            <p className="text-white text-base mb-1">{intake.contact}</p> */}
            {/* <p className="text-white text-base mb-1">{intake.province}</p> */}
            <p className="text-white text-base">{intake.email}</p>
          </div>
        </div>
      </footer>
    </div>

  )
}

export default CompanyOverview