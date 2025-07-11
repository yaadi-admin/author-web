'use client';

import { getColumns } from '@/app/shared/financial/dashboard/transaction-history-table/columns';
import WidgetCard from '@/components/cards/widget-card';
import { useCallback, useState, useMemo, useEffect } from 'react';
import { useColumn } from '@/hooks/use-column';
import { useTable } from '@/hooks/use-table';
import CustomTable from './customTable';
import { PiMagnifyingGlassBold } from 'react-icons/pi';
import { Input } from 'rizzui';
import FilterElement from '@/app/shared/financial/dashboard/transaction-history-table/filter-element';
import { collection, getDocs, query, where } from 'firebase/firestore';
import firebase from '@/config/firebase.config';
import { currentSession } from '@/config/session';
import { useListings } from '@/config/seller/useListings';

const filterState = {
  date: [null, null],
  status: '',
};
type TransactionItem = {
  id: string;
  matches?: string[];
  [key: string]: any;
};
export default function TransactionHistoryTable({
  className,
}: {
  className?: string;
}) {
  const DEFAULT_PAGE_SIZE = 7;
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [transactionHistory, setTransactionHistory] = useState<{ id: string;[key: string]: any }[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);
  const currentUser = currentSession() as any;
  const { fetchBySellerEmail } = useListings('pending');

  const fetchTransactionHistory = async () => {
    try {

      const listing = await fetchBySellerEmail(currentUser?.email);
      const q = query(collection(firebase.firestore, 'qvest_collection'));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

      const matchesData = [];
      for (const item of data as TransactionItem[]) {
        if (item.matches && item.matches.includes(listing.id)) {
          const matchesRef = collection(firebase.firestore, 'qvest_collection', item.id, 'matches');
          const matchesQuery = query(matchesRef, where('id', '==', listing.id));
          const matchesSnapshot = await getDocs(matchesQuery);
          const matches = matchesSnapshot.docs.map((matchDoc) => ({ id: matchDoc.id, ...matchDoc.data() }));
          matchesData.push(...matches);
        }
      }
      setTransactionHistory(matchesData);
      // Calculate page size: use the default page size if there are enough items,
      // otherwise use the total item count.
      setPageSize(Math.min(DEFAULT_PAGE_SIZE, matchesData.length));
      console.log('Fetched investment data:', matchesData);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching investment data:', error);
      setError(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactionHistory();
  }, [currentUser.id]);

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
        Investors that match with your investor criteria are displayed here.
        `}
      descriptionClassName="text-sm font-normal text-gray-500 pr-5 w-[500px] @[100rem]:pr-5"
      title="Investor Matches"
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
