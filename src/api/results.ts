import { useQuery, UseQueryResult } from '@tanstack/react-query';
import axios from 'axios';
import { mapResultsData } from '../helpers/helpers';
import { QueryFunctionContext } from '@tanstack/react-query';
import { API_URL } from './apiConstants';
import { ResultsDataFull } from '../types/api';

// Results - e.g. http://ergast.com/api/f1/2017/15/results.json
const fetchResults = async ({ queryKey }: QueryFunctionContext<string[]>) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, season, raceRound] = queryKey;

  const response = await axios.get(`${API_URL}${season}/${raceRound}/results.json`);
  const data = response.data.MRData.RaceTable.Races[0];
  return mapResultsData(data);
};

export const useResults = (season: string, raceRound: string): UseQueryResult<ResultsDataFull> => {
  return useQuery({
    queryKey: ['results', season, raceRound],
    queryFn: fetchResults,
  });
};
