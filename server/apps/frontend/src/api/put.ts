import { fetch } from "./fetch";
import { AxiosResponse } from "axios";
import { User, Image, Org } from "./types";

export function updateUser(userId: number, data: User): Promise<AxiosResponse> {
  return fetch.put(`/user/${userId}`, data);
}

export function updateImage(
  userId: number,
  data: Image
): Promise<AxiosResponse> {
  return fetch.put(`/users/${userId}/image`, data);
}

export function updateEncode(
  orgId: number,
  contactId: number,
  data: Image
): Promise<AxiosResponse> {
  return fetch.put(`/organizations/info/contacts/${contactId}/encode`, data);
}

export function updateOrg(data: Org): Promise<AxiosResponse> {
  return fetch.put(`/organizations/`, data);
}
