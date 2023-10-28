import { PropsWithChildren } from 'react';
import { ApiClient } from './api-client';
import { ApiContext } from './api-context';

export interface ApiProviderProps {
  client: ApiClient;
}

export function ApiProvider({
  client,
  children,
}: PropsWithChildren<ApiProviderProps>) {
  console.log(client,'-client')
  return (
    <ApiContext.Provider value={{ client }}>{children}</ApiContext.Provider>
  );
}

export default ApiProvider;
