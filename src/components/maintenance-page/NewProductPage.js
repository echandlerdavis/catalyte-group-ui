import React, { useEffect, useState } from 'react';
import { Button } from '@material-ui/core';
import { Save, Cancel } from '@material-ui/icons';
import FormItemDataList from '../form/FormItemDataList';
import FormItem from '../form/FormItem';
import styles from './NewProductPage.module.css';
import {
  SaveProduct,
  GetProductBrands,
  GetProductCategories,
  GetProductDemographics,
  GetProductMaterials,
  GetProductTypes,
  GetProductPrimaryColors,
  GetProductSecondaryColors
} from './NewProductPageService';
import AppAlert from '../alert/Alert';

const NewProductPage = ({ history, setApiError }) => {
  const date = new Date();
  const initialReleaseDate = date.toISOString().split('T')[0];

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
  const [formError, setFormError] = useState(false);
  const [emptyFields, setEmptyFields] = useState();
  const [priceIsInvalid, setPriceIsInvalid] = useState(false);
  const [distinctAttributes, setDistinctAtrributes] = useState();

  const loadProductAttributeOptions = () => {
    GetProductBrands(setApiError, setDistinctAtrributes);
    GetProductCategories(setApiError, setDistinctAtrributes);
    GetProductDemographics(setApiError, setDistinctAtrributes);
    GetProductMaterials(setApiError, setDistinctAtrributes);
    GetProductTypes(setApiError, setDistinctAtrributes);
    GetProductPrimaryColors(setApiError, setDistinctAtrributes);
    GetProductSecondaryColors(setApiError, setDistinctAtrributes);
  };

  useEffect(() => {
    loadProductAttributeOptions();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const handleFormChange = ({ target }) => {
    let { value } = target;
    if (target.type === 'checkbox') {
      value = !formData[target.id];
    }
    setFormData({
      ...formData,
      [target.id]: value
    });
  };

  const validateFieldsNotEmpty = () => (
    Object.keys(formData).filter((key) => formData[key].length === 0)
  );

  const validatePriceTwoDecimals = () => {
    const priceArray = formData.price.split('.');
    return (priceArray.length !== 2 || priceArray[1].length !== 2);
  };

  const validateFormData = () => {
    const fieldsEmpty = validateFieldsNotEmpty();
    const priceInvalid = validatePriceTwoDecimals();
    return { fieldsEmpty, priceInvalid };
  };

  const generateError = () => {
    const { fieldsEmpty, priceInvalid } = validateFormData();
    if (fieldsEmpty.length) {
      const emptyFieldsString = fieldsEmpty.join(', ');
      setFormError(`The following fields can not be null: ${emptyFieldsString}`);
      setEmptyFields(fieldsEmpty);
    }
    if (priceInvalid) {
      setFormError((prev) => `${prev} AND Price must be a number with two decimals`);
      setPriceIsInvalid(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    generateError();
    if (formError.length === 0) {
      SaveProduct(formData, setApiError, history);
    }
  };

  return (
    <section>
      <h2>New Product</h2>
      {formError && <AppAlert severity="error" title="Error" message={formError} />}
      <form className="Card" onSubmit={(e) => handleSubmit(e)}>
        <div className={styles.fieldContainer}>
          {Object.keys(formInputTypes).map((attribute) => {
            let styleClass = null;
            if (emptyFields && emptyFields.includes(attribute)) {
              styleClass = styles.invalidField;
            }
            if (attribute === 'price' && priceIsInvalid) {
              styleClass = styles.invalidField;
            }
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
          })}
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
