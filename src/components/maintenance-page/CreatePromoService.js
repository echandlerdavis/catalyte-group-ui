import HttpHelper from '../../utils/HttpHelper';
import Constants from '../../utils/constants';

const savePromoCode = async (
  promoCode
) => {
  const saveReport = {
    success: false,
    data: null
  };
  try {
    console.log(promoCode);
    const response = await HttpHelper(Constants.PROMOCODE_ENDPOINT, 'POST', promoCode);
    if (response.status === 201) {
      saveReport.success = true;
      saveReport.data = response.json();
      console.info(saveReport);
      return saveReport;
    }
    saveReport.data = response;
    return saveReport;
  } catch (error) {
    /* eslint-disable no-console */
    console.log('Failed to save');
    /* eslint-enable no-console */
    saveReport.success = false;
    saveReport.data = error.json();
    return saveReport;
  }
};

export default savePromoCode;
