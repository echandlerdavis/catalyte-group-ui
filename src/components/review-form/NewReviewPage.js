import React, {
  useState, useRef, useMemo
} from 'react';
import {
  Box, Button
} from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import { Cancel, Save } from '@material-ui/icons';
import { useHistory, useParams } from 'react-router-dom';
import AppAlert from '../alert/Alert';
import constants, { SEVERITY_LEVELS } from '../../utils/constants';
import FormItem from '../form/FormItem';
import { saveReview, fetchUserAndFormData, fetchPurchases } from './ReviewPageService';
import { parseCookies } from '../profile-page/ProfilePageService';
import styles from './ReviewPage.module.css';

const NewReviewPage = () => {
  const date = new Date();
  const reviewDate = date.toISOString().split('T')[0];
  const { productId } = useParams();
  const history = useHistory();
  const initialFormData = {
    title: '',
    rating: 2.5,
    review: '',
    createdAt: reviewDate,
    userName: '',
    userEmail: ''
  };

  const [formData, setFormData] = useState(initialFormData);
  const [user, setUser] = useState(null);
  const [apiError, setApiError] = useState(false);
  const [reviewApiError, reviewSetApiError] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hasMadePurchase, setHasMadePurchase] = useState(false);
  // const [toastData, setToastData] = useState('');
  // const [openToast, setOpenToast] = useState(false);
  // const [userErrorMessage, setUserErrorMessage] = useState('');

  const [formErrorMessage, setFormErrorMessage] = useState(null);
  const formHasError = useRef(false);
  const inputsAreInvalid = useRef(false);
  const ratingIsInvalid = useRef(false);

  // Checks if user is logged in
  useMemo(() => {
    const cookies = parseCookies();
    const cookiesUser = cookies.user ? JSON.parse(cookies.user) : null;
    if (sessionStorage.length !== 0 && cookiesUser) {
      setIsLoggedIn(true);
      fetchUserAndFormData(cookiesUser.email, setUser, setFormData, formData, setApiError);
    } else {
      setIsLoggedIn(false);
      setUser(null); // Clear the user data
    }
  }, [setApiError, setUser, setFormData, formData]);

  useMemo(() => {
    if (isLoggedIn && user) {
      console.log(user);
      fetchPurchases(user.email, setHasMadePurchase, setApiError, productId);
      console.log(apiError);
      console.log(hasMadePurchase);
      console.log(reviewApiError);
    }
  }, [
    isLoggedIn,
    setApiError,
    user,
    setHasMadePurchase,
    productId,
    apiError,
    hasMadePurchase,
    reviewApiError
  ]);

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
      const newReview = await saveReview(formData, reviewSetApiError, productId);
      if (newReview) {
        // setToastData(constants.SAVE_REVIEW_SUCCESS);
        history.push('/');
      } else {
        // setToastData(constants.SAVE_REVIEW_FAILURE);
      }
      // openToast();
    }
  };

  // if (!isLoggedIn || !hasMadePurchase) {
  //   console.log(reviewApiError);
  //   return (
  //     <AppAlert
  //       severity={SEVERITY_LEVELS.ERROR}
  //       title="Error"
  //       message="userErrorMessage placeolder"
  //     />
  //   );
  // }

  return (
    <>
      <h2>
        New Review
      </h2>
      {(formHasError.current || apiError) && <AppAlert severity={SEVERITY_LEVELS.ERROR} title="Error" message={formErrorMessage} />}
      <form onSubmit={handleSubmit}>
        <div className={styles.ratingContainer}>
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
        </div>
        <div>
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
