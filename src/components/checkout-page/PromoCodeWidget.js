import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import CheckBoxTwoTone from '@material-ui/icons/CheckBoxTwoTone';
import Alert from '../alert/Alert';

const PromoCodeWidget = () => {
  const [errors, setErrors] = useState([]);

  const onFocusChange = () => {
    setErrors(['Error1, error2']);
  };

  return (
    <>
      <TextField id="promocodeInput" label="PromoCode" variant="outlined" onFocusChange={() => onFocusChange()} />
      { errors.length > 0 && <Alert severity="error" title="Error:" message={errors.join(',')} />}
      {errors.length === 0 && <CheckBoxTwoTone />}
    </>
  );
};

export default PromoCodeWidget;
