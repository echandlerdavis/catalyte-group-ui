import React, { useState } from 'react';
import FormItem from '../../form/FormItem';
import FormItemDropdown from '../../form/FormItemDropdown';
import styles from './DeliveryAddress.module.css';

/**
 * @name BillingDetails
 * @description Allows entry of Billing Details
 * @return component
 */
const BillingDetails = ({ billingData, useShippingForBilling }) => {
  const [formData, setFormData] = useState('');
  const usStates = ['Alabama', 'Alaska', 'American Samoa', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'District of Columbia', 'Federated States of Micronesia', 'Florida', 'Georgia', 'Guam', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Marshall Islands', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Northern Mariana Islands', 'Ohio', 'Oklahoma', 'Oregon', 'Palau', 'Pennsylvania', 'Puerto Rico', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virgin Island', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];

  const handleFormChange = ({ target }) => {
    const { value, id } = target;
    // Update form data with the targets new value
    setFormData({
      ...formData,
      [id]: value
    });
  };
  return (

    <div className={styles.deliveryAddress}>
      {!useShippingForBilling && (
        <>

          <FormItem
            placeholder="e.g. 123 Sesame Street"
            type="text"
            id="billingStreet"
            label="Street"
            onChange={handleFormChange}
            value={billingData.billingStreet}
            required
          />

          <FormItem
            placeholder="e.g. Unit #1"
            type="text"
            id="billingStreet2"
            label="Street 2 (Optional)"
            onChange={handleFormChange}
            value={billingData.billingStreet2}
          />

          <FormItem
            type="text"
            id="billingCity"
            label="City"
            onChange={handleFormChange}
            value={billingData.billingCity}
            required
          />

          <FormItemDropdown
            id="billingState"
            label="State"
            onChange={handleFormChange}
            value={billingData.billingState}
            options={usStates}
            required
          />

          <FormItem
            placeholder="e.g. 12345"
            type="text"
            id="billingZip"
            label="Zip"
            onChange={handleFormChange}
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
        onChange={handleFormChange}
        value={billingData.email}
        required
      />

      <FormItem
        placeholder="e.g. 555-555-5555"
        type="text"
        id="phone"
        label="Phone"
        onChange={handleFormChange}
        value={billingData.phone}
        required
      />

      <FormItem
        placeholder="e.g. 1234567812345678"
        type="text"
        id="creditCard"
        label="Credit Card"
        onChange={handleFormChange}
        value={billingData.creditCard}
        required
      />

      <FormItem
        placeholder="e.g. 555"
        type="text"
        id="cvv"
        label="CVV"
        onChange={handleFormChange}
        value={billingData.cvv}
        required
      />

      <FormItem
        placeholder="e.g. 05/21"
        type="text"
        id="expiration"
        label="Expiration"
        onChange={handleFormChange}
        value={billingData.expiration}
        required
      />

      <FormItem
        type="text"
        id="cardholder"
        label="Cardholder Name"
        onChange={handleFormChange}
        value={billingData.cardholder}
        required
      />
    </div>

  );
};

export default BillingDetails;
