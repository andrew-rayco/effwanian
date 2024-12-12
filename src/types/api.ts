interface Driver {
  driverId: string;
  permanentNumber: string;
  code: string;
  url: string;
  givenName: string;
  familyName: string;
}

interface FastestLap {
  rank: string;
  lap: string;
  Time: {
    time: string;
  };
  AverageSpeed: {
    units: string;
    speed: string;
  };
}

interface Time {
  millis: string;
  time: string;
}

interface Constructor {
  constructorId: string;
  url: string;
  name: string;
  nationality: string;
}

export interface Race {
  season: string;
  round: string;
  raceName: string;
  date: string;
  time?: string;
  url: string;
  Circuit: Circuit;
}

export interface SeasonBasic {
  season: string;
  url: string;
}

export interface Race {
  season: string;
  round: string;
  raceName: string;
  date: string;
  time?: string;
  url: string;
  Circuit: Circuit;
}

export interface Circuit {
  circuitId: string;
  url: string;
  circuitName: string;
  Location: {
    lat: string;
    long: string;
    locality: string;
    country: string;
  };
}

export interface QualiResultResponse {
  number: string;
  position: string;
  Driver: {
    driverId: string;
    permanentNumber: string;
    code: string;
    url: string;
    givenName: string;
    familyName: string;
    dateOfBirth: string;
    nationality: string;
  };
  Constructor: {
    constructorId: string;
    url: string;
    name: string;
    nationality: string;
  };
  Q1: string;
  Q2: string;
  Q3: string;
}

export interface QualiResponse extends Race {
  QualifyingResults: QualiResultResponse[];
}

export interface QualiResult {
  position: string;
  driverUrl: string;
  forename: string;
  surname: string;
  constructorUrl: string;
  constructorName: string;
  q1: string;
  q2: string;
  q3: string;
}

export interface QualiDataFull {
  raceName?: string;
  year?: string;
  qualifyingData?: QualiResult[];
  noData?: boolean;
}

export interface GridResultResponse {
  Constructor: Constructor;
  Driver: Driver;
  FastestLap: FastestLap;
  Time: Time;
  number: string;
  position: string;
  positionText: string;
  points: string;
}

export interface GridResponse extends Race {
  Results: GridResultResponse[];
}

export interface GridDataFull {
  raceName?: string;
  year?: string;
  gridData?: GridPosition[];
  noData?: boolean;
}

export interface GridPosition {
  grid: string;
  driverUrl: string;
  forename: string;
  surname: string;
  constructorUrl: string;
  constructorName: string;
}

export interface ResultsData {
  position: string;
  driverUrl: string;
  forename: string;
  surname: string;
  constructorUrl: string;
  constructorName: string;
  positionText: string;
  raceTime: string;
  status: string;
  laps: string;
  fastestLapTime: string;
  fastestLapNumber: string;
  fastestLapSpeed: string;
}

export interface ResultsDataFull {
  raceYear: string;
  raceName: string;
  results: ResultsData[];
}
