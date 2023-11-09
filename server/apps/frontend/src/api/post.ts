import { AxiosResponse } from "axios";
import { fetch } from "./fetch";
import { Login, Register, CreateOrg } from "./types"

export async function login(data: Login): Promise<AxiosResponse> {
  return await fetch.post('auth/login', data)
}

export async function register(data: Register): Promise<AxiosResponse> {
  return fetch.post('/auth/register', data)
}

export async function passCode(userId: number, passcode: string): Promise<AxiosResponse> {
  return await fetch.post(`/organization/user/${userId}/join/${passcode}`)
}

export async function createNewOrg(userId: number, data: CreateOrg): Promise<AxiosResponse> {
  return await fetch.post(`/organization/user/${userId}`, data)
}