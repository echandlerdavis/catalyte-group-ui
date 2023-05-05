import HttpHelper from '../../utils/HttpHelper';
import Constants from '../../utils/constants';

const fetchPromoCode = async (codeName) => HttpHelper(`${Constants.PROMOCODE_ENDPOINT}/${codeName}`, 'GET')
  .then((resp) => resp.json());

export default fetchPromoCode;
