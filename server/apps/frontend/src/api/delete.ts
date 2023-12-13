import { AxiosResponse } from "axios";
import { fetch } from "./fetch";

export function deleteOrganization(): Promise<AxiosResponse> {
  return fetch.delete(`/organizations/`);
}

export function deleteContact(
  orgId: number,
  contactId: number
): Promise<AxiosResponse> {
  return fetch.delete(`organizations/info/contacts/${contactId}`);
}

export function deleteEmployee(
  userId: number,
  orgId: number
): Promise<AxiosResponse> {
  return fetch.delete(`organizations/info/employees/${userId}`);
}
