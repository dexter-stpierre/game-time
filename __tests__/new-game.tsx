import { fireEvent, render, screen } from '@testing-library/react'
import NewGame from '../pages/new-game';
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event';

describe('New Game', () => {
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

    await userEvent.selectOptions(
      selectInput,
      highScoreOption,
    )

    expect(highScoreOption.selected).toBe(true)
  })
})
