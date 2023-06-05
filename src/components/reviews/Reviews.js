import React, { useEffect, useState } from 'react';
import {
  Grid, TextField
} from '@material-ui/core';
import SingleReview from './SingleReview';
import fetchReviews from './ReviewService';
import AppAlert from '../alert/Alert';
import constants, { SEVERITY_LEVELS } from '../../utils/constants';
import styles from './Review.module.css';
import Toast from '../toast/Toast';

export default function Reviews({ productId }) {
  const [reviews, setReviews] = useState([]);
  const [apiError, setApiError] = useState(false);
  const [reviewOrder, setReviewOrder] = useState('');
  const [openToast, setOpenToast] = useState(false);
  const DEFAULT_TOAST_DATA = { MESSAGE: '', SEVERITY: SEVERITY_LEVELS.INFO, reviewId: 0 };
  const [toastData, setToastData] = useState(DEFAULT_TOAST_DATA);

  useEffect(() => {
    fetchReviews(setReviews, setApiError, productId);
  }, [productId]);

  const closeToast = () => {
    setOpenToast(false);
  };

  const handleSortChange = (event) => {
    const newToOld = [...reviews].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    const oldToNew = [...newToOld].reverse();
    setReviewOrder(event.target.value);
    if (event.target.value === 'oldToNew') {
      setReviews(oldToNew);
    } else if (event.target.value === 'newToOld') {
      setReviews(newToOld);
    } else {
      setReviews(reviews.sort((a, b) => a.id - b.id));
    }
  };
  /**
   * update the active status of a reveiw and rerender reviews
   *
   * @param {Object} review
   * @param {boolean} activeStatus
   */
  const updateActive = (review, activeStatus) => {
    // update active status
    const copy = review;
    copy.active = activeStatus;
    // force rerender
    const updateIndex = reviews.indexOf((r) => r.id === review.id);
    reviews[updateIndex] = copy;
    setReviews([...reviews]);
  };
  /**
   * If review is active, display
   */
  const listReviews = reviews.filter((r) => r.active).map((review) => (
    <Grid item xs={12} key={review.id}>
      <SingleReview
        review={review}
        updateActive={updateActive}
        toastData={toastData}
        toastDataSetter={setToastData}
        toastOpener={setOpenToast}
      />
    </Grid>
  ));

  return (
    <>
      <Toast
        message={toastData.MESSAGE}
        open={openToast}
        severity={toastData.SEVERITY}
        handleClose={closeToast}
      />
      <div className={styles.reviewHeader}>
        <h1>Reviews</h1>
        <TextField
          id="select-review-order"
          select
          value={reviewOrder}
          onChange={handleSortChange}
          SelectProps={{
            native: true
          }}
          helperText="Order by date"
        >
          <option key="default" value="None">
            None
          </option>
          <option key="newToOld" value="newToOld">
            Newest to Oldest
          </option>
          <option key="oldToNew" value="oldToNew">
            Oldest to Newest
          </option>
        </TextField>
      </div>
      {apiError && <AppAlert severity="error" title="Error" message={constants.API_ERROR} />}
      {reviews.filter((r) => r.active).length === 0 ? (
        <AppAlert
          severity={SEVERITY_LEVELS.INFO}
          title="No Reviews Yet!"
          message="There are no reviews yet for this product."
        />
      ) : (
        <Grid
          container
          direction="row"
          alignItems="center"
          spacing={2}
          style={{ maxHeight: '50vh', overflowY: 'scroll' }}
        >
          {listReviews}
        </Grid>
      )}
    </>
  );
}
