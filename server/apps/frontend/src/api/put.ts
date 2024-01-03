import { fetch } from "./fetch";
import { AxiosResponse } from "axios";
import { User, Image, Org } from "./types";

export function updateUser(userId: number, data: User): Promise<AxiosResponse> {
  return fetch.put(`/users/${userId}`, data);
}

export function updateImage(
  userId: number,
  data: Image
): Promise<AxiosResponse> {
  return fetch.put(`/users/${userId}/image`, data);
}

export async function updateEncode(
  orgId: number,
  contactId: number,
  data: Image
): Promise<AxiosResponse> {
  return fetch.put(`/organizations/info/contacts/${contactId}/encode`, data);
}

export async function updateOrg(data: Org): Promise<AxiosResponse> {
  return fetch.put(`/organizations/`, data);
}

export async function forgetPwd(email: string): Promise<AxiosResponse> {
  const data = { email };
  return fetch.put(`/auth/forgot-password`, data);
}

export async function changePassword(
  oldPassword: string,
  password: string
): Promise<AxiosResponse> {
  const data = { oldPassword, password };
  return fetch.put(`/auth/change-password/wc`, data);
}

export async function changePasswordWoOldPassword(
  password: string
): Promise<AxiosResponse> {
  const data = { password };
  return fetch.put(`/auth/change-password/woc`, data);
}
