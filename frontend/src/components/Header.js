import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Switch from './Switch'; // Asegúrate de que la ruta sea correcta
import { styled } from '@mui/system';

const Header = ({ theme, toggleTheme }) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Todo List App
        </Typography>
        <SwitchWrapper>
          <Switch toggleTheme={toggleTheme} isChecked={theme.palette.mode === 'dark'} />
        </SwitchWrapper>
      </Toolbar>
    </AppBar>
  );
}

const SwitchWrapper = styled('div')`
  margin-left: auto;
`;

export default Header;