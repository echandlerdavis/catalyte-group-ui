import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

/**
 * @name Toast - Reusable toast that will pop up in the top left corner and disappear automatically after 8 seconds.
 * @param {message} String, what the toast will say
 * @param {open} Boolean - state to be set. False = toast closed (default), True = toast open
 * @param {handleClose} Function set open parameter to false.
 */
export default function Toast({ message, open, handleClose }){
  return (
    <>
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        open={open}
        autoHideDuration={8000}
        onClose={handleClose}
        message={message}
        action={
          <React.Fragment>
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
    </>
  );
     }
