import React from 'react';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';

const AppAlert = ({ severity, title, message }) => (
  <Alert severity={severity} data-testid="errMsg" style={{ marginTop: '1rem' }}>
    <AlertTitle>{title}</AlertTitle>
    {message}
  </Alert>
);

export default AppAlert;
