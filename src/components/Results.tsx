import React, { useEffect } from 'react';
import { useResults } from '../api/results';
import ApiStatus from './ApiStatus';
import { ResultsData } from '../types/api';
import { findFastestLap } from '../helpers/helpers';

type ResultsProps = {
  season: string;
  round: string;
};

const Results = ({ season, round }: ResultsProps) => {
  const [isLapTimes, setIsLapTimes] = React.useState(false);
  const [fastestLap, setFastestLap] = React.useState('0');
  const [lapsInRace, setLapsInRace] = React.useState('0');
  const { data: results, error, isLoading } = useResults(season, round);

  useEffect(() => {
    let resultsArray = results?.results;
    if (resultsArray && resultsArray[0].fastestLapTime && resultsArray[0].fastestLapTime !== '-') {
      setIsLapTimes(true);
      const fastestLapTime = findFastestLap(resultsArray);
      setFastestLap(fastestLapTime);
      setLapsInRace(resultsArray[0].laps);
    }
  }, [results]);

  if (!results) return <ApiStatus isLoading={isLoading} error={error} />;
  const { raceYear, raceName, results: resultsArray } = results;

  const listResults = (resultsArray: ResultsData[]) => {
    return resultsArray.map((driverResult) => {
      const {
        surname,
        forename,
        position,
        driverUrl,
        constructorUrl,
        constructorName,
        positionText,
        raceTime,
        status,
        laps,
        fastestLapTime,
        fastestLapNumber,
      } = driverResult;

      return (
        <tr key={surname + position}>
          <td className="position">
            <strong>{position}</strong>
          </td>
          <td>
            <a href={driverUrl}>
              {forename} {surname}
            </a>
          </td>
          <td>
            <a href={constructorUrl}>{constructorName}</a>
          </td>
          <td>
            {positionText !== 'R' ? (
              raceTime || status
            ) : (
              <div>
                {status}
                <span className="muted sub-text">{Number(laps) + 1}</span>
              </div>
            )}
          </td>
          {isLapTimes && (
            <td className="optional">
              {highlightFastestLap(fastestLapTime)}
              <span className="muted sub-text">{fastestLapNumber && `${fastestLapNumber}`}</span>
            </td>
          )}
        </tr>
      );
    });
  };

  const highlightFastestLap = (laptime: string) => {
    if (!laptime) return '-';
    return laptime === fastestLap ? <strong>{laptime}</strong> : laptime;
  };

  const buildResultsTable = (resultsArray: ResultsData[]) => {
    return (
      <div className="content">
        <h2>
          {raceYear} {raceName}
        </h2>
        <h3>Race results</h3>
        <p>{lapsInRace} laps</p>
        <table>
          <thead>
            <tr>
              <th className="position">{document.body.clientWidth < 450 ? 'Pos' : 'Position'}</th>
              <th>Driver</th>
              <th>Team</th>
              <th>Race Time</th>
              {isLapTimes ? <th className="optional">Fastest lap</th> : null}
            </tr>
          </thead>
          <tbody>{listResults(resultsArray)}</tbody>
        </table>
      </div>
    );
  };

  return <div className="results sub-section">{resultsArray && buildResultsTable(resultsArray)}</div>;
};

export default Results;
