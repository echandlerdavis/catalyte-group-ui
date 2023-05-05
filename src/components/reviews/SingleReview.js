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
          <Avatar>
            {review.userName.charAt(0)}
          </Avatar>
        </Grid>
        <Grid item>
          <Typography>
            {review.review}
          </Typography>
        </Grid>
        <Grid item>
          <Rating name="read-only" value={5} size="small" readOnly />
        </Grid>
      </Grid>
    </Paper>
  );
}
