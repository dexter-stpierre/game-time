import { Game } from 'types/game';
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event';
import mockRouter from "next-router-mock";
import { getMaxIdForStore } from 'utils/getMaxIdForStore';
import { gameStore } from 'data/store';
import { gameTypes } from 'constants/gameTypes';

export const addAndExpectGame = async (game: Game) => {
  expect(mockRouter.pathname).toBe('/new-game')

  const nameInput = await screen.findByLabelText<HTMLInputElement>('Game Name')
  await userEvent.type(nameInput, game.name)
  expect(nameInput.value).toBe(game.name)

  const gameType = gameTypes.find((g) => g.gameType === game.gameType)
  const selectInput = await screen.findByLabelText<HTMLSelectElement>('Game Type');
  const optionToSelect = await screen.findByRole<HTMLOptionElement>('option', { name: gameType?.name })
  await userEvent.selectOptions(
    selectInput,
    optionToSelect,
  )
  expect(optionToSelect.selected).toBe(true)

  const submitButton = await screen.findByRole('button', { name: 'Submit' });
  expect(submitButton).toBeInTheDocument();
  await userEvent.click(submitButton)
  await waitFor(() => expect(mockRouter.pathname).toBe('/'))

  const newItemKey = await getMaxIdForStore(gameStore)

  const item = await gameStore.getItem<Game>(newItemKey + '')
  return expect(item).toMatchObject(game)
}