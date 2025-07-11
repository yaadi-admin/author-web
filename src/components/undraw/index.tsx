import React, { FunctionComponent } from 'react';

interface UndrawProps {
  primaryColor: string,
  Illustration: FunctionComponent<{ primarycolor: string, class?: string }>,
  className?: string;
}


function UndrawComponent(props: UndrawProps) {
  const { primaryColor, Illustration, className } = props;
  return (
    <Illustration primarycolor={primaryColor} class={className} />
  )
}

export default UndrawComponent
