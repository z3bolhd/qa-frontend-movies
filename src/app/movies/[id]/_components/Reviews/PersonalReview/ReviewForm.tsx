import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/ui/select";
import { createReview, editReview } from "@lib/api";
import { Review } from "@lib/types";
import { cn } from "@lib/utils";
import { Textarea } from "@components/ui/textarea";
import { Button } from "@components/ui/button";

interface ReviewFormProps {
  review?: Review;
  movieId: number;
  closeForm: () => void;
}

interface ReviewInput {
  text: string;
  rating: number;
}

const ReviewForm = ({ movieId, review, closeForm }: ReviewFormProps) => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<ReviewInput>({
    defaultValues: {
      text: review?.text,
      rating: review?.rating,
    },
  });

  useEffect(() => {
    for (const error of Object.values(errors)) {
      if (error.message) {
        toast.error(error.message);
      }
    }
  }, [errors]);

  const onSubmit: SubmitHandler<ReviewInput> = async (data) => {
    if (review?.text || review?.rating) {
      const { status } = await editReview(movieId, {
        text: data.text,
        rating: Number(data.rating),
      });

      if (status !== 200) {
        toast.error("Произошла ошибка");
        return;
      }

      toast.success("Отзыв успешно обновлен");
    } else {
      const { status } = await createReview(movieId, {
        text: data.text,
        rating: Number(data.rating),
      });

      if (status !== 201) {
        toast.error("Произошла ошибка");
        return;
      }

      toast.success("Отзыв успешно создан");
    }

    closeForm();
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Textarea
        className={cn("outline rounded-md transition-all text-base min-h-[125px]")}
        placeholder="Написать отзыв"
        defaultValue={review?.text ?? ""}
        data-qa-id="movie_review_input"
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
                    <SelectValue placeholder="Оценка" data-qa-id="movie_rating_select" />
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
        <Button type="submit" className="w-fit" data-qa-id="movie_review_submit_button">
          {review?.text || review?.rating ? "Сохранить" : "Отправить"}
        </Button>
      </div>
    </form>
  );
};

export default ReviewForm;
