'use client';
import { ApiClient } from './api/api-client';
import ApiProvider from './api/api-provider';
import Main from './pages/index';
import { QueryClient, QueryClientProvider } from "react-query";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      retry: false,
      staleTime: 5*60*1000,
    },
  },
});

const baseUrl = 'http://localhost:8080'

const apiClient = new ApiClient({
  baseUrl
});


export function Providers({ children }:any) {
  return (
    <QueryClientProvider client={queryClient}>
    <ApiProvider client={apiClient}>
        {children}
    </ApiProvider>
    </QueryClientProvider>
  );
}