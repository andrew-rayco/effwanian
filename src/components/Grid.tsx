import React from 'react';

import RaceOptions from './RaceOptions';
import NoData from './NoData';
import { useGrid } from '../api/grid';
import ApiStatus from './ApiStatus';

type GridProps = {
  season: string;
  round: string;
};

const Grid = ({ season, round }: GridProps) => {
  const { data: grid, error, isLoading } = useGrid(season, round);

  if (isLoading || error) return <ApiStatus isLoading={isLoading} error={error} />;

  console.log('grid', grid);

  // UNSAFE_componentWillMount() {
  //   let season, raceId, round;
  //   if (this.props.season) {
  //     season = this.props.season;
  //     raceId = this.props.raceId;
  //     round = this.props.round;
  //   } else {
  //     let location = this.props.location.pathname;
  //     let pathArray = location.split('/');
  //     season = pathArray[2];
  //     raceId = pathArray[3];
  //   }
  //   if (!raceId) raceId = round;
  //   apiRoutes.getGrid(season, raceId, (grid) => {
  //     this.setState({ grid });
  //   });
  // }

  // const listGrid = (fullGrid) => {
  //   return fullGrid.map((driver, i) => {
  //     return (
  //       <tr key={driver.surname || i}>
  //         <td className="position">
  //           <strong>{driver.grid}</strong>
  //         </td>
  //         <td>
  //           <a href={driver.driverUrl}>
  //             {driver.forename} {driver.surname}
  //           </a>
  //         </td>
  //         <td>
  //           <a href={driver.constructorUrl}>{driver.constructorName}</a>
  //         </td>
  //       </tr>
  //     );
  //   });
  // };

  // const buildGridTable = () => {
  //   let grid = grid.gridData;
  //   return (
  //     <div className="content">
  //       <h2>
  //         {grid[0].year} {grid[0].raceName}
  //       </h2>
  //       <h3>Starting Grid</h3>
  //       <table>
  //         <thead>
  //           <tr>
  //             <th className="position">{window.innerWidth < 450 ? 'Pos' : 'Position'}</th>
  //             <th>Driver</th>
  //             <th>Team</th>
  //           </tr>
  //         </thead>
  //         <tbody>{listGrid(grid)}</tbody>
  //       </table>
  //     </div>
  //   );
  // };

  // return <div className="grid sub-section">{grid && !grid.noData ? buildGridTable() : <NoData />}</div>;
  return <div>Hello</div>;
};

export default Grid;
