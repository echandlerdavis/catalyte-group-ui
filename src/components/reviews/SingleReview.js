import React from 'react';
import {
  Avatar, Paper, Typography, Grid, makeStyles
} from '@material-ui/core';
import { Rating } from '@material-ui/lab';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: 700
  },
  avatar: {
    width: 50,
    height: 50
  },
  rating: {
    width: 50,
    height: 50,
    padding: 5
  }
}));

export default function SingleReview({ review }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={2} direction='row'>
          <Grid item>
            <Avatar className={classes.avatar}>
              {review.userName.charAt(0)}
            </Avatar>
          </Grid>
          <Grid item xs={12} sm container >
            <Grid item xs container direction='column' spacing={2}>
            <Grid item xs>
              <Typography>
                {review.title}
              </Typography>
              <Typography>
                {review.userName}
              </Typography>
            </Grid>
            <Grid item>
              <Typography>
                {review.review}
              </Typography>
              <Typography>
                written
                {' '}
                {review.createdAt}
              </Typography>
            </Grid>
            </Grid>
          </Grid>
          <Grid item xs={3}>
            <Rating name="read-only" value={review.rating} size="small" readOnly />
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
