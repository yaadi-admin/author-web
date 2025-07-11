import { CiClock2 } from "react-icons/ci";

interface CallDetailsProps {
  estimatedTime?: number;
}
function CallDetails(props: CallDetailsProps) {
  const { estimatedTime } = props;

  return (
    <div className=" p-4 h-[70px] flex  p-2 " style={{}}>
      <div className="w-[80%] flex flex-col gap-2">
        <div className='flex '>
          <CiClock2 className="h-5 w-5 mr-2" />
          <p className='font-secondary'>
            Approximate duration: <b>{estimatedTime}</b>.
          </p>
        </div>
      </div>
      <div className="w-[50%] my-auto">
        {/* <Progressbar value={75} /> */}
      </div>
    </div>
  )
}

export default CallDetails