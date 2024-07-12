import * as movieRequests from "./requests/movies";
import * as genreRequests from "./requests/genres";
import * as reviewRequests from "./requests/reviews";

export const MoviesService = {
  ...movieRequests,
  ...genreRequests,
  ...reviewRequests,
};
