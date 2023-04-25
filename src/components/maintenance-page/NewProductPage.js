import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import { Save, Cancel } from '@material-ui/icons';
import FormItem from '../form/FormItem';
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
    primaryColorCode: '',
    secondaryColorCode: '',
    styleNumber: '',
    globalProductCode: '',
    active: true
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleFormChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.id]: target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    SaveProduct(formData, setApiError);
    // history.push('/maintenace');
  };

  return (
    <section>
      <h2>New Product</h2>
      <form className="Card" onSubmit={(e) => handleSubmit(e)}>
        <div className={styles.fieldContainer}>
          {Object.keys(initialFormData).map((attribute) => (
            <FormItem
              onChange={handleFormChange}
              value={formData[attribute]}
              id={attribute}
              label={attribute}
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
