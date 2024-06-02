import { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import queryString from "query-string";

import { AuthClient, MoviesClient, PaymentClient } from "@/clients";

import {
  Genre,
  Movie,
  Review,
  GetMoviesParams,
  GetMoviesResponse,
  User,
  GetUsersParams,
  GetUsersResponse,
  GetPaymentsResponse,
  GetPaymentsParams,
  Payment,
} from "./types";

type HTTPMethod = "get" | "post" | "put" | "delete" | "patch";

export const fetchData = async <T>(
  client: AxiosInstance,
  method: HTTPMethod = "get",
  url: string,
  body?: any,
): Promise<AxiosResponse<T, any> | { data: null; status: number | undefined }> => {
  return await client[method]<T>(url, body).catch((err: AxiosError) => ({
    data: null,
    status: err.status,
  }));
};

export const getMovies = async (params: GetMoviesParams = {}) => {
  return await fetchData<GetMoviesResponse>(
    MoviesClient,
    "get",
    "/movies" + "?" + queryString.stringify(params, { skipNull: true }),
    params,
  );
};

export const getMovieById = async (id: string) => {
  return await fetchData<Movie & { reviews: Review[] }>(MoviesClient, "get", "/movies/" + id);
};

export const getGenreById = async (id: number) => {
  return await fetchData<Genre>(MoviesClient, "get", "/genres/" + id);
};

export const getGenres = async () => {
  return await fetchData<Genre[]>(MoviesClient, "get", "/genres");
};

export const deleteGenre = async (id: number) => {
  return await fetchData<Genre>(MoviesClient, "delete", "/genres/" + id);
};

export const createGenre = async (name: string) => {
  return await fetchData<Genre>(MoviesClient, "post", "/genres", { name });
};

export const registerUser = async (user: {
  email: string;
  fullName: string;
  password: string;
  passwordRepeat: string;
}) => {
  return await fetchData<User>(AuthClient, "post", "/register", user);
};

export const createReview = async (movieId: number, review: Pick<Review, "text" | "rating">) => {
  return await fetchData<Review>(MoviesClient, "post", "/movies/" + movieId + "/reviews", review);
};

export const editReview = async (movieId: number, review: Pick<Review, "text" | "rating">) => {
  return await fetchData<Review>(MoviesClient, "put", "/movies/" + movieId + "/reviews", review);
};

export const deleteReview = async (movieId: number) => {
  return await fetchData<Review>(MoviesClient, "delete", "/movies/" + movieId + "/reviews");
};

export const hideReviewByUserId = async (movieId: number, userId: string) => {
  return await fetchData<Review>(
    MoviesClient,
    "patch",
    "/movies/" + movieId + "/reviews/hide/" + userId,
  );
};

export const showReviewByUserId = async (movieId: number, userId: string) => {
  return await fetchData<Review>(
    MoviesClient,
    "patch",
    "/movies/" + movieId + "/reviews/show/" + userId,
  );
};

export const deleteReviewByUserId = async (movieId: number, userId: string) => {
  return await fetchData<Review>(
    MoviesClient,
    "delete",
    "/movies/" + movieId + "/reviews/" + userId,
  );
};

export const patchMovie = async (
  movie: Omit<Movie, "reviews" | "createdAt" | "rating" | "genre">,
) => {
  return await fetchData<Movie>(MoviesClient, "patch", "/movies/" + movie.id, movie);
};

export const deleteMovie = async (id: number) => {
  return await fetchData<Movie>(MoviesClient, "delete", "/movies/" + id);
};

export const createMovie = async (
  movie: Omit<Movie, "id" | "reviews" | "createdAt" | "rating" | "genre">,
) => {
  return await fetchData<Movie>(MoviesClient, "post", "/movies", movie);
};

export const getUsers = async (params: GetUsersParams = {}) => {
  return await fetchData<GetUsersResponse>(
    AuthClient,
    "get",
    "/user" + "?" + queryString.stringify(params, { skipNull: true }),
  );
};

export const patchUser = async (user: Pick<User, "id" | "verified" | "roles" | "banned">) => {
  return await fetchData<User>(AuthClient, "patch", "/user/" + user.id, user);
};

export const createUser = async (
  user: { password: string } & Pick<User, "fullName" | "email" | "verified" | "banned">,
) => {
  return await fetchData<User>(AuthClient, "post", "/user", user);
};

export const createPayment = async (payment: {
  movieId: number;
  amount: number;
  card: { cardNumber: string; cardHolder: string; securityCode: number; expirationDate: string };
}) => {
  return await fetchData<Payment>(PaymentClient, "post", "/payment", payment);
};

export const getPayments = async (params: GetPaymentsParams) => {
  return await fetchData<GetPaymentsResponse>(
    PaymentClient,
    "get",
    "/payment" + "?" + queryString.stringify(params, { skipNull: true }),
  );
};

export const getUserPayments = async () => {
  return await fetchData<Payment[]>(PaymentClient, "get", "/payment/user");
};
