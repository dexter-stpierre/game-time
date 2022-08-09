import { GAME_TYPES } from './gameTypes'

export interface Game {
  id?: number
  name: string
  gameType: GAME_TYPES
}