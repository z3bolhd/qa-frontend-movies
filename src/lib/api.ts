import queryString from "query-string";
import { BACKEND_URL_AUTH, BACKEND_URL_MOVIES, BACKEND_URL_PAYMENT } from "./consts";
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

export const fetchData = async <T>(url: string, cache = true): Promise<T | null> => {
  const response = await fetch(url, {
    cache: cache ? "default" : "no-store",
  })
    .then((res) => {
      if (!res.ok) {
        return null;
      }

      return {
        data: res.json(),
        status: res.status,
      };
    })
    .catch(() => null);

  return (await response?.data) ?? null;
};

export const getMovies = async (params: GetMoviesParams = {}) => {
  const url =
    BACKEND_URL_MOVIES + "/movies" + "?" + queryString.stringify(params, { skipNull: true });
  return await fetchData<GetMoviesResponse>(url, false);
};

export const getMovieById = async (id: string) => {
  const url = BACKEND_URL_MOVIES + "/movies/" + id;

  return await fetchData<
    Movie & {
      reviews: Review[];
    }
  >(url, false);
};

export const getGenreById = async (id: number) => {
  const url = BACKEND_URL_MOVIES + "/genres/" + id;

  return await fetchData<Genre>(url, false);
};

export const getGenres = async () => {
  const url = BACKEND_URL_MOVIES + "/genres/";

  return await fetchData<Genre[]>(url, false);
};

export const deleteGenre = async (id: number, accessToken: string) => {
  const url = BACKEND_URL_MOVIES + "/genres/" + id;

  const status = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  })
    .then((res) => res.status)
    .catch((err) => err.status);

  return status;
};

export const createGenre = async (name: string, accessToken: string) => {
  const url = BACKEND_URL_MOVIES + "/genres";

  const stringifiedUser = JSON.stringify({ name });

  const status = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: stringifiedUser,
  })
    .then((res) => res.status)
    .catch((err) => err.status);

  return status;
};

export const registerUser = async (user: {
  email: string;
  fullName: string;
  password: string;
  passwordRepeat: string;
}) => {
  const url = BACKEND_URL_AUTH + "/register";

  const stringifiedUser = JSON.stringify({ ...user });

  const status = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: stringifiedUser,
  })
    .then((res) => res.status)
    .catch((err) => err.status);

  return status;
};

export const createReview = async (
  movieId: number,
  review: Pick<Review, "text" | "rating">,
  accessToken: string,
) => {
  const url = BACKEND_URL_MOVIES + "/movies/" + movieId + "/reviews/";

  const stringifiedReview = JSON.stringify({ ...review });

  const status = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: stringifiedReview,
  })
    .then((res) => res.status)
    .catch((err) => err.status);

  return status;
};

export const editReview = async (
  movieId: number,
  review: Pick<Review, "text" | "rating">,
  accessToken: string,
) => {
  const url = BACKEND_URL_MOVIES + "/movies/" + movieId + "/reviews/";

  const stringifiedReview = JSON.stringify({ ...review });

  const status = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: stringifiedReview,
  })
    .then((res) => res.status)
    .catch((err) => err.status);

  return status;
};

export const deleteReview = async (movieId: number, accessToken: string) => {
  const url = BACKEND_URL_MOVIES + "/movies/" + movieId + "/reviews/";

  const status = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  })
    .then((res) => res.status)
    .catch((err) => err.status);

  return status;
};

export const deleteReviewByUserId = async (
  movieId: number,
  userId: string,
  accessToken: string,
) => {
  const url = BACKEND_URL_MOVIES + "/movies/" + movieId + "/reviews?userId=" + userId;

  const status = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  })
    .then((res) => res.status)
    .catch((err) => err.status);

  return status;
};

export const patchMovie = async (
  data: Omit<Movie, "reviews" | "createdAt" | "rating" | "genre">,
  accessToken: string,
) => {
  const url = BACKEND_URL_MOVIES + "/movies/" + data.id;

  const stringifiedData = JSON.stringify({ ...data });

  const status = await fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: stringifiedData,
  })
    .then((res) => res.status)
    .catch((err) => err.status);

  return status;
};

export const deleteMovie = async (id: number, accessToken: string) => {
  const url = BACKEND_URL_MOVIES + "/movies/" + id;

  const status: number = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  })
    .then((res) => res.status)
    .catch((err) => err.status);

  return status;
};

export const createMovie = async (
  data: Omit<Movie, "id" | "reviews" | "createdAt" | "rating" | "genre">,
  accessToken: string,
) => {
  const url = BACKEND_URL_MOVIES + "/movies";

  const stringifiedData = JSON.stringify({ ...data });

  const status = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: stringifiedData,
  })
    .then((res) => res.status)
    .catch((err) => err.status);

  return status;
};

export const getUsers = async (params: GetUsersParams = {}, accessToken: string) => {
  const url = BACKEND_URL_AUTH + "/user" + "?" + queryString.stringify(params, { skipNull: true });

  const users: GetUsersResponse | null = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  })
    .then((res) => {
      if (!res.ok) {
        return null;
      }

      return res.json();
    })
    .catch(() => null);

  return users;
};

export const patchUser = async (
  data: Pick<User, "id" | "verified" | "roles">,
  accessToken: string,
) => {
  const url = BACKEND_URL_AUTH + "/user/" + data.id;

  const stringifiedData = JSON.stringify({ ...data });

  const status = await fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: stringifiedData,
  })
    .then((res) => res.status)
    .catch((err) => err.status);

  return status;
};

export const createUser = async (
  data: Pick<User, "fullName" | "email" | "verified"> & { password: string },
  accessToken: string,
) => {
  const url = BACKEND_URL_AUTH + "/user/";

  const stringifiedData = JSON.stringify({ ...data });

  const status = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: stringifiedData,
  })
    .then((res) => res.status)
    .catch((err) => err.status);

  return status;
};

export const createPayment = async (
  data: {
    movieId: number;
    amount: number;
    card: { cardNumber: string; cardHolder: string; securityCode: number; expirationDate: string };
  },
  accessToken: string,
) => {
  const url = BACKEND_URL_PAYMENT + "/create";

  const stringifiedData = JSON.stringify({ ...data });

  const status = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: stringifiedData,
  })
    .then((res) => res.status)
    .catch((err) => err.status);

  return status;
};

export const getPayments = async (params: GetPaymentsParams, accessToken: string) => {
  const url =
    BACKEND_URL_PAYMENT + "/find-all" + "?" + queryString.stringify(params, { skipNull: true });

  const payments: GetPaymentsResponse | null = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  })
    .then((res) => {
      if (!res.ok) {
        return null;
      }

      return res.json();
    })
    .catch(() => null);

  return payments;
};

export const getUserPayments = async (accessToken: string) => {
  const url = BACKEND_URL_PAYMENT + "/user";

  const payments: Payment[] | null = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  })
    .then((res) => {
      if (!res.ok) {
        return null;
      }

      return res.json();
    })
    .catch(() => null);

  return payments;
};
