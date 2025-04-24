import { User } from "./user";

export type SignInCredential = {
  username: string;
  password: string;
};

export type SignInResponse = {
  access_token: string;
  refresh_token: string;
  user: User;
};

export type SignUpResponse = SignInResponse;

export type SignUpCredential = {
  username: string;
  email: string;
  password: string;
};

export type ForgotPassword = {
  email: string;
};

export type ResetPassword = {
  password: string;
};

export type ChangePassword = {
  password: string;
  newPassword: string;
  confirmPassword: string;
};
