import React, { useState } from 'react';
import { Checkbox } from '@material-ui/core';
import {
  TripOrigin,
  Lens,
  ExpandLess,
  ExpandMore
} from '@material-ui/icons';
import styles from './FilterComponent.module.css';

/**
 * @name FilterComponent
 * @param {string} fieldName name of field to show filter options
 * @param {Array} option array of options for the filter name
 * @param {React.ChangeEventHandler} onChange function to handle change of checkbox value
 * @param {boolean} value to be assigned to the checkbox
 * @returns Component with filter name and its list of options
 */
const FilterComponent = ({
  fieldName, options, onChange, value
}) => {
  const [showOptions, setShowOptions] = useState(false);

  const iconStyle = { fontSize: '1em', color: '#808080' };

  const handleExpandClick = () => setShowOptions(!showOptions);

  return (
    <ul className={styles.FilterList}>
      {/** Filter Header */}
      <button
        className={styles.filterHeader}
        onClick={handleExpandClick}
        type="button"
      >
        {fieldName}
        <div>
          {showOptions ? <ExpandLess style={iconStyle} /> : <ExpandMore style={iconStyle} />}
        </div>
      </button>
      {/** Conditionally render list of options into list of checkboxes */}
      {showOptions && (
      <div className={styles.optionsList}>
        {options.map((option) => (
          <li key={option} className={styles.FilterItem}>
            <label htmlFor={option} className={styles.FilterLabel}>
              <Checkbox
                id={option}
                name={fieldName}
                icon={<TripOrigin style={{ fontSize: '.5em' }} />}
                checkedIcon={<Lens style={{ color: 'green', fontSize: '.5em' }} />}
                onChange={onChange}
                size="small"
                value={value}
              />
              <div className={styles.optionName}>{option}</div>
            </label>
          </li>
        ))}
      </div>
      )}
    </ul>
  );
};

export default FilterComponent;
