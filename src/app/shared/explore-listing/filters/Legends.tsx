import React from 'react';
import { Tooltip } from 'rizzui';

export interface Legend {
    label: string;
    description: string;
    color: string;
    bgColor: string;
}

export interface LegendsProps {
    gap?: string; // Tailwind gap class (default: 'gap-3')
    className?: string;
    legends?: Legend[]; // Optionally override the default legends
    children?: React.ReactNode; // Option to override the JSX completely
}

export function Legends({
    gap = 'gap-3',
    className = '',
    legends,
    children,
}: LegendsProps) {
    // Default legends
    const defaultLegends: Legend[] = [
        {
            label: 'High',
            description: 'Businesses with high performance and promising metrics.',
            color: 'text-green-600',
            bgColor: 'bg-green-200',
        },
        {
            label: 'Moderate',
            description: 'Businesses with moderate performance.',
            color: 'text-yellow-600',
            bgColor: 'bg-yellow-200',
        },
        {
            label: 'Low',
            description: 'Businesses with low performance.',
            color: 'text-red-600',
            bgColor: 'bg-red-200',
        },
    ];

    if (children) {
        return <div className={`flex items-center ${gap} ${className}`}>{children}</div>;
    }

    const items = legends || defaultLegends;

    return (
        <div className={`grid grid-cols-3 gap-2 items-center ${gap} ${className}`}>
            {items.map((legend) => (
                <Tooltip
                    key={legend.label}
                    content={<span className="text-sm">{legend.description}</span>}
                    size="lg"
                    placement="bottom"
                    color="invert"
                >
                    <div className="flex items-center gap-1">
                        <span className={`h-3 w-3 rounded-full ${legend.bgColor}`} />
                        <span className={`text-xs font-semibold ${legend.color}`}>{legend.label}</span>
                    </div>
                </Tooltip>
            ))}
        </div>
    );
}