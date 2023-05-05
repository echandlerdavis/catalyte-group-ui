import HttpHelper from '../../utils/HttpHelper';
import Constants from '../../utils/constants';

const fetchPromoCode = async (codeName, setCode, setError) => {
  await HttpHelper(`${Constants.PROMOCODE_ENDPOINT}/${codeName}`, 'GET')
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      }
      console.log(response);
      throw new Error(response.json());
    })
    .then((obj) => (setCode(obj)))
    .catch((e) => setError([e.message]));
};

export default fetchPromoCode;
