import { fetch, handleApiResponse } from "./fetch";

type Login = {
  email: string
  password: string
}
 
export async function login(data: Login): Promise<Response> {
  return await fetch.post('auth/login', data)
}

type Register = {
  email: string
  password: string
  firstname: string
  lastname: string
  gender: string
  personId: string
  dob: string
  image: string
}

export async function register(data: Register): Promise<Response> {
  return await fetch.post('/auth/register', data)
}

export async function passCode(userId: number, passcode: string): Promise<Response> {
  console.log(userId, passcode)
  return await fetch.post(`/organization/user/${userId}/join/${passcode}`)
}

type Org = {
  name: string
}
export async function createNewOrg(userId: number, data: Org): Promise<Response> {
  return await fetch.post(`/organization/user/${userId}`, data)
}