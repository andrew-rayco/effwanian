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
