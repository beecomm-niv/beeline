import { useCallback, useState } from 'react';
import { ApiResponse } from '../models/api-response';

interface Props<T> {
  request: () => Promise<ApiResponse<T>>;
  onSuccess?: (data: T) => void;
  onDecline?: (data: T, errorMessage: string) => void;
}

const useHttpRequest = () => {
  const [loading, setLoading] = useState(false);

  const request = useCallback(async <T,>(params: Props<T>, alertOnError: boolean = true) => {
    setLoading(true);

    const response = await params.request();

    setLoading(false);

    if (response.hasError) {
      if (alertOnError) {
        window.alert(response.errorMessage);
      }

      if (params.onDecline) {
        params.onDecline(response.value, response.errorMessage);
      }
    } else if (!response.hasError && params.onSuccess) {
      params.onSuccess(response.value);
    }
  }, []);

  return { loading, request };
};

export default useHttpRequest;
