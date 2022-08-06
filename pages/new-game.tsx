import { TextField } from '@mui/material';
import Link from 'next/link';
import { useState } from 'react';

const NewGame = () => {
  const [name, setName] = useState('');

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
      <TextField id="outlined-basic" label="Game Name" variant="outlined" />
    </form>
  </>
}

export default NewGame;
