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

export type CreateUserDto = Omit<UserDto, "id" | "active" | "typeOfUser">;