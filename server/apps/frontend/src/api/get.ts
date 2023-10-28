import { fetch, handleApiResponse } from "./fetch";

export async function getUser() {
    return await fetch.get("/auth/me")
        .then(handleApiResponse)
}   

export async function Status() {
    return await fetch.get("/status")
}

export async function logout() {
    return await fetch.get("/auth/logout");
  }

export async function organize(userId: number) {
    return await fetch.get(`/user/${userId}/organization`)
}