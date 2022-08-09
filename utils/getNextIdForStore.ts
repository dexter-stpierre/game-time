import { getMaxIdForStore } from './getMaxIdForStore';

export const getNextIdForStore = async (store: LocalForage): Promise<number> => {
  const lastIdUsed = await getMaxIdForStore(store)
  return lastIdUsed + 1;
}