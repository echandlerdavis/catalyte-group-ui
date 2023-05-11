import React, { useEffect, useState } from 'react';
import {
  Grid, TextField
} from '@material-ui/core';
import SingleReview from './SingleReview';
import fetchReviews from './ReviewService';
import AppAlert from '../alert/Alert';
import constants, { SEVERITY_LEVELS } from '../../utils/constants';

export default function Reviews({ productId }) {
  const [reviews, setReviews] = useState([]);
  const [apiError, setApiError] = useState(false);
  const [reviewOrder, setReviewOrder] = useState('');

  useEffect(() => {
    fetchReviews(setReviews, setApiError, productId);
  }, [productId]);

  const handleSortChange = (event) => {
    setReviewOrder(event.target.value);
    let sortedReviews = reviews.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    if (reviewOrder === 'oldToNew') {
      sortedReviews = sortedReviews.reverse();
    } else if (reviewOrder === 'None') {
      sortedReviews = reviews;
    }
    setReviews(sortedReviews);
  };

  const listReviews = reviews.map((review) => (
    <Grid item xs={12} key={review.id}>
      <SingleReview review={review} />
    </Grid>
  ));

  return (
    <>
      <div>
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
      {reviews.length === 0 ? (
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
