import { AxiosCustomRequestConfig } from "@api/types";
import { MoviesClient } from "../../client";
import { Genre } from "@lib/types";

export interface DeleteGenreParams {
  id: number;
}

export type DeleteGenreConfig = AxiosCustomRequestConfig<DeleteGenreParams>;

export const deleteGenre = async ({ params, config }: DeleteGenreConfig) =>
  MoviesClient.delete<Genre>(`/genres/${params.id}`, config);
