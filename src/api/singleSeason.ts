import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { API_URL } from './apiConstants';

// Single season -  - e.g. http://ergast.com/api/f1/2017.json
const fetchSingleSeason = async ({ queryKey }: { queryKey: string[] }) => {
  const season = queryKey[1];
  const response = await axios.get(`${API_URL}${season}.json`);
  return response.data.MRData.RaceTable.Races;
};

export const useSingleSeason = (season: string) => {
  return useQuery({ queryKey: ['season', season], queryFn: fetchSingleSeason });
};
