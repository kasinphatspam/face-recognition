import axios from 'axios';

export const fetch = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001',
  withCredentials: true,
});

export async function handleApiResponse(response: any) {
  const data = await response.data;
  if (response.status == 200) {
    return Promise.resolve(data);
  } else {
    return Promise.reject();
  }
}