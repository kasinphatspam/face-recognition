import { AxiosResponse } from "axios";
import { fetch } from "./fetch";
import { Login, Register, CreateOrg, ImageRecognition } from "./types"

export async function login(data: Login): Promise<AxiosResponse> {
  return fetch.post('auth/login', data)
}

export async function register(data: Register): Promise<AxiosResponse> {
  return fetch.post('/auth/register', data)
}

export async function passCode(userId: number, passcode: string): Promise<AxiosResponse> {
  return fetch.post(`/organization/user/${userId}/join/${passcode}`)
}

export async function createNewOrg(userId: number, data: CreateOrg): Promise<AxiosResponse> {
  return fetch.post(`/organization/user/${userId}`, data)
}

export async function postImageRecognition(userId: number, orgId: number, data: ImageRecognition): Promise<AxiosResponse> {
  return fetch.post(`/organization/${orgId}/user/${userId}/contact/encode/recognition`, data);
}