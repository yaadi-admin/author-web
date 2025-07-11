'use client';

import WidgetCard from '@/components/cards/widget-card';
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from 'recharts';
import { CustomTooltip } from '@/components/charts/custom-tooltip';
import { useMedia } from '@/hooks/use-media';
import SimpleBar from '@/components/ui/simplebar';
import DropdownAction from '@/components/charts/dropdown-action';
import { Title } from 'rizzui';
import cn from '@/utils/class-names';
import TrendingUpIcon from '@/components/icons/trending-up';
import { useTheme } from 'next-themes';

const data = [
  {
    month: 'Jan',
    newUsers: 570,
    returningUsers: 290,
  },
  {
    month: 'Feb',
    newUsers: 500,
    returningUsers: 300,
  },
  {
    month: 'Mar',
    newUsers: 550,
    returningUsers: 400,
  },
  {
    month: 'Apr',
    newUsers: 520,
    returningUsers: 370,
  },
  {
    month: 'May',
    newUsers: 700,
    returningUsers: 560,
  },
  {
    month: 'Jun',
    newUsers: 740,
    returningUsers: 520,
  },
  {
    month: 'Jul',
    newUsers: 820,
    returningUsers: 580,
  },
  {
    month: 'Aug',
    newUsers: 720,
    returningUsers: 440,
  },
  {
    month: 'Sep',
    newUsers: 680,
    returningUsers: 500,
  },
  {
    month: 'Oct',
    newUsers: 530,
    returningUsers: 320,
  },
  {
    month: 'Nov',
    newUsers: 530,
    returningUsers: 320,
  },
  {
    month: 'Dec',
    newUsers: 610,
    returningUsers: 290,
  },
];

const viewOptions = [
  {
    value: 'Daily',
    label: 'Daily',
  },
  {
    value: 'Monthly',
    label: 'Monthly',
  },
];

const usersLegend = [
  { name: 'New Users' },
  { name: 'Returning users' },
];
interface ColorMap {
  dark: string;
  light: string;
  [key: string]: string;
}
const COLORS: ColorMap[] = [
  { dark: '#2B7F75', light: '#2B7F75' },
  { dark: '#dfdfdf', light: '#dfdfdf' },
];

export default function PatientAppointment({
  className,
}: {
  className?: string;
}) {
  const { theme } = useTheme();
  const isTablet = useMedia('(max-width: 820px)', false);
  function handleChange(viewType: string) {
    console.log('viewType', viewType);
  }

  return (
    <WidgetCard
      title="Pre-NDA"
      titleClassName="text-gray-700 font-normal sm:text-sm font-secondary"
      headerClassName="items-center"
      action={
        <div className="flex items-center gap-5">
          <CustomLegend className="hidden @[80rem]:mt-0 @[80rem]:inline-flex" />
          <DropdownAction
            className="rounded-lg border"
            options={viewOptions}
            onChange={handleChange}
            dropdownClassName="z-[9999]"
          />
        </div>
      }
      className={cn('min-h-[28rem]', className)}
    >
      <div className="mb-4 mt-1 flex items-center gap-2">
        <Title as="h2" className="font-secondary font-bold">
          420
        </Title>
        <span className="flex items-center gap-1 text-green-dark">
          <TrendingUpIcon className="h-auto w-5" />
          <span className="font-semibold leading-none"> +32.40%</span>
        </span>
      </div>
      <CustomLegend className="mb-4 mt-0 inline-flex @[80rem]:hidden" />
      <SimpleBar>
        <div className="h-[20rem] w-full pe-1 pt-6">
          <ResponsiveContainer
            width="100%"
            height="100%"
            {...(isTablet && { minWidth: '700px' })}
          >
            <AreaChart
              data={data}
              margin={{
                left: 2,
                right: 5,
                bottom: 10,
              }}
              className="[&_.recharts-cartesian-axis-tick-value]:fill-gray-500 rtl:[&_.recharts-cartesian-axis.yAxis]:-translate-x-12"
            >
              <CartesianGrid strokeDasharray="8 10" strokeOpacity={0.435} />
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tickMargin={20}
              />
              <YAxis axisLine={false} tickLine={false} tickMargin={20} />
              <Tooltip content={<CustomTooltip />} />
              <Area
                dataKey="newUsers"
                {...(theme && {
                  stroke: COLORS[0][theme],
                })}
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#amountCustomer)"
                dot={<CustomizedDot color={theme && COLORS[0][theme]} />}
                activeDot={<CustomizedDot color={theme && COLORS[0][theme]} />}
              />
              <Area
                dataKey="returningUsers"
                {...(theme && {
                  stroke: COLORS[1][theme],
                })}
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#amountCustomer)"
                dot={<CustomizedDot color={theme && COLORS[1][theme]} />}
                activeDot={<CustomizedDot color={theme && COLORS[1][theme]} />}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </SimpleBar>
    </WidgetCard>
  );
}

function CustomizedDot(props: any) {
  const { cx, cy, color } = props;
  return (
    <svg
      x={cx - 6}
      y={cy - 8}
      width="14"
      height="14"
      viewBox="0 0 14 14"
      className="scale-150"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="7"
        cy="7"
        r="5.5"
        fill={color}
        stroke="white"
        strokeWidth="3"
      />
    </svg>
  );
}

function CustomLegend({ className }: { className?: string }) {
  const { theme } = useTheme();
  return (
    <div
      className={cn(
        'mt-2 flex flex-wrap items-start gap-3 lg:gap-5',
        className
      )}
    >
      {usersLegend?.map((item, index) => (
        <div
          key={item.name}
          className="flex items-center gap-1.5 text-gray-500"
        >
          <span
            className="-mt-0.5 h-3 w-3 shrink-0 rounded-full"
            {...(theme && {
              style: {
                backgroundColor: COLORS[index][theme],
              },
            })}
          />
          <span>{item.name}</span>
        </div>
      ))}
    </div>
  );
}
