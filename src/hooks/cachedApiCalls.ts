import { useRef, useCallback } from 'react';

interface ApiCall {
  [key: string]: any;
}

export const useCachedApiCalls = (): [
  ApiCall,
  (key: string, value: any) => void,
] => {
  const cachedApiCalls = useRef<ApiCall>(
    JSON.parse(sessionStorage.getItem('uw-api-calls') ?? '{}'),
  );

  const addApiCallToCache = useCallback((key: string, value: any) => {
    cachedApiCalls.current[key] = value;
    sessionStorage.setItem(
      'uw-api-calls',
      JSON.stringify(cachedApiCalls.current),
    );
  }, []);

  return [cachedApiCalls.current, addApiCallToCache];
};
