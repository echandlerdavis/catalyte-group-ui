import React from 'react';
import { Grid } from '@material-ui/core';
import SingleReview from './SingleReview';

export default function Reviews() {
  return (
    <>
      <Grid
        container
        direction="column"
        justifyContent="flex-start"
        alignItems="center"
      >
        <Grid item xs={12}>
          <SingleReview />
        </Grid>
      </Grid>
    </>
  );
}
