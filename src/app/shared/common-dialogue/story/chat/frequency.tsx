import React, { useEffect, useRef, useState } from 'react';

interface FrequencyProps {
  frequencyData: Uint8Array;
  bgColor?: string;
}

const Frequency: React.FC<FrequencyProps> = ({ frequencyData, bgColor = 'bg-primary-color' }): React.ReactElement => {

  const containerRef = useRef<HTMLDivElement>(null);
  const [parentHeight, setParentHeight] = useState<number>(0);

  useEffect(() => {
    if (containerRef.current) {
      const updateParentHeight = () => {
        setParentHeight(containerRef.current?.clientHeight || 0);
      };

      updateParentHeight();

      // Update parentHeight whenever the container size changes
      const resizeObserver = new ResizeObserver(updateParentHeight);
      resizeObserver.observe(containerRef.current);

      return () => resizeObserver.disconnect();
    }
  }, [containerRef]);

  return (
    <div ref={containerRef} className="flex items-center gap-0.5 h-full">
      {Array.from(frequencyData).reverse().map((data, index) => (
        <div
          key={index}
          className={`transform -translate-x-1/2 w-1 ${bgColor} rounded-md`}
          style={{
            height: `${(data / 255) * parentHeight}px`,
            minHeight: '9px',
          }}
        />
      ))}

      {Array.from(frequencyData).map((data, index) => (
        <div
          key={index}
          className={`transform -translate-x-1/2 w-1 ${bgColor} rounded-md`}
          style={{
            height: `${(data / 255) * parentHeight}px`,
            minHeight: '9px',
          }}
        />
      ))}
    </div>
  );
};

export default Frequency;
