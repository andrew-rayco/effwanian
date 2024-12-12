import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { QualiResponse } from '../types/api';
import { mapQualiData } from '../helpers/helpers';
import { QueryFunctionContext } from '@tanstack/react-query';
import { API_URL } from './apiConstants';

// Qualifying - e.g. http://ergast.com/api/f1/2017/10/qualifying.json
const fetchQualifying = async ({ queryKey }: QueryFunctionContext<string[]>) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, season, raceRound] = queryKey;

  try {
    const response = await axios.get(`${API_URL}${season}/${raceRound}/qualifying.json?limit=60`);
    const qualiData: QualiResponse = response.data.MRData.RaceTable.Races[0];
    return mapQualiData(qualiData);
  } catch (error) {
    console.error('Error fetching qualifying data:', error);
    return { noData: true };
  }
};

export const useQualifying = (season: string, raceRound: string) => {
  return useQuery({
    queryKey: ['qualifying', season, raceRound],
    queryFn: fetchQualifying,
  });
};
