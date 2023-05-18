import React from 'react';
import FormItem from '../../form/FormItem';
import FormItemDropdown from '../../form/FormItemDropdown';
import styles from './DeliveryAddress.module.css';

/**
 * @name DeliveryAddress
 * @description Allows entry of delivery address
 * @return component
 */
const DeliveryAddress = ({
  onChange, deliveryData, errors, stateList
}) => (

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
      className={errors && errors.includes('street') && styles.invalidField}
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
      className={errors && errors.includes('city') && styles.invalidField}
      required
    />

    <FormItemDropdown
      id="state"
      label="State"
      onChange={onChange}
      value={deliveryData.state}
      options={stateList}
      className={errors && errors.includes('state') && styles.invalidField}
      required
    />

    <FormItem
      placeholder="e.g. 12345"
      type="text"
      id="zip"
      label="Zip"
      onChange={onChange}
      value={deliveryData.zip}
      className={errors && errors.includes('zip') && styles.invalidField}
      required
    />
  </div>

);

export default DeliveryAddress;
