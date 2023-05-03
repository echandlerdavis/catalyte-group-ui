// const validateCreditCardExpirationIsNotPast = (input) => {
//   const thisDay = new Date().getDay().toString;
//   const thisYear = new Date().getFullYear().toString;

//   const errors = {};
//   const today = `${thisDay.toString()}/${thisYear.toString()}`;
//   const simpleDateFormat = new DateFormat("MM/yy");
//   simpleDateFormat.setLenient(false);
//   simpleDateFormat.parse(today);
//   const expiry = simpleDateFormat.parse(input);
//   if (expiry > today) {
//     errors.expiration = 'The expiration date has invalid format. MM/YY is the required format';
//   }
//   return errors;
// };

const validateCreditCardNumber = (input) => {
  const errors = [];
  const regex = /^[0-9]{16}$/;
  if (input == null || !regex.test(input)) {
    errors.push('Credit Card Number is invalid. A 16 digit card number is required.');
  }
  return errors;
};
const testing = validateCreditCardNumber(1234567890123456);
console.log(testing);

const validateCreditCardExpirationFormat = (input) => {
  const errors = [];
  const regex = /^(0[1-9]||1[0-2])\/[0-9]{2}$/;
  if (input == null || !regex.test(input)) {
    errors.push('The expiration date has invalid format. MM/YY is the required format');
  }
  return errors;
};

const validateCreditCardCVV = (input) => {
  const errors = [];
  const regex = /[0-9]{3}/;
  if (input == null || !regex.test(input)) {
    errors.push('The CVV is invalid. A 3 digit number is required.');
  }
  return errors;
};
const validateCreditCardHolder = (input) => {
  const errors = [];
  const regex = /\D+/;
  if (input == null || !regex.test(input)) {
    errors.push('The Cardholder name is either empty, or contains an invalid character.');
    return errors;
  }
  return errors;
};

function CreditCardValidation(cardNumberInput, cardExpirationInput, cardCVVInput, cardholderInput) {
  const errors = [
    ...validateCreditCardNumber(cardNumberInput),
    ...validateCreditCardExpirationFormat(cardExpirationInput),
    ...validateCreditCardCVV(cardCVVInput),
    ...validateCreditCardHolder(cardholderInput)
  ];
  console.log(errors);
  return errors;
}

export default CreditCardValidation;
