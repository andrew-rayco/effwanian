import React from 'react';
import { useSeasons } from '../api/apiHelpers';
import Loading from './Loading';
import ListSeason from './ListSeason';
import { SeasonBasic } from '../types/api';

const Home = () => {
  const { data: seasons, error, isLoading } = useSeasons();

  const listSeasons = (seasons: SeasonBasic[]) => {
    return seasons.map(({ season }) => {
      return <ListSeason year={season} key={season} />;
    });
  };

  if (isLoading) return <Loading />;

  return (
    <div className="row">
      <div className="twelve columns home">
        <h3 data-test="heading-seasons">Seasons</h3>
        <ul className="seasons">{seasons && seasons.length ? listSeasons(seasons) : <div>{error?.message}</div>}</ul>

        <h3 data-test="heading-circuits">Circuits</h3>
        <div className="circuits">
          <a href="/#/circuits">See all the circuits</a>
        </div>
      </div>
    </div>
  );
};

export default Home;
