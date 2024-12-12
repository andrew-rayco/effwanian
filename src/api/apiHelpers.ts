import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { SeasonBasic, Circuit, QualiResponse } from '../types/api';
import { compareCircuits, mapGridData, mapQualiData } from '../helpers/helpers';
import { QueryFunctionContext } from '@tanstack/react-query';

const url = 'http://ergast.com/api/f1/';
// const url = 'http://api.jolpi.ca/ergast/f1/';

// Seasons - e.g. http://ergast.com/api/f1/seasons.json
const fetchSeasons = async (): Promise<SeasonBasic[]> => {
  const response = await axios.get(`${url}seasons.json?limit=80`);
  return response.data.MRData.SeasonTable.Seasons;
};

export const useSeasons = () => {
  return useQuery({ queryKey: ['seasons'], queryFn: fetchSeasons });
};

// Single season -  - e.g. http://ergast.com/api/f1/2017.json
const fetchSingleSeason = async ({ queryKey }: { queryKey: string[] }) => {
  const season = queryKey[1];
  const response = await axios.get(`${url}${season}.json`);
  return response.data.MRData.RaceTable.Races;
};

export const useSingleSeason = (season: string) => {
  return useQuery({ queryKey: ['season', season], queryFn: fetchSingleSeason });
};

// Circuits - e.g. http://ergast.com/api/f1/circuits.json
const fetchCircuits = async (): Promise<Circuit[]> => {
  const response = await axios.get(`${url}circuits.json?limit=100`);
  const circuitData = response.data.MRData.CircuitTable.Circuits;
  return circuitData.sort(compareCircuits);
};

export const useCircuits = () => {
  return useQuery({ queryKey: ['circuits'], queryFn: fetchCircuits });
};

// Qualifying - e.g. http://ergast.com/api/f1/2017/10/qualifying.json
const fetchQualifying = async ({ queryKey }: QueryFunctionContext<string[]>) => {
  const [, season, raceRound] = queryKey;
  try {
    const response = await axios.get(`${url}${season}/${raceRound}/qualifying.json?limit=60`);
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

// Grid - e.g. http://ergast.com/api/f1/2017/15/results.json
const fetchGrid = async ({ queryKey }: QueryFunctionContext<string[]>) => {
  const [season, raceRound] = queryKey;
  try {
    const response = await axios.get(`${url}${season}/${raceRound}/results.json?limit=60`);
    const data = response.data.MRData.RaceTable.Races[0];
    return mapGridData(data);
  } catch (error) {
    console.error('Error fetching qualifying data:', error);
    return { noData: true };
  }
};

export const useGrid = (season: string, raceRound: string) => {
  return useQuery({
    queryKey: ['grid', season, raceRound],
    queryFn: fetchGrid,
  });
};

// function getGrid(season, raceRound, callback) {
//   // e.g. http://ergast.com/api/f1/2017/15/results.json
//   request.get(url + season + '/' + raceRound + '/results.json?limit=60').end((err, result) => {
//     if (err) {
//       console.log(err);
//     } else {
//       let data = result.body.MRData.RaceTable.Races[0];
//       if (data) {
//         let strippedResults = [];
//         data.Results.map((result) => {
//           // Take only what we need from each result and add to strippedResults
//           strippedResults.push({
//             grid: result.grid,
//             driverUrl: result.Driver.url,
//             forename: result.Driver.givenName,
//             surname: result.Driver.familyName,
//             constructorUrl: result.Constructor.url,
//             constructorName: result.Constructor.name,
//           });
//         });

//         const sortedResults = functions.sortGrid(strippedResults);

//         let cleanData = {
//           raceName: data.raceName,
//           year: data.season,
//           gridData: sortedResults,
//         };

//         callback(cleanData);
//       } else {
//         callback({ noData: true });
//       }
//     }
//   });
// }
