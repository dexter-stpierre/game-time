import { GAME_TYPES } from 'types/gameTypes';
import { Game } from 'types/game';

export const gameTypes: Game[] = [
  {
    gameType: GAME_TYPES.HIGH_SCORE,
    name: 'High Score',
  },
  {
    gameType: GAME_TYPES.LOW_SCORE,
    name: 'Low Score',
  },
  {
    gameType: GAME_TYPES.FASTEST_TIME,
    name: 'Fastest Time',
  },
  {
    gameType: GAME_TYPES.OUTRIGHT_WINNER,
    name: 'Outright Winner',
  },
]
