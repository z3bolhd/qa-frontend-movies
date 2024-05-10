import { Dispatch, SetStateAction } from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@components/ui/table";
import { Button } from "@components/ui/button";

import { GetPaymentsParams, GetPaymentsResponse } from "@lib/types";

import columns from "./columns";

interface PaymentsTableProps {
  paymentsResponse: GetPaymentsResponse | null;
  setFilters: Dispatch<SetStateAction<GetPaymentsParams>>;
}

const PaymentsTable = ({ paymentsResponse, setFilters }: PaymentsTableProps) => {
  if (!paymentsResponse) {
    return <p className="text-xl mt-36 text-center">Что-то пошло не так</p>;
  }

  const table = useReactTable({
    data: paymentsResponse.payments,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    pageCount: paymentsResponse.pageCount,
    rowCount: paymentsResponse.payments.length,
  });

  const handleNextPage = () => {
    setFilters((prev) => ({ ...prev, page: paymentsResponse.page + 1 }));
  };

  const handlePreviousPage = () => {
    setFilters((prev) => ({ ...prev, page: paymentsResponse.page - 1 }));
  };

  return (
    <>
      <div className="rounded-md border mt-5">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="hover:bg-transparent">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="text-white bg-transparent">
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="text-black">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {paymentsResponse.payments.length ? (
        <div className="flex items-center justify-end space-x-2 py-4">
          <div className="text-black">
            <p className="text-sm">
              Страница {paymentsResponse.page} из {paymentsResponse.pageCount}
            </p>
          </div>
          <div className="space-x-2">
            <Button
              variant="outline"
              className="text-black"
              onClick={handlePreviousPage}
              disabled={paymentsResponse.page === 1}
            >
              Назад
            </Button>
            <Button
              variant="outline"
              className="text-black"
              onClick={handleNextPage}
              disabled={paymentsResponse.page === paymentsResponse.pageCount}
            >
              Вперед
            </Button>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default PaymentsTable;
