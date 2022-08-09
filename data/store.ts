import localforage from 'localforage';

export const gameStore = localforage.createInstance({
  name: 'Game Time',
  storeName: 'games',
  description: 'This is the store for games',
});