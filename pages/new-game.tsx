import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import Link from 'next/link';
import { useState } from 'react';
import { gameTypes } from '../constants/gameTypes';

const NewGame = () => {
  const [name, setName] = useState('');
  const [gameType, setGameType] = useState<string>('');

  const saveGame = () => {
    const game = {
      name,
      gameType,
    }

    
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
    <form>
      <Box mb={2}>
        <TextField variant='standard' fullWidth value={name} onChange={(e) => setName(e.target.value)} id="gameName" label="Game Name" />
      </Box>
      <FormControl fullWidth variant='standard'>
        <InputLabel htmlFor='gameType-select' id="gameType">Game Type</InputLabel>
        <Select
          labelId="gameType"
          id="gameType-select"
          value={gameType}
          label="Age"
          native
          onChange={(e) => setGameType(e.target.value)}
        >
          {
            gameTypes.map((gameType) => (
              <option key={gameType.type} value={gameType.type}>{gameType.name}</option>
            ))
          }
        </Select>
      </FormControl>
      <Button>Submit</Button>
    </form>
  </>
}

export default NewGame;
