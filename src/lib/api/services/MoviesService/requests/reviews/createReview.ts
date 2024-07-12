import { AxiosCustomRequestConfig } from "@api/types";
import { MoviesClient } from "../../client";
import { Review } from "@lib/types";

export interface CreateReviewParams {
  movieId: number;
  text: string;
  rating: number;
}

export type CreateReviewConfig = AxiosCustomRequestConfig<CreateReviewParams>;

export const createReview = async ({ params, config }: CreateReviewConfig) =>
  MoviesClient.post<Review>(`/movies/${params.movieId}/reviews`, params, config);
