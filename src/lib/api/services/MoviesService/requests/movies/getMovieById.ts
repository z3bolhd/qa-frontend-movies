import { AxiosCustomRequestConfig } from "@api/types";
import { MoviesClient } from "../../client";
import { Movie, Review } from "@lib/types";

export interface GetMovieByIdParams {
  id: number;
}

export type GetMovieByIdConfig = AxiosCustomRequestConfig<GetMovieByIdParams>;

export const getMovieById = async ({ params, config }: GetMovieByIdConfig) =>
  MoviesClient.get<Movie & { reviews: Review[] }>(`/movies/${params.id}`, config);
