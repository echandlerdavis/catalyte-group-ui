import React from 'react';
import { Checkbox } from '@material-ui/core';
import { Lens, TripOrigin } from '@material-ui/icons';
import styles from './FormItem.module.css';

/**
 * @name FormItemAutoComplete
 * @description Input field with datalist
 * @return component
 */
const FormItemDataList = ({
  onChange, value, id, label, placeholder, type, options, className
}) => {
  const inputBox = (
    <>
      <input
        className={`${styles.input} ${className}`}
        id={id}
        onChange={onChange}
        placeholder={placeholder}
        type={type}
        value={value}
        list={`${id}-List`}
        name={id}
      />
      <datalist id={`${id}-List`}>
        {options.map((option, idx) => (<option key={`${id}-${option}`} value={option} id={idx} />))}
      </datalist>
    </>
  );

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

  return (
    <div key={id}>
      <label className={styles.label} htmlFor={id}>
        {label}
        <div>
          {type === 'checkbox' ? checkbox : inputBox}
        </div>
      </label>
    </div>
  );
};

export default FormItemDataList;
