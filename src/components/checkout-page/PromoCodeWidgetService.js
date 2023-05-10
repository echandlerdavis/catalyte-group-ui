import { useState } from 'react';
import HttpHelper from '../../utils/HttpHelper';
import Constants from '../../utils/constants';

export const usePromoCode = () => {
  const [promoCode, setPromoCode] = useState('');

  return { promoCode, setPromoCode };
};

export const calculateDiscount = (cartTotal, promoCode) => {
  let discount = 0;
  if (promoCode.type) {
    switch (promoCode.type) {
      case 'FLAT':
        discount = promoCode.rate;
        break;
      case 'PERCENT':
        discount = (promoCode.rate / 100) * cartTotal;
        break;
      default:
        throw new Error(`${promoCode.type} has not been implemented`);
    }
  }
  return discount;
};

export const applyPromoCode = (total, discount) => total - discount;

const fetchPromoCode = async (codeName) => {
  const fetchedData = {
    status: null,
    gotPromoCode: false,
    data: null,
    errors: []
  };
  await HttpHelper(`${Constants.PROMOCODE_ENDPOINT}/${codeName}`, 'GET')
    .then((response) => {
      fetchedData.status = response.status;
      if (response.status === 200) {
        fetchedData.gotPromoCode = true;
      }
      return response.json();
    })
    .then((data) => {
      if (fetchedData.gotPromoCode) {
        fetchedData.data = data;
      } else {
        fetchedData.errors = [data.errorMessage];
      }
    });
  return fetchedData;
};

export default fetchPromoCode;
