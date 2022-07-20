import { useEffect, useState } from "react";

export default function useFetch(url: string) {
  const [state, setState] = useState<useFetchState>({
    loading: false,
    data: undefined,
  });
  const fetchData = async () => {
    setState((prev) => ({ ...prev, loading: true }));
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    setState((prev) => ({ ...prev, data, loading: false }));
  };
  useEffect(() => {
    fetchData();
  }, []);
  return {
    loading: state?.loading,
    data: state.data,
    setState,
  };
}
