"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@components/ui/pagination";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface MoviesPaginationProps {
  currentPage: string | number;
  pageCount: number;
}

const MoviesPagination = ({ currentPage, pageCount }: MoviesPaginationProps) => {
  const searchParams = useSearchParams();

  const params = new URLSearchParams(searchParams.toString());
  params.delete("page");

  currentPage = +currentPage;

  const paramsString = params.toString() || "";
  const nextPageHref = `/movies?page=${currentPage + 1}&${paramsString}`;
  const prevPageHref = `/movies?page=${currentPage - 1}&${paramsString}`;
  const currentPageHref = `/movies?page=${currentPage}&${paramsString}`;

  if (pageCount === 1) {
    return null;
  }

  return (
    <Pagination className="w-full flex mr-0 ml-auto justify-end">
      <PaginationContent>
        {currentPage > 1 ? (
          <PaginationItem>
            <PaginationPrevious href={prevPageHref} />
          </PaginationItem>
        ) : null}

        {currentPage - 1 > 0 ? (
          <PaginationItem>
            <PaginationLink href={prevPageHref}>{currentPage - 1}</PaginationLink>
          </PaginationItem>
        ) : null}

        {currentPage ? (
          <PaginationItem>
            <PaginationLink href={currentPageHref} isActive>
              {currentPage}
            </PaginationLink>
          </PaginationItem>
        ) : null}

        {pageCount >= currentPage + 1 ? (
          <PaginationItem>
            <PaginationLink href={nextPageHref}>{currentPage + 1}</PaginationLink>
          </PaginationItem>
        ) : null}

        {pageCount > currentPage ? (
          <PaginationItem>
            <PaginationNext href={nextPageHref} />
          </PaginationItem>
        ) : null}
      </PaginationContent>
    </Pagination>
  );
};

export default MoviesPagination;
