"use client";

import { Card, CardContent, CardHeader } from "@components/ui/card";
import { Review } from "@lib/types";

import Rating from "../Rating";
import ReviewUserActions from "./ReviewUserActions";

interface UserReviewCardProps extends Review {
  handleEdit?: () => void;
  handleDelete?: () => void;
}

const UserReviewCard = ({
  text,
  rating,
  user: { fullName },
  handleEdit,
  handleDelete,
}: UserReviewCardProps) => {
  return (
    <li className="w-full list-none">
      <Card className="w-full">
        <CardHeader>
          <div className="w-full flex justify-between">
            <h4 className="text-xl w-fit">{fullName}</h4>
            <ReviewUserActions handleEdit={handleEdit} handleDelete={handleDelete} />
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

export default UserReviewCard;
