import Link from "next/link";

import { Button } from "@components/ui/button";

import MovieCard from "./_components/MovieCard";
import { MoviesService } from "@api/services";

const Home = async () => {
  const {
    data: { movies },
  } = await MoviesService.getMovies({
    params: { createdAt: "desc", page: 1, pageSize: 9 },
  }).catch((error) => {
    console.log(error);
    return { data: { movies: null } };
  });

  if (!movies || movies.length === 0) {
    return null;
  }

  return (
    <main className="py-10">
      <h2 className="text-4xl">Последние фильмы</h2>
      <div className="mt-10 grid grid-cols-3 gap-10">
        {movies.map((movie) => (
          <MovieCard {...movie} key={movie.id} />
        ))}
      </div>

      <div className="w-full mt-10 flex justify-end">
        <Link href="/movies">
          <Button className="bg-blue-500 hover:bg-blue-600">Показать еще</Button>
        </Link>
      </div>
    </main>
  );
};

export default Home;
