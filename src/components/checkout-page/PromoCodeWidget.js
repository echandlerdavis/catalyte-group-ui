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
  const [promoCode, setPromoCode] = useState(null);

  const onUserInput = (e) => {
    setCode(e.target.value);
  };

  const onFocusChange = async () => {
    // reset everything
    setPromoCode({});
    setValidCode(false);
    setErrors([]);
    if (code.length > 0) {
      const resp = await fetchPromoCode(code);
      console.log(resp);
      if (resp.status === 200) {
        setValidCode(true);
        setPromoCode(resp.json());
        console.log(promoCode);
        // do stuff with the promo code
      }
      if (resp.status === 404) {
        setErrors([resp.error, resp.errorMessage]);
      }
      if (resp.status === 400) {
        setErrors(resp.errorMessage);
      }
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
      { errors.length > 0 && <Alert severity="error" title="Error:" message={errors.join(': ')} />}
      {errors.length === 0 && validCode && <CheckCircle style={checkBoxStyle} />}
    </>
  );
};

export default PromoCodeWidget;
