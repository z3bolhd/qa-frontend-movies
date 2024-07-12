import { AxiosCustomRequestConfig } from "@api/types";
import { MoviesClient } from "../../client";
import { Movie } from "@lib/types";

export interface EditMovieParams
  extends Omit<Movie, "reviews" | "createdAt" | "rating" | "genre"> {}

export type EditMovieConfig = AxiosCustomRequestConfig<EditMovieParams>;

export const editMovie = async ({ params, config }: EditMovieConfig) =>
  MoviesClient.patch<Movie>(`/movies/${params.id}`, params, config);
