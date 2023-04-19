import React from 'react';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';

const ErrorAlert = ({ errorMsg }) => (
  <Alert severity="error">
    <AlertTitle>Error</AlertTitle>
    {errorMsg}
  </Alert>
);

export default ErrorAlert;
