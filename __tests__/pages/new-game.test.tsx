import { render, screen } from '@testing-library/react'
import NewGame from '../../pages/new-game';
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event';
import mockRouter from "next-router-mock";
import { gameStore } from 'data/store';
import { getMaxIdForStore } from 'utils/getMaxIdForStore';
import { addAndExpectGame } from 'testingUtils/addAndExpectGame';
import { GAME_TYPES } from 'types/gameTypes';

describe('New Game', () => {
  beforeEach(async () => {
    mockRouter.setCurrentUrl('/new-game');
    await gameStore.clear()
  });

  it('renders a heading', () => {
    render(<NewGame />);

    const heading = screen.getByRole('heading', {
      name: /Add a new game here/i,
    })

    expect(heading).toBeInTheDocument()
  });

  it('Allows you to edit the name', async () => {
    render(<NewGame />);

    const input = await screen.findByLabelText<HTMLInputElement>('Game Name')

    expect(input).toBeInTheDocument();

    await userEvent.type(input, 'hello')

    expect(input.value).toBe('hello')
  });

  it('Allows you to edit the game type', async () => {
    render(<NewGame />);

    const selectInput = await screen.findByLabelText<HTMLSelectElement>('Game Type');

    const highScoreOption = await screen.findByRole<HTMLOptionElement>('option', { name: 'High Score' })
    const lowScoreOption = await screen.findByRole<HTMLOptionElement>('option', { name: 'Low Score' })

    expect(highScoreOption.selected).toBe(true);
    expect(lowScoreOption.selected).toBe(false)

    await userEvent.selectOptions(
      selectInput,
      lowScoreOption,
    )

    expect(highScoreOption.selected).toBe(false);
    expect(lowScoreOption.selected).toBe(true)
  })

  it('Allows you save a game', async () => {
    render(<NewGame />);

    await addAndExpectGame({
      name: 'Golf',
      gameType: GAME_TYPES.LOW_SCORE
    })
  })

  it('Increments the keys when adding multiple games', async () => {
    render(<NewGame />);
    const nameInput = await screen.findByLabelText<HTMLInputElement>('Game Name')

    await addAndExpectGame({
      name: 'Golf',
      gameType: GAME_TYPES.LOW_SCORE
    })
    let highestId = await getMaxIdForStore(gameStore)
    expect(highestId).toBe(1)

    mockRouter.setCurrentUrl('/new-game');
    await userEvent.clear(nameInput)
    await addAndExpectGame({
      name: 'Ticket to Ride',
      gameType: GAME_TYPES.HIGH_SCORE
    })
    highestId = await getMaxIdForStore(gameStore)
    expect(highestId).toBe(2)

    mockRouter.setCurrentUrl('/new-game');
    await userEvent.clear(nameInput)
    await addAndExpectGame({
      name: 'Golf',
      gameType: GAME_TYPES.LOW_SCORE
    })
    highestId = await getMaxIdForStore(gameStore)
    expect(highestId).toBe(3)
  })
})
