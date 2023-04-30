import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

/**
 * @name Toast - Reusable toast that will pop up in the top left corner,
 * disappears automatically after 8 seconds.
 * @param {message} String, what the toast will say
 * @param {open} Boolean - state to be set. False = toast closed (default), True = toast open
 * @param {handleClose} Function that sets open parameter to false.
 * @param {severity} String from the following options to change the message type:
 * [success(green), warning(yellow), info(blue), error(red)]
 * Info is the default if not defined in the component.
 */
export default function Toast({
  message, open, handleClose, severity = 'info'
}) {
  return (
    <>
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left'
        }}
        open={open}
        autoHideDuration={8000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity={severity}>
          {message}
        </Alert>
      </Snackbar>
    </>
  );
}
