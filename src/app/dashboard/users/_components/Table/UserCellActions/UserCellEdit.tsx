import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useContext, useState } from "react";

import { User } from "@lib/types";
import { patchUser } from "@lib/api";
import { getUserSession } from "@hooks/getUserSession";

import { UserFormSchema, userFormSchema } from "../../UserFormSchema";
import UserDialogForm from "../../UserDialogForm";
import { UsersDataContext } from "@context/UsersDataContext";

interface UserCellEditProps extends User {}

const UserCellEdit = (user: UserCellEditProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const { fetchUsers } = useContext(UsersDataContext);

  const form = useForm<UserFormSchema>({
    resolver: zodResolver(userFormSchema),
  });

  const { accessToken } = getUserSession();

  const onSubmit: SubmitHandler<UserFormSchema> = async (data) => {
    setIsLoading(true);
    const userId = user.id;
    const status = await patchUser({ ...data, id: userId }, accessToken!);

    setIsLoading(false);

    if (status == 200) {
      toast.success("Данные пользователя изменены");
      document.getElementById("closeDialog")?.click();
      fetchUsers();
      return;
    }

    toast.error("Произошла ошибка");
  };

  return (
    <>
      <UserDialogForm
        title="Редактирование пользователя"
        description={`Измените данные пользователя. Кликните на кнопку "Сохранить" для сохранения изменений.`}
        footerButtonText="Сохранить"
        {...form}
        isLoading={isLoading}
        onSubmit={onSubmit}
        user={user}
        errors={form.formState.errors}
      />
    </>
  );
};

export default UserCellEdit;
