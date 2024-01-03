import { AxiosResponse } from "axios";
import { fetch, handleApiResponse } from "./fetch";
import { Org, User, Contact, Request, Plan } from "./types";

export async function getUser(): Promise<User> {
  return fetch.get("/auth/me").then(handleApiResponse);
}

export async function Status(): Promise<AxiosResponse> {
  return fetch.get("/status");
}

export async function logout(): Promise<AxiosResponse> {
  return fetch.get("/auth/logout");
}

export async function organize(): Promise<Org> {
  return fetch.get(`/users/organization`).then(handleApiResponse);
}

export async function getOrg(orgId: number): Promise<Org> {
  return fetch.get(`/organizations/${orgId}`).then(handleApiResponse);
}

export async function getAllEmployees(orgId: number): Promise<User[]> {
  return fetch.get(`/organizations/info/employees`).then(handleApiResponse);
}

export async function getContacts(orgId: number): Promise<Contact[]> {
  return fetch.get(`/organizations/info/contacts`).then(handleApiResponse);
}

export async function getRequests(): Promise<Request[]> {
  return fetch.get(`/organizations/info/requests`).then(handleApiResponse);
}

export async function getPlans(): Promise<Plan[]> {
  return fetch.get(`/plans`).then(handleApiResponse);
}
