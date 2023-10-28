import { useMutation, useQueryClient } from 'react-query';
import { ApiError } from './api-error';
import { useApiClient } from './use-api-client';

export function userLoginAPI() {
  const client = useApiClient();

  return useMutation<any, ApiError, any>(
    async (params) => client.userLogin(params)
  );
}
