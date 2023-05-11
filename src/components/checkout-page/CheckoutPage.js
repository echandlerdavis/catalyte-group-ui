import React, { useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { useCart } from './CartContext';
import styles from './CheckoutPage.module.css';
import ReviewOrderWidget from './ReviewOrderWidget';
import DeliveryAddress from './forms/DeliveryAddress';
import BillingDetails from './forms/BillingDetails';
import makePurchase from './CheckoutService';
import AppAlert from '../alert/Alert';
import constants from '../../utils/constants';
import Toast from '../toast/Toast';
import { usePromoCode } from './PromoCodeWidgetService';
import { usePromoCode } from './PromoCodeWidgetService';

/**
 * @name CheckoutPage
 * @description A view that contains details needed to process a transaction for items
 * @return component
 */
const CheckoutPage = () => {
  const history = useHistory();

  const {
    state: { products }
  } = useCart();

  const { dispatch } = useCart();

  const clearCart = () => (
    dispatch({ type: 'clear', product: {} })
  );
  // toast states
  const [serverErrorOpen, serverErrorSetOpen] = useState(false);
  const [formErrorOpen, formErrorSetOpen] = useState(false);
  // error states
  const [billingEmptyErrors, setBillingEmptyErrors] = useState([]);
  const [billingInvalidErrors, setBillingInvalidErrors] = useState([]);
  const [deliveryEmptyErrors, setDeliveryEmptyErrors] = useState([]);
  const [deliveryInvalidErrors, setDeliveryInvalidErrors] = useState([]);
  const formHasError = useRef(false);
  // error message states
  const deliveryErrorMessage = useRef();
  const billingErrorMessage = useRef();
  const deliveryEmptyFieldMessage = useRef();
  const billingEmptyFieldMessage = useRef();
  // data states
  const [billingData, setBillingData] = useState({});
  const [deliveryData, setDeliveryData] = useState({});
  // checkbox state
  const [useSameAddress, setUseSameAddress] = useState(false);
  // empty field states
  const billingEmptyFields = useRef([]);
  const deliveryEmptyFields = useRef([]);
  // validation states
  const cvvIsValid = useRef(false);
  const expirationIsValidFormat = useRef(false);
  const expirationIsValidDate = useRef(false);
  const cardNumberIsValid = useRef(false);
  const cardholderIsValid = useRef(false);
  const billingZipIsValid = useRef(false);
  const deliveryZipIsValid = useRef(false);
  const phoneFormatIsValid = useRef(false);
  const { promoCode, setPromoCode } = usePromoCode();

  const onBillingChange = (e) => {
    setBillingData({ ...billingData, [e.target.id]: e.target.value });
  };

  const onDeliveryChange = (e) => {
    setDeliveryData({ ...deliveryData, [e.target.id]: e.target.value });
  };

  const handleCheckboxChange = (e) => {
    setUseSameAddress(e.target.checked);
  };

  const getEmptyFields = (requiredFields, object) => (
    requiredFields.filter((field) => !object[field] || object[field].trim().length === 0 || object[field === '-'])
  );

  const getDeliveryFieldsEmpty = () => {
    const requiredFields = [
      'street',
      'city',
      'state',
      'zip',
      'firstName',
      'lastName'
    ];
    return getEmptyFields(requiredFields, deliveryData);
  };

  const getBillingFieldsEmpty = () => {
    let requiredFields = [
      'billingStreet',
      'billingCity',
      'billingState',
      'billingZip',
      'phone',
      'email',
      'cvv',
      'expiration',
      'cardholder',
      'creditCard'
    ];
    if (useSameAddress) {
      requiredFields = requiredFields.filter((field) => (
        !['billingStreet', 'billingCity', 'billingState', 'billingZip'].includes(field)
      ));
    }
    return getEmptyFields(requiredFields, billingData);
  };

  // Validate fields we know will be checked on the backend

  // Validate Zip code entered is 5 numeric values only
  const validateBillingZip = () => {
    if (!useSameAddress && billingData.billingZip) {
      const { billingZip } = billingData;
      const regex = /^[0-9]{5}$/;
      return regex.test(billingZip);
    } if (useSameAddress) {
      // if useSameAddress checkbox is checked, don't validate billing address zip
      return true;
    }
    return false;
  };

  const validateDeliveryZip = () => {
    if (deliveryData.zip) {
      const { zip } = deliveryData;
      const regex = /^[0-9]{5}$/;
      return regex.test(zip);
    }
    return false;
  };

  const validateCVVIs3Digits = () => {
    if (billingData.cvv) {
      const { cvv } = billingData;
      return (cvv.length === 3);
    }
    return false;
  };
  // Validate expiration is entered in MM/YY format
  const validateExpirationFormat = () => {
    if (billingData.expiration) {
      const { expiration } = billingData;
      const regex = /^(0[1-9]||1[0-2])\/[0-9]{2}$/;
      return regex.test(expiration);
    }
    return false;
  };
  const validatePhoneFormat = () => {
    if (billingData.phone) {
      const { phone } = billingData;
      const regex = /^(1-)?\d{3}-\d{3}-\d{4}$/;
      return regex.test(phone);
    }
    return false;
  };

  // Validate cardnumber is 16 numeric values only
  const validateCreditCardNumber = () => {
    if (billingData.creditCard) {
      const { creditCard } = billingData;
      const regex = /^[0-9]{16}$/;
      return regex.test(creditCard);
    }
    return false;
  };

  // Validate cardholder name is Alphabetic values only
  const validateCardholderName = () => {
    if (billingData.cardholder) {
      const { cardholder } = billingData;
      const regex = /^\D*$/;
      return regex.test(cardholder);
    }
    return false;
  };

  const validateExpirationDate = () => {
    const todaysDate = new Date();
    if (billingData.expiration) {
      const [month, year] = billingData.expiration.split('/');
      const expYear = `20${year}`;
      const expDate = new Date(expYear, month);
      return (expDate >= todaysDate);
    }
    return false;
  };

  const getFormErrors = () => {
    // reset errors
    setBillingEmptyErrors([]);
    setBillingInvalidErrors([]);
    setDeliveryEmptyErrors([]);
    setDeliveryInvalidErrors([]);
    // set validation values equal to validation results
    deliveryEmptyFields.current = getDeliveryFieldsEmpty();
    billingEmptyFields.current = getBillingFieldsEmpty();
    cvvIsValid.current = validateCVVIs3Digits();
    expirationIsValidFormat.current = validateExpirationFormat();
    expirationIsValidDate.current = validateExpirationDate();
    cardNumberIsValid.current = validateCreditCardNumber();
    cardholderIsValid.current = validateCardholderName();
    billingZipIsValid.current = validateBillingZip();
    deliveryZipIsValid.current = validateDeliveryZip();
    phoneFormatIsValid.current = validatePhoneFormat();

    // build list of empty fields and add them to error message
    if (deliveryEmptyFields.current.length) {
      setDeliveryEmptyErrors([...deliveryEmptyFields.current]);
      deliveryEmptyFieldMessage.current = constants.FORM_FIELDS_EMPTY(deliveryEmptyFields.current);
      formHasError.current = true;
    }
    if (billingEmptyFields.current.length) {
      setBillingEmptyErrors([...billingEmptyFields.current]);
      billingEmptyFieldMessage.current = constants.FORM_FIELDS_EMPTY(billingEmptyFields.current);
      formHasError.current = true;
    }

    // build error message for any fields that failed validation
    if (!cvvIsValid.current) {
      setBillingInvalidErrors((prev) => [...prev, 'cvv']);
      billingErrorMessage.current += ' CVV must be 3 digits |';
      formHasError.current = true;
    }
    if (!expirationIsValidFormat.current) {
      setBillingInvalidErrors((prev) => [...prev, 'expiration']);
      billingErrorMessage.current += ' Expiration must be digits in MM/YY format |';
      formHasError.current = true;
    }
    if (expirationIsValidFormat && !expirationIsValidDate.current) {
      setBillingInvalidErrors((prev) => [...prev, 'expiration']);
      billingErrorMessage.current += ' Credit card is expired |';
      formHasError.current = true;
    }
    if (!cardNumberIsValid.current) {
      setBillingInvalidErrors((prev) => [...prev, 'creditCard']);
      billingErrorMessage.current += ' Cardnumber must be 16 digits |';
      formHasError.current = true;
    }
    if (!cardholderIsValid.current) {
      setBillingInvalidErrors((prev) => [...prev, 'cardholder']);
      billingErrorMessage.current += ' Cardholder can only be alphabet values |';
      formHasError.current = true;
    }
    if (!billingZipIsValid.current) {
      setBillingInvalidErrors((prev) => [...prev, 'billingZip']);
      billingErrorMessage.current += ' Zip code requries 5 digits |';
      formHasError.current = true;
    }
    if (!deliveryZipIsValid.current) {
      setDeliveryInvalidErrors((prev) => [...prev, 'zip']);
      deliveryErrorMessage.current = ' Zip code requries 5 digits ';
      formHasError.current = true;
    }
    if (!phoneFormatIsValid.current) {
      setBillingInvalidErrors((prev) => [...prev, 'phone']);
      billingErrorMessage.current += ' Phone number must be digits in XXX-XXX-XXXX format ';
      formHasError.current = true;
    }
  };

  const handleClose = () => {
    serverErrorSetOpen(false);
    formErrorSetOpen(false);
  };
  const handlePay = async () => {
    billingErrorMessage.current = '';
    formHasError.current = false;
    handleClose();
    getFormErrors();

    // if form has no errors ...
    if (formHasError.current === false) {
      // Create purchase objects: products, delivery addresss, billing address, and credit card
      const productData = products.map(({ id, quantity }) => (
        { product: { id }, quantity }));
      const deliveryAddress = {
        firstName: deliveryData.firstName,
        lastName: deliveryData.lastName,
        deliveryStreet: deliveryData.street,
        deliveryStreet2: deliveryData.street2,
        deliveryCity: deliveryData.city,
        deliveryState: deliveryData.state,
        deliveryZip: deliveryData.zip
      };
      let billingAddress = { ...billingData };
      // if useSameAddress is checked, set equivalent billing data equal to delivery data
      if (useSameAddress) {
        billingAddress = {
          ...billingData,
          billingStreet: deliveryData.street,
          billingStreet2: deliveryData.street2,
          billingCity: deliveryData.city,
          billingState: deliveryData.state,
          billingZip: deliveryData.zip
        };
      }
      const creditCard = {
        cardNumber: billingData.creditCard,
        cvv: billingData.cvv,
        expiration: billingData.expiration,
        cardholder: billingData.cardholder
      };
      const contact = {
        phone: billingData.phone,
        email: billingData.email
      };
      // Then save the purchase with the created objects
      const purchase = await makePurchase(
        productData, deliveryAddress, billingAddress, creditCard, contact, promoCode
      );

      // If successful save, got to confirmation page
      if (purchase) {
        clearCart();
        history.push('/confirmation');
      } else {
        serverErrorSetOpen(true);
      }
    }
    formErrorSetOpen(true);
  };
  if (products.length === 0) {
    return (
      <div className={styles.checkoutContainer}>
        <div className={`${styles.step}${styles.order}`}>
          <h2 className={styles.title}>1. Review Order</h2>
          <AppAlert severity="info" title="Cart Empty" message="Cart is empty.  Please add your favorite items to get started!" />
        </div>
      </div>
    );
  }
  return (
    <article className={styles.checkoutContainer}>
      <section className={`${styles.step} ${styles.order}`}>
        <h2 className={styles.title}>1. Review Order</h2>
        <div className={`Card ${styles.stepCard}`}>
          <ReviewOrderWidget promoCode={promoCode} promoCodeSetter={setPromoCode} />
        </div>
      </section>
      <section className={`${styles.step} ${styles.delivery}`}>
        <h2 className={styles.title}>2. Delivery Address</h2>
        {serverErrorOpen && <Toast message="Server Error, order not submitted" open={serverErrorOpen} handleClose={handleClose} severity="error" />}
        {formErrorOpen && <Toast message="Error in form, order not submitted" open={formErrorOpen} handleClose={handleClose} severity="error" />}
        <div className={`Card ${styles.stepCard}`}>
          <DeliveryAddress
            onChange={onDeliveryChange}
            deliveryData={deliveryData}
            errors={`${deliveryEmptyErrors} ${deliveryInvalidErrors}`}
          />
          <label htmlFor="useSame" className={styles.sameAddressText}>
            <div className={styles.useSameAddress}>
              <input
                id="useSame"
                onChange={handleCheckboxChange}
                type="checkbox"
                checked={useSameAddress}
                value={deliveryData}
              />
            </div>
            Same Billing Address
          </label>
          {deliveryEmptyErrors && deliveryEmptyErrors.length > 0 && <AppAlert severity="error" title="Missing Requried Fields" message={deliveryEmptyFieldMessage.current} />}
          {deliveryInvalidErrors && deliveryInvalidErrors.length > 0 && <AppAlert severity="error" title="Invalid Entry Error" message={deliveryErrorMessage.current} />}
        </div>
      </section>
      <section className={`${styles.step} ${styles.payment}`}>
        <h2 className={styles.title}>3. Billing Details</h2>
        <div className={`Card ${styles.stepCard}`}>
          <BillingDetails
            onChange={onBillingChange}
            billingData={billingData}
            useShippingForBilling={useSameAddress}
            errors={`${billingEmptyErrors} ${billingInvalidErrors}`}
          />
          {billingEmptyErrors && billingEmptyErrors.length > 0 && <AppAlert severity="error" title="Missing Requried Fields" message={billingEmptyFieldMessage.current} />}
          {billingInvalidErrors && billingInvalidErrors.length > 0 && <AppAlert severity="error" title="Please Correct The Following Errors:" message={billingErrorMessage.current} />}
        </div>
      </section>
      <div className={styles.payNow}>
        <button onClick={handlePay} type="submit" className={styles.payButton}>
          Checkout
        </button>
      </div>
    </article>
  );
};
export default CheckoutPage;
