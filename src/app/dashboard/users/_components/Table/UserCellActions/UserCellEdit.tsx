import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

import { User } from "@lib/types";
import { patchUser } from "@lib/api";
import { getUserSession } from "@hooks/getUserSession";

import { UserFormSchema, userFormSchema } from "../../UserFormSchema";
import UserDialogForm from "../../UserDialogForm";

import { useMutation, useQueryClient } from "react-query";

const UserCellEdit = (user: User) => {
  const form = useForm<UserFormSchema>({
    resolver: zodResolver(userFormSchema),
  });

  const { accessToken } = getUserSession();

  const queryClient = useQueryClient();
  const { mutateAsync, isLoading } = useMutation((data: UserFormSchema) =>
    patchUser({ ...data, id: user.id }, accessToken!),
  );

  const onSubmit: SubmitHandler<UserFormSchema> = async (data) => {
    const status = await mutateAsync(data);

    if (status == 200) {
      toast.success("Данные пользователя изменены");
      document.getElementById("closeDialog")?.click();
      queryClient.refetchQueries(["users"]);
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
