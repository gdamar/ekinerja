import { FormMethod } from 'react-router';

export const api = async (
  url: string,
  path: string,
  params: any,
  method: FormMethod,
  body?: Body,
  headerOptions?: Headers,
  token?: string,
) => {
  const res = await fetch(`${url}${path}?${params}`, {
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    ...headerOptions,
    body: JSON.stringify(body),
    method,
  });

  if (!res.ok) {
    throw new Error('API Request failed');
  }

  return res.json();
};
