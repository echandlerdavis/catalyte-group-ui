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
import fieldStyles from './forms/DeliveryAddress.module.css';

/**
 * @name CheckoutPage
 * @description A view that contains details needed to process a transaction for items
 * @return component
 */
const CheckoutPage = ({ openToast }) => {
  const history = useHistory();

  const {
    state: { products }
  } = useCart();

  const attributes = {
    firstName: null,
    lastName: null,
    billingStreet: null,
    billingStreet2: null,
    billingCity: null,
    billingState: null,
    billingZip: null,
    creditCard: null,
    cvv: null,
    expiration: null,
    cardholder: null
  };
  const [billingData, setBillingData] = React.useState({});
  const [deliveryData, setDeliveryData] = React.useState({});
  const [useSameAddress, setUseSameAddress] = React.useState(false);
  const formHasError = useRef(false);
  const emptyFields = useRef([]);
  const cvvIsInvalid = useRef(false);
  const expirationIsInvalid = useRef(false);
  const cardNumberIsInvalid = useRef(false);
  const [formErrorMessage, setFormErrorMessage] = useState(null);
  // const [formData, setFormData] = useState(initialFormData);

  const onBillingChange = (e) => {
    setBillingData({ ...billingData, [e.target.id]: e.target.value });
  };

  const onDeliveryChange = (e) => {
    setDeliveryData({ ...deliveryData, [e.target.id]: e.target.value });
  };

  const handleCheckboxChange = (e) => {
    setUseSameAddress(e.target.checked);
  };

  const getFieldsNotEmpty = () => (
    Object.keys(billingData).filter((key) => billingData[key].length === 0)
  );
  const validateCVVIs3Digits = () => {
    console.log(billingData);
    console.log(billingData.cvv);
    if (billingData.cvv) {
      const { cvv } = billingData;
      return (cvv.length !== 3);
    }
    return false;
  };
  const validateExpirationFormat = () => {
    if (billingData.expiration) {
      const { expiration } = billingData;
      const regex = /^(0[1-9]||1[0-2])\/[0-9]{2}$/;
      return regex.test(expiration);
    }
    return false;
  };
  const validateCreditCardNumber = () => {
    if (billingData.cardNumber) {
      const { cardNumber } = billingData;
      const regex = /^[0-9]{16}$/;
      return regex.test(cardNumber);
    }
    return false;
  };

  Object.keys(attributes).forEach((key) => {
    if (errors.includes(key)) {
      attributes[key] = fieldStyles.InvalidFields;
    }
  });

  /**
 *  Generates the error message based on the form errors present
 */

  const handlePay = () => {
    const productData = products.map(({ id, quantity }) => ({ id, quantity }));
    const deliveryAddress = {
      firstName: deliveryData.firstName,
      lastName: deliveryData.lastName,
      street: deliveryData.street,
      street2: deliveryData.street2,
      city: deliveryData.city,
      state: deliveryData.state,
      zip: deliveryData.zip
    };
    const billingAddress = {};
    if (useSameAddress) {
      billingAddress.street = deliveryAddress.street;
      billingAddress.street2 = deliveryAddress.street2;
      billingAddress.city = deliveryAddress.city;
      billingAddress.state = deliveryAddress.state;
      billingAddress.zip = deliveryAddress.zip;
    } else {
      billingAddress.street = billingData.billingStreet;
      billingAddress.street2 = billingData.billingStreet2;
      billingAddress.city = billingData.billingCity;
      billingAddress.state = billingData.billingState;
      billingAddress.zip = billingData.billingZip;
    }
    billingAddress.email = billingData.email;
    billingAddress.phone = billingData.phone;

    const creditCard = {
      cardNumber: billingData.creditCard,
      cvv: billingData.cvv,
      expiration: billingData.expiration,
      cardholder: billingData.cardholder
    };

    emptyFields.current = getFieldsNotEmpty();
    cvvIsInvalid.current = validateCVVIs3Digits();
    expirationIsInvalid.current = validateExpirationFormat();
    cardNumberIsInvalid.current = validateCreditCardNumber();
    // eslint-disable-next-line max-len
    if (emptyFields.current.length
      || cvvIsInvalid.current
      || expirationIsInvalid.current
      || cardNumberIsInvalid.current) {
      formHasError.current = true;
    } else {
      formHasError.current = false;
    }

    makePurchase(productData, deliveryAddress, billingAddress, creditCard).then(() => history.push('/confirmation'));
  };

  const generateError = () => {
    // Start with blank form error message to remove previous errors
    setFormErrorMessage(null);
    let errorMessage = null;
    // If fields are empty get list with empty fields and join the list in a string
    if (emptyFields.current.length) {
      errorMessage = constants.FORM_FIELDS_EMPTY(emptyFields.current);
    }
    // Build the error message string checking if error message has a previous error
    // If previous error join the prev error message with the next error
    if (cvvIsInvalid.current) {
      if (errorMessage) {
        errorMessage = errorMessage.concat(' ** AND ** ', constants.PRODUCT_FORM_INVALID_PRICE);
      } else {
        errorMessage = constants.PRODUCT_FORM_INVALID_PRICE;
      }
    }
    if (expirationIsInvalid.current) {
      if (errorMessage) {
        errorMessage = errorMessage.concat(' ** AND ** ', constants.PRODUCT_FORM_INVALID_QUANTITY);
      } else {
        errorMessage = constants.PRODUCT_FORM_INVALID_QUANTITY;
      }
    }
    if (cardNumberIsInvalid.current) {
      if (errorMessage) {
        errorMessage = errorMessage.concat(' ** AND ** ', constants.PRODUCT_FORM_INVALID_QUANTITY);
      } else {
        errorMessage = constants.PRODUCT_FORM_INVALID_QUANTITY;
      }
    }
    setFormErrorMessage(errorMessage);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    generateError();
    if (!formHasError.current) {
      // setToastData(constants.SAVE_PRODUCT_SUCCESS);
      handlePay();
      // eslint-disable-next-line no-restricted-globals
      history.push('/confirmation');
    } else {
      // setToastData(constants.SAVE_PRODUCT_FAILURE);
    }
    openToast();
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
          <ReviewOrderWidget />
        </div>
      </section>
      <section className={`${styles.step} ${styles.delivery}`}>
        <h2 className={styles.title}>2. Delivery Address</h2>
        <div className={`Card ${styles.stepCard}`}>
          <DeliveryAddress onChange={onDeliveryChange} deliveryData={deliveryData} />
          <label htmlFor="useSame" className={styles.sameAddressText}>
            <div className={styles.useSameAddress}>
              <input
                id="useSame"
                onChange={handleCheckboxChange}
                type="checkbox"
                checked={useSameAddress}
                value={deliveryData[attributes]}
              />
            </div>
            Same Billing Address
          </label>
        </div>
      </section>
      <section className={`${styles.step} ${styles.payment}`}>
        <h2 className={styles.title}>3. Billing Details</h2>
        <div className={`Card ${styles.stepCard}`}>
          {formHasError.current && <AppAlert severity="error" title="Error" message={formErrorMessage} />}
          <BillingDetails
            onChange={onBillingChange}
            billingData={billingData}
            useShippingForBilling={useSameAddress}
            empytyFields={emptyFields}
            value={billingData[attributes]}
          />
        </div>
      </section>
      <div className={styles.payNow}>
        <button onClick={handleSubmit} type="submit" className={styles.payButton}>
          Checkout
        </button>
      </div>
    </article>
  );
};
export default CheckoutPage;
