import axios, { AxiosResponse } from 'axios';

declare var process : {
  env: {
    VITE_BACKEND_URL: string
  }
}

export const fetch = axios.create({
  baseURL: 'https://api.pphamster.com',
  withCredentials: true,
});

export async function handleApiResponse(response: AxiosResponse) {
  const data = await response.data;
  if (response.status == 200) {
    return Promise.resolve(data);
  } else {
    return Promise.reject();
  }
}
