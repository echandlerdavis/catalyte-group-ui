import React from 'react';
import { Checkbox } from '@material-ui/core';
import { TripOrigin, Lens } from '@material-ui/icons';
import './FilterComponent.module.css';

const FilterComponent = ({
  fieldName, options, onChange
}) => (
  <ul>
    {fieldName}
    {options.map((option) => (
      <li key={option}>
        <Checkbox
          id={option}
          icon={<TripOrigin fontSize="small" />}
          checkedIcon={<Lens fontSize="small" style={{ color: 'green' }} />}
          onChange={onChange}
          size="small"
        />
        {option}
      </li>
    ))}
  </ul>
);

export default FilterComponent;
