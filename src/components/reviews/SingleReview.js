import React, { useEffect, useState } from 'react';
import {
  Avatar, Paper, Typography, Grid, makeStyles,
  Modal,
  Card
} from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutlined';
import { red } from '@material-ui/core/colors';
import styles from './Review.module.css';
import { deleteReview } from './ReviewService';
import { SEVERITY_LEVELS } from '../../utils/constants';
import { useUser } from '../app/userContext';

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
  },
  deletePopup: {
    padding: '1em',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translateX(-50%) translateY(-50%)'
  },
  deleteCard: {
    color: 'white',
    backgroundColor: red[500],
    padding: '1em'
  }
}));
export default function SingleReview({
  review, updateActive, toastData, toastDataSetter, toastOpener
}) {
  const [showModal, setShowModal] = useState(false);
  const { user } = useUser();
  const classes = useStyles();
  const removeReview = () => {
    deleteReview(review, user, toastDataSetter, toastOpener);
    setShowModal(false);
  };
  useEffect(() => {
    if (toastData.SEVERITY === SEVERITY_LEVELS.SUCCESS && toastData.reviewId === review.id) {
      updateActive(review, false);
    }
  }, [toastData, review, updateActive]);

  return (
    <div className={classes.root}>
      <Modal open={showModal}>
        <Paper className={classes.deletePopup}>
          <Card className={classes.deleteCard}>
            <Typography variant="h6">
              {review.title}
            </Typography>
            <div style={{ textAlign: 'center' }}>
              <Typography style={{ color: 'white', marginBottom: '1em' }}>Do you want to delete this review?</Typography>
              <button type="button" onClick={removeReview}>Delete</button>
              <button type="button" onClick={() => setShowModal(false)}>Cancel</button>
            </div>
          </Card>
        </Paper>
      </Modal>
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
              <Rating name="read-only" className={styles.span} value={review.rating} size="small" precision={0.5} readOnly />
            </Grid>
          </Grid>
          <Grid item xs={12} container>
            <Grid item container>
              <Typography variant="body1" className={styles.review}>
                {review.review}
              </Typography>
              <Grid item container justifyContent="flex-start">
                <Typography variant="caption" className={styles.writtenDate}>
                  written
                  {' '}
                  {review.createdAt}
                </Typography>
                {user
                && (user.email === review.userEmail)
                && (
                <DeleteOutlineIcon
                  className={styles.trashcan}
                  onClick={() => setShowModal(true)}
                />
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>

      </Paper>
    </div>
  );
}
