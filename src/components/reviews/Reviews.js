import React, { useEffect, useState } from 'react';
import { Grid } from '@material-ui/core';
import SingleReview from './SingleReview';
import fetchReviews from './ReviewService';
import AppAlert from '../alert/Alert';
import constants from '../../utils/constants';

export default function Reviews({ productId }) {
  const [reviews, setReviews] = useState([]);
  const [apiError, setApiError] = useState(false);

  useEffect(() => {
    fetchReviews(setReviews, setApiError, productId)
  }, []);
  return (
    <>
      {apiError && <AppAlert severity="error" title="Error" message={constants.API_ERROR} />}
      <Grid
        container
        direction="column"
        justifyContent="flex-start"
        alignItems="center"
      >
        {reviews.map((review) => (
          <Grid item xs={12}>
            <SingleReview review={review}/>
        </Grid>
        ))}
        
      </Grid>
    </>
  );
}
