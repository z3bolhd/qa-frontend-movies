import { getMovieById } from "@lib/api";
import { notFound } from "next/navigation";
import PaymentCard from "./components/PaymentCard";

const PaymentPage = async ({
  searchParams: { movieId },
}: {
  searchParams: { movieId: string };
}) => {
  if (isNaN(Number(movieId))) {
    notFound();
  }

  const movie = await getMovieById(movieId);

  if (!movie) {
    notFound();
  }

  return (
    <div className="mt-36 mx-auto w-fit">
      <PaymentCard {...movie} />
    </div>
  );
};

export default PaymentPage;
