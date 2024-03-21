import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useContext, useState } from "react";

import { Movie } from "@lib/types";
import { patchMovie } from "@lib/api";
import { getUserSession } from "@hooks/getUserSession";
import { MoviesDataContext } from "@context/MoviesDataContext";

import MovieDialogForm from "../../MovieDialogForm";
import { MovieFormSchema, movieFormSchema } from "../../MovieFormSchema";

interface MovieCellEditProps extends Movie {}

const MovieCellEdit = (movie: MovieCellEditProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const { fetchMovies } = useContext(MoviesDataContext);

  const form = useForm<MovieFormSchema>({
    resolver: zodResolver(movieFormSchema),
  });

  const { accessToken } = getUserSession();

  const onSubmit: SubmitHandler<MovieFormSchema> = async (data) => {
    setIsLoading(true);
    const movieId = movie.id;
    const status = await patchMovie({ ...data, id: movieId }, accessToken!);

    setIsLoading(false);

    if (status == 200) {
      toast.success("Данные фильма изменены");
      document.getElementById("closeDialog")?.click();
      fetchMovies();
      return;
    }

    toast.error("Произошла ошибка");
  };

  return (
    <>
      <MovieDialogForm
        title="Изменение фильма"
        description={`Измените данные фильма. Кликните на кнопку "Сохранить" для сохранения изменений.`}
        footerButtonText="Сохранить"
        {...form}
        isLoading={isLoading}
        onSubmit={onSubmit}
        movie={movie}
        errors={form.formState.errors}
      />
    </>
  );
};

export default MovieCellEdit;
