import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import LogoutButton from './LogoutButton';
import PetsIcon from '@mui/icons-material/Pets';

const NavBar = () => {
  return (
    <Box sx={{mb: 2}}>
      <AppBar position="fixed" sx={{backgroundColor: '#ff8d8d'}}>
        <Toolbar>
        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-start', alignItems:'center' }}>
        <PetsIcon fontSize="medium" sx={{ fill: '#eee' }}/>
        </Box>
          <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end' }}>
             <LogoutButton />
          </Box>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </Box>
  );
}

export default NavBar;