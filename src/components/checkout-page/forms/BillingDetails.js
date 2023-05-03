import React from 'react';
import FormItem from '../../form/FormItem';
import FormItemDropdown from '../../form/FormItemDropdown';
import styles from './DeliveryAddress.module.css';
// import Toast from './toast/Toast';

/**
 * @name BillingDetails
 * @description Allows entry of Billing Details
 * @return component
 */
const BillingDetails = ({ onChange, billingData, useShippingForBilling }) => {
  const usStates = ['Alabama', 'Alaska', 'American Samoa', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'District of Columbia', 'Federated States of Micronesia', 'Florida', 'Georgia', 'Guam', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Marshall Islands', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Northern Mariana Islands', 'Ohio', 'Oklahoma', 'Oregon', 'Palau', 'Pennsylvania', 'Puerto Rico', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virgin Island', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];

  return (

    <div className={styles.deliveryAddress}>
      {/* {Object.keys(errors).length === 0 && submitting ? (
        <Toast/>) : null} */}
      {!useShippingForBilling && (
        <>

          <FormItem
            placeholder="e.g. 123 Sesame Street"
            type="text"
            id="billingStreet"
            label="Street"
            onChange={onChange}
            value={billingData.billingStreet}
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
            required
          />

          <FormItemDropdown
            id="billingState"
            label="State"
            onChange={onChange}
            value={billingData.billingState}
            options={usStates}
            required
          />

          <FormItem
            placeholder="e.g. 12345"
            type="text"
            id="billingZip"
            label="Zip"
            onChange={onChange}
            value={billingData.billingZip}
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
        required
      />

      <FormItem
        placeholder="e.g. 555-555-5555"
        type="text"
        id="phone"
        label="Phone"
        onChange={onChange}
        value={billingData.phone}
        required
      />

      <FormItem
        placeholder="e.g. 1234567812345678"
        type="text"
        id="creditCard"
        label="Credit Card"
        onChange={onChange}
        value={billingData.creditCard}
        required
      />

      <FormItem
        placeholder="e.g. 555"
        type="text"
        id="cvv"
        label="CVV"
        onChange={onChange}
        value={billingData.cvv}
        required
      />

      <FormItem
        placeholder="e.g. 05/21"
        type="text"
        id="expiration"
        label="Expiration"
        onChange={onChange}
        value={billingData.expiration}
        required
      />

      <FormItem
        type="text"
        id="cardholder"
        label="Cardholder Name"
        onChange={onChange}
        value={billingData.cardholder}
        required
      />
    </div>

  );
};

export default BillingDetails;
