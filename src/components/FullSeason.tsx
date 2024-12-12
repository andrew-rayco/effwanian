import React from 'react';

import Loading from './Loading';
import Error from './Error';
import RaceOptions from './RaceOptions';
import { useSingleSeason } from '../api/singleSeason';
import { Race } from '../types/api';

const FullSeason = () => {
  const thisSeason = window.location.hash.split('/')[2] || '';

  const { data: season, error, isLoading } = useSingleSeason(thisSeason);

  const listRaces = (races: Race[]) => {
    const toggleStatus = { visibility: 'hidden' };

    return races.map((race) => {
      return (
        <div key={`key${race.round}`}>
          <RaceOptions key={race.round} race={race} initialVisibility={toggleStatus} />
        </div>
      );
    });
  };

  if (isLoading) return <Loading />;
  if (error) return <Error message={error.message} />;

  return (
    <div className="season">
      <h2>The {season[0].season} Formula 1 Season</h2>
      {listRaces(season)}
      <div className="separator" />
    </div>
  );
};

export default FullSeason;
