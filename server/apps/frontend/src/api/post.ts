import { fetch, handleApiResponse } from "./fetch";

export type login = {
  email: string
  password: string
}
 
export async function login(data: login): Promise<Response> {
  return await fetch.post('auth/login', data)
}

export type register = {
  email: string
  password: string
  firstname: string
  lastname: string
  gender: string
  personId: string
  dob: string
  image: string
}

export async function register(data: register): Promise<Response> {
  return await fetch.post('/auth/register', data)
}
