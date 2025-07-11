import React, { useState } from 'react';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import { routes } from '@/config/routes';

interface HeroVariantProps {
    active?: boolean;
    push: (url: string) => void;
    variantId?: number;
    email: string;
    setEmail: (email: string) => void;
    handleSubmit: (variant: number) => void;
    hash?: string;
}

interface FeatureValue {
    type: 'check' | 'percentage' | 'text';
    value: boolean | string;
    tooltip?: string;
}

interface ComparisonRow {
    feature: string;
    narro: FeatureValue;
    websites: FeatureValue;
    others: FeatureValue;
}

// Updated comparison data including narro vs. Competitors context.
const initialComparisonData: ComparisonRow[] = [
    {
        feature: 'Exclusivity & Membership',
        narro: {
            type: 'text',
            value: 'Elite & vetted',
            tooltip: 'narro: Curated elite community'
        },
        websites: {
            type: 'text',
            value: 'Open access',
            tooltip: 'Competitors: Mass-market membership'
        },
        others: {
            type: 'text',
            value: 'Open access',
            tooltip: 'Competitors: Mass-market membership'
        }
    },
    {
        feature: 'Precision Matchmaking',
        narro: {
            type: 'text',
            value: 'Tailored AI match',
            tooltip: 'narro: Precise, AI-driven'
        },
        websites: {
            type: 'text',
            value: 'Generic matching',
            tooltip: 'Competitors: Less personalized'
        },
        others: {
            type: 'text',
            value: 'Generic matching',
            tooltip: 'Competitors: Less personalized'
        }
    },
    {
        feature: 'Streamlined Onboarding',
        narro: {
            type: 'text',
            value: 'AI-powered',
            tooltip: 'narro: Seamless verification'
        },
        websites: {
            type: 'text',
            value: 'Manual process',
            tooltip: 'Competitors: Slower, manual steps'
        },
        others: {
            type: 'text',
            value: 'Manual process',
            tooltip: 'Competitors: Slower, manual steps'
        }
    },
    {
        feature: 'Real-Time Market Insights',
        narro: {
            type: 'text',
            value: 'Dynamic data',
            tooltip: 'narro: Up-to-date analytics'
        },
        websites: {
            type: 'text',
            value: 'Delayed data',
            tooltip: 'Competitors: Static info'
        },
        others: {
            type: 'text',
            value: 'Delayed data',
            tooltip: 'Competitors: Static info'
        }
    },
    {
        feature: 'Curated Opportunities',
        narro: {
            type: 'text',
            value: 'Quality listings',
            tooltip: 'narro: High-potential SMBs'
        },
        websites: {
            type: 'text',
            value: 'Broad listings',
            tooltip: 'Competitors: Less selective'
        },
        others: {
            type: 'text',
            value: 'Broad listings',
            tooltip: 'Competitors: Less selective'
        }
    },
    {
        feature: 'Enhanced Communication',
        narro: {
            type: 'text',
            value: 'Integrated tools',
            tooltip: 'narro: Direct & efficient'
        },
        websites: {
            type: 'text',
            value: 'Basic tools',
            tooltip: 'Competitors: Basic features'
        },
        others: {
            type: 'text',
            value: 'Basic tools',
            tooltip: 'Competitors: Basic features'
        }
    },
    {
        feature: 'Transparency & Trust',
        narro: {
            type: 'text',
            value: 'Rigorous checks',
            tooltip: 'narro: Strict verification'
        },
        websites: {
            type: 'text',
            value: 'Less scrutiny',
            tooltip: 'Competitors: Lower standards'
        },
        others: {
            type: 'text',
            value: 'Less scrutiny',
            tooltip: 'Competitors: Lower standards'
        }
    },
];

type SortColumn = 'feature' | 'narro' | 'websites' | 'others';
type SortDirection = 'asc' | 'desc';

