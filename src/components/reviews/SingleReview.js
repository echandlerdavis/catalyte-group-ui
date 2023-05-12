import React from 'react';
import {
  Avatar, Paper, Typography, Grid, makeStyles
} from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import styles from './Review.module.css';

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
    padding: 3
  },
  reviewHeading: {
    paddingLeft: 8
  }
}));

export default function SingleReview({ review }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item container justifyContent="space-between">
            <Grid item container xs={1} justifyContent="center">
              <Avatar className={classes.avatar}>
                {review.userName.charAt(0)}
              </Avatar>
            </Grid>
            <Grid item xs={8} className={classes.reviewHeading}>
              <Typography variant="h6">
                {review.title}
              </Typography>
              <Typography variant="subtitle2">
                {review.userName}
              </Typography>
            </Grid>
            <Grid item xs={3} container justifyContent="flex-end">
              <Rating name="read-only" className={styles.span} value={review.rating} size="small" readOnly />
            </Grid>
          </Grid>
          <Grid item xs={12} container>
            <Grid item container>
              <Typography variant="body1">
                {review.review}
              </Typography>
              <Grid item container justifyContent="flex-end">
                <Typography variant="caption">
                  written
                  {' '}
                  {review.createdAt}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

      </Paper>
    </div>
  );
}
