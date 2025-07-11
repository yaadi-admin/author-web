// import AnswerSummary from '@/app/(hydrogen)/succession-client/summary/answer-summary';
import markdownit from 'markdown-it';
import React from 'react';
import GaugeChartScore from '../report/preview/gaugechart';
import ValuationTable from './financial/valuation-table';
import './markdown.css';
import './reset.css';

interface MarkdownProps {
  output: string;
  score?: number;
  cardId?: string;
  formResponses?: any[];
  image?: React.ReactNode,
  recommendations?: string,
  primaryColor?: string,
}

function Markdown(props: MarkdownProps) {
  const { recommendations, output, score, formResponses, cardId, image, primaryColor } = props;


  const md = markdownit({
    html: true,
    xhtmlOut: true,
    breaks: true,
    linkify: true,
    typographer: true,
  })

  // const text = "![#DFF2BF] Hello World:";

  // Replace the pattern using regular expressions
  // const outputWithColors = text.replace(/!\[#([A-Fa-f0-9]{6})\] (.+?):/, (match, colorCode, content) => {
  //   return `<span class="text-biz-green">${content}</span>`;
  // });


  const outputHtml = md.render(output);
  const luigiHtml = md.render(recommendations || '');



  const isFinancial = cardId === 'wQjuFN2CdbmnGMQdbzK5';

  return (
    <div className='flex flex-col'>
      {score &&

        <table style={{ width: '200mm' }}>
          <tbody>
            <tr>
              <td className='w-1/2'>
                <div className='-ml-[150px]'>
                  <GaugeChartScore score={score} thickness={10}
                  />
                </div>
              </td>
              <td className='w-1/2'>
                {image}
              </td>
            </tr>
          </tbody>
        </table>
      }

      {
        (formResponses || []).length > 0 && (
          <div style={{
            width: '210mm'
          }}>
            {/* <AnswerSummary responses={formResponses} isFinalReport={true}
              containerStyle={{
                position: 'relative', width: '200mm'
              }}
            /> */}
          </div>
        )
      }

      <div className='reset-css'>

        <div
          className="Narro-markdown"
        >
          {isFinancial ? <ValuationTable primaryColor={`${primaryColor}`} /> : null}
          <div style={{ '--table-color': primaryColor } as React.CSSProperties} dangerouslySetInnerHTML={{ __html: luigiHtml }}></div>
          <div style={{ '--table-color': primaryColor } as React.CSSProperties} dangerouslySetInnerHTML={{ __html: outputHtml }}></div>
        </div>
      </div>
    </div>
  )
}

export default Markdown
