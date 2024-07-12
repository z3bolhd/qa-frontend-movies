import { AxiosCustomRequestConfig } from "@api/types";
import { MoviesClient } from "../../client";
import { Movie } from "@lib/types";

export interface CreateMovieParams
  extends Omit<Movie, "id" | "reviews" | "createdAt" | "rating" | "genre"> {}

export type CreateMovieConfig = AxiosCustomRequestConfig<CreateMovieParams>;

export const createMovie = async ({ params, config }: CreateMovieConfig) =>
  MoviesClient.post<Movie>(`/movies`, params, config);
