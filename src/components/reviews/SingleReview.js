import React from 'react';
import {
  Avatar, Paper, Typography, Grid
} from '@material-ui/core';
import { Rating } from '@material-ui/lab';

export default function SingleReview() {
  return (
    <Paper>
      <Grid container spacing={2}>
        <Grid item>
          <Avatar>N</Avatar>
        </Grid>
        <Grid item>
          <Typography>What it is going to say</Typography>
        </Grid>
        <Grid item>
          <Rating value={5} />
        </Grid>
      </Grid>
    </Paper>
  );
}
