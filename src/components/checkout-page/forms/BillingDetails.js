import React from 'react';
import FormItem from '../../form/FormItem';
import FormItemDropdown from '../../form/FormItemDropdown';
import styles from './DeliveryAddress.module.css';

/**
 * @name BillingDetails
 * @description Allows entry of Billing Details
 * @return component
 */
const BillingDetails = ({
  billingData, useShippingForBilling, errors, onChange, stateList
}) => (

  <div className={styles.deliveryAddress}>
    {!useShippingForBilling && (
    <>

      <FormItem
        placeholder="e.g. 123 Sesame Street"
        type="text"
        id="billingStreet"
        label="Street"
        onChange={onChange}
        value={billingData.billingStreet}
        className={errors && errors.includes('billingStreet') && styles.invalidField}
        required
      />

      <FormItem
        placeholder="e.g. Unit #1"
        type="text"
        id="billingStreet2"
        label="Street 2 (Optional)"
        onChange={onChange}
        value={billingData.billingStreet2}
      />

      <FormItem
        type="text"
        id="billingCity"
        label="City"
        onChange={onChange}
        value={billingData.billingCity}
        className={errors && errors.includes('billingCity') && styles.invalidField}
        required
      />

      <FormItemDropdown
        id="billingState"
        label="State"
        onChange={onChange}
        value={billingData.billingState}
        options={stateList}
        className={errors && errors.includes('billingState') && styles.invalidField}
        required
      />

      <FormItem
        placeholder="e.g. 12345"
        type="text"
        id="billingZip"
        label="Zip"
        onChange={onChange}
        value={billingData.billingZip}
        className={errors && errors.includes('billingZip') && styles.invalidField}
        required
      />
    </>
    )}
    <FormItem
      placeholder="e.g. example@catalyte.io"
      type="email"
      id="email"
      label="Email"
      onChange={onChange}
      value={billingData.email}
      className={errors && errors.includes('email') && styles.invalidField}
      required
    />

    <FormItem
      placeholder="e.g. 555-555-5555"
      type="text"
      id="phone"
      label="Phone"
      onChange={onChange}
      value={billingData.phone}
      className={errors && errors.includes('phone') && styles.invalidField}
      required
    />

    <FormItem
      placeholder="e.g. 1234567812345678"
      type="text"
      id="creditCard"
      label="Credit Card"
      onChange={onChange}
      value={billingData.creditCard}
      className={errors && errors.includes('creditCard') && styles.invalidField}
      required
    />

    <FormItem
      placeholder="e.g. 555"
      type="text"
      id="cvv"
      label="CVV"
      onChange={onChange}
      value={billingData.cvv}
      className={errors && errors.includes('cvv') && styles.invalidField}
      required
    />

    <FormItem
      placeholder="e.g. 05/21"
      type="text"
      id="expiration"
      label="Expiration"
      onChange={onChange}
      value={billingData.expiration}
      className={errors && errors.includes('expiration') && styles.invalidField}
      required
    />

    <FormItem
      type="text"
      id="cardholder"
      label="Cardholder Name"
      onChange={onChange}
      value={billingData.cardholder}
      className={errors && errors.includes('cardholder') && styles.invalidField}
      required
    />
  </div>

);

export default BillingDetails;
