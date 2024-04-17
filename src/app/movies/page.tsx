import { getMovies } from "@lib/api";
import { GetMoviesParams } from "@lib/types";

import MovieCard from "@app/_components/MovieCard";
import MoviesPagination from "./_components/MoviesPagination";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Все фильмы | Cinescope",
  description: "Все фильмы",
};

const Page = async ({ searchParams }: { searchParams?: GetMoviesParams }) => {
  const data = await getMovies({ ...searchParams, pageSize: 9, createdAt: "desc" });

  if (!data) {
    return null;
  }

  const { movies, page, pageCount } = data;

  if (!movies || movies.length === 0) {
    return null;
  }

  return (
    <main className="py-10">
      <div className="grid grid-cols-3 gap-10">
        {movies.map((movie) => (
          <MovieCard {...movie} key={movie.id} />
        ))}
      </div>
      <MoviesPagination currentPage={page || "1"} pageCount={pageCount} />
    </main>
  );
};

export default Page;
