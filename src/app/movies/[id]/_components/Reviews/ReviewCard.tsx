"use client";

import { Card, CardContent, CardHeader } from "@components/ui/card";
import { Review } from "@lib/types";

import Rating from "../Rating";
import ReviewAdminActions from "./ReviewAdminActions";

interface ReviewCardProps extends Review {
  movieId: number;
  isAdmin?: boolean;
  handleHide?: (userId: string) => void;
  handleDelete?: (userId: string) => void;
}

const ReviewCard = ({
  text,
  rating,
  user: { fullName },
  userId,
  handleDelete,
  handleHide,
  isAdmin,
}: ReviewCardProps) => {
  const handleDeleteReviewAdminAction = async () => {
    if (handleDelete) {
      handleDelete(userId);
    }
  };

  const handleHideReviewAdminAction = async () => {
    if (handleHide) {
      handleHide(userId);
    }
  };

  return (
    <li className="w-full list-none">
      <Card className="w-full">
        <CardHeader>
          <div className="w-full flex justify-between">
            <h4 className="text-xl w-fit">{fullName}</h4>
            {isAdmin && (
              <ReviewAdminActions
                handleDelete={handleDeleteReviewAdminAction}
                handleHide={handleHideReviewAdminAction}
              />
            )}
          </div>
        </CardHeader>
        <CardContent>
          <p className="overflow-hidden text-ellipsis">{text}</p>
          <Rating rating={rating} />
        </CardContent>
      </Card>
    </li>
  );
};

export default ReviewCard;
