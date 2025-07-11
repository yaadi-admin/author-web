'use client';

import { useState, useEffect } from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import WidgetCard from '@/components/cards/widget-card';
import { useElementSize } from '@/hooks/use-element-size';
import { Text } from 'rizzui';
import { useMedia } from '@/hooks/use-media';

type DataType = {
  name: string;
  color: string;
  score: number;
};

const initialData: DataType[] = [
  { name: 'Poor', score: 80, color: 'red' },
  { name: 'Good', score: 70, color: 'yellow' },
  { name: 'Great', score: 90, color: 'green' },
];

const fetchData = async () => {
  // Placeholder for fetching data from Firebase or other sources
  // Replace this with actual fetch logic
  return initialData;
};

export default function InvestmentReadinessScore({
  className,
}: {
  className?: string;
}) {
  const [data, setData] = useState(initialData);

  useEffect(() => {
    const getData = async () => {
      const fetchedData = await fetchData();
      setData(fetchedData);
    };

    getData();
  }, []);

  const [chartRef, { width }] = useElementSize();
  const isMobile = useMedia('(max-width: 320px)', false);

  const config = {
    cx: width / 2,
    cy: 200,
    iR: isMobile ? 80 : 100,
    oR: isMobile ? 110 : 150,
  };

  const totalScore = data.reduce((acc, item) => acc + item.score, 0) / data.length;

  const getColor = (score: number) => {
    if (score >= 80) return 'green';
    if (score >= 50) return 'yellow';
    return 'red';
  };

  return (
    <WidgetCard
      title="Investment Readiness Score"
      description="A dynamic score that reflects the completeness and attractiveness of the listing based on documentation, investor interactions, and market comparisons."
      className={className}
    >
      <div ref={chartRef} className="h-64 w-full md:h-72 lg:h-64 3xl:h-96">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart className="relative [&>.recharts-surface]:mx-auto [&>.recharts-surface]:max-w-md [&>.recharts-surface]:md:max-w-none">
            <defs>
              <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="40%" stopColor="red" />
                <stop offset="81%" stopColor="yellow" />
              </linearGradient>
              <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="5%" stopColor="yellow" />
                <stop offset="40%" stopColor="yellow" />
              </linearGradient>
              <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="30%" stopColor="yellow" />
                <stop offset="81%" stopColor="green" />
              </linearGradient>
            </defs>
            <Pie
              dataKey="score"
              startAngle={180}
              endAngle={0}
              data={data}
              cx={config.cx}
              cy={config.cy}
              innerRadius={config.iR}
              outerRadius={config.oR}
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={`url(#gradient${index + 1})`} />
              ))}
            </Pie>
            <text
              x={config.cx}
              y={config.cy}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize="24"
              fill={getColor(totalScore)}
            >
              {totalScore.toFixed(1)}%
            </text>
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="flex flex-wrap justify-center gap-6 gap-y-4 @md:grid-cols-4">
        {data.map((item) => (
          <div key={item.name} className="flex items-center">
            <span
              className="me-2 h-2.5 w-3.5 flex-shrink-0"
              style={{ backgroundColor: item.color }}
            />
            <Text as="span" className=" whitespace-nowrap">
              {item.name}
            </Text>
          </div>
        ))}
      </div>
    </WidgetCard>
  );
}
