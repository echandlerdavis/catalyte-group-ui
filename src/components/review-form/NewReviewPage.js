import React, { useState, useRef } from 'react';
import { Box, Typography } from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import AppAlert from '../alert/Alert';
import constants, { SEVERITY_LEVELS } from '../../utils/constants';
import FormItem from '../form/FormItem';
import { saveReview } from './ReviewPageService';

const NewReviewPage = ({
  productId,
  setApiError,
  setToastData,
  openToast,
  history,
  user,
  isLoggedIn,
  hasMadePurchase
}) => {
  const date = new Date();
  const reviewDate = date.toISOString().split('T')[0];

  // const [userErrorMessage, setUserErrorMessage] = useState('');

  const initialFormData = {
    title: '',
    rating: '',
    review: '',
    createdAt: reviewDate,
    userName: '{user.firstName} {user.lastName}',
    userEmail: user.email
  };

  const [formData, setFormData] = useState(initialFormData);
  const [formErrorMessage, setFormErrorMessage] = useState(null);
  const formHasError = useRef(false);
  const emptyFields = useRef([]);
  const ratingIsInvalid = useRef(false);

  const getEmptyFields = () => {
    Object.keys(formData).filter((key) => {
      let formInput = formData[key];
      if (typeof formInput === 'string') {
        formInput = formInput.trim();
      }
      return formInput.length === 0;
    });
  };

  const validateRating = () => {
    const { rating } = formData;
    return (rating && rating >= 0.5 && rating <= 5);
  };

  const validateFormData = () => {
    emptyFields.current = getEmptyFields();
    ratingIsInvalid.current = validateRating();
    if (emptyFields.current.length || ratingIsInvalid.current) {
      formHasError.current = true;
    } else {
      formHasError.current = false;
    }
  };

  const generateError = () => {
    setFormErrorMessage(null);
    validateFormData();
    let errorMessage = null;
    if (emptyFields.current.length) {
      errorMessage = constants.FORM_FIELDS_EMPTY(emptyFields.current);
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
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    generateError();
    if (!formHasError.current) {
      const newReview = await saveReview(formData, setApiError, productId);
      if (newReview) {
        // setReviews((reviews) => [...reviews, newReview]);
        setToastData(constants.SAVE_REVIEW_SUCCESS);
        history.push('/');
      } else {
        setToastData(constants.SAVE_REVIEW_FAILURE);
      }
      openToast();
    }
  };

  if (!isLoggedIn || !hasMadePurchase) {
    // return (
    //   <AppAlert severity={SEVERITY_LEVELS.ERROR} title="Error"
    // message="userErrorMessage placeolder" />
    // );
    console.log('not working');
    console.log(SEVERITY_LEVELS.ERROR);
  }

  return (
    <>
      <h2>New Review</h2>
      {formHasError.current && <AppAlert severity="error" title="Error" message={formErrorMessage} />}
      <form onSubmit={handleSubmit}>
        <FormItem
          placeholder="Review Title"
          type="text"
          id="title"
          label="Title"
          onChange={handleFormChange}
          value={formData.title}
        />
        {/* Name of user (Just typography, I think) */}
        <Box component="fieldset" mb={3} borderColor="transparent">
          <Typography component="legend">Rating</Typography>
          <Rating name="pristine" defaultValue={null} value={formData.rating} precision={0.5} onChange={handleFormChange} />
        </Box>
        <FormItem
          placeholder="Write review here"
          type="text"
          id="content"
          onChange={handleFormChange}
          value={formData.review}
        />
      </form>
    </>
  );
};

export default NewReviewPage;
