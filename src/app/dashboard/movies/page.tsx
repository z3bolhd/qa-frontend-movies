"use client";

import { useState } from "react";
import { useQuery } from "react-query";

import MoviesTable from "./_components/Table";
import MovieCreate from "./_components/MovieCreate";
import MovieFilters from "./_components/MovieFilters";
import { GetMoviesParams } from "@lib/types";

import LoadingSpinner from "@components/LoadingSpinner";
import { MoviesService } from "@api/services";

const DashboardMoviesPage = () => {
  const [movieFilters, setMovieFilters] = useState<GetMoviesParams>({
    createdAt: "desc",
  });

  const { data, isLoading } = useQuery(
    ["movies", movieFilters],
    () => MoviesService.getMovies({ params: movieFilters }),
    {
      keepPreviousData: true,
    },
  );

  const moviesResponse = data?.data;

  return (
    <div>
      <div className="flex justify-between">
        <h2 className="text-4xl">Фильмы</h2>
        <div className="flex justify-between">
          <MovieFilters setFilters={setMovieFilters} />
          <MovieCreate />
        </div>
      </div>
      {isLoading ? (
        <div className="mt-36">
          <LoadingSpinner size={50} />
        </div>
      ) : (
        <MoviesTable setFilters={setMovieFilters} moviesResponse={moviesResponse} />
      )}
    </div>
  );
};

export default DashboardMoviesPage;
