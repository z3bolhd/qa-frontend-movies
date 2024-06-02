"use client";

import { Control, Controller, FieldErrors, SubmitHandler, UseFormRegister } from "react-hook-form";

import LoadingSpinner from "@components/LoadingSpinner";
import { Button } from "@components/ui/button";
import { Checkbox } from "@components/ui/checkbox";
import {
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@components/ui/dialog";
import { Input } from "@components/ui/input";
import { Label } from "@components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/ui/select";

import { Role, User } from "@lib/types";

import { UserFormSchema } from "./UserFormSchema";
import useSession from "@hooks/useSession";

interface UserDialogFormProps {
  title: string;
  description?: string;
  isCreate?: boolean;
  footerButtonText: string;
  register: UseFormRegister<UserFormSchema | User>;
  handleSubmit: (onValid: SubmitHandler<UserFormSchema | User>) => any;
  errors: FieldErrors<UserFormSchema | User>;
  control: Control<UserFormSchema | User>;
  onSubmit: SubmitHandler<UserFormSchema | User>;
  user?: User;
  isLoading: boolean;
}

const UserDialogForm = ({
  title,
  description,
  isCreate,
  footerButtonText,
  register,
  user,
  handleSubmit,
  onSubmit,
  errors,
  control,
  isLoading,
}: UserDialogFormProps) => {
  const { session } = useSession();
  const roles = Object.values(Role);
  const inputRoles = session?.roles.includes(Role.SUPER_ADMIN)
    ? roles
    : roles.filter((role) => role !== Role.SUPER_ADMIN);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div className="mt-3">
          <Label htmlFor="fullName">ФИО</Label>
          <Input
            id="fullName"
            disabled={!isCreate}
            {...register("fullName", { value: user?.fullName || "", required: true, minLength: 1 })}
          />
          {errors.fullName && (
            <p className="mt-1 text-red-500 text-sm">{errors.fullName.message as string}</p>
          )}
        </div>
        <div className="mt-3">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            disabled={!isCreate}
            {...register("email", { value: user?.email || "", required: true, minLength: 1 })}
          />
          {errors.email && (
            <p className="mt-1 text-red-500 text-sm">{errors.email.message as string}</p>
          )}
        </div>

        {isCreate ? (
          <div className="mt-3">
            <Label htmlFor="password">Пароль</Label>
            <Input
              id="password"
              defaultValue=""
              {...register("password", { required: true, minLength: 1 })}
            />
            {errors.email && (
              <p className="mt-1 text-red-500 text-sm">{errors.email.message as string}</p>
            )}
          </div>
        ) : null}

        <div className="mt-3">
          <Label htmlFor="roles">Роль</Label>
          <Controller
            control={control}
            name="roles"
            defaultValue={user?.roles || [roles[0]!]}
            render={({ field }) => (
              <Select
                onValueChange={(e: Role) => {
                  const index = roles.indexOf(e);
                  console.log(index);
                  field.onChange(roles.slice(0, index + 1));
                }}
                defaultValue={user?.roles[user.roles.length - 1] || roles[0]!}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Роли" />
                </SelectTrigger>

                <SelectContent>
                  {inputRoles.map((role) => (
                    <SelectItem value={role} key={role}>
                      {role}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.roles && (
            <p className="mt-1 text-red-500 text-sm">{errors.roles.message as string}</p>
          )}
        </div>
        <div className="mt-3 h-8 flex items-center">
          <Controller
            name="verified"
            control={control}
            defaultValue={user?.verified || false}
            render={({ field }) => (
              <>
                <Checkbox
                  id="verified"
                  className="h-[18px] w-[18px]"
                  defaultChecked={field.value}
                  onCheckedChange={() => field.onChange(!field.value)}
                  {...register("verified")}
                  disabled={user?.roles.includes(Role.SUPER_ADMIN) && user.verified}
                />

                <Label htmlFor="verified" className="ml-2">
                  Подтверждён
                </Label>
              </>
            )}
          />
          {errors.verified && (
            <p className="mt-1 text-red-500 text-sm">{errors.verified.message as string}</p>
          )}
        </div>
        <div className="mt-3 h-8 flex items-center">
          <Controller
            name="banned"
            control={control}
            defaultValue={user?.banned || false}
            render={({ field }) => (
              <>
                <Checkbox
                  id="banned"
                  className="h-[18px] w-[18px]"
                  defaultChecked={field.value}
                  onCheckedChange={() => field.onChange(!field.value)}
                  {...register("banned")}
                  disabled={user?.roles.includes(Role.SUPER_ADMIN)}
                />

                <Label htmlFor="banned" className="ml-2">
                  Забанен
                </Label>
              </>
            )}
          />
          {errors.banned && (
            <p className="mt-1 text-red-500 text-sm">{errors.banned.message as string}</p>
          )}
        </div>
        <DialogFooter className="mt-3">
          <Button type="submit" className="bg-blue-500 hover:bg-blue-600" disabled={isLoading}>
            {isLoading ? <LoadingSpinner size={16} /> : footerButtonText}
          </Button>
          <DialogClose id="closeDialog" />
        </DialogFooter>
      </form>
    </>
  );
};

export default UserDialogForm;
