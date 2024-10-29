export interface LoginResponse {
    token: string;
};

export interface Game {
    id: number;
    date: string;
    home_team: string;
    away_team: string;
    home_total_score: number;
    away_total_score: number;
  }