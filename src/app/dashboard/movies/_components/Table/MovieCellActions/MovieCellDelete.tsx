import { useContext, useState } from "react";
import toast from "react-hot-toast";

import { Button } from "@components/ui/button";
import { DialogClose, DialogFooter, DialogHeader, DialogTitle } from "@components/ui/dialog";

import { MoviesDataContext } from "@context/MoviesDataContext";
import { getUserSession } from "@hooks/getUserSession";
import { deleteMovie } from "@lib/api";
import { Movie } from "@lib/types";

interface MovieCellDeleteProps extends Pick<Movie, "id" | "name"> {}

const MovieCellDelete = ({ id, name }: MovieCellDeleteProps) => {
  const { accessToken } = getUserSession();
  const { fetchMovies } = useContext(MoviesDataContext);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);
    const status = await deleteMovie(id, accessToken!);
    setIsLoading(false);

    if (status === 200) {
      toast.success("Фильм успешно удален");
      fetchMovies();
      document.getElementById("closeDialog")?.click();
      return;
    }

    toast.error("Не удалось удалить фильм");
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <DialogHeader>
          <DialogTitle>Удаление фильма</DialogTitle>
        </DialogHeader>

        <div className="mt-5">
          <p>Вы уверены, что хотите удалить фильм "{name}"?</p>
        </div>
        <DialogFooter className="mt-5">
          <Button type="submit" variant="destructive" disabled={isLoading}>
            Удалить
          </Button>
          <DialogClose type="button" id="closeDialog" />
        </DialogFooter>
      </form>
    </>
  );
};

export default MovieCellDelete;
