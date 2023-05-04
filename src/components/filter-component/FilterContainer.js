import React from 'react';
import FilterComponent from './FilterComponent';

const FilterComponentExample = () => {
  const filters = {
    Types: ['Shorts', 'Hat', 'Gloves'],
    Brands: ['Addidas', 'Nike', 'Puma', 'Champion']
  };

  return (
    <article>
      {Object.keys(filters).map((filter) => (
        <FilterComponent fieldName={filter} id={filter} options={filters[filter]} />
      ))}
    </article>
  );
};

export default FilterComponentExample;
