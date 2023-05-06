import HttpHelper from '../../utils/HttpHelper';
import Constants from '../../utils/constants';

const fetchPromoCode = async (codeName, setter, errorSetter) => {
  try {
    const resp = await HttpHelper(`${Constants.PROMOCODE_ENDPOINT}/${codeName}`, 'GET');
    if (resp.status === 200) {
      setter(resp.json());
      return;
    }
  } catch (e) {
    console.log('Service error: ');
    console.log(e);
    setter(null);
    errorSetter([e.message]);
    throw e;
  }
};

export default fetchPromoCode;
