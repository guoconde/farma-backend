import { PaginationFilterDto } from "./pagination";

export type UserDto = {
  id: string;
  name: string;
  phone: string;
  email: string;
  birthdate: Date;
  password: string;
  active: boolean;
  typeOfUser: "admin" | "employee" | "seller" | "initial";
};

export type UserWithoutPasswordDto = Omit<UserDto, "password" | "active">;

export type UpdateUserDto = Omit<UserDto, "password" | "id" | "active">;

export type CreateUserDto = Omit<UserDto, "id" | "active" | "typeOfUser">;

export type ListUsersDto = PaginationFilterDto<Pick<UserDto, "name">> & {
  name?: string;
};
