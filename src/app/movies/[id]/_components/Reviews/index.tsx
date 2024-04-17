"use client";

import { Review } from "@lib/types";
import UserReview from "./UserReview";
import ReviewCard from "./ReviewCard";
import { getIsAdmin } from "@hooks/getIsAdmin";
import { getUserSession } from "@hooks/getUserSession";
import { deleteReviewByUserId } from "@lib/api";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface ReviewsProps {
  reviews?: Review[];
  movieId: number;
}

const Reviews = ({ reviews, movieId }: ReviewsProps) => {
  const { user, accessToken } = getUserSession();
  const router = useRouter();

  const isAdmin = getIsAdmin();

  const userReview = reviews?.find((review) => review.userId === user?.id);

  const handleDelete = async (userId: string) => {
    const status = await deleteReviewByUserId(movieId, userId, accessToken!);

    if (status !== 200) {
      toast.success("Произошла ошибка");
      return;
    }

    toast.success("Отзыв успешно удален");

    router.refresh();
  };

  const handleHide = async (userId: string) => {
    const status = await deleteReviewByUserId(movieId, userId, accessToken!);

    if (status !== 200) {
      toast.success("Произошла ошибка");
      return;
    }

    toast.success("Отзыв успешно скрыт");

    router.refresh();
  };

  return (
    <section className="mt-10 w-[500px]">
      <h2 className="text-4xl">Отзывы</h2>
      {user?.id ? (
        <UserReview review={userReview} movieId={movieId} />
      ) : (
        <p className="mt-5 text-xl">
          <Link className="underline" href="/login">
            Войдите
          </Link>
          , чтобы оставить отзыв
        </p>
      )}
      {reviews?.length ? (
        <ul className="mt-10 flex flex-col gap-5">
          {reviews
            .filter((review) => review.userId !== user?.id)
            .reverse()
            .map((review) => (
              <ReviewCard
                key={review.userId}
                {...review}
                movieId={movieId}
                isAdmin={isAdmin}
                handleDelete={handleDelete}
                handleHide={handleHide}
              />
            ))}
        </ul>
      ) : (
        <p className="mt-5 text-xl">Отзывов нет</p>
      )}
    </section>
  );
};

export default Reviews;
