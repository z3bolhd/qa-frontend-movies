"use client";

import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { getUserSession } from "@hooks/getUserSession";
import { Review } from "@lib/types";
import { deleteReviewByUserId, hideReviewByUserId, showReviewByUserId } from "@lib/api";
import { getIsAdmin } from "@hooks/getIsAdmin";

import ReviewCard from "./ReviewCard";
import PersonalReview from "./PersonalReview";
import ReviewActions from "./ReviewActions";

interface ReviewsProps {
  reviews: Review[];
  movieId: number;
}

const Reviews = ({ reviews, movieId }: ReviewsProps) => {
  const router = useRouter();

  const { accessToken, user } = getUserSession();
  const isAdmin = getIsAdmin();

  const personalReview = reviews?.find((review) => review.userId === user?.id);

  const shownReviews = reviews?.filter((review) => review.userId !== user?.id && !review.hidden);
  const hiddenReviews = reviews?.filter((review) => review.hidden);

  const handleDelete = async (userId: string) => {
    const status = await deleteReviewByUserId(movieId, userId, accessToken!);

    if (status !== 200) {
      toast.error("Произошла ошибка");
      return;
    }

    toast.success("Отзыв успешно удален");
    router.refresh();
  };

  const handleShow = async (userId: string) => {
    const status = await showReviewByUserId(movieId, userId, accessToken!);

    if (status !== 200) {
      toast.error("Произошла ошибка");
      return;
    }

    toast.success("Отзыв успешно отображен");
    router.refresh();
  };

  const handleHide = async (userId: string) => {
    const status = await hideReviewByUserId(movieId, userId, accessToken!);

    if (status !== 200) {
      toast.error("Произошла ошибка");
      return;
    }

    toast.success("Отзыв успешно скрыт");
    router.refresh();
  };

  return (
    <div className="mt-10 w-[500px]">
      <h2 className="text-3xl">Отзывы:</h2>
      <div>
        {accessToken ? <PersonalReview review={personalReview} movieId={movieId} /> : null}
        {reviews.length === 0 ? (
          <p className="mt-10 text-2xl">Отзывов нет. Оставьте отзыв первым!</p>
        ) : (
          <ul className="mt-10 flex flex-col gap-5">
            {shownReviews?.map((review) => (
              <li key={review.userId}>
                <ReviewCard
                  {...review}
                  actions={
                    isAdmin ? (
                      <ReviewActions
                        hidden={review.hidden}
                        handleDelete={() => handleDelete(review.userId)}
                        handleHide={() => handleHide(review.userId)}
                        handleShow={() => handleShow(review.userId)}
                      />
                    ) : null
                  }
                />
              </li>
            ))}
          </ul>
        )}
      </div>
      {isAdmin && hiddenReviews.length ? (
        <div className="mt-10">
          <h3 className="text-2xl">Скрытые отзывы:</h3>
          <ul className="mt-5 flex flex-col gap-5">
            {hiddenReviews?.length ? (
              hiddenReviews?.map((review) => (
                <li key={review.userId}>
                  <ReviewCard
                    {...review}
                    actions={
                      <ReviewActions
                        hidden={review.hidden}
                        handleDelete={() => handleDelete(review.userId)}
                        handleHide={() => handleHide(review.userId)}
                        handleShow={() => handleShow(review.userId)}
                      />
                    }
                  />
                </li>
              ))
            ) : (
              <p className="text-xl">Скрытых отзывов нет</p>
            )}
          </ul>
        </div>
      ) : null}
    </div>
  );
};

export default Reviews;
