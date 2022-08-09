import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import Link from 'next/link';
import { useState } from 'react';
import { gameTypes } from 'constants/gameTypes';
import { addGame } from 'data/addGame';
import { GAME_TYPES } from 'types/gameTypes';
import { FormEventHandler } from 'react';
import router from 'next/router';

const NewGame = () => {
  const [name, setName] = useState('');
  const [gameType, setGameType] = useState<GAME_TYPES>(GAME_TYPES.HIGH_SCORE);

  const saveGame: FormEventHandler = async (event) => {
    event.preventDefault();

    const game = {
      name,
      gameType,
    }

    await addGame(game)

    router.push('/')
  }

  return <>
    <h1>
      Add a new game here
    </h1>
    <h2>
      <Link href="/">
        <a>Back to home</a>
      </Link>
    </h2>
    <form onSubmit={saveGame}>
      <Box mb={2}>
        <TextField required variant='standard' fullWidth value={name} onChange={(e) => setName(e.target.value)} id="gameName" label="Game Name" InputLabelProps={{required: false}} />
      </Box>
      <Box mb={2}>
        <FormControl fullWidth variant='standard'>
          <InputLabel htmlFor='gameType-select' id="gameType">Game Type</InputLabel>
          <Select
            labelId="gameType"
            id="gameType-select"
            value={gameType}
            label="Age"
            native
            onChange={(e) => setGameType(e.target.value as GAME_TYPES)}
          >
            {
              gameTypes.map((gameType) => (
                <option key={gameType.gameType} value={gameType.gameType}>{gameType.name}</option>
              ))
            }
          </Select>
        </FormControl>
      </Box>
      <Box display='flex' justifyContent='flex-end'>
        <Button type='submit'>Submit</Button>
      </Box>
    </form>
  </>
}

export default NewGame;
