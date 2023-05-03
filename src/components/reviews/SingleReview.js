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
            {/* Make sure this attribute works */}
            {/* {review.user.firstName.charAt(0)} */}
            N
          </Avatar>
        </Grid>
        <Grid item>
          <Typography>
            {/* {review.review} */}
            Hard-coding a review for now. 
          </Typography>
        </Grid>
        <Grid item>
          <Rating name="read-only" value={5} size='small' readOnly />
        </Grid>
      </Grid>
    </Paper>
  );
}
