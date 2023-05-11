import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useCart } from './CartContext';
import styles from './CheckoutPage.module.css';
import ReviewOrderWidget from './ReviewOrderWidget';
import DeliveryAddress from './forms/DeliveryAddress';
import BillingDetails from './forms/BillingDetails';
import makePurchase from './CheckoutService';
import AppAlert from '../alert/Alert';
import setLastActive from '../../utils/UpdateLastActive';
import Toast from '../toast/Toast';
import Constants from '../../utils/constants';

/**
 * @name CheckoutPage
 * @description A view that contains details needed to process a transaction for items
 * @return component
 */
const CheckoutPage = () => {
  const history = useHistory();
  const [purchaseConfirmation, setPurchaseConfirmation] = useState({});
  const [toastData, setToastData] = useState({
    MESSAGE: '',
    SEVERITY: Constants.SEVERITY_LEVELS.INFO
  });
  const [openToast, setOpenToast] = useState(false);

  const {
    state: { products }
  } = useCart();

  const [billingData, setBillingData] = React.useState({});
  const [deliveryData, setDeliveryData] = React.useState({});
  const [useSameAddress, setUseSameAddress] = React.useState(false);

  const showToast = () => setOpenToast(true);
  const closeToast = () => setOpenToast(false);

  const onBillingChange = (e) => {
    setBillingData({ ...billingData, [e.target.id]: e.target.value });
  };

  const onDeliveryChange = (e) => {
    setDeliveryData({ ...deliveryData, [e.target.id]: e.target.value });
  };

  const handleCheckboxChange = (e) => {
    setUseSameAddress(e.target.checked);
  };

  const handlePay = async () => {
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
    setPurchaseConfirmation(await makePurchase(
      productData,
      deliveryAddress,
      billingAddress,
      creditCard
    ));
  };

  useEffect(() => {
    console.log('errors: ', purchaseConfirmation.errors);
    console.log('data: ', purchaseConfirmation.data);
    if (purchaseConfirmation.success) {
      // success: setLastActive, empty cart, and change to confirmation page
      setLastActive();
      while (products.length > 0) {
        products.pop();
      }
      history.push('/confirmation');
    } else if (purchaseConfirmation.errors) {
      // set toast
      setToastData({
        MESSAGE: purchaseConfirmation.errors,
        SEVERITY: Constants.SEVERITY_LEVELS.ERROR
      });
      showToast();
    }
  }, [purchaseConfirmation, history, products]);

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
      <Toast
        message={toastData.MESSAGE}
        open={openToast}
        severity={toastData.SEVERITY}
        handleClose={closeToast}
      />
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
              />
            </div>
            Same Billing Address
          </label>
        </div>
      </section>
      <section className={`${styles.step} ${styles.payment}`}>
        <h2 className={styles.title}>3. Billing Details</h2>
        <div className={`Card ${styles.stepCard}`}>
          <BillingDetails
            onChange={onBillingChange}
            billingData={billingData}
            useShippingForBilling={useSameAddress}
          />
        </div>
      </section>
      <div className={styles.payNow}>
        <button onClick={handlePay} type="button" className={styles.payButton}>
          Checkout
        </button>
      </div>
    </article>
  );
};

export default CheckoutPage;
