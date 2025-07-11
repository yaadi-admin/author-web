import { useFormContext, Controller } from 'react-hook-form';
import { Switch, FieldError } from 'rizzui';
import cn from '@/utils/class-names';
import FormGroup from '@/app/shared/form-group';

import dynamic from 'next/dynamic';
import SelectLoader from '@/components/loader/select-loader';

const Select = dynamic(() => import('rizzui').then((mod) => mod.Select), {
  ssr: false,
  loading: () => <SelectLoader />,
});

const categoriesData = {
  "Accounting/Bookkeeping": [
    "Financial statement preparation and analysis",
    "Bookkeeping and financial record maintenance",
    "Cash flow forecasting and management",
    "Due diligence support",
    "Business valuation assistance"
  ],
  "CBV/Valuator (Chartered Business Valuator)": [
    "Business valuation for sale or purchase",
    "Fairness opinions",
    "Valuation of intangible assets and goodwill",
    "Litigation support involving valuation disputes",
    "Financial modeling and analysis"
  ],
  "Lawyer/Legal Services": [
    "Drafting and reviewing purchase or sale agreements",
    "Negotiation support",
    "Legal due diligence",
    "Corporate structuring and restructuring",
    "Compliance and regulatory advice"
  ],
  "Tax, Financial, & Estate Planner": [
    "Tax planning for business sale or acquisition",
    "Estate planning implications of business transactions",
    "Financial planning for post-sale liquidity events",
    "Capital gains strategies",
    "Succession planning"
  ],
  "M&A Advisor": [
    "Strategic planning for mergers and acquisitions",
    "Buyer or seller representation",
    "Deal structuring and negotiation",
    "Market analysis and target identification",
    "Post-merger integration planning"
  ],
  "Marketing & Media Production": [
    "Marketing strategy for sale",
    "Digital asset optimization",
    "Content creation/video production for sale",
    "Social media strategy and management",
    "Production of marketing materials and presentations"
  ],
  "Human Resources & Transition Planning": [
    "Workforce transition planning and implementation",
    "Employee communication strategies",
    "Retention planning for key staff",
    "Organizational design post-acquisition",
    "Compliance with employment laws and regulations"
  ],
  "Business Strategy & Operations Advisory": [
    "Strategic planning for growth or exit",
    "Operational efficiency reviews",
    "Market analysis and competitive positioning",
    "Business model refinement",
    "Risk management and mitigation strategies"
  ],
  "Banking, Finance, and Insurance Provider": [
    "Financing solutions for acquisitions",
    "Refinancing existing business debts",
    "Risk assessment and insurance solutions",
    "Investment banking services for larger transactions",
    "Payment and escrow services for secure transactions"
  ],
  "Business Brokerage": [
    "Business listing services",
    "Buyer qualification and matching",
    "Valuation and pricing strategy",
    "Confidential marketing and buyer search",
    "Negotiation and closing support"
  ],
  "Real Estate Brokerage": [
    "Real estate valuation and market analysis",
    "Listing and marketing of property",
    "Negotiation of lease or sale terms",
    "Due diligence on property conditions and compliance",
    "Real estate financing advice"
  ]
}

function capitalizeWords(str: string) {
  return str.replace(/\b\w+/g, function (word: string, index: number) {
    return index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1);
  });
}

