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
  number: string;
  position: string;
  positionText: string;
  points: string;
  Driver: {
    driverId: string;
    permanentNumber: string;
    code: string;
    url: string;
    givenName: string;
    familyName: string;
    dateOfBirth: string;
  };
}

export interface GridDataFull {
  raceName?: string;
  year?: string;
  gridData?: GridResultResponse[];
  noData?: boolean;
}
