export interface LoginResponse {
  token: string;
}

export interface Game {
  id: number;
  date: string;
  home_team: string;
  away_team: string;
  home_total_score: number;
  away_total_score: number;
  home_total_hits: number;
  away_total_hits: number;
  home_total_errors: number;
  away_total_errors: number;
  home_inning_1: number;
  home_inning_2: number;
  home_inning_3: number;
  home_inning_4: number;
  home_inning_5: number;
  home_inning_6: number;
  home_inning_7: number;
  home_inning_8: number;
  home_inning_9: number;
  away_inning_1: number;
  away_inning_2: number;
  away_inning_3: number;
  away_inning_4: number;
  away_inning_5: number;
  away_inning_6: number;
  away_inning_7: number;
  away_inning_8: number;
  away_inning_9: number;
}

export interface GameData {
    date: string;
    home_team: string;
    away_team: string;
    home_total_score: number;
    away_total_score: number;
    home_total_hits: number;
    away_total_hits: number;
    home_total_errors: number;
    away_total_errors: number;
    [key: `home_inning_${number}` | `away_inning_${number}`]: number;
  }