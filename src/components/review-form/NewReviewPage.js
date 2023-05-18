import React, { useState, useEffect, useRef } from 'react';
import { fetchUser, parseCookies } from '../profile-page/ProfilePageService';
import AppAlert from '../alert/Alert';
import constants, { SEVERITY_LEVELS } from '../../utils/constants';
import { Box, Typography } from '@material-ui/core'
import FormItem from '../form/FormItem';
import { saveReview } from './ReviewPageService';

const NewReviewPage = ({ props }) => {
  const { productId, setApiError, setToastData, openToast, setReviews, history} = props;
  const date = new Date();
  const reviewDate = date.toISOString().split('T')[0];

  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hasMadePurchase, setHasMadePurchase] = useState(false);

  useEffect(() => {
    const cookies = parseCookies();
    const cookiesUser = cookies.user ? JSON.parse(cookies.user) : null;
    if (cookiesUser) {
      setIsLoggedIn(true);
      fetchUser(cookiesUser.email, setUser, setApiError);
    } else {
      setIsLoggedIn(false);
      setUser(null); // Clear the user data
    }
  }, []);

//TODO: figure out where setApiError is set - do we set it in this component or outside this component?
// TODO: Should the review service check if the user has made a purchase of this product or should it be validated here. 
  useEffect(() => {
    if (isLoggedIn && user){
      const userEmail = user.email;
      fetchPurchases(userEmail, setHasMadePurchase, setApiError, productId)
    }else{
      setHasMadePurchase(false);
    }
  }, [])

  const initialFormData = {
    title: '',
    rating: '',
    review: '',
    createdAt: reviewDate,
    userName: `{user.firstName} {user.lastName}`,
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
      if(typeof formInput === 'string'){
        formInput = formInput.trim()
      }
      return formInput.length === 0;
    })
  }

  const validateRating = () => {
    const { rating } = formData;
    return (rating && rating >= 0.5 && rating <= 5);
  }

  const validateFormData = () => {
    emptyFields.current = getEmptyFields();
    ratingIsInvalid.current = validateRating();
    if(emptyFields.current.length || ratingIsInvalid.current){
      formHasError.current = true;
    }else{
      formHasError.current = false;
    }
  }

  const generateError = () => {
    setFormErrorMessage(null);
    validateFormData();
    let errorMessage = null;
    if(emptyFields.current.length){
      errorMessage = constants.FORM_FIELDS_EMPTY(emptyFields.current);
    }

    if(ratingIsInvalid.current){
      if(errorMessage){
        errorMessage = errorMessage.concat(' ** AND ** ', constants.REVIEW_FORM_INVALID_RATING);
      }else{
        errorMessage = constants.REVIEW_FORM_INVALID_RATING;
      }
    }
    setFormErrorMessage(errorMessage);
  }

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    generateError();
    if(!formHasError.current){
      const newReview = await saveReview(formData, setApiError);
      if(newReview){
        setReviews((reviews) => [...reviews, newReview]);
        setToastData(constants.SAVE_REVIEW_SUCCESS);
        history.push('/');
      }else{
        setToastData(constants.SAVE_REVIEW_FAILURE);
      }
      openToast();
    }
    
  }

  return (
    <>
      <h2>New Review</h2>
      {!isLoggedIn ? (
        <AppAlert severity={SEVERITY_LEVELS.ERROR} title="Error" message="You must be logged in to write a review." />
      ) : (
        <form onSubmit={handleSubmit}>
          <FormItem
          placeholder="Review Title"
          type="text"
          id="title"
          label="Title"
          onChange={handleFormChange}
          value={formData.title}
          // className={errors && errors.includes('title') && styles.invalidField}
           />
          {/* Name of user (Just typography, I think) */}
          <Box component="fieldset" mb={3} borderColor="transparent">
            <Typography component="legend">Rating</Typography>
            <Rating name="pristine" defaultValue={null} value={formData.rating} precision={0.5} onChange={handleFormChange}/>
          </Box>
          <FormItem 
          placeholder="Write review here"
          type="text"
          id="content"
          onChange={handleFormChange}
          value={formData.review}
          // className={errors && errors.includes('review') && styles.invalidField}
          />
        </form>
      )}
    </>
  );
};

export default NewReviewPage;
