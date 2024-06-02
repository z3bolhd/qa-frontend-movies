import { useMutation, useQueryClient } from "react-query";
import toast from "react-hot-toast";

import { Button } from "@components/ui/button";
import { DialogClose, DialogFooter, DialogHeader, DialogTitle } from "@components/ui/dialog";
import { deleteMovie } from "@lib/api";
import { Movie } from "@lib/types";

interface MovieCellDeleteProps extends Pick<Movie, "id" | "name"> {}

const MovieCellDelete = ({ id, name }: MovieCellDeleteProps) => {
  const queryClient = useQueryClient();

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: () => deleteMovie(id),
  });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { status } = await mutateAsync();

    if (status === 200) {
      toast.success("Фильм успешно удален");
      queryClient.refetchQueries(["movies"]);
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
