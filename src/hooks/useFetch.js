import { useContext, useEffect } from 'react';
import PlanetsContext from '../context/PlanetsContext';

export default function useFetch() {
  const { isLoading, setLoading, planets,
    setPlanets, search, setSearch } = useContext(PlanetsContext);

  useEffect(() => {
    setLoading(true);

    const requestApi = async () => {
      try {
        const URL = 'https://swapi.dev/api/planets';
        const response = await fetch(URL);
        const data = await response.json();

        delete data.RESIDENTS;

        setPlanets(data.results);
        setSearch(data.results);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        throw error;
      }
    };

    requestApi();
  }, []);

  return { isLoading, planets, search };
}
