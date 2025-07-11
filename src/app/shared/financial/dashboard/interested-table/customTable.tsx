import React from 'react';

export interface Column {
    key: string;
    title: React.ReactNode;
    dataIndex: string;
    width?: number;
    render?: (value: any, record: any, index: number) => React.ReactNode;
}

export interface PaginatorOptions {
    pageSize: number;
    current: number;
    total: number;
    onPageChange: (page: number) => void;
    onPageSizeChange: (pageSize: number) => void;
}

interface CustomTableProps {
    data: any[];
    columns: Column[];
    isLoading?: boolean;
    paginatorOptions: PaginatorOptions;
    className?: string;
}

const CustomTable: React.FC<CustomTableProps> = ({
    data,
    columns,
    isLoading,
    paginatorOptions,
    className = '',
}) => {
    const { pageSize, current, total, onPageChange, onPageSizeChange } = paginatorOptions;
    const totalPages = Math.ceil(total / pageSize || 1);

    if (isLoading) {
        return <div className="p-4 text-center">Loading...</div>;
    }

    return (
        <div className={className}>
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        {columns.map((col) => (
                            <th
                                key={col.key}
                                style={{ width: col.width }}
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                {col.title}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {data.map((record, index) => (
                        <tr key={record.id || index}>
                            {columns.map((col) => (
                                <td key={col.key} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {col.render
                                        ? col.render(record[col.dataIndex], record, index)
                                        : record[col.dataIndex]}
                                </td>
                            ))}
                        </tr>
                    ))}
                    {data.length === 0 && (
                        <tr>
                            <td colSpan={columns.length} className="text-center p-4">
                                No data available
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            {/* Pagination Footer */}
            <div className="flex justify-between items-center mt-4 ml-6 pt-4 border-t">
                {/* Items per page selector */}
                <div>
                    <label htmlFor="itemsPerPage" className="text-sm text-gray-600 mr-2">
                        Items per page:
                    </label>
                    <select
                        id="itemsPerPage"
                        value={pageSize}
                        onChange={(e) => onPageSizeChange(Number(e.target.value))}
                        className="px-2 py-1 border rounded"
                    >
                        {Array.from({ length: 10 }, (_, i) => i + 1).map((item) => (
                            <option key={item} value={item}>
                                {item}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Pagination Buttons / Info */}
                <div className="flex items-center mr-8">
                    {totalPages > 1 && (
                        <button
                            disabled={current === 1}
                            onClick={() => onPageChange(current - 1)}
                            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50 mr-2"
                        >
                            Previous
                        </button>
                    )}
                    <span className="text-sm text-gray-600">
                        Page {current} of {totalPages}
                    </span>
                    {totalPages > 1 && (
                        <button
                            disabled={current === totalPages}
                            onClick={() => onPageChange(current + 1)}
                            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50 ml-2"
                        >
                            Next
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CustomTable;