import { useEffect, useRef, useState } from 'react'

export type listUsers = {
  gender: string;
  name: {
    title: string;
    first: string;
    last: string;
  };
  dob: {
    date: string;
    age: number;
  };
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
  nat: string;
}

interface Data {
  results: listUsers[];
  info: {
    seed: string;
    results: number;
    page: number;
    version: string;
  };
}

export const useFetchData = (url: string) => {
  const [data, setData] = useState<Data | null>(null);
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const fetchRef = useRef(false);

  useEffect(() => {
    if (!fetchRef.current) {
      fetchRef.current = true;
      setLoading(true);
      fetch(url)
        .then((response) => response.json())
        .then((data) => setData(data))
        .catch((error) => setError(error))
        .finally(() => setLoading(false));
    }
  }, [url]);

  return { data, loading, error }
}
