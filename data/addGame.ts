import { gameStore } from 'data/store';
import { Game } from 'types/game';
import { getNextIdForStore } from 'utils/getNextIdForStore';

export const addGame = async (game: Game): Promise<Game> => {
  const nextId = await getNextIdForStore(gameStore);
  const savedGame = await gameStore.setItem(nextId + '', {
    id: nextId,
    ...game,
  });
  return savedGame
}