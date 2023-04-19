import React from 'react';
import { Button } from '@material-ui/core';
import Toast from './Toast';

export default function ExampleToastPage() {
  const [open, setOpen] = React.useState(false);
  const message = 'This is an example toast';

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <Button onClick={handleClick}>Click to Open Toast</Button>
      <Toast message={message} open={open} handleClose={handleClose} />
    </div>
  );
}
