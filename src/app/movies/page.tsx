import { getMovies } from "@lib/api";
import { GetMoviesParams } from "@lib/types";

import MoviesPagination from "./_components/MoviesPagination";
import { Metadata } from "next";
import Filters from "./_components/Filters";
import MoviesList from "./_components/MoviesList";

export const metadata: Metadata = {
  title: "Все фильмы | Cinescope",
  description: "Все фильмы",
};

const Page = async ({ searchParams }: { searchParams: GetMoviesParams }) => {
  const { data } = await getMovies({ pageSize: 9, createdAt: "desc", ...searchParams });

  return (
    <main className="py-10">
      <Filters />
      {!data || data.movies.length === 0 ? (
        <div className="mt-56 min-h-full w-full flex justify-center text-xl">Ничего не найдено</div>
      ) : (
        <>
          <MoviesList movies={data.movies} />
          <MoviesPagination
            searchParams={searchParams}
            currentPage={data.page || "1"}
            pageCount={data.pageCount}
          />
        </>
      )}
    </main>
  );
};

export default Page;
