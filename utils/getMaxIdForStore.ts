import { getMaxOfArray } from './getMaxOfArray';

export const getMaxIdForStore = async (store: LocalForage): Promise<number> => {
  const keys = await store.keys();
  if (!keys.length) return 0
  const keysInNumber = keys.map(Number)

  return getMaxOfArray(keysInNumber);
}