'use client';
interface ProgressCircleProps {
  title?: string;
  body: string;
  progress: number;
  progressTotal?: number;
  customProgressColor?: string;
  type?: "circle" | "card",
  progressClassName?: string;
}

export default function ProgressCircle({
  title,
  body,
  progress,
  progressTotal,
  customProgressColor,
  type,
  progressClassName = '',
}: ProgressCircleProps) {
  const total = progressTotal || 100;
  const fill = progress;

  const circumference = 2 * Math.PI * 36.5; //
  const fillPercentage = fill / total;
  const dashArray = circumference;
  const dashOffset = circumference * (1 - fillPercentage);

  const progressColor = progress >= 70 ? "stroke-[#11a849]" : progress >= 50 ? "stroke-[#ca8a04]" : "stroke-[#ee0000]";
  if (type === "circle") {

    return (
      <div className={`h-auto w-full ${progressClassName}`}>
        <svg viewBox="0 0 80 80" className="transition-all duration-200">
          <circle cx="40" cy="40" r="36.5" fill="transparent" strokeWidth="7"
            className={`${progressColor} ${customProgressColor} opacity-20`} />
          <circle
            cx="40"
            cy="40"
            r="36.5"
            fill="transparent"
            strokeWidth="7"
            className={`${progressColor} ${customProgressColor}`}
            strokeDasharray={`${dashArray} ${dashArray}`}
            strokeDashoffset={-dashOffset}
            transform="rotate(-95 40 40)"
            strokeLinecap="round"
            style={{
              transition: 'stroke-dashoffset 0.3s ease-in-out',
            }}
          />
          <foreignObject x="0" y="0" width="80" height="80">
            <div className="flex h-full w-full flex-col items-center justify-center transition-all duration-200">
              <span className="rizzui-text-span font-primary text-base font-medium text-gray-700">
                {body}
              </span>
            </div>
          </foreignObject>
        </svg>
      </div>
    )
  }
  return (
    // <div className='border border-muted bg-gray-0 p-5 dark:bg-gray-50 lg:p-6 rounded-lg w-full max-w-full justify-between h-full'>
    <div className='bg-gray-0 p-5 dark:bg-gray-50 lg:p-6 rounded-lg w-full max-w-full justify-between h-full'>
      <div className="flex flex-col items-center justify-between gap-[24px]">
        <div className="flex items-center"><div className="">
          <p className="rizzui-text-p font-normal mb-0.5 text-gray-500">{title}</p>
        </div></div>
        <div className={`h-auto w-full ${progressClassName}`}>
          <svg viewBox="0 0 80 80" className="transition-all duration-200">
            <circle cx="40" cy="40" r="36.5" fill="transparent" strokeWidth="7" className="stroke-primary opacity-20" />
            <circle
              cx="40"
              cy="40"
              r="36.5"
              fill="transparent"
              strokeWidth="7"
              className="stroke-primary"
              strokeDasharray={`${dashArray} ${dashArray}`}
              strokeDashoffset={-dashOffset}
              transform="rotate(-95 40 40)"
              strokeLinecap="round"
              style={{
                transition: 'stroke-dashoffset 0.3s ease-in-out',
              }}
            />
            <foreignObject x="0" y="0" width="80" height="80">
              <div className="flex h-full w-full flex-col items-center justify-center transition-all duration-200">
                <span className="rizzui-text-span font-secondary text-base font-medium text-gray-700">
                  {body === '0%' ? `${0}%` : `${parseInt(body)}%`}
                </span>
                {/* <p className="font-secondary relative mb-1 text-gray-500 text-[8px] leading-tight">
                  <span className="font-secondary block text-[4px]">/Succession Plan</span>
                  <span className="font-secondary block text-[4px]">Completed</span>
                </p> */}


              </div>
            </foreignObject>
          </svg>
        </div>
      </div>
    </div>
  );
}
