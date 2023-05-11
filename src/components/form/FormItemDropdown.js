import React from 'react';
import styles from './FormItem.module.css';

/**
 * @name FormItemDropdown
 * @description Input field
 * @return component
 */
const FormItemDropdown = ({
  onChange, value, id, label, options, className
}) => (

  <div>
    <label className={styles.label} htmlFor={id}>
      {label}
      <div>
        <select
          className={`${styles.input} ${className}`}
          id={id}
          onBlur={onChange}
          value={value}
        >
          {options.map((optionText) => (
            <option
              value={optionText}
              key={optionText}
            >
              {optionText}
            </option>
          ))}
        </select>
      </div>
    </label>
  </div>
);

export default FormItemDropdown;
