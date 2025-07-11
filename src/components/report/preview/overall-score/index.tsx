import styles from './overall-score.module.css';

import Markdown from '@/components/markdown';
import UndrawComponent from '@/components/undraw';
import { SvgGoals } from "iblis-react-undraw";
import GaugeChartScore from '../gaugechart';

interface OverallScoreProps {
  scores: number[],
  overAllRecommendations: string,
  primaryColor: string,
}


const VERY_LOW = 'bg-[#E46A33]';
const LOW = 'bg-[#F29E1D]';
const MODERATE = 'bg-[#FDCF3B]';
const HIGH = 'bg-[#9CB958]';
const VERY_HIGH = 'bg-[#468960]';
const COLORS = [
  { name: 'Very Low', bg: VERY_LOW },
  { name: 'Low', bg: LOW },
  { name: 'Moderate', bg: MODERATE },
  { name: 'High', bg: HIGH },
  { name: 'Very High', bg: VERY_HIGH },
];


function OverallScore(props: OverallScoreProps) {
  const { scores, overAllRecommendations, primaryColor } = props;

  const overallScore = scores.length > 0
    ? Math.ceil(scores.reduce((acc: number, score: number) => acc + score, 0) / 7)
    : 0;

  const color = overallScore <= 31 ? 'text-[#FF0000]' : overallScore <= 66 ? 'text-[#FFA500]' : 'text-[#008000]'


  return (
    <div className={`w-full h-full rounded overflow-hidden bg-white ${styles.page}`} style={{
      borderTop: `4px solid ${primaryColor}`,
      boxShadow: 'inset 0 0 4px rgba(0, 0, 0, 0.1)',
    }} id={'Succession Strategy Readiness Score'} >
      <div className="flex flex-col gap-5 mt-5 pb-5 px-4 py-5"
        style={{
          backgroundSize: 'cover',
        }} >
        <h1 className='flex-col'>Succession Strategy Readiness Score</h1>
        <div className="grid grid-cols-1 gap-4">


          <table style={{ width: '200mm' }}>
            <tbody>
              <tr>
                <td className='w-1/2'>
                  <div className='-ml-[150px]'>
                    <GaugeChartScore score={overallScore} thickness={10}
                    />
                  </div>
                </td>
                <td>
                  <UndrawComponent
                    primaryColor={primaryColor}
                    Illustration={SvgGoals}
                    className="w-1/2 ml-auto mb-2"
                  />
                </td>
              </tr>
            </tbody>
          </table>


          {/* <div className='w-full flex mt-8 flex-col container mt-8'>
            <div className='w-full mx-auto items-center relative'>
              <GaugeChartScore
                score={overallScore}
                width={500}
                height={300}
              />
            </div>
          </div> */}

          <div className="flex justify-between items-center mb-1 p-4">
            {COLORS.map((color, i) => (
              <div key={color.name} className="flex flex-col items-center">
                <div className={`w-3 h-3 ${color.bg} rounded-full`}></div>
                <span className="text-xs mt-1">{color.name}</span>
              </div>
            ))}
          </div>


          <Markdown output={`${overAllRecommendations}`} primaryColor={primaryColor} />

          {/* <div className="flex justify-center items-center">
        <img className='w-80 h-80' src="/undraw/score.svg" alt="Score Illustration"></img>
      </div> */}

        </div>
      </div>
    </div>

  )
}

export default OverallScore