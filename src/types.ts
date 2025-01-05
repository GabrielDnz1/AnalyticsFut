export interface Shot {
  shotType: 'Regular' | 'Bola Parada';
  technique: 'Chute com o Pé' | 'Cabeceio' | 'Voleio';
  pressure: boolean;
  lookedBefore: boolean;
  position: { x: number; y: number };
  destination: { x: number; y: number };
  xG: number;
  xGoT: number;
}

export type FootballEvent = {
  x: number;
  y: number;
  timestamp: string;
  description: string;
};

export interface Player {
  id: string;
  name: string;
  position: 'GK' | 'DF' | 'MF' | 'FW';
  age: number;
  imageUrl?: string;
  teamId: string;
  stats: PlayerStats;
}

export interface PlayerStats {
  goals: number;
  assists: number;
  tackles: number;
  shots: number;
  shotsOnTarget: number;
  passes: number;
  passAccuracy: number;
  interceptions: number;
  possession: number;
  minutesPlayed: number;
  gamesPlayed: number;
}

export interface Team {
  id: string;
  name: string;
  logoUrl?: string;
  players: Player[];
  stats: TeamStats;
}

export interface TeamStats {
  totalGames: number;
  wins: number;
  draws: number;
  losses: number;
  goalsFor: number;
  goalsAgainst: number;
  cleanSheets: number;
  possession: number;
  shots: number;
  shotsOnTarget: number;
  passes: number;
  passAccuracy: number;
  tackles: number;
  interceptions: number;
}
