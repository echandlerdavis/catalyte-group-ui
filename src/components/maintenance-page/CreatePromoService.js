import HttpHelper from '../../utils/HttpHelper';
import Constants from '../../utils/constants';

export const savePromoCode = async (
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

export const validateRate = (rate) => {
  const regex = /^[1-9][0-9]?$|^99$/;
  return regex.test(rate);
};

export const validateTitle = (title) => {
  const regex = /^[A-Z0-9]*$/;
  return regex.test(title);
};

export const emptyFieldCheck = (object) => {
  const requiredFields = ['title', 'description', 'rate', 'startDate', 'endDate'];
  const getEmptyFields = () => requiredFields.filter(
    (field) => !object[field] || object[field].trim().length === 0
  );
  return getEmptyFields(object);
};
