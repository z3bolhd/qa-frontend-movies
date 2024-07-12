import { notFound } from "next/navigation";
import PaymentCard from "./components/PaymentCard";
import { MoviesService } from "@api/services";

const PaymentPage = async ({
  searchParams: { movieId },
}: {
  searchParams: { movieId: string };
}) => {
  if (isNaN(Number(movieId))) {
    notFound();
  }

  const response = await MoviesService.getMovieById({
    params: {
      id: Number(movieId),
    },
  });

  if (!response) {
    notFound();
  }

  return (
    <div className="mt-36 mx-auto w-fit">
      <PaymentCard {...response.data} />
    </div>
  );
};

export default PaymentPage;
