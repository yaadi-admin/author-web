import Tooltip from '@/components/ui/tooltip';
import { Button } from "rizzui";
import { GrCircleInformation } from "react-icons/gr";
import { LuMessageCircle, } from "react-icons/lu";


interface CallTitleProps {
  isChatShown: boolean;
  onToggle: () => void;
  info?: string,
  title: string,
}
function CallTitle(props: CallTitleProps) {
  const { isChatShown, onToggle, title, info } = props;

  return (
    <div className="flex items-center rounded-tl-lg rounded-tr-lg"
      style={{
        borderTopRightRadius: !isChatShown ? '0.75rem' : '',
      }}>
      {info &&
        <Tooltip title="" body={info}>
          <Button variant="text" className=''>
            <GrCircleInformation className="text-3xl text-black font-bold" />
          </Button>
        </Tooltip>
      }
      <h1 className="text-black text-2xl font-semibold p-4">
        {title}
      </h1>

      <div className='ml-auto'>
        {!isChatShown &&
          <Button variant='text' onClick={onToggle}>
            <LuMessageCircle className='mr-2 h-6 w-6 text-black' />
            <p className='text-black text-md font-semibold'>Show</p>
          </Button>
        }
      </div>
    </div>
  )
}

export default CallTitle;