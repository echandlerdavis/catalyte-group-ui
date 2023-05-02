import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@material-ui/core';
import { Save, Cancel } from '@material-ui/icons';
import FormItemDataList from '../form/FormItemDataList';
import FormItem from '../form/FormItem';
import styles from './NewProductPage.module.css';
import { GetAllDistinctLists, SaveProduct } from './NewProductPageService';
import AppAlert from '../alert/Alert';
import constants from '../../utils/constants';

/**
 * @name NewProductPage
 * @description component displays a form to create a new product
 * @param history the browser history
 * @param setApiError the setter function to set state of an API error for an api call
 * @param setToastData the setter function that sets the data to be displayed in the toast component
 * @param openToast the function that initializes the toast
 * @returns JSX element, form with fields for product data
 */
const NewProductPage = ({
  history, setApiError, setToastData, openToast, setProducts
}) => {
  const date = new Date();
  // Get today's date in format "YYYY-MM-DD"
  const initialReleaseDate = date.toISOString().split('T')[0];

  // Declare initial form field values
  const initialFormData = {
    brand: '',
    imageSrc: '',
    material: '',
    price: '',
    quantity: '',
    name: '',
    description: '',
    demographic: '',
    category: '',
    type: '',
    releaseDate: initialReleaseDate,
    styleNumber: '',
    globalProductCode: '',
    primaryColorCode: '#328298',
    secondaryColorCode: '#395aa1',
    active: true
  };

  const [formData, setFormData] = useState(initialFormData);
  const [formErrorMessage, setFormErrorMessage] = useState(null);
  const [distinctAttributes, setDistinctAtrributes] = useState({});
  const formHasError = useRef(false);
  const emptyFields = useRef([]);
  const priceIsInvalid = useRef(false);

  useEffect(() => {
    GetAllDistinctLists(setApiError, setDistinctAtrributes);
  }, [setApiError]);

  // Declare input types for the product attribute fields
  const formInputTypes = {
    brand: 'text',
    imageSrc: 'text',
    material: 'text',
    price: 'number',
    quantity: 'number',
    name: 'text',
    description: 'text',
    demographic: 'text',
    category: 'text',
    type: 'text',
    releaseDate: 'date',
    styleNumber: 'text',
    globalProductCode: 'text',
    primaryColorCode: 'color',
    secondaryColorCode: 'color',
    active: 'checkbox'
  };

  // Validation functions for form fields

  /**
   * Generates a list of empty fields
   * @returns array of field names that are empty
   */
  const getFieldsNotEmpty = () => (
    Object.keys(formData).filter((key) => formData[key].length === 0)
  );

  /**
   * Validates price has 2 digits after decimal
   * @returns {boolean}
   */
  const validatePriceTwoDecimals = () => {
    const priceArray = formData.price.split('.');
    return (priceArray.length !== 2 || priceArray[1].length !== 2);
  };

  /**
   * Calls empty field list generator and price validator
   * reassigns the current reference value for the form error boolean
   */
  const validateFormData = () => {
    emptyFields.current = getFieldsNotEmpty();
    priceIsInvalid.current = validatePriceTwoDecimals();
    if (emptyFields.current.length || priceIsInvalid.current) {
      formHasError.current = true;
    } else {
      formHasError.current = false;
    }
  };

  /**
   * Generates the error message based on the form errors present
   */
  const generateError = () => {
    // Start with blank form error message to remove previous errors
    setFormErrorMessage(null);
    validateFormData();
    // If fields are empty get list with empty fields and join the list in a string
    if (emptyFields.current.length) {
      setFormErrorMessage(constants.FORM_FIELDS_EMPTY(emptyFields.current));
    }
    if (priceIsInvalid.current) {
      const errorMessage = constants.PRODUCT_FORM_INVALID_PRICE;
      // if the price is invalid check the form error message has the set empty fields string
      setFormErrorMessage((prev) => {
        if (prev) {
          return prev.concat(' AND ', errorMessage);
        }
        return errorMessage;
      });
    }
  };

  /**
   * Function that handles form input changes
   * @param {EventTarget} target the target the triggered the event
   */
  const handleFormChange = ({ target }) => {
    let { value } = target;
    const { type, id } = target;
    // If targe input was a checkbox set the value to be opposite of its current value
    if (type === 'checkbox') {
      value = !formData[id];
    }
    // Update form data with the targets new value
    setFormData({
      ...formData,
      [id]: value
    });
  };

  /**
   * Function handles when form is submitted
   * Generates the errors and saves the product if no errors present
   * @param {Event} e
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    generateError();
    if (!formHasError.current) {
      SaveProduct(formData, setApiError, setProducts);
      history.push('/maintenance');
      setToastData(constants.SAVE_PRODUCT_SUCCESS);
      openToast();
    }
  };

  return (
    <section>
      <h2>New Product</h2>
      {formHasError.current && <AppAlert severity="error" title="Error" message={formErrorMessage} />}
      <form className="Card" onSubmit={(e) => handleSubmit(e)}>
        <div className={styles.fieldContainer}>
          { // Map the form inputs to form items
          Object.keys(formInputTypes).map((attribute) => {
            let styleClass = null;
            // If the form attribute is listed as an empty field when errors are generated...
            // Change the style of the input box
            if (emptyFields.current.length && emptyFields.current.includes(attribute)) {
              styleClass = styles.invalidField;
            }
            // If the price is invalid change its input box style to an invalid field style
            if (attribute === 'price' && priceIsInvalid.current) {
              styleClass = styles.invalidField;
            }
            // If the attribute has a distinct list of options map to an input with data list
            if (distinctAttributes && Object.keys(distinctAttributes).includes(attribute)) {
              return (
                <FormItemDataList
                  key={attribute}
                  onChange={handleFormChange}
                  value={formData[attribute]}
                  id={attribute}
                  type={formInputTypes[attribute]}
                  label={attribute}
                  options={distinctAttributes[attribute]}
                  className={styleClass}
                />
              );
            }
            // Else return a regular form item
            return (
              <FormItem
                key={attribute}
                onChange={handleFormChange}
                value={formData[attribute]}
                id={attribute}
                type={formInputTypes[attribute]}
                label={attribute}
                className={styleClass}
              />
            );
          })
          }
          <div className={styles.formButtonContainer}>
            <Button
              type="button"
              startIcon={<Cancel />}
              onClick={() => history.goBack()}
              variant="outlined"
              style={{
                backgroundColor: '#e99393',
                borderColor: '#b00c00',
                color: '#b00c00',
                borderRadius: 20
              }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="outlined"
              startIcon={<Save />}
              style={{
                backgroundColor: '#b0e5b0',
                borderColor: '#2f662f',
                color: '#2f662f',
                borderRadius: 20
              }}
            >
              Submit
            </Button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default NewProductPage;
