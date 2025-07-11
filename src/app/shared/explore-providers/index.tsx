'use client';

import { currentSession } from '@/config/session';
import hasSearchedParams from '@/utils/has-searched-params';
import { useEffect, useState } from 'react';
import { BsBank2 } from "react-icons/bs";
import { FaCalculator } from "react-icons/fa";
import { GoLaw } from "react-icons/go";
import { GrPlan, GrUser } from "react-icons/gr";
import { ImUserTie } from "react-icons/im";
import { PiStrategyBold } from "react-icons/pi";
import { TfiAnnouncement } from "react-icons/tfi";

import { RiBook2Fill } from "react-icons/ri";
import { TbBuildingEstate, TbReceiptTax } from "react-icons/tb";
import { MdAssessment } from "react-icons/md";
import { Button } from 'rizzui';
// Note: using shuffle to simulate the filter effect
import ProviderCard from '@/components/cards/provider-card';
import firebase from '@/config/firebase.config';
import { collection, getDocs, query, where } from "firebase/firestore";
import shuffle from 'lodash/shuffle';

let countPerPage = 12;

interface DataFieldsType {
  id: string;
  data: any;
  category: string;
  dba: string;
  // Define properties here
}

export default function ProvidersGrid() {
  const [isLoading, setLoading] = useState(false);
  const [nextPage, setNextPage] = useState(countPerPage);
  const currentUser = currentSession() as any;
  const [data, setData] = useState([]) as any;
  const [files, setFiles] = useState([]) as any;

  // Define state variables for each category
  const [accountingData, setAccountingData] = useState<DataFieldsType[]>([]);
  const [financialPlanningData, setfinancialPlanningData] = useState<DataFieldsType[]>([]);
  const [cbvData, setCBVData] = useState<DataFieldsType[]>([]);
  const [lawyerData, setLawyerData] = useState<DataFieldsType[]>([]);
  const [taxPlannerData, setTaxPlannerData] = useState<DataFieldsType[]>([]);
  const [maAdvisorData, setMaAdvisorData] = useState<DataFieldsType[]>([]);
  const [marketingData, setMarketingData] = useState<DataFieldsType[]>([]);
  const [hrData, setHrData] = useState<DataFieldsType[]>([]);
  const [strategyData, setStrategyData] = useState<DataFieldsType[]>([]);
  const [financeData, setFinanceData] = useState<DataFieldsType[]>([]);
  const [businessBrokerageData, setBusinessBrokerageData] = useState<DataFieldsType[]>([]);
  const [realEstateData, setRealEstateData] = useState<DataFieldsType[]>([]);


  function handleLoadMore() {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setNextPage(nextPage + countPerPage);
    }, 600);
  }

  useEffect(() => {
    if (currentUser.id) {
      if (currentUser.demo) {
        demoFetch();
      }
      if (!currentUser.demo) {
        fetchDataForAllCategories();
      }
    }
  }, [currentUser.id]);

  // *************************************************
  // Functio to fetch files by userId of the provider
  // *************************************************
  const fetchFilesData = async () => {
    try {
      const q = query(collection(firebase.firestore, "files"), where('userID', '==', currentUser?.id));
      const querySnapshot = await getDocs(q);
      const dataFields = querySnapshot.docs.map(doc => doc.data());
      setFiles(dataFields);

    } catch (error) {
      console.error('Error fetching data:', error);
      // Handle error (e.g., display error message, retry logic)
    }
  };


  // Function to fetch data for all categories
  const fetchDataForAllCategories = async () => {
    const q = query(collection(firebase.firestore, "providers"));
    const querySnapshot = await getDocs(q);

    const defaultProvidersDBA = [
      "Sarbanes & Oxley LLP",
      "Arthur & Andreesen LLP",
      "Black-Scholes Bookkeeping",
      "Dewey, Cheatem, and Howe LLP",
      "Eighth Sister LLP",
    ];

    const pushData = (category: string, dataValue: DataFieldsType) => {
      switch (category) {
        case 'Accounting Bookkeeping':
          accountingData.push(dataValue);
          break;
        case 'Financial Planning Consultation':
          financialPlanningData.push(dataValue);
          break;
        case 'CBV Valuator':
          cbvData.push(dataValue);
          break;
        case 'Lawyer Legal Services':
          lawyerData.push(dataValue);
          break;
        case 'Tax Financial Estate Planner':
          taxPlannerData.push(dataValue);
          break;
        case 'M & Advisor':
          maAdvisorData.push(dataValue);
          break;
        case 'Marketing Media Production':
          marketingData.push(dataValue);
          break;
        case 'Human Resources Transition Planning':
          hrData.push(dataValue);
          break;
        case 'Business Strategy Operations Advisory':
          strategyData.push(dataValue);
          break;
        case 'Banking Finance And Insurance Provider':
          financeData.push(dataValue);
          break;
        case 'Business Brokerage':
          businessBrokerageData.push(dataValue);
          break;
        case 'Real Estate Brokerage':
          realEstateData.push(dataValue);
          break;
        default:
          // Do nothing if the category does not match any expected value
          break;
      }
    }
    querySnapshot.forEach((doc) => {
      const dataValue = doc.data() as DataFieldsType | any;
      console.log('datavalue is', dataValue)
      const category = dataValue.category;
      if (!dataValue?.demo) {
        pushData(category, dataValue);
      }
    });

    // Update state after pushing data to arrays
    setAccountingData([...accountingData]);
    setfinancialPlanningData([...financialPlanningData])
    setCBVData([...cbvData]);
    setLawyerData([...lawyerData]);
    setTaxPlannerData([...taxPlannerData]);
    setMaAdvisorData([...maAdvisorData]);
    setMarketingData([...marketingData]);
    setHrData([...hrData]);
    setStrategyData([...strategyData]);
    setFinanceData([...financeData]);
    setBusinessBrokerageData([...businessBrokerageData]);
    setRealEstateData([...realEstateData]);
  };


  // ********************************************
  // Demo Fetching
  // ********************************************

  // Function to fetch data for all categories
  const demoFetch = async () => {
    const q = query(collection(firebase.firestore, "providers"));
    const querySnapshot = await getDocs(q);

    const defaultProvidersDBA = [
      "Sarbanes & Oxley LLP",
      "Arthur & Andreesen LLP",
      "Black-Scholes Bookkeeping",
      "Dewey, Cheatem, and Howe LLP",
      "Eighth Sister LLP",
    ];

    const pushData = (category: string, dataValue: DataFieldsType) => {
      switch (category) {
        case 'Accounting Bookkeeping':
          accountingData.push(dataValue);
          break;
        case 'Financial Planning Consultation':
          financialPlanningData.push(dataValue);
          break;
        case 'CBV Valuator':
          cbvData.push(dataValue);
          break;
        case 'Lawyer Legal Services':
          lawyerData.push(dataValue);
          break;
        case 'Tax Financial Estate Planner':
          taxPlannerData.push(dataValue);
          break;
        case 'M & Advisor':
          maAdvisorData.push(dataValue);
          break;
        case 'Marketing Media Production':
          marketingData.push(dataValue);
          break;
        case 'Human Resources Transition Planning':
          hrData.push(dataValue);
          break;
        case 'Business Strategy Operations Advisory':
          strategyData.push(dataValue);
          break;
        case 'Banking Finance And Insurance Provider':
          financeData.push(dataValue);
          break;
        case 'Business Brokerage':
          businessBrokerageData.push(dataValue);
          break;
        case 'Real Estate Brokerage':
          realEstateData.push(dataValue);
          break;
        default:
          // Do nothing if the category does not match any expected value
          break;
      }
    }
    querySnapshot.forEach((doc) => {
      const dataValue = doc.data() as DataFieldsType | any;
      const category = dataValue.category;
      if (dataValue?.demo) {
        pushData(category, dataValue);
      }
    });

    // Update state after pushing data to arrays
    setAccountingData([...accountingData]);
    setfinancialPlanningData([...financialPlanningData])
    setCBVData([...cbvData]);
    setLawyerData([...lawyerData]);
    setTaxPlannerData([...taxPlannerData]);
    setMaAdvisorData([...maAdvisorData]);
    setMarketingData([...marketingData]);
    setHrData([...hrData]);
    setStrategyData([...strategyData]);
    setFinanceData([...financeData]);
    setBusinessBrokerageData([...businessBrokerageData]);
    setRealEstateData([...realEstateData]);
  };

  // ********************************************
  // End of Demo Fetching
  // ********************************************

  const filteredData = hasSearchedParams()
    ? shuffle(data)
    : data;

  const filter = (data: any) => {
    return data;
  }

  console.log('data: ', financialPlanningData)

  return (
    <>
      <>
        {/* Accounting & Bookkeeping */}
        {accountingData?.length > 0 &&

          <div style={{ display: 'flex', alignItems: 'center', marginTop: '5%', gap: '8px', marginBottom: '2.5%' }}>
            <RiBook2Fill style={{ fontSize: 28 }} />


            <p style={{ fontSize: 18, fontWeight: '700', color: 'black' }}>Accounting & Bookkeeping</p>

          </div>



        }
        {accountingData?.length > 0 &&

          <div className="grid grid-cols-1 gap-x-5 gap-y-6 @md:grid-cols-[repeat(auto-fill,minmax(250px,1fr))] @xl:gap-x-7 @xl:gap-y-9 @4xl:grid-cols-[repeat(auto-fill,minmax(300px,1fr))] @6xl:grid-cols-[repeat(auto-fill,minmax(364px,1fr))]">
            {filter(accountingData)
              ?.slice(0, nextPage)
              ?.map((provider: any, index: any) => (
                <ProviderCard key={`accountingProvider-${index}`} user={currentUser} product={provider} />
              ))}
          </div>}

        {/* Financial Planning Consultation */}
        {financialPlanningData?.length > 0 && <div style={{ display: 'flex', alignItems: 'center', marginTop: '5%', gap: '8px', marginBottom: '2.5%' }}>
          <MdAssessment style={{ fontSize: 28 }} />
          <p style={{ fontSize: 18, fontWeight: '700', color: 'black' }}>Financial Planning Consultation</p>
        </div>}
        {financialPlanningData?.length > 0 && <div className="grid grid-cols-1 gap-x-5 gap-y-6 @md:grid-cols-[repeat(auto-fill,minmax(250px,1fr))] @xl:gap-x-7 @xl:gap-y-9 @4xl:grid-cols-[repeat(auto-fill,minmax(300px,1fr))] @6xl:grid-cols-[repeat(auto-fill,minmax(364px,1fr))]">
          {filter(financialPlanningData)
            ?.slice(0, nextPage)
            ?.map((provider: any, index: any) => (
              <ProviderCard key={`accountingProvider-${index}`} user={currentUser} product={provider} />
            ))}
        </div>}

        {/* CBV Valuator */}
        {cbvData?.length > 0 &&

          <div style={{ display: 'flex', alignItems: 'center', marginTop: '5%', gap: '8px', marginBottom: '2.5%' }}>
            <FaCalculator style={{ fontSize: 28 }} />
            <p style={{ fontSize: 18, fontWeight: '700', color: 'black' }}>CBV Valuator</p>

          </div>





        }
        {cbvData?.length > 0 && <div className="grid grid-cols-1 gap-x-5 gap-y-6 @md:grid-cols-[repeat(auto-fill,minmax(250px,1fr))] @xl:gap-x-7 @xl:gap-y-9 @4xl:grid-cols-[repeat(auto-fill,minmax(300px,1fr))] @6xl:grid-cols-[repeat(auto-fill,minmax(364px,1fr))]">
          {filter(cbvData)
            ?.slice(0, nextPage)
            ?.map((provider: any, index: any) => (
              <ProviderCard key={`cbvProvider-${index}`} user={currentUser} product={provider} />
            ))}
        </div>}

        {/* Lawyer/Legal Services */}
        {lawyerData?.length > 0 && <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '5%', marginBottom: '2.5%' }}>
          <GoLaw style={{ fontSize: 28 }} />
          <p style={{ fontSize: 18, fontWeight: '700', color: 'black', marginLeft: '8px' }}>
            Lawyer & Legal Services
          </p>
        </div>}
        {lawyerData?.length > 0 && <div className="grid grid-cols-1 gap-x-5 gap-y-6 @md:grid-cols-[repeat(auto-fill,minmax(250px,1fr))] @xl:gap-x-7 @xl:gap-y-9 @4xl:grid-cols-[repeat(auto-fill,minmax(300px,1fr))] @6xl:grid-cols-[repeat(auto-fill,minmax(364px,1fr))]">
          {filter(lawyerData)
            ?.slice(0, nextPage)
            ?.map((provider: any, index: any) => (
              <ProviderCard key={`lawyerProvider-${index}`} user={currentUser} product={provider} />
            ))}
        </div>}

        {/* Tax, Financial, & Estate Planner */}
        {taxPlannerData?.length > 0 &&

          <div style={{ display: 'flex', alignItems: 'center', marginTop: '5%', gap: '8px', marginBottom: '2.5%' }}>
            <TbReceiptTax style={{ fontSize: 28 }} />
            <p style={{ fontSize: 18, fontWeight: '700', color: 'black' }}>Tax, Financial, & Estate Planner</p>
          </div>


        }
        {taxPlannerData?.length > 0 && <div className="grid grid-cols-1 gap-x-5 gap-y-6 @md:grid-cols-[repeat(auto-fill,minmax(250px,1fr))] @xl:gap-x-7 @xl:gap-y-9 @4xl:grid-cols-[repeat(auto-fill,minmax(300px,1fr))] @6xl:grid-cols-[repeat(auto-fill,minmax(364px,1fr))]">
          {filter(taxPlannerData)
            ?.slice(0, nextPage)
            ?.map((provider: any, index: any) => (
              <ProviderCard key={`taxProvider-${index}`} user={currentUser} product={provider} />
            ))}
        </div>}

        {/* M&A Advisor */}
        {maAdvisorData?.length > 0 &&

          <div style={{ display: 'flex', alignItems: 'center', marginTop: '5%', gap: '8px', marginBottom: '2.5%' }}>
            <GrUser style={{ fontSize: 28 }} />
            <p style={{ fontSize: 18, fontWeight: '700', color: 'black' }}>M&A Advisor</p>
          </div>


        }
        {maAdvisorData?.length > 0 && <div className="grid grid-cols-1 gap-x-5 gap-y-6 @md:grid-cols-[repeat(auto-fill,minmax(250px,1fr))] @xl:gap-x-7 @xl:gap-y-9 @4xl:grid-cols-[repeat(auto-fill,minmax(300px,1fr))] @6xl:grid-cols-[repeat(auto-fill,minmax(364px,1fr))]">
          {filter(maAdvisorData)
            ?.slice(0, nextPage)
            ?.map((provider: any, index: any) => (
              <ProviderCard key={`maProvider-${index}`} user={currentUser} product={provider} />
            ))}
        </div>}

        {/* Marketing & Media Production */}
        {marketingData?.length > 0 &&

          <div style={{ display: 'flex', alignItems: 'center', marginTop: '5%', gap: '8px', marginBottom: '2.5%' }}>
            <TfiAnnouncement style={{ fontSize: 28 }} />
            <p style={{ fontSize: 18, fontWeight: '700', color: 'black' }}>Marketing & Media Production</p>
          </div>


        }
        {marketingData?.length > 0 && <div className="grid grid-cols-1 gap-x-5 gap-y-6 @md:grid-cols-[repeat(auto-fill,minmax(250px,1fr))] @xl:gap-x-7 @xl:gap-y-9 @4xl:grid-cols-[repeat(auto-fill,minmax(300px,1fr))] @6xl:grid-cols-[repeat(auto-fill,minmax(364px,1fr))]">
          {filter(marketingData)
            ?.slice(0, nextPage)
            ?.map((provider: any, index: any) => (
              <ProviderCard key={`marketingProvider-${index}`} user={currentUser} product={provider} />
            ))}
        </div>}

        {/* Human Resources & Transition Planning */}
        {hrData?.length > 0 &&

          <div style={{ display: 'flex', alignItems: 'center', marginTop: '5%', gap: '8px', marginBottom: '2.5%', }}>
            <GrPlan style={{ fontSize: 20 }} />
            <p style={{ fontSize: 18, fontWeight: '700', color: 'black' }}>Human Resources & Transition Planning</p>
          </div>


        }
        {hrData?.length > 0 && <div className="grid grid-cols-1 gap-x-5 gap-y-6 @md:grid-cols-[repeat(auto-fill,minmax(250px,1fr))] @xl:gap-x-7 @xl:gap-y-9 @4xl:grid-cols-[repeat(auto-fill,minmax(300px,1fr))] @6xl:grid-cols-[repeat(auto-fill,minmax(364px,1fr))]">
          {filter(hrData)
            ?.slice(0, nextPage)
            ?.map((provider: any, index: any) => (
              <ProviderCard key={`hrProvider-${index}`} user={currentUser} product={provider} />
            ))}
        </div>}

        {/* Business Strategy & Operations Advisory */}
        {strategyData?.length > 0 &&

          <div style={{ display: 'flex', alignItems: 'center', marginTop: '5%', gap: '8px', marginBottom: '2.5%' }}>
            <PiStrategyBold style={{ fontSize: 28 }} />
            <p style={{ fontSize: 18, fontWeight: '700', color: 'black' }}>Business Strategy & Operations Advisory</p>
          </div>


        }
        {strategyData?.length > 0 && <div className="grid grid-cols-1 gap-x-5 gap-y-6 @md:grid-cols-[repeat(auto-fill,minmax(250px,1fr))] @xl:gap-x-7 @xl:gap-y-9 @4xl:grid-cols-[repeat(auto-fill,minmax(300px,1fr))] @6xl:grid-cols-[repeat(auto-fill,minmax(364px,1fr))]">
          {filter(strategyData)
            ?.slice(0, nextPage)
            ?.map((provider: any, index: any) => (
              <ProviderCard key={`strategyProvider-${index}`} user={currentUser} product={provider} />
            ))}
        </div>}

        {/* Banking, Finance, and Insurance Provider */}
        {financeData?.length > 0 &&

          <div style={{ display: 'flex', alignItems: 'center', marginTop: '5%', gap: '8px', marginBottom: '2.5%' }}>
            <BsBank2 style={{ fontSize: 28 }} />
            <p style={{ fontSize: 18, fontWeight: '700', color: 'black' }}>Banking, Finance, and Insurance Provider</p>
          </div>


        }
        {financeData?.length > 0 && <div className="grid grid-cols-1 gap-x-5 gap-y-6 @md:grid-cols-[repeat(auto-fill,minmax(250px,1fr))] @xl:gap-x-7 @xl:gap-y-9 @4xl:grid-cols-[repeat(auto-fill,minmax(300px,1fr))] @6xl:grid-cols-[repeat(auto-fill,minmax(364px,1fr))]">
          {filter(financeData)
            ?.slice(0, nextPage)
            ?.map((provider: any, index: any) => (
              <ProviderCard key={`bankingProvider-${index}`} user={currentUser} product={provider} />
            ))}
        </div>}

        {/* Business Brokerage */}
        {businessBrokerageData?.length > 0 &&

          <div style={{ display: 'flex', alignItems: 'center', marginTop: '5%', gap: '8px', marginBottom: '2.5%' }}>
            <ImUserTie style={{ fontSize: 28 }} />
            <p style={{ fontSize: 18, fontWeight: '700', color: 'black' }}>Business Brokerage</p>

          </div>
        }
        {businessBrokerageData?.length > 0 && <div className="grid grid-cols-1 gap-x-5 gap-y-6 @md:grid-cols-[repeat(auto-fill,minmax(250px,1fr))] @xl:gap-x-7 @xl:gap-y-9 @4xl:grid-cols-[repeat(auto-fill,minmax(300px,1fr))] @6xl:grid-cols-[repeat(auto-fill,minmax(364px,1fr))]">
          {filter(businessBrokerageData)
            ?.slice(0, nextPage)
            ?.map((provider: any, index: any) => (
              <ProviderCard key={`brokerageProvider-${index}`} user={currentUser} product={provider} />
            ))}
        </div>}

        {/* Real Estate Brokerage */}
        {realEstateData?.length > 0 &&
          <div style={{ display: 'flex', alignItems: 'center', marginTop: '5%', gap: '8px', marginBottom: '2.5%' }}>
            <TbBuildingEstate style={{ fontSize: 28 }} />
            <p style={{ fontSize: 18, fontWeight: '700', color: 'black' }}>Real Estate Brokerage</p>
          </div>
        }
        {realEstateData?.length > 0 && <div className="grid grid-cols-1 gap-x-5 gap-y-6 @md:grid-cols-[repeat(auto-fill,minmax(250px,1fr))] @xl:gap-x-7 @xl:gap-y-9 @4xl:grid-cols-[repeat(auto-fill,minmax(300px,1fr))] @6xl:grid-cols-[repeat(auto-fill,minmax(364px,1fr))]">
          {filter(realEstateData)
            ?.slice(0, nextPage)
            ?.map((provider: any, index: any) => (
              <ProviderCard key={`realestateProvider-${index}`} user={currentUser} product={provider} />
            ))}
        </div>}
      </>


      {nextPage < filteredData?.length && (
        <div className="mb-4 mt-5 flex flex-col items-center xs:pt-6 sm:pt-8">
          <Button isLoading={isLoading} onClick={() => handleLoadMore()}>
            Load More
          </Button>
        </div>
      )}
    </>
  );
}
