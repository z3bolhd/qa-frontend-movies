"use client";

import GenreCreate from "./_components/GenreCreate";
import GenresTable from "./_components/Table";
import { useQuery } from "react-query";
import { getGenres } from "@lib/api";
import LoadingSpinner from "@components/LoadingSpinner";

const DashboardGenresPage = () => {
  const { data, isLoading } = useQuery("genres", getGenres);

  if (isLoading) {
    return (
      <div className="mt-36">
        <LoadingSpinner size={50} />
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between">
        <h2 className="text-4xl">Жанры</h2>
        <GenreCreate />
      </div>
      <GenresTable genres={data || []} />
    </div>
  );
};

export default DashboardGenresPage;
