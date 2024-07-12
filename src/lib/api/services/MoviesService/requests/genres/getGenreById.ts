import { AxiosCustomRequestConfig } from "@api/types";
import { MoviesClient } from "../../client";
import { Genre } from "@lib/types";

export interface GetGenreByIdParams {
  id: string;
}

export type GetGenreByIdConfig = AxiosCustomRequestConfig<GetGenreByIdParams>;

export const getGenreById = async ({ params, config }: GetGenreByIdConfig) =>
  MoviesClient.get<Genre>(`/genres/${params.id}`, config);
