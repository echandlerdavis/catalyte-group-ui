import React from 'react';
import { Checkbox } from '@material-ui/core';
import { TripOrigin, Lens } from '@material-ui/icons';
import styles from './FormItem.module.css';

/**
 * @name FormItem
 * @description Input field
 * @return component
 */
const FormItem = ({
  onChange, value, id, label, placeholder, type, className, min, step
}) => {
  const checkbox = (
    <Checkbox
      id={id}
      value={value}
      checked={value}
      icon={<TripOrigin />}
      checkedIcon={<Lens style={{ color: 'green' }} />}
      onChange={onChange}
    />
  );

  let inputBox = (
    <input
      className={`${styles.input} ${className}`}
      id={id}
      onChange={onChange}
      placeholder={placeholder}
      type={type}
      value={value}
      checked={value}
      min={min}
      step={step}
    />
  );

  if (label === 'price') {
    inputBox = (
      <div className={styles.priceInputBox}>
        <div className={styles.priceInputIcon}>$</div>
        {inputBox}
      </div>
    );
  }

  return (
    <div key={`input${id}`}>
      <label className={styles.label} htmlFor={id}>
        {label}
        <div>
          {type === 'checkbox' ? checkbox : inputBox}
        </div>
      </label>
    </div>
  );
};

export default FormItem;
