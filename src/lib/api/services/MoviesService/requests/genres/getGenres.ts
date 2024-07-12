import { AxiosCustomRequestConfig } from "@api/types";
import { MoviesClient } from "../../client";
import { Genre } from "@lib/types";

export type GetGenresConfig = AxiosCustomRequestConfig;

export const getGenres = async ({ config }: GetGenresConfig) =>
  MoviesClient.get<Genre[]>("/genres", config);
