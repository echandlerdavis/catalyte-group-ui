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
// import { validateOrder } from '../product-card/ProductCard';
// import fieldStyles from './forms/DeliveryAddress.module.css';

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
  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState([]);
  const errorMessage = useRef();
  const [billingData, setBillingData] = useState({});
  const [deliveryData, setDeliveryData] = useState({});
  const [useSameAddress, setUseSameAddress] = useState(false);
  const formHasError = useRef(false);
  const emptyFields = useRef([]);
  const cvvIsValid = useRef(false);
  const expirationIsValid = useRef(false);
  const cardNumberIsValid = useRef(false);
  // const [formErrorMessage, setFormErrorMessage] = useState(null);
  // const [formData, setFormData] = useState(initialFormData);

  const requiredFields = [
    'billingStreet',
    'billingCity',
    'billingState',
    'billingZip',
    'phone',
    'email',
    'cvv',
    'expiration',
    'cardholder',
    'creditCard',
    'lastName',
    'firstName'
  ];

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
    requiredFields.filter((field) => !billingData[field] || billingData[field].trim().length === 0)
  );

  const validateCVVIs3Digits = () => {
    if (billingData.cvv) {
      const { cvv } = billingData;
      console.log(cvv);
      return (cvv.toString.length === 3);
    }
    console.log(billingData.cvv);
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
  const getErrorFields = () => {
    setErrors('');
    emptyFields.current = null;
    emptyFields.current = getFieldsNotEmpty();
    cvvIsValid.current = validateCVVIs3Digits();
    expirationIsValid.current = validateExpirationFormat();
    cardNumberIsValid.current = validateCreditCardNumber();
    if (emptyFields.current.length) {
      setErrors([...emptyFields.current]);
      errorMessage.current = constants.FORM_FIELDS_EMPTY(emptyFields.current);
      formHasError.current = true;
    }
    if (!cvvIsValid.current) {
      setErrors((prev) => [...prev, 'cvv']);
      errorMessage.current += '& cvv invalid';
      formHasError.current = true;
    }
    if (!expirationIsValid.current) {
      setErrors((prev) => [...prev, 'expiration']);
      errorMessage.current += ' & expiration invalid';
      formHasError.current = true;
    }
    if (!cardNumberIsValid.current) {
      setErrors((prev) => [...prev, 'creditCard']);
      errorMessage.current += ' & cardNumber invalid';
      formHasError.current = true;
    }
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handlePay = () => {
    handleClose();

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
    getErrorFields();

    const handleSubmit = async () => {
      if (!formHasError.current) {
        console.log('purchase', makePurchase(productData, deliveryAddress, billingAddress, creditCard));
        makePurchase(productData, deliveryAddress, billingAddress, creditCard).then(() => history.push('/confirmation'));
        history.push('/confirmation');
      } else {
        setOpen(true);
      }
    };
    handleSubmit();
  };
  products.forEach((product) => {
    console.log(product.quantity);
  });
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
        {formHasError.current && <Toast message="Order not Submitted due to error!" open={open} handleClose={handleClose} severity="error" />}
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
          {formHasError.current && <AppAlert severity="error" title="Error" message={errorMessage.current} />}
          <BillingDetails
            onChange={onBillingChange}
            billingData={billingData}
            useShippingForBilling={useSameAddress}
            empytyFields={emptyFields}
            value={billingData[attributes]}
            errors={errors}
          />
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
