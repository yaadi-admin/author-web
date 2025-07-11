'use client';

import { getColumns } from '@/app/shared/financial/dashboard/interested-table-buyer/columns';
import WidgetCard from '@/components/cards/widget-card';
import { useCallback, useState, useMemo, useEffect } from 'react';
import { useColumn } from '@/hooks/use-column';
import { useTable } from '@/hooks/use-table';
import CustomTable from './customTable';
import { PiMagnifyingGlassBold } from 'react-icons/pi';
import { Input } from 'rizzui';
import FilterElement from '@/app/shared/financial/dashboard/interested-table/filter-element';
import { collection, getDocs, query, where } from 'firebase/firestore';
import firebase from '@/config/firebase.config';
import { useListings } from '@/config/seller/useListings';
import { currentSession } from '@/config/session';

const filterState = {
  date: [null, null],
  status: '',
};

export default function InterestedTableBuyer({
  className,
}: {
  className?: string;
}) {
  const DEFAULT_PAGE_SIZE = 7;
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [transactionHistory, setTransactionHistory] = useState<{ id: string; [key: string]: any }[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const currentUser = currentSession() as any;
  const [error, setError] = useState<unknown>(null);
  // const { fetchBySellerEmail } = useListings("active");

  const fetchTransactionHistory = async () => {
    try {
      if (!currentUser) {
        console.error('No current user logged in.');
        setTransactionHistory([]);
        setPageSize(DEFAULT_PAGE_SIZE);
        setIsLoading(false);
        return;
      }
      // const querySnapshot = await getDocs(collection(firebase.firestore, 'offers'));
      // let data: { id: string; [key: string]: any }[] = [];
      // if (!querySnapshot.empty) {
      //   data = querySnapshot.docs
      //     .map((doc) => ({ id: doc.id, ...doc.data() }))
      //     .filter((item: any) => item.investor.data.userID === currentUser.id);
      // }

      let matchesData: any[] = [];
      const q = query(collection(firebase.firestore, 'offers'), where('investor.data.userID', '==', currentUser.id));
      const matchesSnapshot = await getDocs(q);
      const matches = matchesSnapshot.docs.map((matchDoc) => ({ id: matchDoc.id, ...matchDoc.data() }));
      matchesData = matchesData.concat(matches);

      // console.log('matchesData', matchesData);
      setTransactionHistory(matchesData);

      console.log('querySnapshot', matchesData);
      setTransactionHistory(matchesData);
      setPageSize(Math.min(DEFAULT_PAGE_SIZE, matchesData.length));
      console.log('Fetched offer data:', matchesData);
      setIsLoading(false);
    } catch (err) {
      console.error('Error fetching offer data:', err);
      setTransactionHistory([]);
      setError(err);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (currentUser) {
      fetchTransactionHistory();
    }
  }, [currentUser]);

  useEffect(() => {
    fetchTransactionHistory();
  }, []);

  const onHeaderCellClick = (value: string) => ({
    onClick: () => {
      handleSort(value);
    },
  });

  const onDeleteItem = useCallback((id: string) => {
    handleDelete(id);
  }, []);

  const {
    isFiltered,
    tableData,
    currentPage,
    totalItems,
    handlePaginate,
    filters,
    updateFilter,
    searchTerm,
    handleSearch,
    sortConfig,
    handleSort,
    selectedRowKeys,
    handleRowSelect,
    handleSelectAll,
    handleDelete,
    handleReset,
  } = useTable(transactionHistory, pageSize, filterState);

  const columns = useMemo(
    () =>
      getColumns({
        data: transactionHistory,
        sortConfig,
        checkedItems: selectedRowKeys,
        onHeaderCellClick,
        onDeleteItem,
        onChecked: handleRowSelect,
        handleSelectAll,
      }),
    [
      selectedRowKeys,
      onHeaderCellClick,
      sortConfig?.key,
      sortConfig?.direction,
      onDeleteItem,
      handleRowSelect,
      handleSelectAll,
    ]
  );

  const { visibleColumns } = useColumn(columns);

  return (
    <WidgetCard
      className={className}
      headerClassName="mb-6 items-start flex-col @[57rem]:flex-row @[57rem]:items-center"
      actionClassName="w-full ps-0 items-center"
      titleClassName="w-full"
      description={`
        Businesses that have placed interest and that you have placed interest in.
      `}
      descriptionClassName="text-sm font-normal text-gray-500 pr-5 w-[500px] @[100rem]:pr-5"
      title="My Interested Listings"
      action={
        <div className="mt-4 flex w-full flex-col-start items-center justify-between gap-3 @[35rem]:flex-row @[57rem]:mt-0">
          <FilterElement
            isFiltered={isFiltered}
            filters={filters}
            updateFilter={updateFilter}
            handleReset={handleReset}
          />
          <Input
            className="w-full @[35rem]:w-auto @[70rem]:w-80"
            type="search"
            placeholder="Search list..."
            value={searchTerm}
            onClear={() => handleSearch('')}
            onChange={(event) => handleSearch(event.target.value)}
            clearable
            prefix={<PiMagnifyingGlassBold className="h-4 w-4" />}
          />
        </div>
      }
    >
      <CustomTable
        data={transactionHistory}
        columns={visibleColumns}
        isLoading={isLoading}
        paginatorOptions={{
          pageSize,
          current: currentPage,
          total: totalItems,
          onPageChange: (page: number) => handlePaginate(page),
          onPageSizeChange: (newPageSize: number) => setPageSize(newPageSize),
        }}
        className="-mx-5 lg:-mx-7"
      />
    </WidgetCard>
  );
}
