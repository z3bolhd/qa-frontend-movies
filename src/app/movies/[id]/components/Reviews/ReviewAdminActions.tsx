import { MoreVertical } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";

interface ReviewAdminActionsProps {
  handleHide?: () => void;
  handleDelete?: () => void;
}

const ReviewAdminActions = ({ handleHide, handleDelete }: ReviewAdminActionsProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="w-5">
        <MoreVertical className="h-4 w-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem className="cursor-pointer" onClick={handleHide}>
          Скрыть
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer" onClick={handleDelete}>
          Удалить
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ReviewAdminActions;
