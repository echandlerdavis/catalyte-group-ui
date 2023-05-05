import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import CheckCircle from '@material-ui/icons/CheckCircle';
import { green } from '@material-ui/core/colors';
import Alert from '../alert/Alert';
import fetchPromoCode from './PromoCodeWidgetService';

const checkBoxStyle = {
  color: green[500],
  fontSize: '4em'
};

const PromoCodeWidget = () => {
  const [errors, setErrors] = useState([]);
  const [validCode, setValidCode] = useState(false);
  const [code, setCode] = useState('');
  const [promoCode, setPromoCode] = useState({});

  const onUserInput = (e) => {
    setCode(e.target.value);
  };

  const onFocusChange = () => {
    // TODO: need helper function to hit DB to get code
    fetchPromoCode(code, setPromoCode, setErrors, setValidCode);
    if (validCode) {
      console.log(promoCode);
      setErrors([]);
      // do stuff with the promo code
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
