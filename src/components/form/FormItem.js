import React from 'react';
import styles from './FormItem.module.css';

/**
 * @name FormItem
 * @description Input field
 * @return component
 */
const FormItem = ({
  onChange, value, id, label, placeholder, type
}) => (

  <div key={`input${id}`}>
    <label className={styles.label} htmlFor={id}>
      {label}
      <div>
        <input
          className={styles.input}
          id={`${id}-input`}
          onChange={onChange}
          placeholder={placeholder}
          type={type}
          value={value}
          checked={value}
        />
      </div>
    </label>
  </div>
);

export default FormItem;
