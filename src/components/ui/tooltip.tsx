import {
  PiInfo
} from 'react-icons/pi';

import { Text, Tooltip } from 'rizzui';

interface TooltipProps {
  title: string;
  body: string;
  width?: string | number,
  children: React.ReactElement;
}

export default function CustomTooltip(props: TooltipProps) {
  const { title, body, children, width } = props;
  return (
    <Tooltip
      color='invert'
      content={<Content title={title} body={body} width={width} />}
      placement="bottom-start"
    >
      {children}
    </Tooltip>

  );
}

function Content({ title, body, width }: { title: string, body: string, width?: string | number }) {
  const finalWidth = `${width ? width : 'w-[300px]'}`;
  return (<div className={`${finalWidth} text-start p-2`}>
    <Text className="text-sm">
      {body}
    </Text>
  </div>)
}
