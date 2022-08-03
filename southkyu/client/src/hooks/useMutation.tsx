import { useState } from "react";

interface useMutationState<T> {
  isLoading: boolean;
  data?: T;
  error?: object;
}

type UseMutationResult<T> = [(data?: any) => void, useMutationState<T>];

export default function useMutation<T>(
  url: string,
  method: string
): UseMutationResult<T> {
  const [state, setState] = useState({
    isLoading: false,
    data: undefined,
    error: undefined,
  });

  async function mutation(todo: T) {
    setState((prev) => ({ ...prev, isLoading: true }));
    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(todo),
      });
      const data = await response.json();
      setState((prev) => ({ ...prev, isLoading: false, data }));
    } catch (error) {
      setState((prev) => ({ ...prev, isLoading: false, error }));
    }
  }
  return [mutation, { ...state }];
}
