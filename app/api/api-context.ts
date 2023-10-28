import { createContext } from 'react';
import { ApiClient } from './api-client';

interface IApiContext {
  client: ApiClient | undefined;
}

export const ApiContext = createContext<IApiContext>({
  client: undefined,
});
