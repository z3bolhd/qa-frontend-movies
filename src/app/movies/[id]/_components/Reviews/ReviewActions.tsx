import { MoreVertical } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";

interface ReviewActionsProps {
  hidden: boolean;
  handleShow: () => void;
  handleHide: () => void;
  handleDelete: () => void;
}

const ReviewActions = ({ handleDelete, handleHide, handleShow, hidden }: ReviewActionsProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="w-5">
        <MoreVertical className="h-4 w-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {hidden ? (
          <DropdownMenuItem className="cursor-pointer" onClick={handleShow}>
            Показать
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem className="cursor-pointer" onClick={handleHide}>
            Скрыть
          </DropdownMenuItem>
        )}

        <DropdownMenuItem className="cursor-pointer" onClick={handleDelete}>
          Удалить
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ReviewActions;
