"use client";

import { Dispatch, useContext } from "react";
import { Updater } from "@tanstack/react-table";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/ui/select";

import { GetMoviesParams } from "@lib/types";

interface MovieFiltersProps {
  setFilters: Dispatch<Updater<GetMoviesParams>>;
}

const MovieFilters = ({ setFilters }: MovieFiltersProps) => {
  const onPublishedValueChange = (value: string) => {
    const published = !!Number(value);

    setFilters((prev) => ({ ...prev, published, page: 1 }));
  };

  const onCreatedAtValueChange = (value: string) => {
    const createdAt = value;

    setFilters((prev) => ({ ...prev, createdAt, page: 1 }));
  };

  return (
    <ul className="mr-5 flex gap-5">
      <li>
        <Select onValueChange={onPublishedValueChange}>
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

      <li>
        <Select onValueChange={onCreatedAtValueChange}>
          <SelectTrigger>
            <SelectValue placeholder="Создано" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={"desc"} className="cursor-pointer">
              Новые
            </SelectItem>
            <SelectItem value={"asc"} className="cursor-pointer">
              Старые
            </SelectItem>
          </SelectContent>
        </Select>
      </li>
    </ul>
  );
};

export default MovieFilters;
