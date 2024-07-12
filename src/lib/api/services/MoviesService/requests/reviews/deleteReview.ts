import { AxiosCustomRequestConfig } from "@api/types";
import { MoviesClient } from "../../client";
import { Review } from "@lib/types";

export interface DeleteReviewParams {
  movieId: number;
}

export type DeleteReviewConfig = AxiosCustomRequestConfig<DeleteReviewParams>;

export const deleteReview = async ({ params, config }: DeleteReviewConfig) =>
  MoviesClient.delete<Review>(`/movies/${params.movieId}/reviews`, config);
