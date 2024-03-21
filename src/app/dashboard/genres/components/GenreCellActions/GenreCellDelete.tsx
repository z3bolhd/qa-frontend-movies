"use client";

import { Button } from "@components/ui/button";
import { DialogClose, DialogFooter, DialogHeader } from "@components/ui/dialog";
import { GenresDataContext } from "@context/GenresDataContext";
import { getUserSession } from "@hooks/getUserSession";
import { deleteGenre } from "@lib/api";
import { Genre } from "@lib/types";
import { useContext, useState } from "react";
import toast from "react-hot-toast";

interface GenreCellDeleteProps extends Genre {}

const GenreCellDelete = ({ id, name }: GenreCellDeleteProps) => {
  const { accessToken } = getUserSession();
  const [isLoading, setIsLoading] = useState(false);
  const { fetchGenres } = useContext(GenresDataContext);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);
    const status = await deleteGenre(id, accessToken!);
    setIsLoading(false);

    if (status === 200) {
      toast.success("Жанр успешно удален");
      fetchGenres();
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
        <Button type="submit" variant="destructive" disabled={isLoading}>
          Удалить
        </Button>
        <DialogClose type="button" id="closeDialog" />
      </DialogFooter>
    </form>
  );
};

export default GenreCellDelete;
