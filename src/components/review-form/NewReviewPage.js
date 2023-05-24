import React, { useState, useRef } from 'react';
import {
  Box, Button
} from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import { Cancel, Save } from '@material-ui/icons';
import { useParams } from 'react-router-dom';
import AppAlert from '../alert/Alert';
import constants, { SEVERITY_LEVELS } from '../../utils/constants';
import FormItem from '../form/FormItem';
import { saveReview } from './ReviewPageService';

const NewReviewPage = ({
  product, user, isLoggedIn, hasMadePurchase, toastData, openToast, history, apiError
}) => {
  const date = new Date();
  const reviewDate = date.toISOString().split('T')[0];
  const { productId } = useParams();
  const initialFormData = {
    title: '',
    rating: 2.5,
    review: '',
    createdAt: reviewDate,
    userName: `${user.firstName} ${user.LastName}`,
    userEmail: user.email
  };

  const [formData, setFormData] = useState(initialFormData);
  // const [apiError, setApiError] = useState(false);
  // const [toastData, setToastData] = useState('');
  // const [openToast, setOpenToast] = useState(false);
  // const [userErrorMessage, setUserErrorMessage] = useState('');


  const [formErrorMessage, setFormErrorMessage] = useState(null);
  const formHasError = useRef(false);
  const inputsAreInvalid = useRef(false);
  const ratingIsInvalid = useRef(false);

  const validateInputs = () => {
    const summary = formData.title;
    const commentary = formData.review;
    return (summary.trim().length === 0 && commentary.trim().length === 0);
  };

  const validateRating = () => {
    const { rating } = formData;
    return !(rating && rating >= 0.5 && rating <= 5);
  };

  const validateFormData = () => {
    inputsAreInvalid.current = validateInputs();
    ratingIsInvalid.current = validateRating();
    if (inputsAreInvalid.current || ratingIsInvalid.current) {
      formHasError.current = true;
    } else {
      formHasError.current = false;
    }
  };

  const generateError = () => {
    setFormErrorMessage(null);
    validateFormData();
    let errorMessage = null;
    if (inputsAreInvalid.current) {
      errorMessage = constants.REVIEW_FORM_INVALID_INPUTS;
    }
    if (ratingIsInvalid.current) {
      if (errorMessage) {
        errorMessage = errorMessage.concat(' ** AND ** ', constants.REVIEW_FORM_INVALID_RATING);
      } else {
        errorMessage = constants.REVIEW_FORM_INVALID_RATING;
      }
    }
    setFormErrorMessage(errorMessage);
  };

  const handleFormChange = (e) => {
    if (e.target.name) {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    } else {
      setFormData({ ...formData, [e.target.id]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormData({ ...formData, userEmail: user.email, userName: `${user.firstName} ${user.LastName}` });
    generateError();
    if (!formHasError.current) {
      const newReview = await saveReview(formData, setApiError, productId);
      if (newReview) {
        // setToastData(constants.SAVE_REVIEW_SUCCESS);
        history.push('/');
      } else {
        // setToastData(constants.SAVE_REVIEW_FAILURE);
      }
      // openToast();
    }
  };

  if (!isLoggedIn || !hasMadePurchase) {
    return (
      <AppAlert
        severity={SEVERITY_LEVELS.ERROR}
        title="Error"
        message="userErrorMessage placeolder"
      />
    );
  }

  return (
    <>
      <h2>New Review for {product.name}</h2>
      {(formHasError.current || apiError) && <AppAlert severity={SEVERITY_LEVELS.ERROR} title="Error" message={formErrorMessage} />}
      <form onSubmit={handleSubmit}>
        <div>
          <Box component="fieldset" mb={3} borderColor="transparent">
            <input
              name="rating"
              type="number"
              value={formData.rating}
              hidden
              readOnly
            />
            <Rating
              name="rating"
              value={Number(formData.rating)}
              label="Rating"
              precision={0.5}
              onChange={handleFormChange}
            />
          </Box>
          <FormItem
            placeholder="Review Title"
            type="text"
            id="title"
            label="Summary"
            onChange={handleFormChange}
            value={formData.title}
          />
          <FormItem
            placeholder="Write review here"
            type="text"
            id="review"
            label="Commentary"
            onChange={handleFormChange}
            value={formData.review}
          />
          <div>
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
    </>
  );
};

export default NewReviewPage;
