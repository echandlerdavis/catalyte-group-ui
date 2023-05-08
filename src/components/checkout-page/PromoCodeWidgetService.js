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
      }
      return response.json();
    })
    .then((data) => {
      if (fetchedData.gotPromoCode) {
        fetchedData.data = data;
      } else if (fetchedData.status === 404) {
        fetchedData.errors = [data.errorMessage];
      } else {
        fetchedData.errors = [...data.errorMessage];
      }
    });
  return fetchedData;
};

export default fetchPromoCode;
