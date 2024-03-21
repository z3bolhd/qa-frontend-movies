"use client";

import { MoviesDataContextProvider } from "@context/MoviesDataContext";

import MoviesTable from "./components/Table";
import MovieCreate from "./components/MovieCreate";
import MovieFilters from "./components/MovieFilters";

const DashboardMoviesPage = () => {
  return (
    <MoviesDataContextProvider>
      <div>
        <div className="flex justify-between">
          <h2 className="text-4xl">Фильмы</h2>
          <div className="flex justify-between">
            <MovieFilters />
            <MovieCreate />
          </div>
        </div>
        <MoviesTable />
      </div>
    </MoviesDataContextProvider>
  );
};

export default DashboardMoviesPage;
