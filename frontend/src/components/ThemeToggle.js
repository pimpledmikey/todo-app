import React from 'react';
import { Switch } from '@mui/material';

const ThemeToggle = ({ theme, toggleTheme }) => {
  return (
    <Switch
      checked={theme === 'dark'}
      onChange={toggleTheme}
      color="default"
    />
  );
};

export default ThemeToggle;