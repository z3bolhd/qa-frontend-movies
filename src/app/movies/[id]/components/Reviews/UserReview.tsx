"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

import { Button } from "@components/ui/button";
import { Textarea } from "@components/ui/textarea";
import { Review } from "@lib/types";
import { cn } from "@lib/utils";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent,
} from "@components/ui/select";

import { getUserSession } from "@hooks/getUserSession";
import { createReview, deleteReview, editReview } from "@lib/api";

import UserReviewCard from "./UserReviewCard";

interface UserReviewProps {
  review?: Review;
  movieId: number;
}

interface ReviewInput {
  text: string;
  rating: number;
}

const UserReview = ({ review, movieId }: UserReviewProps) => {
  const [isWasClicked, setIsWasClicked] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();
  const { accessToken } = getUserSession();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    control,
    reset,
  } = useForm<ReviewInput>();

  const handleClicked = () => {
    setIsWasClicked(true);
  };

  const handleEdit = () => {
    setValue("text", review?.text ?? "");
    setIsEditing(true);
  };

  useEffect(() => {
    for (const error of Object.values(errors)) {
      if (error.message) {
        toast.error(error.message);
      }
    }
  }, [errors]);

  const handleDelete = async () => {
    const status = await deleteReview(movieId, accessToken!);

    if (status !== 200) {
      toast.error("Произошла ошибка");
      return;
    }

    toast.success("Отзыв успешно удален");
    reset();
    router.refresh();
  };

  const onSubmit: SubmitHandler<ReviewInput> = async (data) => {
    setIsEditing(false);

    if (isEditing) {
      const status = await editReview(
        movieId,
        {
          text: data.text,
          rating: Number(data.rating),
        },
        accessToken!,
      );

      if (status !== 200) {
        toast.error("Произошла ошибка");
        return;
      }

      toast.success("Отзыв успешно обновлен");
    } else {
      const status = await createReview(
        movieId,
        {
          text: data.text,
          rating: Number(data.rating),
        },
        accessToken!,
      );

      if (status !== 201) {
        toast.error("Произошла ошибка");
        return;
      }

      toast.success("Отзыв успешно создан");
    }

    router.refresh();
  };

  return (
    <div className="flex flex-col mt-5">
      {review && !isEditing ? (
        <UserReviewCard {...review} handleEdit={handleEdit} handleDelete={handleDelete} />
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Textarea
            className={cn(
              "outline rounded-md transition-all text-base",
              isWasClicked ? "h-[125px]" : "",
            )}
            placeholder="Написать отзыв"
            onClick={handleClicked}
            {...register("text", {
              required: "Поле отзыва обязательно к заполнению",
            })}
          />
          <div className="mt-5 flex justify-between">
            <div className="flex items-center relative">
              <p className="text-lg mr-5">Оценка: </p>
              <div className="w-16">
                <Controller
                  control={control}
                  name="rating"
                  defaultValue={review?.rating ?? 5}
                  render={({ field }) => (
                    <Select value={field.value.toString()} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Оценка" />
                      </SelectTrigger>
                      <SelectContent>
                        {[1, 2, 3, 4, 5].map((rating) => (
                          <SelectItem
                            className="cursor-pointer"
                            key={rating}
                            value={rating.toString()}
                            onSelect={field.onChange}
                          >
                            {rating}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
            </div>
            <Button type="submit" className="w-fit">
              {isEditing ? "Сохранить" : "Отправить"}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default UserReview;
