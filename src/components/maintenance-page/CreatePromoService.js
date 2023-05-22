import HttpHelper from '../../utils/HttpHelper';
import Constants from '../../utils/constants';

const savePromoCode = async (promoCode, setApiError) => {
  try {
    const response = await HttpHelper(Constants.PROMOCODE_ENDPOINT, 'POST', promoCode);
    return response.json();
  } catch {
    setApiError(true);
    return false;
  }
};
export default savePromoCode;
