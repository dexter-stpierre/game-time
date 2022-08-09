import { gameStore } from 'data/store';
import { Game } from 'types/game';

export const addGame = async (game: Game): Promise<Game> => {
  return gameStore.setItem(game.name, game);
}