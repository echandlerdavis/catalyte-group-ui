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
