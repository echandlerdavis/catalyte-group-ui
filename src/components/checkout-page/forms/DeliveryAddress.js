import React from 'react';
import FormItem from '../../form/FormItem';
import FormItemDropdown from '../../form/FormItemDropdown';
import styles from './DeliveryAddress.module.css';

/**
 * @name DeliveryAddress
 * @description Allows entry of delivery address
 * @return component
 */
const DeliveryAddress = ({ onChange, deliveryData, errors }) => {
  const usStates = ['Alabama', 'Alaska', 'American Samoa', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'District of Columbia', 'Federated States of Micronesia', 'Florida', 'Georgia', 'Guam', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Marshall Islands', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Northern Mariana Islands', 'Ohio', 'Oklahoma', 'Oregon', 'Palau', 'Pennsylvania', 'Puerto Rico', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virgin Island', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];

  return (

    <div className={styles.deliveryAddress}>
      <FormItem
        type="text"
        id="firstName"
        label="First Name"
        onChange={onChange}
        value={deliveryData.firstName}
        className={errors && errors.includes('firstName') && styles.invalidField}
        required
      />

      <FormItem
        type="text"
        id="lastName"
        label="Last Name"
        onChange={onChange}
        value={deliveryData.lastName}
        className={errors && errors.includes('lastName') && styles.invalidField}
        required
      />

      <FormItem
        placeholder="e.g. 123 Sesame Street"
        type="text"
        id="street"
        label="Street"
        onChange={onChange}
        value={deliveryData.street}
        required
      />

      <FormItem
        placeholder="e.g. Unit #1"
        type="text"
        id="street2"
        label="Street 2 (Optional)"
        onChange={onChange}
        value={deliveryData.street2}
      />

      <FormItem
        type="text"
        id="city"
        label="City"
        onChange={onChange}
        value={deliveryData.city}
        required
      />

      <FormItemDropdown
        id="state"
        label="State"
        onChange={onChange}
        value={deliveryData.state}
        options={usStates}
        required
      />

      <FormItem
        placeholder="e.g. 12345"
        type="text"
        id="zip"
        label="Zip"
        onChange={onChange}
        value={deliveryData.zip}
        required
      />
    </div>

  );
};

export default DeliveryAddress;
