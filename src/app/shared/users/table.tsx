'use client';

import { useCallback, useMemo, useState } from 'react';
import { Button, Badge, Text } from 'rizzui';
import { useColumn } from '@/hooks/use-column';
import StatusField from '@/components/controlled-table/status-field';
import { useTable } from '@/hooks/use-table';
import ControlledTable from '@/components/controlled-table';
import DateFiled from '@/components/controlled-table/date-field';
import { getDateRangeStateValues } from '@/utils/get-formatted-date';
import { PiTrashDuotone } from 'react-icons/pi';
import { useMedia } from '@/hooks/use-media';

import { getColumns } from './columns';
import { useUsers } from '@/hooks/use-users';

const statuses = [
  {
    value: 'InProgress',
    label: 'In Progress',
  },
  {
    value: 'Completed',
    label: 'Completed',
  },
  {
    value: 'Open',
    label: 'Open',
  },
  {
    value: 'Closed',
    label: 'Closed',
  },
];

// const filterState = {
//   date: [null, null],
//   status: '',
// };

export default function UsersTable() {
  const [pageSize, setPageSize] = useState(20);
  const { data } = useUsers();
  const isMediumScreen = useMedia('(max-width: 1860px)', false);
  const isLargeScreen = useMedia('(min-width: 1861px)', false);

  const onHeaderCellClick = (value: string) => ({
    onClick: () => {
      handleSort(value);
    },
  });

  const onDeleteItem = useCallback((id: string) => {
    handleDelete(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    isLoading,
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
    handleDelete,
    handleReset,
  } = useTable(data, pageSize);

  const columns = useMemo(
    () => getColumns({ sortConfig, onHeaderCellClick, onDeleteItem }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [onHeaderCellClick, sortConfig.key, sortConfig.direction, onDeleteItem]
  );

  console.log(data);
  const { visibleColumns, checkedColumns, setCheckedColumns } =
    useColumn(columns);

  return (
    <>
      <ControlledTable
        variant="modern"
        isLoading={isLoading}
        data={data}
        // @ts-ignore
        columns={visibleColumns}
        paginatorOptions={{
          pageSize,
          setPageSize,
          total: totalItems,
          current: currentPage,
          onChange: (page: number) => handlePaginate(page),
        }}
        filterOptions={{
          searchTerm,
          onSearchClear: () => {
            handleSearch('');
          },
          onSearchChange: (event) => {
            console.log(event);
            handleSearch(event.target.value);
          },
          hasSearched: isFiltered,
          columns,
          checkedColumns,
          setCheckedColumns,
        }}
        className="-mx-5 lg:-mx-7"
      // scroll={{ x: 1700 }}

      />
    </>
  );
}

