import React from 'react';

// Define the props interface with the properties that the component expects
interface SemiCircleGaugeProps {
  value: any;
  min?: number;
  max?: number;
  width?: number;
  height?: number;
  thickness: number
}

// Use the interface in React.FC to type the component
const SemiCircleGauge: React.FC<SemiCircleGaugeProps> = ({
  value,
  min = 0,
  max = 100,
  width = 200,
  height = 100,
  thickness
}) => {
  const percentage = ((value - min) / (max - min)) * 100;
  const radius = Math.min(width, height) / 2;
  const colorArcRadius = radius;
  const dottedArcRadius = radius - 20;
  const centerX = width / 2;
  const centerY = height;
  const startAngle = -90;
  const endAngle = 90;
  const angleRange = endAngle - startAngle;
  const valueAngle = (percentage / 100) * angleRange + startAngle;
  const strokeWidth = thickness;
  const gap = 8;

  const getCoordinatesForAngle = (angle: number, arcRadius: number) => {
    const radians = (angle - 90) * (Math.PI / 180);
    return {
      x: centerX + arcRadius * Math.cos(radians),
      y: centerY + arcRadius * Math.sin(radians),
    };
  };

  const createArc = (
    startAnglePercent: number,
    endAnglePercent: number,
    gradientId: string
  ) => {
    const start = (startAnglePercent * angleRange) / 100 + startAngle + gap / 2;
    const end = (endAnglePercent * angleRange) / 100 + startAngle - gap / 2;

    return (
      <path
        key={`${start}-${end}-${gradientId}`}
        d={`M ${getCoordinatesForAngle(start, colorArcRadius).x} ${getCoordinatesForAngle(start, colorArcRadius).y} 
           A ${colorArcRadius} ${colorArcRadius} 0 0 1 ${getCoordinatesForAngle(end, colorArcRadius).x} ${getCoordinatesForAngle(end, colorArcRadius).y}`}
        fill="none"
        stroke={`url(#${gradientId})`}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    );
  };

  const indicatorPosition = getCoordinatesForAngle(valueAngle, colorArcRadius);

  const getIndicatorColor = () => {
    if (percentage <= 20) return '#E46A33';
    if (percentage <= 40) return '#F29E1D';
    if (percentage <= 60) return '#FDCF3B';
    if (percentage <= 80) return '#9CB958';
    return '#468960';
  };

  const getScoreLabel = () => {
    if (percentage <= 20) return 'Very Low';
    if (percentage <= 40) return 'Low';
    if (percentage <= 60) return 'Moderate';
    if (percentage <= 80) return 'High';
    return 'Very High';
  };

  const indicatorColor = getIndicatorColor();
  console.log('sdsd', indicatorColor);
  const scoreLabel = getScoreLabel();

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height + 40}`}>
      {/* Define gradients for each section */}
      <defs>
        <linearGradient id="gradient-red-orange" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="100%" stopColor="#E46A33" />
        </linearGradient>
        <linearGradient id="gradient-orange" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="100%" stopColor="#F29E1D" />
        </linearGradient>
        <linearGradient id="gradient-yellow" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="100%" stopColor="#FDCF3B" />
        </linearGradient>
        <linearGradient id="gradient-light-green" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="100%" stopColor="#9CB958" />
        </linearGradient>
        <linearGradient id="gradient-green" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="100%" stopColor="#468960" />
        </linearGradient>
        {/* Define a filter for the blur shadow */}
        {/* <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="8" result="blur" />
          <feOffset in="blur" dx="4" dy="4" result="offsetBlur" />
          <feFlood floodColor={"#9CB958"} result="color" />
          <feComposite in2="offsetBlur" operator="in" />
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter> */}
        {/* Define a filter for the shadow of the dotted arc */}
        <filter id="dotted-shadow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="3" result="blur" />
          <feOffset in="blur" dx="2" dy="2" result="offsetBlur" />
          <feFlood floodColor="#cccccc" result="color" />
          <feComposite in2="offsetBlur" operator="in" />
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Color-coded sections with gradients */}
      {createArc(0, 20, 'gradient-red-orange')} {/* Red-Orange section: 0-20% */}
      {createArc(20, 40, 'gradient-orange')} {/* Orange section: 20-40% */}
      {createArc(40, 60, 'gradient-yellow')} {/* Yellow section: 40-60% */}
      {createArc(60, 80, 'gradient-light-green')} {/* Light Green section: 60-80% */}
      {createArc(80, 100, 'gradient-green')} {/* Green section: 80-100% */}

      {/* Dotted arc line with shadow */}
      <path
        d={`M ${getCoordinatesForAngle(startAngle, dottedArcRadius).x} ${getCoordinatesForAngle(startAngle, dottedArcRadius).y} 
           A ${dottedArcRadius} ${dottedArcRadius} 0 0 1 ${getCoordinatesForAngle(endAngle, dottedArcRadius).x} ${getCoordinatesForAngle(endAngle, dottedArcRadius).y}`}
        fill="none"
        stroke="#cccccc"
        strokeLinecap="round"
        strokeWidth="2"
        strokeDasharray="1, 13"
        filter="url(#dotted-shadow)"
      />

      {/* Indicator circle with shadow */}
      <circle
        style={{ filter: `drop-shadow(0px 0px 12px ${indicatorColor})` }}  // Example: orange shadow using hex
        cx={indicatorPosition.x}
        cy={indicatorPosition.y}
        r={thickness}
        fill={indicatorColor}
      // filter="url(#shadow)"
      />

      {/* White circle inside the indicator */}
      <circle
        cx={indicatorPosition.x}
        cy={indicatorPosition.y}
        r="3"
        fill="white"
      />

      {/* Center text for the score */}
      <text
        x={centerX}
        y={centerY - 20}
        textAnchor="middle"
        fontSize="40"
        fontWeight="bold"
      >
        {value}
      </text>

      {/* Label text below the score, closer to the score */}
      <text
        x={centerX}
        y={centerY + 5}
        textAnchor="middle"
        fontSize="16"
        className='font-semibold'
        fill={indicatorColor}
      >
        {scoreLabel}
      </text>

      {/* Min value */}
      <text
        x={centerX - radius}
        y={centerY + 20}
        textAnchor="middle"
        fontSize="12"
      >
        {min}
      </text>

      {/* Max value */}
      <text
        x={centerX + radius}
        y={centerY + 20}
        textAnchor="middle"
        fontSize="12"
      >
        {max}
      </text>
    </svg>
  );
};

interface GaugeProps {
  score: number;
  width?: number;
  height?: number;
  thickness?: number;
}

export default function GaugeChartScore({ score, width, height = 200, thickness }: GaugeProps) {
  return (
    <div className="flex flex-col items-center justify-center" style={{
      marginTop: `-${height / 3}px`,
    }}>
      <SemiCircleGauge value={score} min={0} max={100} width={width || 400} height={height} thickness={thickness || 20} />
    </div>
  );
}