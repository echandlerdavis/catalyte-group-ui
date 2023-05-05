import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import CheckCircle from '@material-ui/icons/CheckCircle';
import { green } from '@material-ui/core/colors';
import Alert from '../alert/Alert';

const checkBoxStyle = {
  color: green[500],
  fontSize: '4em'
};

const PromoCodeWidget = () => {
  const [errors, setErrors] = useState([]);
  const [validCode, setValidCode] = useState(false);
  const [code, setCode] = useState('');

  const onUserInput = (e) => {
    setCode(e.target.value);
  };

  const onFocusChange = () => {
    // TODO: need helper function to hit DB to get code
    if (code.length > 0) {
      setErrors([]);
      setValidCode(true);
    } else {
      setValidCode(false);
      setErrors(['invalid code']);
    }
  };

  return (
    <>
      <TextField
        id="promocodeInput"
        onChange={onUserInput}
        label="PromoCode"
        variant="outlined"
        value={code}
        onBlur={onFocusChange}
      />
      { errors.length > 0 && <Alert severity="error" title="Error:" message={errors.join(',')} />}
      {errors.length === 0 && validCode && <CheckCircle style={checkBoxStyle} />}
    </>
  );
};

export default PromoCodeWidget;
