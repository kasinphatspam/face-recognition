/// <reference types="vite/client" />
import axios, { AxiosResponse } from 'axios';

export const fetch = axios.create({
  baseURL: import.meta.env.VITE_APP_BACKEND_URL,
  withCredentials: true,
  headers: {
    'access-key': import.meta.env.VITE_APP_ACCESS_KEY,
  }
});

export async function handleApiResponse(response: AxiosResponse) {
  const data = await response.data;
  if (response.status == 200) {
    return Promise.resolve(data);
  } else {
    return Promise.reject();
  }
}
