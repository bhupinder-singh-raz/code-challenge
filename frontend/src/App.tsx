import React from 'react';
import './App.css';
import { AppBar, Toolbar, Typography } from '@mui/material';
import { CustomList } from './Components/CustomList';

function App() {
  return (
    <div>
      <AppBar position='fixed'>
        <Toolbar>
          <Typography variant='h6' noWrap>
            My List Of Stuff
          </Typography>
        </Toolbar>
      </AppBar>
      <CustomList />
    </div>
  );
}

export default App;
