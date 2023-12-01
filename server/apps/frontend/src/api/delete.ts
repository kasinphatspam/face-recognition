import { AxiosResponse } from "axios";
import { fetch } from "./fetch";

export function deleteOrganization(orgId: number): Promise<AxiosResponse> {
  return fetch.delete(`/organization/${orgId}`)
}

export function deleteContact(orgId:number, contactId: number): Promise<AxiosResponse> {
  return fetch.delete(`organization/${orgId}/contact/${contactId}`)
}

export function deleteEmployee(userId: number, orgId: number): Promise<AxiosResponse> {
  return fetch.delete(`organization/${orgId}/employees/${userId}`)

}