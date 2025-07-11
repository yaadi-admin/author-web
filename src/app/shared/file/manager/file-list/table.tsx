'use client';

import { useMemo, useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useTable } from '@/hooks/use-table';
import { Button } from 'rizzui';
import { useColumn } from '@/hooks/use-column';
import { getColumns } from '@/app/shared/file/manager/file-list/columns';
import FileFilters from '@/app/shared/file/manager/file-filters';
import ControlledTable from '@/components/controlled-table';
import { allFilesData } from '@/data/all-files';
import { doc, onSnapshot, setDoc, addDoc, getDocs, collection, query, where, serverTimestamp } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes, getStorage } from "firebase/storage";
import firebase from '@/config/firebase.config';
import { currentSession } from '@/config/session';
const TableFooter = dynamic(() => import('@/app/shared/table-footer'), {
  ssr: false,
});

export default function FileListTable({ className }: { className?: string }) {
  const [pageSize, setPageSize] = useState(10);
  const [files, setFiles] = useState([]) as any;
  const currentUser = currentSession() as any;

  const onHeaderCellClick = (value: string) => ({
    onClick: () => {
      handleSort(value);
    },
  });

  const onDeleteItem = (id: string) => {
    handleDelete(id);
  };

  useEffect(() => {
    fetchFilesData();
  }, [currentUser?.id]);

  const fetchFilesData = async () => {
    try {
      const q = query(collection(firebase.firestore, "files"));
      const querySnapshot = await getDocs(q);
      const dataFields = querySnapshot.docs.map(doc => doc.data());
      console.log(dataFields)
      setFiles(dataFields);
    } catch (error) {
      console.error('Error fetching data:', error);
      // Handle error (e.g., display error message, retry logic)
    }
  };

  const {
    isLoading,
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
    setSelectedRowKeys,
    handleRowSelect,
    handleSelectAll,
    handleDelete,
  } = useTable(files, pageSize);

  const columns = useMemo(
    () =>
      getColumns({
        data: files,
        sortConfig,
        checkedItems: selectedRowKeys,
        onHeaderCellClick,
        onDeleteItem,
        onChecked: handleRowSelect,
        handleSelectAll,
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      selectedRowKeys,
      onHeaderCellClick,
      sortConfig.key,
      sortConfig.direction,
      onDeleteItem,
      handleRowSelect,
      handleSelectAll,
    ]
  );

  const { visibleColumns } = useColumn(columns);

  return (
    <div className={className}>
      <FileFilters
        filters={filters}
        updateFilter={updateFilter}
        onSearch={handleSearch}
        searchTerm={searchTerm}
      />
      <ControlledTable
        isLoading={isLoading}
        showLoadingText={true}
        data={tableData}
        // @ts-ignore
        columns={visibleColumns}
        scroll={{ x: 1300 }}
        variant="modern"
        tableLayout="fixed"
        rowKey={(record) => record.id}
        paginatorOptions={{
          pageSize,
          setPageSize,
          total: totalItems,
          current: currentPage,
          onChange: (page: number) => handlePaginate(page),
        }}
        tableFooter={
          <TableFooter
            checkedItems={selectedRowKeys}
            handleDelete={(ids: string[]) => {
              setSelectedRowKeys([]);
              handleDelete(ids);
            }}
          >
            <Button size="sm" className="dark:bg-gray-300 dark:text-gray-800">
              Download {selectedRowKeys.length}{' '}
              {selectedRowKeys.length > 1 ? 'Files' : 'File'}
            </Button>
          </TableFooter>
        }
      />
    </div>
  );
}
