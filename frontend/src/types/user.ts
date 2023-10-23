export interface User {
  id?: number;
  username?: string;
  email?: string;
  firstname?: string;
  password?: string;
  lastname?: string;
}

export interface AuthUserResponse {
  user: User;
  accessToken: string;
}

export type AuthUserRequest = Pick<User, "email" | "password">;

export type RegistrationUserRequest = Pick<User, "email" | "username" | "lastname" | "password" | "firstname">;

export interface UserFormData extends RegistrationUserRequest {
  passwordConfirm?: User["password"];
  personalData?: boolean;
}
