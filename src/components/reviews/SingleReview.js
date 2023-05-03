import React from 'react';
import {
  Avatar, Paper, Typography, Grid
} from '@material-ui/core';
import { Rating } from '@material-ui/lab';

export default function SingleReview({ review }) {
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
          <Rating name="read-only" value={5} readOnly />
        </Grid>
      </Grid>
    </Paper>
  );
}
