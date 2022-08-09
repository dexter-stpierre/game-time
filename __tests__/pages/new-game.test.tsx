import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import NewGame from '../../pages/new-game';
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event';
import mockRouter from "next-router-mock";
import localForage from 'localforage'
import { Game } from 'types/game';
import { gameStore } from 'data/store';

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
    expect(mockRouter.pathname).toBe('/new-game')

    const nameInput = await screen.findByLabelText<HTMLInputElement>('Game Name')
    await userEvent.type(nameInput, 'Golf')
    expect(nameInput.value).toBe('Golf')

    const selectInput = await screen.findByLabelText<HTMLSelectElement>('Game Type');
    const lowScoreOption = await screen.findByRole<HTMLOptionElement>('option', { name: 'Low Score' })
    await userEvent.selectOptions(
      selectInput,
      lowScoreOption,
    )
    expect(lowScoreOption.selected).toBe(true)

    const submitButton = await screen.findByRole('button', { name: 'Submit' });
    expect(submitButton).toBeInTheDocument();
    await userEvent.click(submitButton)
    await waitFor(() => expect(mockRouter.pathname).toBe('/'))

    const item = await gameStore.getItem<Game>('Golf')
    console.log(item)
    return expect(item?.name).toBe('Golf')
  })
})
