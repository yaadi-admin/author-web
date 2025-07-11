import Advisor from '@/app/succession-plan/intake/advisor';
import UndrawComponent from '@/components/undraw';
import { SvgMeetTheTeam } from "iblis-react-undraw";
import styles from './advisory-team.module.css';

interface AdvisoryTeamProps {
  intake: any;
  primaryColor: string;
}

function AdvisoryTeam(props: AdvisoryTeamProps) {
  const { intake, primaryColor } = props;
  return (
    <div className={styles.page} id="Advisory Team">
      <div className="flex flex-col gap-5 mt-5 pb-5">
        <div className='flex'>
          <h1 className='mb-10'>Advisory Team</h1>
          <UndrawComponent
            primaryColor={primaryColor}
            Illustration={SvgMeetTheTeam}
            className="w-1/6 ml-auto mb-2"
          />
        </div>


        <div className="mt-10 grid grid-cols-1 grid-cols-2 gap-4">
          {intake?.advisors?.map((advisor: any, index: number) => (
            <Advisor readOnly key={index} advisor={advisor} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdvisoryTeam;
