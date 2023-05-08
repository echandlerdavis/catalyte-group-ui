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

const promoCodeStyle = {
  display: 'grid',
  gridTemplateColumns: '2fr 4fr',
  gridTemplateRows: '1fr',
  gap: '0px 1em',
  alignItems: 'center'
};

const PromoCodeWidget = ({ promoCode, setPromoCode }) => {
  const [errors, setErrors] = useState([]);
  const [code, setCode] = useState('');
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
    }
    if (!fetchData.gotPromoCode && fetchData.errors) {
      setErrors([...fetchData.errors]);
    }
  }, [fetchData, setPromoCode]);

  return (
    <div style={promoCodeStyle}>
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
    </div>
  );
};

export default PromoCodeWidget;
