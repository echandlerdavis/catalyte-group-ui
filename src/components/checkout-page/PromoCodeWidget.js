import React, { useState, useEffect } from 'react';
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
  const [code, setCode] = useState('');
  const [promoCode, setPromoCode] = useState('');
  const [fetchData, setFetchData] = useState({});

  const onUserInput = (e) => {
    setCode(e.target.value);
  };

  const onFocusChange = async () => {
    setPromoCode('');
    setErrors([]);
    setFetchData({});
    // if user entered something
    if (code.length > 0) {
      setFetchData(await fetchPromoCode(code));
    }
  };
  useEffect(() => {
    if (fetchData.gotPromoCode) {
      setPromoCode(fetchData.data);
      console.log('promo code: ', fetchData.data);
    }
    if (fetchData.errors && fetchData.errors.length > 0) {
      setErrors([...fetchData.errors]);
    }
  }, [fetchData]);

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
      {errors.length === 0 && promoCode && <CheckCircle style={checkBoxStyle} />}
    </>
  );
};

export default PromoCodeWidget;
