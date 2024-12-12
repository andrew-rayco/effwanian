import React from 'react';

import Loading from './Loading';
import { useCircuits } from '../api/circuits';
import { Circuit } from '../types/api';

const Circuits = () => {
  const { data: circuits, error, isLoading } = useCircuits();

  const listCircuits = (circuitsObj: Circuit[]) => {
    let circuits = Array.from(circuitsObj);
    return circuits.map((track) => {
      const location = track.Location;
      return (
        <tr key={track.circuitId}>
          <td>{location.country}</td>
          <td>
            <a href={track.url}>{track.circuitName}</a>
          </td>
          <td>{location.locality}</td>
          <td>
            <a
              href={`https://www.google.co.nz/maps/@?api=1&map_action=map&center=${location.lat},${location.long}&zoom=15&basemap=satellite`}
            >
              View
            </a>
          </td>
        </tr>
      );
    });
  };

  const renderCircuitTable = () => {
    return (
      <table>
        <thead>
          <tr>
            <th>Country</th>
            <th>Circuit name</th>
            <th>Locality</th>
            <th>Map</th>
          </tr>
        </thead>
        <tbody>{circuits ? listCircuits(circuits) : null}</tbody>
      </table>
    );
  };

  if (isLoading) return <Loading />;

  return (
    <div className="circuit-list">
      <h2>Circuits</h2>
      <h4>Every circuit in the history of Formula 1</h4>
      {circuits && circuits.length ? renderCircuitTable() : <div>{error?.message}</div>}
    </div>
  );
};

export default Circuits;
