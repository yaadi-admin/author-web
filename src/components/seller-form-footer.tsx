'use client';
import { Button, Checkbox, FieldError, Text } from 'rizzui';
import cn from '@/utils/class-names';
import { useFormContext, Controller } from 'react-hook-form';
import Link from 'next/link';

interface FormFooterProps {
  className?: string;
  altBtnText?: string;
  submitBtnText?: string;
  isLoading?: boolean;
  intake?: string;
  handleAltBtn?: () => void;
}

export const negMargin = '-mx-4 md:-mx-5 lg:-mx-6 3xl:-mx-8 4xl:-mx-10';

export default function SellerFormFooter({
  isLoading,
  intake,
  altBtnText = 'Save draft',
  submitBtnText = 'Submit',
  className,
  handleAltBtn,
}: FormFooterProps) {

  const {
    control,
    formState: { errors },
    watch,
  } = useFormContext();

  const { isFormVerified } = watch();

  return (
    <div
      className={cn(
        'sticky bottom-0 left-0 right-0 z-10 -mb-8 flex items-center justify-end gap-4 border-t bg-white px-4 py-4 md:px-5 lg:px-6 3xl:px-8 4xl:px-10 dark:bg-gray-50',
        className,
        negMargin
      )}
    >

      <span className=''>
        <b>Note:</b> the information you provide is strictly confidential, and contact or other details only shared when you choose to communicate/share information with others on-platform. Please refer to our
        <Link
          href="https://drive.google.com/file/d/1DLOhQ5a_dd0e29rIHCDtdGYiRdu2k4Ug/view"
          passHref
          target="_blank"
          className='inline-block'
        >
          <Text className="text-base mr-1 cursor-pointer text-blue-500 hover:underline">
            Terms and Conditions
          </Text>
        </Link>
        and
        <Link
          href="https://drive.google.com/file/d/1QshORCTcNJ066Htuvxe7MRzPs1pmtYlB/view"
          passHref
          target="_blank"
          className='inline-block'
        >
          <Text className="text-base ml-1 mr-1 cursor-pointer text-blue-500 hover:underline">
            Privacy Policy
          </Text>
        </Link>
        for more details.
      </span>

      <Controller
        name="isFormVerified"
        control={control}
        render={({ field: { onChange, value } }) => (
          <div className="col-span-full">
            {errors?.isFormVerified?.message && (
              // @ts-ignore
              <FieldError size="md" error={(errors?.sector?.message) || ''} />
            )}
            <Controller
              key={'isFormVerified'}
              name={'isFormVerified'} // Use item name as the control name
              control={control}
              render={({ field: { value, onChange } }) => (
                <Checkbox
                  className='m-2'
                  name={'isFormVerified'}
                  variant="outline"
                  label={'* I/We hereby confirm that the information provided herein is accurate, correct and complete and that the documents submitted along with this form are genuine. '}
                  value={value}
                  checked={value}
                  onChange={onChange}
                />
              )}
            />
          </div>)}
      />
      <Button type="submit" disabled={!isFormVerified} isLoading={isLoading} className="w-full @xl:w-auto">
        {submitBtnText}
      </Button>
    </div>
  );
}
