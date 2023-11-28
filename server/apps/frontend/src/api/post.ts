import { AxiosResponse } from "axios";
import { fetch } from "./fetch";
import { Login, Register, CreateOrg, Image, Contact } from "./types"

export async function login(data: Login): Promise<AxiosResponse> {
  return fetch.post('auth/login', data)
}

export async function register(data: Register): Promise<AxiosResponse> {
  return fetch.post('/auth/register', data)
}

export async function passCode(passcode: string): Promise<AxiosResponse> {
  return fetch.post(`/organization/join/${passcode}`)
}

export async function createNewOrg(data: CreateOrg): Promise<AxiosResponse> {
  return fetch.post(`/organization/`, data)
}

export async function postImageRecognition(orgId: number, data: Image): Promise<AxiosResponse> {
  return fetch.post(`/organization/${orgId}/contact/encode/recognition`, data);
}

export async function postNewContact(orgId: number, data: Contact): Promise<AxiosResponse> {
  return fetch.post(`/organization/${orgId}/contact`, data);
}