import { AxiosResponse } from "axios";
import { fetch, handleApiResponse } from "./fetch";
import { Org, User, Contact } from "./types";

export async function getUser(): Promise<User> {
    return fetch.get("/auth/me").then(handleApiResponse);
}   

export async function Status(): Promise<AxiosResponse> {
    return fetch.get("/status")
}

export async function logout(): Promise<AxiosResponse> {
    return fetch.get("/auth/logout");
  }

export async function organize(): Promise<Org> {
    return fetch.get(`/user/organization`).then(handleApiResponse);
}

export async function getOrg(orgId: number): Promise<Org> {
    return fetch.get(`/organization/${orgId}`).then(handleApiResponse);
}

export async function getAllEmployees(orgId: number): Promise<User[]> {
    return fetch.get(`/organization/${orgId}/employee/list/all`).then(handleApiResponse);
}

export async function getContacts(orgId: number): Promise<Contact[]> {
    return fetch.get(`/organization/${orgId}/contact/list/all`).then(handleApiResponse);
}
