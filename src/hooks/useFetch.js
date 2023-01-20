import { useEffect, useState } from 'react';

export default function useFetch() {
  const [isLoading, setLoading] = useState(false);
  const [planets, setPlanets] = useState([]);

  useEffect(() => {
    setLoading(true);

    const requestApi = async () => {
      try {
        const URL = 'https://swapi.dev/api/planets';
        const response = await fetch(URL);
        const data = await response.json();

        delete data.RESIDENTS;

        setPlanets(data.results);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        throw error;
      }
    };

    requestApi();
  }, []);

  return { isLoading, planets };
}
