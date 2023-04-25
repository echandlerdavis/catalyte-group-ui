import * as React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import './Footer.css';

function Copyright() {
  const copyright = String.fromCodePoint(0x00A9);
  return (
    <Typography variant="body2" color="text.secondary">
      {new Date().getFullYear()}
      {' Sports Apparel, Inc.'}
      {copyright}
    </Typography>
  );
}

export default function StickyFooter() {
  return (
    <Box className="box">
      <CssBaseline />
      <footer>
        <Copyright />
      </footer>
    </Box>
  );
}
