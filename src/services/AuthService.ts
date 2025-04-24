import { SignInCredential, SignInResponse } from "@/types/auth";
import ApiService from "./ApiService";

export async function apiSignIn(data: SignInCredential) {
  return ApiService.fetchData<SignInResponse>({
    url: "/auth/login",
    method: "post",
    data,
  });
}

export async function apiRefreshToken(refreshToken: string | null) {
  return ApiService.fetchData<{
    access_token: string;
    refresh_token: string;
  }>({
    url: "/auth/refresh-token",
    method: "post",
    data: {
      refresh_token: refreshToken,
    },
  });
}
