import { useQuery, UseQueryResult } from '@tanstack/react-query';
import axios from 'axios';
import { mapGridData } from '../helpers/helpers';
import { QueryFunctionContext } from '@tanstack/react-query';
import { API_URL } from './apiConstants';
import { GridDataFull } from '../types/api';

// Grid - e.g. http://ergast.com/api/f1/2017/15/results.json
const fetchGrid = async ({ queryKey }: QueryFunctionContext<string[]>) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, season, raceRound] = queryKey;

  const response = await axios.get(`${API_URL}${season}/${raceRound}/results.json`);
  const data = response.data.MRData.RaceTable.Races[0];
  return mapGridData(data);
};

export const useGrid = (season: string, raceRound: string): UseQueryResult<GridDataFull> => {
  return useQuery({
    queryKey: ['grid', season, raceRound],
    queryFn: fetchGrid,
  });
};
