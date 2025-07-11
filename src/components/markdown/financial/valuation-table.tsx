import React from 'react'
import { successionPlan } from '@/config/client/successionPlan';

interface ValuationTableProps {
  primaryColor: string;
}

function ValuationTable(props: ValuationTableProps) {
  const { primaryColor } = props;

  const { intake } = successionPlan() as any;
  const percentage = 0.2;
  const ebita = intake?.valuations?.ebita;
  const revenue = intake?.valuations?.revenue;
  function commafyNumber(numberStr: string) {
    const nextString = numberStr || '';
    return parseFloat(nextString.replace(/[^\d.-]/g, '')).toLocaleString('en-US');
  }
  const estimatedValueOfAllBusinessAssets = intake?.estimatedValueOfAllBusinessAssets;
  const exitRetirementTarget = intake?.exitRetirementTarget;
  return (
    <div className='my-6' style={{ '--table-color': primaryColor } as React.CSSProperties}>
      <h3>Estimated Valuation Range</h3>
      <p>
        Below we compare your desired exit target versus different ranges of what you could expect to receive for the business, using multiples we’ve observed from the market in the past 6-12 months. These are ranges and are not definitive valuations, but can give you an indication of how close your exit target is to what you might receive for your business. To obtain a formal valuation, check the “Provider Marketplace” for our list of valuation professionals.
      </p>
      <p>Your target retirement/exit amount: {commafyNumber(exitRetirementTarget)}</p>
      <table>
        <thead>
          <tr>
            <th><strong> </strong></th>
            <th><strong> ↓ -20%</strong></th>
            <th><strong>Valuation</strong></th>
            <th><strong>+20% ↑</strong></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>EBITDA</strong></td>
            <td>${Number(ebita - ebita * (percentage)).toLocaleString()}</td>
            <td>${Number(ebita).toLocaleString()}</td>
            <td>${Number(ebita * (percentage) + ebita).toLocaleString()}</td>
          </tr>
          <tr>
            <td><strong>Sales Revenue</strong></td>
            <td>${Number(revenue - revenue * (percentage)).toLocaleString()}</td>
            <td>${Number(revenue).toLocaleString()}</td>
            <td>${Number(revenue * (percentage) + revenue).toLocaleString()}</td>
          </tr>
        </tbody>
      </table>
      <p>Estimated asset liquidation value: {commafyNumber(estimatedValueOfAllBusinessAssets)}</p>
    </div>
  )
}

export default ValuationTable