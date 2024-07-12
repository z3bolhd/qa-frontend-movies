"use client";

import GenreCreate from "./_components/GenreCreate";
import GenresTable from "./_components/Table";
import { useQuery } from "react-query";

import LoadingSpinner from "@components/LoadingSpinner";
import { MoviesService } from "@api/services";

const DashboardGenresPage = () => {
  const { data, isLoading, isError } = useQuery("genres", () => MoviesService.getGenres({}));

  if (isLoading) {
    return (
      <div className="mt-36">
        <LoadingSpinner size={50} />
      </div>
    );
  }

  if (isError) {
    return <p className="text-xl mt-36">Что-то пошло не так</p>;
  }

  return (
    <div>
      <div className="flex justify-between">
        <h2 className="text-4xl">Жанры</h2>
        <GenreCreate />
      </div>
      <GenresTable genres={data!.data || []} />
    </div>
  );
};

export default DashboardGenresPage;
