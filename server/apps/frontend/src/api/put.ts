import { fetch } from './fetch';
import { AxiosResponse } from 'axios';
import { User } from './types'

export function updateUser(userId: number, data: User): Promise<AxiosResponse> {
  return fetch.put(`/user/${userId}`, data)
}