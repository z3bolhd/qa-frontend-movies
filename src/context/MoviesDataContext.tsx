import { Dispatch, SetStateAction, createContext, useEffect, useState } from "react";

import { getMovies } from "@lib/api";
import { GetMoviesResponse, Movie } from "@lib/types";

interface MoviesDataContextProps extends Omit<GetMoviesResponse, "pageSize" | "page"> {
  isLoading: boolean;
  currentPage: number;
  isPublished: boolean;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  setIsPublished: Dispatch<SetStateAction<boolean>>;
  fetchMovies: () => void;
}

const initialState: MoviesDataContextProps = {
  movies: [],
  isLoading: true,
  currentPage: 1,
  isPublished: true,
  count: 0,
  setCurrentPage: () => {},
  setIsPublished: () => {},
  pageCount: 0,
  fetchMovies: () => {},
};

const MoviesDataContext = createContext<MoviesDataContextProps>(initialState);

const MoviesDataContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pageCount, setPageCount] = useState(0);
  const [count, setCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isPublished, setIsPublished] = useState(true);

  const fetchMovies = async () => {
    setIsLoading(true);

    const data = await getMovies({
      page: currentPage,
      pageSize: 10,
      createdAt: "desc",
      published: isPublished,
    });

    if (!data) {
      return;
    }

    const { movies, pageCount, count } = data;

    setIsLoading(false);
    setMovies(movies);
    setPageCount(pageCount);
    setCount(count);
  };

  useEffect(() => {
    fetchMovies();
  }, [currentPage, isPublished]);

  return (
    <MoviesDataContext.Provider
      value={{
        movies,
        fetchMovies,
        isLoading,
        pageCount,
        count,
        currentPage,
        setCurrentPage,
        setIsPublished,
        isPublished,
      }}
    >
      {children}
    </MoviesDataContext.Provider>
  );
};

export { MoviesDataContext, MoviesDataContextProvider };