export default function ProductSeo({ className }: { className?: string }) {
  const {
    control,
    register,
    formState: { errors },
    watch,
  } = useFormContext();


  const { expertise = [] } = watch();


  return (
    <FormGroup
      title="Areas of Expertise"
      description="Select the areas in which your business offers expertise. This will help us match you with the right Sellers & Buyers."
      className={cn(className)}
    >
      {/* <Input
        label="Year in Business"
        placeholder="Year in Business"
        {...register('yearInBusiness')}
        error={errors.yearInBusiness?.message as string}
      />
      <Input
        label="Annual Revenue"
        placeholder="Annual Revenue"
        {...register('annualRevenue')}
        error={errors.annualRevenue?.message as string}
      />
      <Input
        label="Annual Cashflow"
        placeholder="Annual Cashflow"
        {...register('annualCashflow')}
        error={errors.annualCashflow?.message as string}
      />
      <Input
        label="Accountant"
        placeholder="Accountant"
        {...register('accountant')}
        error={errors.accountant?.message as string}
      />

      <Controller
        name="hasAccountant"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Select
            dropdownClassName="z-[9999]"
            options={[{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }]}
            value={value}
            onChange={onChange}
            label="Do you have a bookkeeper or accountant?"
            error={errors?.hasAccountant?.message as string}
            getOptionValue={(option: { value: any; }) => option.value}
          />
        )}
      />

      <Controller
        name="administrativeReadiness"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Select
            dropdownClassName="z-[9999]"
            options={[{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }]}
            value={value}
            onChange={onChange}
            label="Have you prepared/filed tax returns in the last 5 years?"
            error={errors?.administrativeReadiness?.message as string}
            getOptionValue={(option: { value: any; }) => option.value}
          />
        )}
      />

      <Controller
        name="franchise"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Select
            dropdownClassName="z-[9999]"
            options={[{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }]}
            value={value}
            onChange={onChange}
            label="Is your business a franchise?"
            error={errors?.franchise?.message as string}
            getOptionValue={(option: { value: any; }) => option.value}
          />
        )}
      />

      <Controller
        name="typeOfSale"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Select
            dropdownClassName="z-[9999]"
            options={typeOfSale}
            value={value}
            onChange={onChange}
            label="Type of Sale"
            error={errors?.typeOfSale?.message as string}
            getOptionValue={(option: { value: any; }) => option.value}
          />
        )}
      />

      <Controller
        name="intendedBuyer"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Select
            dropdownClassName="z-[9999]"
            options={[{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }]}
            value={value}
            onChange={onChange}
            label="Are you looking for an external buyer?"
            error={errors?.intendedBuyer?.message as string}
            getOptionValue={(option: { value: any; }) => option.value}
          />
        )}
      />

      <Input
        label="Exit Reason"
        placeholder="Why are you selling your business?"
        {...register('exitReason')}
        error={errors.exitReason?.message as string}
      />

      <Controller
        name="valuationReadiness"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Select
            dropdownClassName="z-[9999]"
            options={[{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }]}
            value={value}
            onChange={onChange}
            label="Have you obtained a valuation in the past year?"
            error={errors?.valuationReadiness?.message as string}
            getOptionValue={(option: { value: any; }) => option.value}
          />
        )}
      />

      <Controller
        name="lawyer"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Select
            dropdownClassName="z-[9999]"
            options={[{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }]}
            value={value}
            onChange={onChange}
            label="Do you have a lawyer?"
            error={errors?.lawyer?.message as string}
            getOptionValue={(option: { value: any; }) => option.value}
          />
        )}
      />

      <Controller
        name="planningSupport"
        control={control}
        render={({ field: { value, onChange } }) => (
          <Checkbox
            value={value}
            checked={value}
            onChange={onChange}
            label="Yes, i want planning support"
            className="col-span-full"
          />
        )}
      />

      <Controller
        name="valuationSupport"
        control={control}
        render={({ field: { value, onChange } }) => (
          <Checkbox
            value={value}
            checked={value}
            onChange={onChange}
            label="Yes, i want valuation support"
            className="col-span-full"
          />
        )}
      />

      <Controller
        name="financialSupport"
        control={control}
        render={({ field: { value, onChange } }) => (
          <Checkbox
            value={value}
            checked={value}
            onChange={onChange}
            label="Yes, i want financial support"
            className="col-span-full"
          />
        )}
      />

      <Controller
        name="marketingSupport"
        control={control}
        render={({ field: { value, onChange } }) => (
          <Checkbox
            value={value}
            checked={value}
            onChange={onChange}
            label="Yes, i want marketing support"
            className="col-span-full"
          />
        )}
      />

      <Controller
        name="dealSupport"
        control={control}
        render={({ field: { value, onChange } }) => (
          <Checkbox
            value={value}
            checked={value}
            onChange={onChange}
            label="Yes, i want deal support"
            className="col-span-full"
          />
        )}
      />

      <Controller
        name="legalSupport"
        control={control}
        render={({ field: { value, onChange } }) => (
          <Checkbox
            value={value}
            checked={value}
            onChange={onChange}
            label="Yes, i want legal support"
            className="col-span-full"
          />
        )}
      />

      <Controller
        name="otherKeyDecisionMakers"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Select
            dropdownClassName="z-[9999]"
            options={[{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }]}
            value={value}
            onChange={onChange}
            label="Are there other owners in the business that need to be involved in the exit process?"
            error={errors?.otherKeyDecisionMakers?.message as string}
            getOptionValue={(option: { value: any; }) => option.value}
          />
        )}
      />

      <Controller
        name="dealHorizon"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Select
            dropdownClassName="z-[9999]"
            options={dealHorizon}
            value={value}
            onChange={onChange}
            label="Within how many months would you be prepared to exit the business?"
            error={errors?.dealHorizon?.message as string}
            getOptionValue={(option: { value: any; }) => option.value}
          />
        )}
      /> */}

      <>
        <Controller
          name="expertise"
          control={control}
          render={({ field: { onChange, value } }) => {
            const handleChange = (item: string) => {
              const expertiseArr = [...expertise];
              const index = expertiseArr.indexOf(item);
              if (index === -1) {
                expertiseArr.push(item);
              } else {
                expertiseArr.splice(index, 1);
              }
              onChange(expertiseArr);
            };
            return (
              <div className="col-span-full">
                {errors?.expertise?.message && (
                  // @ts-ignore
                  <FieldError size="md" error={(errors?.expertise?.message) || ''} />
                )}
                <div className="grid grid-cols-2 gap-8">
                  {Object.entries(categoriesData).map(([category, items]) => (
                    <div key={category}>
                      <strong>{category}:</strong><br />
                      {items.map(item => (
                        <Controller
                          key={item}
                          name={capitalizeWords(item).replace(/\s/g, "").toLowerCase()} // Use item name as the control name
                          control={control}
                          render={({ field: { value, onChange } }) => (
                            <Switch
                              name={item}
                              label={capitalizeWords(item)}
                              className="col-span-full"
                              value={expertise.includes(item)}
                              checked={expertise.includes(item)}
                              onChange={() => handleChange(item)}
                            />
                          )}
                        />
                      ))}
                    </div>
                  ))}

                </div>
              </div>)
          }}
        />


        {/* {Object.entries(categories).map(([category, items]) => (
          <div key={category}>
            <strong>{category}:</strong><br />
            {items.map(item => (
              <Controller
                key={item}
                name={capitalizeWords(item).replace(/\s/g, "").toLowerCase()} // Use item name as the control name
                control={control}
                render={({ field: { value, onChange } }) => (
                  <Switch
                    name={item}
                    label={capitalizeWords(item)}
                    className="col-span-full"
                    value={value}
                    checked={value}
                    onChange={onChange}
                  />
                )}
              />
            ))}
          </div>
        ))} */}

      </>


    </FormGroup>
  );
}