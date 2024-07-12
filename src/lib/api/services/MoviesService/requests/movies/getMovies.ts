import queryString from "query-string";

import { AxiosCustomRequestConfig } from "@api/types";
import { MoviesClient } from "../../client";
import { GetMoviesResponse } from "@lib/types";

export interface GetMoviesParams {
  page?: number | string;
  pageSize?: number | string;
  genreId?: number | string;
  name?: string;
  createdAt?: string;
  published?: boolean | string;
}

export type GetMoviesConfig = AxiosCustomRequestConfig<GetMoviesParams>;

export const getMovies = async ({ params, config }: GetMoviesConfig) =>
  MoviesClient.get<GetMoviesResponse>(
    "/movies?" + queryString.stringify(params, { skipNull: true }),
    config,
  );
