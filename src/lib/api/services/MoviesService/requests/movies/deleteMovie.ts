import { AxiosCustomRequestConfig } from "@api/types";
import { MoviesClient } from "../../client";
import { Movie } from "@lib/types";

export interface DeleteMovieParams {
  id: number;
}

export type DeleteMovieConfig = AxiosCustomRequestConfig<DeleteMovieParams>;

export const deleteMovie = async ({ params, config }: DeleteMovieConfig) =>
  MoviesClient.delete<Movie>(`/movies/${params.id}`, config);
