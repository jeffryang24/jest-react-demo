import { API_PEOPLE } from '../constants/apiEndpoint';

export function getPeople(id?: number) {
  return fetch(`http://localhost:3000${API_PEOPLE}${id ? `/${id}` : ''}`, {
    method: 'GET',
  }).then((response) => response.json());
}
