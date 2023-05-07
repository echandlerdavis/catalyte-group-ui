import HttpHelper from '../../utils/HttpHelper';
import Constants from '../../utils/constants';

const fetchPromoCode = async (codeName, setter, errorSetter) => {
  await HttpHelper(`${Constants.PROMOCODE_ENDPOINT}/${codeName}`, 'GET')
    .then((response) => {
      if (response.status === 200) {
        setter(response.json());
        return true;
      }
      if (response.status === 404) {
        errorSetter([Constants.INVALID_CODE]);
        return false;
      }
      throw new Error(response.json());
    })
    .catch((e) => {
      errorSetter([e]);
      return false;
    });
};

export default fetchPromoCode;
