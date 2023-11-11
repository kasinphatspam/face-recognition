import { AxiosResponse } from "axios";
import { fetch, handleApiResponse } from "./fetch";
import { Org, User } from "./types";

export async function getUser(): Promise<User> {
    return fetch.get("/auth/me").then(handleApiResponse);
}   

export async function Status(): Promise<AxiosResponse> {
    return fetch.get("/status")
}

export async function logout(): Promise<AxiosResponse> {
    return fetch.get("/auth/logout");
  }

export async function organize(userId: number): Promise<Org> {
    return fetch.get(`/user/${userId}/organization`).then(handleApiResponse);
}

export async function getOrg(orgId: number): Promise<Org> {
    return fetch.get(`/organization/${orgId}`).then(handleApiResponse);
}

export async function getAllEmployees(orgId: number): Promise<any> {
    return fetch.get(`/organization/${orgId}/employee/list/all`).then(handleApiResponse);
}