import { AxiosResponse } from "axios";
import { fetch, handleApiResponse } from "./fetch";

export function deleteOrganization(orgId: number): Promise<AxiosResponse> {
  return fetch.delete(`/organization/${orgId}`)
}