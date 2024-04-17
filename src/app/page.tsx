import Link from "next/link";

import { getMovies } from "@lib/api";
import { Button } from "@components/ui/button";

import MovieCard from "./_components/MovieCard";

const Home = async () => {
  const data = await getMovies({ createdAt: "desc", page: 1, pageSize: 9 });

  if (!data) {
    return null;
  }

  const { movies } = data;

  if (!data || movies.length === 0) {
    return null;
  }

  return (
    <>
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
    </>
  );
};

export default Home;
