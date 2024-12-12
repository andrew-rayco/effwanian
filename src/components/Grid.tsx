import React from 'react';

import NoData from './NoData';
import { useGrid } from '../api/grid';
import ApiStatus from './ApiStatus';
import { GridPosition } from '../types/api';

type GridProps = {
  season: string;
  round: string;
};

const Grid = ({ season, round }: GridProps) => {
  const { data: gridData, error, isLoading } = useGrid(season, round);

  if (isLoading || error) return <ApiStatus isLoading={isLoading} error={error} />;

  const grid = gridData ? gridData.gridData : null;

  const listGrid = (fullGrid: GridPosition[]) => {
    return fullGrid.map((driver, i) => {
      return (
        <tr key={driver.surname || i}>
          <td className="position">
            <strong>{driver.grid}</strong>
          </td>
          <td>
            <a href={driver.driverUrl}>
              {driver.forename} {driver.surname}
            </a>
          </td>
          <td>
            <a href={driver.constructorUrl}>{driver.constructorName}</a>
          </td>
        </tr>
      );
    });
  };

  const buildGridTable = () => {
    return (
      <div className="content">
        <h2>
          {gridData?.year} {gridData?.raceName}
        </h2>
        <h3>Starting Grid</h3>
        <table>
          <thead>
            <tr>
              <th className="position">{window.innerWidth < 450 ? 'Pos' : 'Position'}</th>
              <th>Driver</th>
              <th>Team</th>
            </tr>
          </thead>
          <tbody>{grid && listGrid(grid)}</tbody>
        </table>
      </div>
    );
  };

  return <div className="grid sub-section">{gridData && grid ? buildGridTable() : <NoData />}</div>;
};

export default Grid;
