import { getGenres } from "@lib/api";
import { Genre } from "@lib/types";
import { createContext, useEffect, useState } from "react";

interface GenresDataContextProps {
  genres: Genre[];
  isLoading: boolean;
  fetchGenres: () => void;
}

const initialState: GenresDataContextProps = {
  genres: [],
  isLoading: true,
  fetchGenres: () => {},
};

const GenresDataContext = createContext<GenresDataContextProps>(initialState);

const GenresDataContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchGenres = async () => {
    setIsLoading(true);

    const genres = await getGenres();

    if (!genres) {
      return;
    }

    setIsLoading(false);
    setGenres(genres);
  };

  useEffect(() => {
    fetchGenres();
  }, []);

  return (
    <GenresDataContext.Provider
      value={{
        genres,
        fetchGenres,
        isLoading,
      }}
    >
      {children}
    </GenresDataContext.Provider>
  );
};

export { GenresDataContext, GenresDataContextProvider };
