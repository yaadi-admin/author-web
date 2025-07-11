import Document from '@/app/succession-plan/checklist/document';
import UndrawComponent from '@/components/undraw';
import { SvgDoneChecking } from "iblis-react-undraw";
import styles from './essential-documents.module.css';

interface EssentialDocumentsProps {
  intake?: any,
  primaryColor: string
}

function EssentialDocuments(props: EssentialDocumentsProps) {
  const { intake, primaryColor } = props;
  return (
    <div className={styles.page} id="Essential Documents">

      <div className="flex flex-col gap-5 pt-5">
        <div className="flex items-center justify-center h-full">
          <h1 id="Essential Documents">Essential Documents</h1>
          <UndrawComponent
            primaryColor={primaryColor}
            Illustration={SvgDoneChecking}
            className="w-1/4 ml-auto mb-2"
          />
        </div>
        <div className='col-span-full'>

          <table className='col-span-full min-w-full  bg-white border border-gray-200 mb-[300px]'>

            <thead>
              <tr>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 tracking-wider" style={{ color: `${primaryColor}` }}>Document</th>
                <th className="px-2 py-3 border-b-2 border-gray-300 text-left leading-4 tracking-wider" style={{ color: `${primaryColor}` }}>Already Prepared?</th>
                <th className="px-2 py-3 border-b-2 border-gray-300 text-left leading-4 tracking-wider" style={{ color: `${primaryColor}` }}>Easy to Access?</th>
                <th className="px-2 py-3 border-b-2 border-gray-300 text-left leading-4 tracking-wider" style={{ color: `${primaryColor}` }}>Not Available</th>
                <th className="px-2 py-3 border-b-2 border-gray-300 text-left leading-4 tracking-wider" style={{ color: `${primaryColor}` }}>Who is in possession / Where can they be found?</th>
              </tr>
            </thead>
            <tbody>

              {intake?.checklist?.map((document: any, index: number) => (
                <Document readOnly key={index} document={document} index={index} primaryColor={primaryColor} />
              ))}

            </tbody>
          </table>
        </div>
      </div>

    </div>
  )
}

export default EssentialDocuments