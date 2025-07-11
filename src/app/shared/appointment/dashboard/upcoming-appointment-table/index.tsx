'use client';

import { useCallback, useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { doc, onSnapshot, query, collection, getDocs, where } from "firebase/firestore";
import { Text, Button, Badge } from 'rizzui';
import Image from 'next/image';
import { PiFilesBold, PiEyeDuotone, PiCalendarCheck, PiEraserDuotone, PiTrayDuotone, PiUserCircleDuotone, PiTimer } from 'react-icons/pi';
import firebase from '@/config/firebase.config';
import { currentSession } from '@/config/session';
import { routes } from '@/config/routes';
import DrawerHeader from '@/app/shared/drawer-header';
import ProgressCircle from '@/components/ui/progress-circle';
import FilterElement from './filter-element';
import { QVestDrawerView } from '../../profile';
import isEqual from 'lodash/isEqual';
import toast from 'react-hot-toast';

const Drawer = dynamic(() => import('rizzui').then((module) => module.Drawer), {
  ssr: false,
});

type QVestDrawerViewProps = {
  title: string;
  isOpen: boolean;
  data: any;
  setOpenDrawer: (id: boolean) => void;
};

interface DataFieldsType {
  id: string;
  data: any;
}

export default function QVestTable({
  className,
}: {
  className?: string;
}) {
  const initialState = {
    name: '',
    sortBy: '',
    status: '',
  };
  const [filterState, setFilterState] = useState(initialState);
  const [qvestUsers, setQvestUsers] = useState<DataFieldsType[]>([]);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [selected, setSelected] = useState({}) as any;

  const handleSelected = (item: any) => {
    setSelected(item);
    setOpenDrawer(true);
  };

  useEffect(() => {
    fetchQvestData();
  }, []);

  const fetchQvestData = async () => {
    try {
      const q = query(collection(firebase.firestore, "qvest_collection"));
      const querySnapshot = await getDocs(q);
      const dataFields: DataFieldsType[] = [];
      querySnapshot.forEach((doc) => {
        const dataValue = doc.data() as DataFieldsType;
        dataFields.push({ ...dataValue });
      });
      setQvestUsers(dataFields.sort((a: any, b: any) => Number(b?.score || '') - Number(a?.score || '')));
    } catch (error) {
      console.error('Error fetching QVest data:', error);
      toast.error('Error fetching data. Please try again later.');
    }
  };

  const statusIcon: { [key: string]: React.ReactElement } = {
    'Waiting': <PiTimer className="me-1.5 h-[17px] w-[17px]" />,
    'Scheduled': <PiCalendarCheck className="me-1.5 h-[17px] w-[17px]" />
  }

  return (
    <>
      <div className="col-span-full border rounded-lg p-4">
        <h4 className="mt-2 rizzui-title-h3 text-base font-semibold text-gray-800 sm:text-lg font-secondary">
          QVest™
        </h4>
        <p className="flex items-center font-normal text-gray-700">Qualified buyers are listed below showing highest to lowest scores</p>
        <div className='mt-4'>
          <FilterElement
            isFiltered={!isEqual(initialState, filterState)}
            filters={filterState}
            updateFilter={(nextFilter) => { setFilterState((prev) => ({ ...prev, ...nextFilter })) }}
            handleReset={() => {
              setFilterState(initialState);
            }}
          />
        </div>
        <div className='grid gap-4 mt-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4'>
          {qvestUsers.length === 0 ? (
            <div className="col-span-full text-center text-gray-500">
              No investors available. Once you engage with investors, they will reflect here.
            </div>
          ) : (
            qvestUsers.map((item: any, index: number) => (
              <div key={index} className='flex flex-col h-full rounded-lg border border-muted'>
                <Image src={item?.profilePicture} width={200} height={400} style={{ borderTopLeftRadius: 8, borderTopRightRadius: 8 }} alt="Profile" className="object-cover w-full h-full" />
                <div style={{ borderTopWidth: 0.5, textAlign: 'center', justifyContent: 'center' }} className="flex p-4 text-center items-center">
                  <div className="flex w-1/5">
                    <p className={`border-r-2 pr-1 mr-auto mt-2 flex items-center text-xl font-semibold ${item?.score ? (item?.score > 70 ? `text-green` : (item?.score > 50 ? `text-yellow-600` : `text-red`)) : `text-gray-700`}`}>
                      {item?.score ? item?.score + '%' : '80%'}
                    </p>
                  </div>
                  <div className='flex w-4/5 pl-2'>
                    <div className='truncate'>
                      <h5 className="mt-2 flex items-center font-bold text-gray-900">
                        <PiUserCircleDuotone className="me-1.5 h-[17px] w-[17px]" />
                        {item?.firstName} {item?.lastName}
                      </h5>
                      <p className="mt-2 flex items-center font-semibold text-gray-500">
                        {item?.status ? statusIcon[item.status] : null}
                        {item?.status}
                      </p>
                    </div>
                  </div>
                </div>
                <div className='flex flex-col p-4 pt-0 gap-2'>
                  <div className='grid grid-cols-2 gap-2'>
                    <Badge color="info" variant="flat" size="sm">Proof of Funds</Badge>
                    {item?.firstName !== 'Kimone' && <Badge color="info" variant="flat" size="sm">Credit Score</Badge>}
                  </div>
                  {item?.firstName !== 'Jim' && <Badge color="warning" variant="flat" size="sm">Underrepresented group</Badge>}
                </div>
                <Button style={{ borderTopLeftRadius: 0, borderTopRightRadius: 0 }} onClick={() => handleSelected(item)} className="w-full @lg:w-auto">
                  <PiEyeDuotone className="me-1.5 h-[17px] w-[17px]" />
                  View Profile
                </Button>
              </div>
            ))
          )}
        </div>
        <Drawer
          isOpen={openDrawer ?? false}
          onClose={() => setOpenDrawer(false)}
          overlayClassName="dark:bg-opacity-20 dark:backdrop-blur-md"
          containerClassName="dark:bg-gray-100"
          className="z-[9999]"
          customSize="40%"
        >
          <QVestDrawerView
            title={selected?.firstName + ` ` + selected?.lastName}
            isOpen={openDrawer ?? false}
            setOpenDrawer={setOpenDrawer}
            data={selected}
          />
        </Drawer>
      </div>
    </>
  );
}
