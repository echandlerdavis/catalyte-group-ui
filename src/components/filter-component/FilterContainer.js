import React, { useEffect, useRef, useState } from 'react';
import FilterComponent from './FilterComponent';
import styles from './FilterContainer.module.css';
/**
 * @description
 *  - Example implementation of the filter compnent
 *  - Implementation will vary based on how you set the filters and pass the value of the options
 * @returns card housing the filter component
 */
const FilterComponentExample = () => {
  const testFilters = {
    Types: { Shorts: false, Hat: false, Gloves: false },
    Demographics: { Men: false, Women: false, Kids: false },
    Brands: {
      Nike: false,
      Addidas: false,
      Champion: false,
      'New Balance': false
    }
  };

  const [filters, setFilters] = useState({ ...testFilters });

  // Use ref to save the target checkbox value.  will be handled on change
  const selected = useRef({ value: false });

  /**
   * Read set filters and reduce it to an Object
   * Object will have fieldNames as keys and the values are an array of only selected filters
   * @param {Object} filtersSet the object of the filters that are to be implemented
   * @returns Object of only selected filters and options
   */
  const selectedFilters = (filtersSet) => (
    Object.keys(filtersSet).reduce((acc, filterField) => {
      const filterOptions = Object.keys(filtersSet[filterField]);
      const selectedOptions = filterOptions.filter((option) => (
        filtersSet[filterField][option] === true
      ));
      if (selectedOptions.length !== 0) {
        acc[filterField] = selectedOptions;
      }
      return acc;
    }, {})
  );

  useEffect(() => {
    console.log('Selected Filters', selectedFilters(filters));
  }, [filters]);

  /**
   * On change event handler
   * changes the selected checkboxes value to the opposite of the current stored value
   * @param {EventTarget} target
   */
  const onChange = ({ target }) => {
    // targets id is the filter option and name is the filter name. EX: Type = name Shorts = id
    const { id: option, name: filterName } = target;
    const options = filters[filterName];
    selected.current.value = !options[option];
    setFilters({
      ...filters,
      [filterName]: { ...options, [option]: selected.current.value }
    });
  };

  console.log('filters state', filters);

  return (
    <article>
      <section>
        <div className={styles.filterContainer}>
          {Object.keys(testFilters).map((filterName) => {
            const filterOptions = Object.keys(testFilters[filterName]);
            return (
              <FilterComponent
                key={filterName}
                fieldName={filterName}
                id={filterName}
                options={filterOptions}
                value={selected.current.value}
                onChange={onChange}
              />
            );
          })}
        </div>
      </section>
    </article>
  );
};

export default FilterComponentExample;
