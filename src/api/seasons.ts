import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { SeasonBasic } from '../types/api';
import { API_URL } from './apiConstants';

// Seasons - e.g. http://ergast.com/api/f1/seasons.json
const fetchSeasons = async (): Promise<SeasonBasic[]> => {
  const response = await axios.get(`${API_URL}seasons.json?limit=80`);
  return response.data.MRData.SeasonTable.Seasons;
};

export const useSeasons = () => {
  return useQuery({ queryKey: ['seasons'], queryFn: fetchSeasons });
};
