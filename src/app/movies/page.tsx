import MoviesPageContainer from "@containers/MoviesPageContainer";
import { GetMoviesParams } from "@lib/types";

const Page = ({ searchParams }: { searchParams?: GetMoviesParams }) => {
  return <MoviesPageContainer query={searchParams} />;
};

export default Page;