export function WhyHero({ push, email, setEmail, handleSubmit, hash }: HeroVariantProps) {
    const [sortColumn, setSortColumn] = useState<SortColumn>('feature');
    const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

    const handleSort = (column: SortColumn) => {
        if (sortColumn === column) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortColumn(column);
            setSortDirection('asc');
        }
    };

    const sortedData = [...initialComparisonData].sort((a, b) => {
        const getValue = (row: ComparisonRow, col: SortColumn) => {
            const cell = row[col] as any;
            if (cell.type === 'check') {
                return cell.value ? 1 : 0;
            }
            return String(cell.value);
        };

        const valA = getValue(a, sortColumn);
        const valB = getValue(b, sortColumn);

        if (valA < valB) return sortDirection === 'asc' ? -1 : 1;
        if (valA > valB) return sortDirection === 'asc' ? 1 : -1;
        return 0;
    });

    const renderCell = (cell: FeatureValue) => {
        if (cell.type === 'check') {
            return cell.value ? (
                <CheckCircleIcon className="mx-auto w-5 h-5 text-green-600" aria-label="Yes" />
            ) : null;
        }
        return (
            <span className="font-semibold text-gray-900">
                {cell.value}
            </span>
        );
    };

    return (
        <div className="p-6 overflow-x-auto">
            <h2 className="text-3xl font-bold text-blue-600 mb-4">Our Comparison</h2>
            <div className="min-w-[600px]">
                <table className="w-full border-b border-gray-200 print:w-full">
                    <thead className="sticky top-0 bg-white" aria-label="Comparison Table Header">
                        <tr className="border-b border-gray-200">
                            <th
                                scope="col"
                                style={{ width: '40%' }}
                                className="text-left py-4 font-semibold text-gray-700 cursor-pointer"
                                onClick={() => handleSort('feature')}
                                tabIndex={0}
                            >
                                Feature
                            </th>
                            <th
                                scope="col"
                                style={{ width: '20%' }}
                                className="text-center py-4 font-semibold cursor-pointer"
                                onClick={() => handleSort('narro')}
                                tabIndex={0}
                            >
                                Narro™
                            </th>
                            <th
                                scope="col"
                                style={{ width: '20%' }}
                                className="text-center py-4 font-semibold cursor-pointer"
                                onClick={() => handleSort('websites')}
                                tabIndex={0}
                            >
                                Investor Websites
                            </th>
                            <th
                                scope="col"
                                style={{ width: '20%' }}
                                className="text-center py-4 font-semibold cursor-pointer"
                                onClick={() => handleSort('others')}
                                tabIndex={0}
                            >
                                Others
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedData.map((row, idx) => (
                            <tr
                                key={idx}
                                className="border-b border-gray-100 hover:bg-gray-50 focus-within:bg-gray-50"
                            >
                                <td
                                    className="py-4 text-gray-600"
                                    style={{ width: '40%' }}
                                    title={row.feature}
                                >
                                    {row.feature}
                                </td>
                                <td
                                    className="text-center py-4"
                                    style={{ width: '20%' }}
                                    title={row.narro.tooltip}
                                >
                                    {renderCell(row.narro)}
                                </td>
                                <td
                                    className="text-center py-4"
                                    style={{ width: '20%' }}
                                    title={row.websites.tooltip}
                                >
                                    {renderCell(row.websites)}
                                </td>
                                <td
                                    className="text-center py-4"
                                    style={{ width: '20%' }}
                                    title={row.others.tooltip}
                                >
                                    {renderCell(row.others)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="mt-6 flex justify-between items-center">
                    <span className="text-sm text-gray-500">
                        Last reviewed Jan 2025.
                    </span>
                    <a
                        href={routes.signIn}
                        className="text-blue-600 hover:text-blue-700 font-medium"
                        aria-label="Compare all features"
                    >
                        Login / Sign up →
                    </a>
                </div>
            </div>
        </div>
    );
}