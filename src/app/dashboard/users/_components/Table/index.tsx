"use client";

import { UsersDataContext } from "@context/UsersDataContext";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useContext } from "react";
import columns from "./columns";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@components/ui/table";
import { Button } from "@components/ui/button";
import LoadingSpinner from "@components/LoadingSpinner";

const UsersTable = () => {
  const { users, currentPage, setCurrentPage, pageCount, isLoading } = useContext(UsersDataContext);

  if (isLoading) {
    return (
      <div className="mt-36">
        <LoadingSpinner size={50} />
      </div>
    );
  }

  const table = useReactTable({
    data: users,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    pageCount: pageCount,
    rowCount: users.length,
  });

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
      {users.length ? (
        <div className="flex items-center justify-end space-x-2 py-4">
          <div className="text-black">
            <p className="text-sm">
              Страница {currentPage} из {pageCount}
            </p>
          </div>
          <div className="space-x-2">
            <Button
              variant="outline"
              className="text-black"
              onClick={() => setCurrentPage((prev) => prev - 1)}
              disabled={currentPage === 1}
            >
              Назад
            </Button>
            <Button
              variant="outline"
              className="text-black"
              onClick={() => setCurrentPage((prev) => prev + 1)}
              disabled={currentPage === pageCount}
            >
              Вперед
            </Button>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default UsersTable;
