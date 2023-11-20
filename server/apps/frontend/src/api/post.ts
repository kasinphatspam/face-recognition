import { AxiosResponse } from "axios";
import { fetch } from "./fetch";
import { Login, Register, CreateOrg, ImageRecognition, Contact } from "./types"

export async function login(data: Login): Promise<AxiosResponse> {
  return fetch.post('auth/login', data)
}

export async function register(data: Register): Promise<AxiosResponse> {
  return fetch.post('/auth/register', data)
}

export async function passCode(passcode: string): Promise<AxiosResponse> {
  return fetch.post(`/organization/user/join/${passcode}`)
}

export async function createNewOrg(data: CreateOrg): Promise<AxiosResponse> {
  return fetch.post(`/organization/`, data)
}

export async function postImageRecognition(userId: number, orgId: number, data: ImageRecognition): Promise<AxiosResponse> {
  return fetch.post(`/organization/${orgId}/user/${userId}/contact/encode/recognition`, data);
}

export async function postNewContact(orgId: number, data: Contact): Promise<AxiosResponse> {
  return fetch.post(`/organization/${orgId}/contact`, data);
}