import React from 'react';

import { useQualifying } from '../api/apiHelpers';
import { QualiDataFull, QualiResult } from '../types/api';
import NoData from './NoData';
import ApiStatus from './ApiStatus';

type QualiProps = {
  season: string;
  round: string;
};

const Quali = ({ season, round }: QualiProps) => {
  const { data: qualiData, error, isLoading } = useQualifying(season, round);

  if (isLoading || error) return <ApiStatus isLoading={isLoading} error={error} />;

  const listResults = (qualiData: QualiDataFull, smallDisplay: Boolean) => {
    let allResults = qualiData.qualifyingData || [];
    return allResults.map((driverResult: QualiResult) => {
      return (
        <tr key={driverResult.surname + driverResult.forename}>
          <td className="position">
            <strong>{driverResult.position}</strong>
          </td>
          <td>
            <a href={driverResult.driverUrl}>
              {driverResult.forename} {driverResult.surname}
            </a>
          </td>
          <td>
            <a href={driverResult.constructorUrl}>{driverResult.constructorName}</a>
          </td>
          {!smallDisplay ? (
            <>
              <td className="optional">{driverResult.q1}</td>
              <td className="optional">{driverResult.q2}</td>
              <td className="optional">{driverResult.q3}</td>
            </>
          ) : (
            <td className="alternative">{driverResult.q3 || driverResult.q2 || driverResult.q1}</td>
          )}
        </tr>
      );
    });
  };

  const buildQualiTable = () => {
    const smallDisplay = document.body.clientWidth < 550;
    return (
      <div className="content">
        <h2>
          {qualiData?.year} {qualiData?.raceName}
        </h2>
        <h3>Qualifying results</h3>
        <table>
          <thead>
            <tr>
              <th className={smallDisplay ? 'pos' : 'position'}>{smallDisplay ? 'Pos' : 'Position'}</th>
              <th>Driver</th>
              <th>Team</th>
              {smallDisplay ? (
                <th className="alternative">Time</th>
              ) : (
                <>
                  <th className="optional">Q1</th>
                  <th className="optional">Q2</th>
                  <th className="optional">Q3</th>
                </>
              )}
            </tr>
          </thead>
          <tbody>{qualiData && listResults(qualiData, smallDisplay)}</tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="quali-results sub-section">{qualiData && !qualiData.noData ? buildQualiTable() : <NoData />}</div>
  );
};

export default Quali;
