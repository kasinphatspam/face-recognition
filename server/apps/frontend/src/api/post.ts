import { AxiosResponse } from "axios";
import { fetch } from "./fetch";
import { Login, Register, CreateOrg, Image, Contact } from "./types";

export async function login(data: Login): Promise<AxiosResponse> {
  return fetch.post("auth/login", data);
}

export async function register(data: Register): Promise<AxiosResponse> {
  return fetch.post("/auth/register", data);
}

export async function passCode(passcode: string): Promise<AxiosResponse> {
  return fetch.post(`/organizations/join/${passcode}`);
}

export async function createNewOrg(data: CreateOrg): Promise<AxiosResponse> {
  return fetch.post(`/organizations/`, data);
}

export async function postImageRecognition(
  orgId: number,
  data: Image
): Promise<AxiosResponse> {
  return fetch.post(`/organizations/info/contacts/recognition`, data);
}

export async function postNewContact(
  orgId: number,
  data: Contact
): Promise<AxiosResponse> {
  return fetch.post(`/organizations/info/contacts`, data);
}

export async function postVerifyPassword(
  code: string,
  email: string
): Promise<AxiosResponse> {
  const data = { code: code, email: email };
  return fetch.post(`/auth/forgot-password/verify`, data);
}

export async function postContactCSV(file: FormData): Promise<AxiosResponse> {
  const data = { file };
  return fetch.post(`/organizations/info/contact/csv`, data);
}
