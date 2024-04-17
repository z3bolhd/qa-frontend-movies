"use client";

import { MoviesDataContextProvider } from "@context/MoviesDataContext";

import MoviesTable from "./_components/Table";
import MovieCreate from "./_components/MovieCreate";
import MovieFilters from "./_components/MovieFilters";
import { Metadata } from "next";

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
