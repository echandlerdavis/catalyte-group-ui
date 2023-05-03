import React from 'react';
import {
  Avatar, Card, CardContent, CardHeader, Typography
} from '@material-ui/core';
import { Rating } from '@material-ui/lab';

export default function SingleReview() {
  return (
    <Card>
      <CardHeader
        avatar={(
          <Avatar>
            {/* Gonna be a charAt using Name of User. Likely hardcoded for now. */}
            N
          </Avatar>
                )}
        title="Where the title Goes"
        subheader={(
          <Rating name="read-only" value={5} readOnly />
                )}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          this is where the actual review goes.
        </Typography>
      </CardContent>
    </Card>
  );
}
