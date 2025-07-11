import React from 'react';
import { Tooltip } from 'rizzui';
import { MdLightbulb, MdRocketLaunch, MdTrendingUp, MdBusiness, MdOutlineDomain } from 'react-icons/md';

export interface Stage {
  label: string;
  description: string;
  Icon: React.ComponentType<{ className?: string }>;
}

export interface BusinessStagesProps {
  gap?: string; // Tailwind gap class (default: 'gap-4')
  className?: string;
  stages?: Stage[]; // Optionally override the default stages
  children?: React.ReactNode; // Option to override the JSX completely
}

export function BusinessStages({
  gap = 'gap-4',
  className = '',
  stages,
  children,
}: BusinessStagesProps) {
  // Default stages
  const defaultStages: Stage[] = [
    {
      label: 'Idea',
      description: 'The business is in its very early concept phase.',
      Icon: MdLightbulb,
    },
    {
      label: 'Startup',
      description: 'The business has launched and is working to gain traction.',
      Icon: MdRocketLaunch,
    },
    {
      label: 'Growth',
      description: 'The business is expanding and increasing revenue.',
      Icon: MdTrendingUp,
    },
    {
      label: 'Established',
      description: 'The business is well-established and sustaining growth.',
      Icon: MdBusiness,
    },
    {
      label: 'Mature',
      description: 'The business is mature with stable operations and market share.',
      Icon: MdOutlineDomain,
    },
  ];

  // If children are provided, render them instead of default JSX
  if (children) {
    return <div className={`flex items-center ${gap} ${className}`}>{children}</div>;
  }

  const items = stages || defaultStages;

  return (
    <div className={`grid grid-cols-5 ${gap} ${className}`}>
      {items.map((stage) => (
        <Tooltip
          key={stage.label}
          content={<span className="text-sm">{stage.description}</span>}
          size="lg"
          placement="bottom"
          color="invert"
        >
          <div className="flex flex-col items-center bg-white p-3 rounded-lg transition">
            <stage.Icon className="h-8 w-8 text-gray-700 mb-2" />
            <span className="text-sm font-medium text-gray-700">{stage.label}</span>
          </div>
        </Tooltip>
      ))}
    </div>
  );
}