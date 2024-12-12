import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { mapGridData } from '../helpers/helpers';
import { QueryFunctionContext } from '@tanstack/react-query';
import { API_URL } from './apiConstants';

// Grid - e.g. http://ergast.com/api/f1/2017/15/results.json
const fetchGrid = async ({ queryKey }: QueryFunctionContext<string[]>) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, season, raceRound] = queryKey;

  try {
    const response = await axios.get(`${API_URL}${season}/${raceRound}/results.json`);
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
