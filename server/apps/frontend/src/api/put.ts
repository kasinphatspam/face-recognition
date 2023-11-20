import { fetch } from './fetch';
import { AxiosResponse } from 'axios';
import { User, Image, Encode } from './types'

export function updateUser(userId: number, data: User): Promise<AxiosResponse> {
  return fetch.put(`/user/${userId}`, data)
}

export function updateImage(userId: number, data: Image): Promise<AxiosResponse> {
  return fetch.put(`/user/${userId}/image`, data)
}

export function updateEncode(orgId: number, contactId: number, data: Encode): Promise<AxiosResponse> {
  return fetch.put(`/organization/${orgId}/contact/${contactId}/encode`, data)
}