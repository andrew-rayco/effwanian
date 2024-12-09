import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Season, Circuit } from '../types/api';
import { compareCircuits } from '../helpers/helpers';

const url = 'http://ergast.com/api/f1/';

const fetchSeasons = async (): Promise<Season[]> => {
  const response = await axios.get(`${url}seasons.json?limit=80`);
  return response.data.MRData.SeasonTable.Seasons;
};

export const useSeasons = () => {
  return useQuery({ queryKey: ['seasons'], queryFn: fetchSeasons });
};

const fetchCircuits = async (): Promise<Circuit[]> => {
  const response = await axios.get(`${url}circuits.json?limit=100`);
  const circuitData = response.data.MRData.CircuitTable.Circuits;
  return circuitData.sort(compareCircuits);
};

export const useCircuits = () => {
  return useQuery({ queryKey: ['circuits'], queryFn: fetchCircuits });
};
