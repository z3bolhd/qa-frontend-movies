"use client";

import { Row } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogTrigger } from "@components/ui/dialog";
import { User } from "@lib/types";

import UserCellEdit from "./UserCellEdit";

interface UserCellActionsProps {
  row: Row<User>;
}

const UserCellActions = ({ row }: UserCellActionsProps) => {
  const user = row.original;

  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center justify-center">
          <MoreHorizontal className="h-4 w-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DialogTrigger asChild>
            <DropdownMenuItem className="cursor-pointer">Изменить</DropdownMenuItem>
          </DialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>

      <DialogContent>
        <UserCellEdit {...user} />
      </DialogContent>
    </Dialog>
  );
};

export default UserCellActions;
