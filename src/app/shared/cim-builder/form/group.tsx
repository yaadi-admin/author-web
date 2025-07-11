import cn from '@/utils/class-names';
import React from 'react';

interface FormGroupProps {
  title: React.ReactNode;
  className?: string;
  description?: string | React.ReactNode;
  children?: React.ReactNode;
}

export default function FormGroup({
  title,
  className,
  description,
  children,
}: FormGroupProps) {
  return (
    <div>
      <h2 className="mb-6 mt-2">{title}</h2>
      {description && <p className="mt-2">{description}</p>}
      <div className={cn('grid gap-5 @3xl:grid-cols-12', className)}>

        {children && (
          <div className="col-span-full grid gap-4 @2xl:grid-cols-3 @4xl:col-span-8 @4xl:gap-5 xl:gap-7">
            {children}
          </div>
        )}
      </div>
    </div>
  );
}
