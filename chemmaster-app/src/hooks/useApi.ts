import { useState, useCallback } from 'react';

export function useApi<T>() {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const request = useCallback(async (apiPromise: Promise<T>) => {
    setLoading(true);
    setError(null);
    try {
      const result = await apiPromise;
      setData(result);
      return result;
    } catch (err: any) {
      setError(err.message || 'Error desconocido');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, loading, error, request, setData };
}