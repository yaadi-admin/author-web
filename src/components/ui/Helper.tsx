import React from 'react'
import { FcInfo } from 'react-icons/fc';
import { Text, Button, Tooltip } from 'rizzui';

function Helper({ children, width }: any) {
  return (
    <Tooltip
      color={"invert"}
      size="lg"
      placement="right-start"
      className="z-[10000]"
      content={<CustomContent title={children} width={width} />}>
      <span className='pl-1'>
        <FcInfo className='h-5 w-5' />
      </span>
    </Tooltip>
  )
}

export default Helper
function CustomContent({ title, width = '80' }: { title: string, width: string | number }) {
  const nextWidth = `w-${width} text-start`;
  return (
    <div className={nextWidth}>

      <Text className="text-sm text-white-600">
        {title}
      </Text>
    </div>
  );
}
