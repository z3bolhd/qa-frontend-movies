import { AxiosCustomRequestConfig } from "@api/types";
import { MoviesClient } from "../../client";
import { Genre } from "@lib/types";

export interface CreateGenreParams {
  name: string;
}

export type CreateGenreConfig = AxiosCustomRequestConfig<CreateGenreParams>;

export const createGenre = async ({ params, config }: CreateGenreConfig) =>
  MoviesClient.post<Genre>(`/genres/`, params, config);
