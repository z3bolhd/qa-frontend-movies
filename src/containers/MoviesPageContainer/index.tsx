import MovieCard from "@components/MovieCard";
import { getMovies } from "@lib/api";
import { GetMoviesParams } from "@lib/types";
import MoviesPagination from "./MoviesPagination";

interface MoviesPageProps {
  query?: GetMoviesParams;
}

const MoviesPageContainer = async ({ query }: MoviesPageProps) => {
  const data = await getMovies({ ...query, pageSize: 9, createdAt: "desc" });

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

export default MoviesPageContainer;
