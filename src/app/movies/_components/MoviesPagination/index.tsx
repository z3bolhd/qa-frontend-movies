import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@components/ui/pagination";

interface MoviesPaginationProps {
  currentPage: string | number;
  pageCount: number;
}

const MoviesPagination = ({ currentPage, pageCount }: MoviesPaginationProps) => {
  currentPage = +currentPage;

  if (pageCount === 1) {
    return null;
  }

  return (
    <Pagination className="w-full flex mt-10 mr-0 ml-auto justify-end">
      <PaginationContent>
        {currentPage > 1 ? (
          <PaginationItem>
            <PaginationPrevious href={`/movies?page=${currentPage - 1}`} />
          </PaginationItem>
        ) : null}

        {currentPage - 1 > 0 ? (
          <PaginationItem>
            <PaginationLink href={`/movies?page=${currentPage - 1}`}>
              {currentPage - 1}
            </PaginationLink>
          </PaginationItem>
        ) : null}

        {currentPage ? (
          <PaginationItem>
            <PaginationLink href={`/movies?page=${currentPage}`} isActive>
              {currentPage}
            </PaginationLink>
          </PaginationItem>
        ) : null}

        {pageCount >= currentPage + 1 ? (
          <PaginationItem>
            <PaginationLink href={`/movies?page=${currentPage + 1}`}>
              {currentPage + 1}
            </PaginationLink>
          </PaginationItem>
        ) : null}

        {pageCount > currentPage ? (
          <PaginationItem>
            <PaginationNext href={`/movies?page=${currentPage + 1}`} />
          </PaginationItem>
        ) : null}
      </PaginationContent>
    </Pagination>
  );
};

export default MoviesPagination;
