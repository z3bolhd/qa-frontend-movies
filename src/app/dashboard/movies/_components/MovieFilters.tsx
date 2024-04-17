"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/ui/select";
import { MoviesDataContext } from "@context/MoviesDataContext";
import { useContext } from "react";

const MovieFilters = () => {
  const { isPublished, setIsPublished, setCurrentPage } = useContext(MoviesDataContext);

  const onPublishedValueChange = (value: string) => {
    const published = !!Number(value);

    setIsPublished(published);
    setCurrentPage(1);
  };

  return (
    <ul className="mr-5">
      <li>
        <Select value={isPublished ? "1" : "0"} onValueChange={onPublishedValueChange}>
          <SelectTrigger>
            <SelectValue placeholder="Опубликован" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={"1"} className="cursor-pointer">
              Опубликованы
            </SelectItem>
            <SelectItem value={"0"} className="cursor-pointer">
              Не публикованы
            </SelectItem>
          </SelectContent>
        </Select>
      </li>
    </ul>
  );
};

export default MovieFilters;
