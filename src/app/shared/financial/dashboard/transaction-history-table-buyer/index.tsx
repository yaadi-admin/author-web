'use client';

import { getColumns } from '@/app/shared/financial/dashboard/transaction-history-table-buyer/columns';
import WidgetCard from '@/components/cards/widget-card';
import { useCallback, useState, useMemo, useEffect } from 'react';
import { useColumn } from '@/hooks/use-column';
import { useTable } from '@/hooks/use-table';
import CustomTable from './customTable';
import { PiMagnifyingGlassBold } from 'react-icons/pi';
import { Input } from 'rizzui';
import FilterElement from '@/app/shared/financial/dashboard/transaction-history-table-buyer/filter-element';
import { collection, getDoc, getDocs, query, where } from 'firebase/firestore';
import firebase from '@/config/firebase.config';
import { currentSession } from '@/config/session';

const filterState = {
  date: [null, null],
  status: '',
};

export default function InvestorMatchTable({
  className,
}: {
  className?: string;
}) {
  const DEFAULT_PAGE_SIZE = 7;
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [transactionHistory, setTransactionHistory] = useState<{ id: string; [key: string]: any }[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);
  const currentUser = currentSession() as any;


  const fetchTransactionHistory = async () => {
    try {
      const docQuery = query(
        collection(firebase.firestore, 'qvest_collection'),
        where('investor.data.userID', '==', currentUser?.id)
      );
      const docSnapshot = await getDocs(docQuery);
      const docRef = docSnapshot.docs[0].ref;
      const matchDoc = await getDoc(docRef);
      const data = matchDoc.data();
      let matchesData: any[] = [];
      // console.log('querySnapshot', data);

      const matchesSnapshot = await getDocs(collection(docRef, 'matches'));
          const matches = matchesSnapshot.docs.map((matchDoc) => ({ id: matchDoc.id, ...matchDoc.data() }));
          matchesData = matchesData.concat(matches);

      // console.log('matchesData', matchesData);
      setTransactionHistory(matchesData);
      // Calculate page size: use the default page size if there are enough items,
      // otherwise use the total item count.
      setPageSize(Math.min(DEFAULT_PAGE_SIZE, matchesData.length));
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching investment data:', error);
      setError(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactionHistory();
  }, [currentUser?.id]);

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
        Businesses that match with your business criteria are displayed here.
        `}
      descriptionClassName="text-sm font-normal text-gray-500 pr-5 w-[500px] @[100rem]:pr-5"
      title="Business Matches"
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
