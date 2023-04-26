import React from 'react';
import styles from './FormItem.module.css';

/**
 * @name FormItemAutoComplete
 * @description Input field with datalist
 * @return component
 */
const FormItemDataList = ({
  onChange, value, id, label, placeholder, type, options
}) => (

  <div key={id}>
    <label className={styles.label} htmlFor={id}>
      {label}
      <div>
        <input
          className={styles.input}
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
      </div>
    </label>
  </div>
);

export default FormItemDataList;
