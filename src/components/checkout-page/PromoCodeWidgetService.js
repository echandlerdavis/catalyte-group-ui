import HttpHelper from '../../utils/HttpHelper';
import Constants from '../../utils/constants';

const fetchPromoCode = async (codeName, setCode, setError, setValidity) => {
  await HttpHelper(`${Constants.PROMOCODE_ENDPOINT}/${codeName}`, 'GET')
    .then((response) => {
      if (response.ok) {
        setValidity(true);
        return response.json();
      }
      setValidity(false);
      throw new Error(Constants.INVALID_CODE);
    })
    .then(setCode)
    .catch((e) => setError([e.message]));
};

export default fetchPromoCode;
