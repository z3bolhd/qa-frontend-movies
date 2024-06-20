"use client";

import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "react-query";

import { Button } from "@components/ui/button";
import { DialogClose, DialogFooter, DialogHeader } from "@components/ui/dialog";
import { deleteGenre } from "@lib/api";
import { Genre } from "@lib/types";

const GenreCellDelete = ({ id, name }: Genre) => {
  const queryClient = useQueryClient();

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: () => deleteGenre(id),
  });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { status } = await mutateAsync();

    if (status === 200) {
      toast.success("Жанр успешно удален");
      queryClient.refetchQueries(["genres"]);
      document.getElementById("closeDialog")?.click();
      return;
    }

    toast.error("Не удалось удалить фильм");
  };

  return (
    <form onSubmit={onSubmit}>
      <DialogHeader>Удаление жанра</DialogHeader>
      <div className="mt-5">
        <p>Вы уверены, что хотите удалить жанр "{name}"?</p>
        <p className="text-red-500 mt-3 text-sm">Фильмы с этим жанром тоже удалятся!</p>
      </div>
      <DialogFooter className="mt-5">
        <Button
          type="submit"
          variant="destructive"
          disabled={isLoading}
          data-qa-id="genre_delete_submit_button"
        >
          Удалить
        </Button>
        <DialogClose type="button" id="closeDialog" />
      </DialogFooter>
    </form>
  );
};

export default GenreCellDelete;
