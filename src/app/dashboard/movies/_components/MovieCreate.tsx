"use client";

import { useContext, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

import { createMovie } from "@lib/api";
import { MoviesDataContext } from "@context/MoviesDataContext";
import { Dialog, DialogContent, DialogTrigger } from "@components/ui/dialog";
import { getUserSession } from "@hooks/getUserSession";
import { Button } from "@components/ui/button";

import MovieDialogForm from "./MovieDialogForm";
import { MovieFormSchema, movieFormSchema } from "./MovieFormSchema";

const MovieCreate = () => {
  const form = useForm<MovieFormSchema>({ resolver: zodResolver(movieFormSchema) });
  const [isLoading, setIsLoading] = useState(false);
  const { accessToken } = getUserSession();
  const { fetchMovies } = useContext(MoviesDataContext);

  const onSubmit: SubmitHandler<MovieFormSchema> = async (data) => {
    setIsLoading(true);

    const status = await createMovie(data, accessToken!);

    if (status === 201) {
      toast.success("Фильм успешно добавлен");
      document.getElementById("closeDialog")?.click();
      fetchMovies();
      return;
    }

    toast.error("Что-то пошло не так");

    setIsLoading(false);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-blue-500 hover:bg-blue-600">Добавить фильм</Button>
      </DialogTrigger>
      <DialogContent>
        <MovieDialogForm
          title="Добавление фильма"
          description={`Внесите данные фильма. Кликните на кнопку "Отправить" для добавления.`}
          footerButtonText="Отправить"
          {...form}
          errors={form.formState.errors}
          isLoading={isLoading}
          onSubmit={onSubmit}
        />
      </DialogContent>
    </Dialog>
  );
};

export default MovieCreate;
