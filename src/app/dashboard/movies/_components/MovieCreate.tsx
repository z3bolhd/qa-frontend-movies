"use client";

import { useMutation, useQueryClient } from "react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

import { createMovie } from "@lib/api";
import { Dialog, DialogContent, DialogTrigger } from "@components/ui/dialog";
import { Button } from "@components/ui/button";

import MovieDialogForm from "./MovieDialogForm";
import { MovieFormSchema, movieFormSchema } from "./MovieFormSchema";

const MovieCreate = () => {
  const form = useForm<MovieFormSchema>({ resolver: zodResolver(movieFormSchema) });

  const queryClient = useQueryClient();

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: (data: MovieFormSchema) => createMovie(data),
  });

  const onSubmit: SubmitHandler<MovieFormSchema> = async (data) => {
    const { status } = await mutateAsync(data);

    if (status === 201) {
      toast.success("Фильм успешно добавлен");
      document.getElementById("closeDialog")?.click();
      queryClient.refetchQueries(["movies"]);
      return;
    }

    toast.error("Что-то пошло не так");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="bg-blue-500 hover:bg-blue-600"
          type="button"
          data-qa-id="movie_create_button"
        >
          Добавить фильм
        </Button>
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
