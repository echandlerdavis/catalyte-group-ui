import React, { useState, useRef, useEffect } from 'react';
import { Box } from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import { useHistory, useParams } from 'react-router-dom';
import AppAlert from '../alert/Alert';
import constants, { SEVERITY_LEVELS } from '../../utils/constants';
import FormItem from '../form/FormItem';
import { saveReview, fetchPurchases, fetchUser } from './ReviewPageService';
import { parseCookies } from '../profile-page/ProfilePageService';

const NewReviewPage = () => {
  const date = new Date();
  const reviewDate = date.toISOString().split('T')[0];
  const { productId } = useParams();
  const [apiError, setApiError] = useState(false);
  // const [toastData, setToastData] = useState('');
  // const [openToast, setOpenToast] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hasMadePurchase, setHasMadePurchase] = useState(false);
  const [user, setUser] = useState(null);
  const history = useHistory();
  // const [userErrorMessage, setUserErrorMessage] = useState('');

  // Checks if user is logged in
  useEffect(() => {
    const cookies = parseCookies();
    const cookiesUser = cookies.user ? JSON.parse(cookies.user) : null;
    if (sessionStorage.length !== 0 && cookiesUser) {
      setIsLoggedIn(true);
      fetchUser(cookiesUser.email, setUser, setApiError);
    } else {
      setIsLoggedIn(false);
      setUser(null); // Clear the user data
    }
  }, [setApiError]);

  // Checks if user has made purchase of the product.
  useEffect(() => {
    if (isLoggedIn && user) {
      const userEmail = user.email;
      fetchPurchases(userEmail, setHasMadePurchase, setApiError, productId);
    } else {
      setHasMadePurchase(false);
      // setUserErrorMessage('You must have purchased the product in order to leave a review.');
    }
  }, [isLoggedIn, productId, setApiError, user]);

  const initialFormData = {
    title: '',
    rating: 2.5,
    review: '',
    createdAt: reviewDate,
    userName: '',
    userEmail: ''
  };

  const [formData, setFormData] = useState(initialFormData);
  const [formErrorMessage, setFormErrorMessage] = useState(null);
  // Rating hover functionality
  // const [ratingValue, setRatingValue] = useState(0);
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
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
      <h2>New Review</h2>
      {(formHasError.current || apiError) && <AppAlert severity="error" title="Error" message={formErrorMessage} />}
      <form onSubmit={handleSubmit}>
        <FormItem
          placeholder="Review Title"
          type="text"
          name="title"
          label="Title"
          onChange={handleFormChange}
          value={formData.title}
        />
        {/* Name of user (Just typography, I think) */}
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
          placeholder="Write review here"
          type="text"
          name="review"
          label="Review"
          onChange={handleFormChange}
          value={formData.review}
        />
      </form>
    </>
  );
};

export default NewReviewPage;
