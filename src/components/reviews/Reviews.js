import React, { useEffect, useState } from 'react';
import { Grid } from '@material-ui/core';
import SingleReview from './SingleReview';
import fetchReviews from './ReviewService';
import AppAlert from '../alert/Alert';
import constants, { SEVERITY_LEVELS } from '../../utils/constants';

export default function Reviews({ productId }) {
  const [reviews, setReviews] = useState([]);
  const [apiError, setApiError] = useState(false);

  useEffect(() => {
    fetchReviews(setReviews, setApiError, productId);
  }, [productId]);
  return (
    <>
      <h1>Reviews</h1>
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
          // justifyContent="flex-start"
          alignItems="center"
          spacing={2}
          style={{ maxHeight: '50vh', overflow: 'auto', overflowY: 'scroll' }}
        >
          {reviews.map((review) => (
            <Grid item xs={12} key={review.id}>
              <SingleReview review={review} />
            </Grid>
          ))}
        </Grid>
      )}
    </>
  );
}
