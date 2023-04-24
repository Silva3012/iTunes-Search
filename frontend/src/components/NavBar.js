import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { Link } from 'react-router-dom';

const StyledAppBar = styled(AppBar)({
  background: '#fff',
  color: '#333',
});

const StyledToolbar = styled(Toolbar)({
  display: 'flex',
  justifyContent: 'space-between',
});

const StyledLink = styled(Link)({
  color: '#333',
  textDecoration: 'none',
});

export default function NavBar() {
  return (
    <StyledAppBar position="static">
      <StyledToolbar>
        <Typography variant="h6">
          <StyledLink to="/">Home</StyledLink>
        </Typography>
        <Typography variant="h6">
          <StyledLink to="/favourites">Favourites</StyledLink>
        </Typography>
      </StyledToolbar>
    </StyledAppBar>
  );
}
