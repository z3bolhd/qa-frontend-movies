import { notFound } from "next/navigation";
import Image from "next/image";
import { Metadata } from "next";

import Rating from "./_components/Rating";

import BuyTicketButton from "./_components/BuyTicketButton";
import Reviews from "./_components/Reviews";
import { MoviesService } from "@api/services";

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const { data: movie } = await MoviesService.getMovieById({ params: { id: Number(params.id) } });

  return {
    title: movie?.name + " | Cinescope",
    description: movie?.description,
    openGraph: {
      title: movie?.name,
      description: movie?.description,
      images: [movie?.imageUrl || ""],
    },
  };
}

const MoviePage = async ({ params }: { params: { id: string } }) => {
  const response = await MoviesService.getMovieById({ params: { id: Number(params.id) } });

  if (!response) {
    notFound();
  }

  const {
    id,
    name,
    description,
    imageUrl,
    rating,
    genre: { name: genreName },
    reviews,
    price,
  } = response.data;

  return (
    <main className="py-10">
      <section className="w-full flex justify-between">
        <div className="w-[500px]">
          <h2 className="text-6xl">{name}</h2>
          <p className="mt-10 text-lg">{description}</p>
          <p className="text-lg mt-5">Жанр: {genreName}</p>
          <Rating rating={rating} />
          <div className="mt-5">
            <BuyTicketButton movieId={id} price={price} />
          </div>
        </div>
        <div>
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={name}
              width={500}
              height={500}
              priority
              className="w-[300px] max-w-[350px] object-cover rounded-lg"
            />
          ) : null}
        </div>
      </section>
      <Reviews reviews={reviews} movieId={id} />
    </main>
  );
};

export default MoviePage;
