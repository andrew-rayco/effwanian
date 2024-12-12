import { QualiDataFull, QualiResponse, QualiResult, QualiResultResponse } from '../types/api';

export const compareCircuits = (a: any, b: any) => {
  const aCountry = a.Location.country;
  const bCountry = b.Location.country;
  if (aCountry < bCountry) {
    return -1;
  }
  if (aCountry > bCountry) {
    return 1;
  }
  return 0;
};

export const mapQualiData = (data: QualiResponse): QualiDataFull => {
  if (!data.QualifyingResults) {
    return { noData: true };
  }

  let qualiResults: QualiResult[] = [];
  data.QualifyingResults?.forEach((result: QualiResultResponse) => {
    qualiResults.push({
      position: result.position,
      driverUrl: result.Driver.url,
      forename: result.Driver.givenName,
      surname: result.Driver.familyName,
      constructorUrl: result.Constructor.url,
      constructorName: result.Constructor.name,
      q1: result.Q1,
      q2: result.Q2,
      q3: result.Q3,
    });
  });

  let cleanQualiData = {
    raceName: data.raceName,
    year: data.season,
    qualifyingData: qualiResults,
  };

  return cleanQualiData;
};

const compareGridPos = (a: any, b: any) => {
  const gridA = Number(a.grid);
  const gridB = Number(b.grid);

  let comparison = 0;
  if (gridA > gridB) {
    comparison = 1;
  } else if (gridA < gridB) {
    comparison = -1;
  }
  return comparison;
};

const sortGrid = (gridData: any) => {
  gridData.forEach((result: any) => {
    if (result.grid === 0) {
      result.grid = 99;
    }
  });
  gridData.sort(compareGridPos);
  gridData.forEach((result: any) => {
    if (result.grid === 99) {
      result.grid = 'Pit';
    }
  });
  return gridData;
};

export const mapGridData = (data: any) => {
  let strippedResults: any = [];
  data.Results.forEach((result: any) => {
    strippedResults.push({
      grid: result.grid,
      driverUrl: result.Driver.url,
      forename: result.Driver.givenName,
      surname: result.Driver.familyName,
      constructorUrl: result.Constructor.url,
      constructorName: result.Constructor.name,
    });
  });

  const sortedResults = sortGrid(strippedResults);

  let cleanData = {
    raceName: data.raceName,
    year: data.season,
    gridData: sortedResults,
  };

  return cleanData;
};
