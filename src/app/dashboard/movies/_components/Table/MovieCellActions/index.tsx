"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";
import { useState } from "react";
import { Row } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import { Dialog, DialogContent, DialogTrigger } from "@components/ui/dialog";

import { Movie } from "@lib/types";
import MovieCellEdit from "./MovieCellEdit";
import MovieCellDelete from "./MovieCellDelete";

interface MovieCellActionsProps {
  row: Row<Movie>;
}

const MovieCellActions = ({ row }: MovieCellActionsProps) => {
  const [dialog, setDialog] = useState<string | undefined>();

  const movie = row.original;

  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center justify-center">
          <MoreHorizontal className="h-4 w-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DialogTrigger asChild onClick={() => setDialog("edit")}>
            <DropdownMenuItem className="cursor-pointer">Изменить</DropdownMenuItem>
          </DialogTrigger>
          <DialogTrigger asChild onClick={() => setDialog("delete")}>
            <DropdownMenuItem className="cursor-pointer">Удалить</DropdownMenuItem>
          </DialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>

      <DialogContent>
        {dialog === "edit" && <MovieCellEdit {...movie} />}
        {dialog === "delete" && <MovieCellDelete {...movie} />}
      </DialogContent>
    </Dialog>
  );
};

export default MovieCellActions;
