import React from 'react';

const FilterContext = React.createContext();

/**
 * Filter object:
 * key: product property name
 * value: list of values for filter to return
 *
 * @param {} state
 * @param {*} action
 * @returns
 */

function filterReducer(currentFilters, action) {
  const { prop, values } = action;
  const newFilters = currentFilters;
  console.log('values: ', values);
  switch (action.type) {
    case 'add': {
      newFilters[prop] = [...values];
      return newFilters;
    }
    case 'clear': {
      return {};
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function FilterProvider({ children }) {
  const initialFilter = {
    filter: {},
    setFilter: () => {}
  };
  const [currentFilters, dispatch] = React.useReducer(filterReducer, initialFilter);
  const filter = { currentFilters, dispatch };

  return (
    <FilterContext.Provider value={filter}>
      {children}
    </FilterContext.Provider>
  );
}

function useFilter() {
  const context = React.useContext(FilterContext);
  if (context === undefined) {
    throw new Error();
  }

  return context;
}

export { FilterProvider, useFilter, filterReducer };
