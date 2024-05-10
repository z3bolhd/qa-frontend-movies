"use client";

import {
  Updater,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Dispatch } from "react";

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

import { GetMoviesParams, GetMoviesResponse } from "@lib/types";

interface MoviesTableProps {
  setFilters: Dispatch<Updater<GetMoviesParams>>;
  moviesResponse: GetMoviesResponse | null | undefined;
}

const MoviesTable = ({ setFilters, moviesResponse }: MoviesTableProps) => {
  // const { movies, isLoading, pageCount, currentPage, setCurrentPage } =
  //   useContext(MoviesDataContext);

  if (!moviesResponse) {
    return null;
  }

  const table = useReactTable({
    data: moviesResponse.movies,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    pageCount: moviesResponse.pageCount,
    rowCount: moviesResponse.movies.length,
  });

  const handleNextPage = () => {
    console.log(moviesResponse);
    setFilters((prev) => ({ ...prev, page: moviesResponse.page + 1 }));
  };

  const handlePreviousPage = () => {
    setFilters((prev) => ({ ...prev, page: moviesResponse.page - 1 }));
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
      {moviesResponse.movies.length ? (
        <div className="flex items-center justify-end space-x-2 py-4">
          <div className="text-black">
            <p className="text-sm">
              Страница {moviesResponse.page} из {moviesResponse.pageCount}
            </p>
          </div>
          <div className="space-x-2">
            <Button
              variant="outline"
              className="text-black"
              onClick={handlePreviousPage}
              disabled={moviesResponse.page === 1}
            >
              Назад
            </Button>
            <Button
              variant="outline"
              className="text-black"
              onClick={handleNextPage}
              disabled={moviesResponse.page === moviesResponse.pageCount}
            >
              Вперед
            </Button>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default MoviesTable;
