"use client";

import { Button } from "@components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@components/ui/dialog";
import { SubmitHandler, useForm } from "react-hook-form";
import { GenreFormSchema, genreFormSchema } from "./GenreFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@components/ui/label";
import { Input } from "@components/ui/input";
import { createGenre } from "@lib/api";
import { getUserSession } from "@hooks/getUserSession";
import toast from "react-hot-toast";
import { useContext, useState } from "react";
import { GenresDataContext } from "@context/GenresDataContext";
import LoadingSpinner from "@components/LoadingSpinner";

const GenreCreate = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<GenreFormSchema>({ resolver: zodResolver(genreFormSchema) });
  const [isLoading, setIsLoading] = useState(false);
  const { accessToken } = getUserSession();

  const { fetchGenres } = useContext(GenresDataContext);

  const onSubmit: SubmitHandler<GenreFormSchema> = async (data) => {
    setIsLoading(true);

    const status = await createGenre(data.name, accessToken!);

    if (status === 201) {
      toast.success("Жанр успешно создан");
      fetchGenres();
      document.getElementById("closeDialog")?.click();
      return;
    } else if (status === 409) {
      toast.error("Жанр с таким названием уже существует");
      return;
    }

    toast.error("Что-то пошло не так");

    setIsLoading(false);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-blue-500 hover:bg-blue-600">Создать жанр</Button>
      </DialogTrigger>

      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>Создание жанра</DialogHeader>
          <DialogDescription>
            Введите название. Кликните на кнопку "Создать" для создания.
          </DialogDescription>
          <div className="mt-3">
            <Label>Название</Label>
            <Input id="name" type="text" {...register("name", { required: true })} />
            {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>}
          </div>
          <DialogFooter className="mt-3">
            <Button className="bg-blue-500 hover:bg-blue-600" type="submit" disabled={isLoading}>
              {isLoading ? <LoadingSpinner size={16} /> : "Создать"}
            </Button>
            <DialogClose id="closeDialog" />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default GenreCreate;
