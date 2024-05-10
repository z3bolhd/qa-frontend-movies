"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { UserFormSchema, userFormSchema } from "./UserFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { getUserSession } from "@hooks/getUserSession";
import { Dialog, DialogContent, DialogTrigger } from "@components/ui/dialog";
import { Button } from "@components/ui/button";
import UserDialogForm from "./UserDialogForm";
import { createUser } from "@lib/api";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "react-query";

const UserCreate = () => {
  const form = useForm<UserFormSchema>({
    resolver: zodResolver(userFormSchema),
  });

  const { accessToken } = getUserSession();
  const queryClient = useQueryClient();
  const { mutateAsync, isLoading } = useMutation({
    mutationFn: (data: UserFormSchema) =>
      createUser({ ...data, password: data.password! }, accessToken!),
  });

  const onSubmit: SubmitHandler<UserFormSchema> = async (data) => {
    const status = await mutateAsync(data);

    if (status === 201) {
      toast.success("Пользователь успешно создан");
      document.getElementById("closeDialog")?.click();
      queryClient.refetchQueries(["users"]);
      return;
    }

    toast.error("Что-то пошло не так");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-blue-500 hover:bg-blue-600">Создать пользователя</Button>
      </DialogTrigger>
      <DialogContent>
        <UserDialogForm
          title="Создания пользователя"
          description={`Внесите данные пользователя. Кликните на кнопку "Создать" для добавления.`}
          footerButtonText="Создать"
          {...form}
          errors={form.formState.errors}
          isLoading={isLoading}
          onSubmit={onSubmit}
          isCreate
        />
      </DialogContent>
    </Dialog>
  );
};

export default UserCreate;
