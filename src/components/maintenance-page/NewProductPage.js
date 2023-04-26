import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import { Save, Cancel } from '@material-ui/icons';
import FormItemDataList from '../form/FormItemDataList';
import styles from './NewProductPage.module.css';
import SaveProduct from './NewProductPageService';

const NewProductPage = ({ history, setApiError }) => {
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
    releaseDate: Date.now(),
    styleNumber: '',
    globalProductCode: '',
    primaryColorCode: '#328298',
    secondaryColorCode: '#395aa1',
    active: true
  };

  const [formData, setFormData] = useState(initialFormData);

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
    releaseDate: 'datetime-local',
    styleNumber: 'text',
    globalProductCode: 'text',
    primaryColorCode: 'color',
    secondaryColorCode: 'color',
    active: 'checkbox'
  };

  const handleFormChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.id]: target.value
    });
  };

  const options = ['test1', 'test2'];

  const handleSubmit = (e) => {
    e.preventDefault();
    SaveProduct(formData, setApiError, history);
  };

  return (
    <section>
      <h2>New Product</h2>
      <form className="Card" onSubmit={(e) => handleSubmit(e)}>
        <div className={styles.fieldContainer}>
          {Object.keys(formInputTypes).map((attribute) => (
            <FormItemDataList
              onChange={handleFormChange}
              value={formData[attribute]}
              id={attribute}
              type={formInputTypes[attribute]}
              label={attribute}
              options={options}
            />
          ))}
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
