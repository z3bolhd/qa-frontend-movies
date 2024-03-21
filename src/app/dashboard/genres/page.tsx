"use client";

import { GenresDataContextProvider } from "@context/GenresDataContext";
import GenreCreate from "./components/GenreCreate";
import GenresTable from "./components/Table";

const DashboardGenresPage = () => {
  return (
    <GenresDataContextProvider>
      <div>
        <div className="flex justify-between">
          <h2 className="text-4xl">Жанры</h2>
          <GenreCreate />
        </div>
        <GenresTable />
      </div>
    </GenresDataContextProvider>
  );
};

export default DashboardGenresPage;
