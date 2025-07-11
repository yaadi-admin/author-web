"use client";

import Loader from '@/components/ui/loader';
import { Button } from 'rizzui';

import CoverPage from './pages/cover-page';

import { PageSection, Section, Title } from './components';

import Disclaimer from './pages/disclaimer';
import './print.css';
import './style.css';


export default function ReportPage({ data: nextData = [], listing, sellerIntake }: any) {
    const data = nextData.sort((a: any, b: any) => a.order - b.order)
    const handlePrint = () => {
        window.print();
    };

    if (data.length === 0) {
        return <Loader />
    }

    console.log(data)
    const pages = [5, 6, 7, 8, 9, 10, 0, 11, 12, 13, 14, 15, 16, 17];
    return (
        <div className='document flex flex-col items-center'>
            <div className='flex p-4'>
                <Button id="print" onClick={handlePrint} className='ml-auto printButton'>
                    Print Page
                </Button>
            </div>
            <CoverPage data={data} sellerIntake={sellerIntake} listing={listing} />
            <Disclaimer listing={listing} sellerIntake={sellerIntake} />
            {/* <TableOfContents /> */}
            {/* <ExecutiveSummary data={data} /> */}
            {
                pages.map((page, index) => {
                    if (data[page]?.html) {
                        const cleanedHtml = data[page].html.replace(/```html|```/g, '');

                        return (
                            <PageSection key={index}>
                                <>
                                    <Title>{data[page].title}</Title>
                                    <Section content={
                                        <div dangerouslySetInnerHTML={{ __html: cleanedHtml }} />
                                    }
                                        title={''}
                                    />
                                </>
                            </PageSection>
                        )
                    }

                })
            }
        </div >
    )
}



// appendix
// React.useEffect(() => {
//     async function fetchKnowledge() {
//         const response = await axios.post(
//             'BASE_URL/api/bizbridge/serv/authenticate',
//             {
//                 type: 'financial',
//                 function: "getKnowledgeData",
//                 userID: currentUser?.id,
//                 key: 'incomeStatement', // Use the 'value' from the relevance object
//             },
//             {
//                 headers: {
//                     Authorization: 'skl-bhdbjcbcbcbdjb'
//                 },
//                 maxContentLength: Infinity, // This sets the max content length to unlimited
//                 maxBodyLength: Infinity // This sets the max body length to unlimited
//             }
//         );
//         setAppendix(response?.data?.Message)
//     }
//     fetchKnowledge()
// }, [currentUser?.id])