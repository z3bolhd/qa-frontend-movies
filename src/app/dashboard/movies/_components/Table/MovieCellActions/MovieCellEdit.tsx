import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

import { Movie } from "@lib/types";
import { patchMovie } from "@lib/api";
import { getUserSession } from "@hooks/getUserSession";

import MovieDialogForm from "../../MovieDialogForm";
import { MovieFormSchema, movieFormSchema } from "../../MovieFormSchema";
import { useMutation, useQueryClient } from "react-query";

const MovieCellEdit = (movie: Movie) => {
  const form = useForm<MovieFormSchema>({
    resolver: zodResolver(movieFormSchema),
  });

  const { accessToken } = getUserSession();

  const queryClient = useQueryClient();

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: (data: MovieFormSchema) => patchMovie({ ...data, id: movie.id }, accessToken!),
  });

  const onSubmit: SubmitHandler<MovieFormSchema> = async (data) => {
    const status = await mutateAsync(data);

    if (status == 200) {
      toast.success("Данные фильма изменены");
      document.getElementById("closeDialog")?.click();
      queryClient.refetchQueries(["movies"]);
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
