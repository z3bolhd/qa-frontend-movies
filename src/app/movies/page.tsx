import { GetMoviesParams } from "@lib/types";

import MoviesPagination from "./_components/MoviesPagination";
import { Metadata } from "next";
import Filters from "./_components/Filters";
import MoviesList from "./_components/MoviesList";
import { MoviesService } from "@api/services";

export const metadata: Metadata = {
  title: "Все фильмы | Cinescope",
  description: "Все фильмы",
};

const Page = async ({ searchParams }: { searchParams: GetMoviesParams }) => {
  const response = await MoviesService.getMovies({
    params: { pageSize: 9, createdAt: searchParams.createdAt || "desc", ...searchParams },
  }).catch(() => null);

  return (
    <main className="py-10">
      <Filters />
      {!response || response.data.movies.length === 0 ? (
        <div className="mt-56 min-h-full w-full flex justify-center text-xl">Ничего не найдено</div>
      ) : (
        <>
          <MoviesList movies={response.data.movies} />
          <MoviesPagination
            searchParams={searchParams}
            currentPage={response.data.page || "1"}
            pageCount={response.data.pageCount}
          />
        </>
      )}
    </main>
  );
};

export default Page;
