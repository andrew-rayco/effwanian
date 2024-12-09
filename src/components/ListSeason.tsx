import React from 'react';

import { Link } from 'react-router-dom';

type ListSeasonProps = {
  year: string;
};

const ListSeason = ({ year }: ListSeasonProps) => {
  return (
    <li className='season'>
      <Link to={`/season/${year}`}>{year}</Link>
    </li>
  );
};

export default ListSeason;
