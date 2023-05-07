import HttpHelper from '../../utils/HttpHelper';
import Constants from '../../utils/constants';

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
        return response.json();
      }
      fetchedData.errors = response.json();
      throw new Error();
    })
    .then((data) => {
      fetchedData.data = data;
      console.log('data: ', data);
    })
    .catch((e) => e);
  return fetchedData;
};

export default fetchPromoCode;
