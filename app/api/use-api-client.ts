import { useContext } from 'react';
import { ApiContext } from './api-context';

export function useApiClient() {
  const { client } = useContext(ApiContext);

  if (!client) {
    throw new Error('No ApiClient set, use ApiProvider to set one');
  }

  return client;
}
