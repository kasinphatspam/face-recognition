import { fetch, handleApiResponse } from "./fetch";

export async function getUser() {
    return fetch.get("/auth/me")
        .then(handleApiResponse)
}   

export async function Status() {
    return fetch.get("/status")
}

export async function Logout() {
    return fetch.get("/auth/logout");
  }