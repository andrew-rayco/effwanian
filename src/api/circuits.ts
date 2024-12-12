import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Circuit } from '../types/api';
import { compareCircuits } from '../helpers/helpers';
import { API_URL } from './apiConstants';

// Circuits - e.g. http://ergast.com/api/f1/circuits.json
const fetchCircuits = async (): Promise<Circuit[]> => {
  const response = await axios.get(`${API_URL}circuits.json?limit=100`);
  const circuitData = response.data.MRData.CircuitTable.Circuits;
  return circuitData.sort(compareCircuits);
};

export const useCircuits = () => {
  return useQuery({ queryKey: ['circuits'], queryFn: fetchCircuits });
};
