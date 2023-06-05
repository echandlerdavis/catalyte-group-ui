import React, {
  useState, useRef, useEffect
} from 'react';
import {
  Box, Button, Card
} from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import { Cancel, Save } from '@material-ui/icons';
import { useHistory, useParams } from 'react-router-dom';
import AppAlert from '../alert/Alert';
import constants, { SEVERITY_LEVELS } from '../../utils/constants';
import FormItem from '../form/FormItem';
import { saveReview } from './ReviewPageService';
import styles from './ReviewPage.module.css';
import { useUser } from '../app/userContext';

const NewReviewPage = ({ product, openToast, setToastData }) => {
  const { productId } = useParams();
  const { user } = useUser();
  const date = new Date();
  const reviewDate = date.toISOString().split('T')[0];
  const history = useHistory();
  const initialFormData = user ? {
    title: '',
    rating: 2.5,
    review: '',
    createdAt: reviewDate,
    editedAt: reviewDate,
    userName: `${user.firstName} ${user.lastName}`,
    userEmail: user.email,
    isActive: true
  } : {
    title: '',
    rating: 2.5,
    review: '',
    createdAt: reviewDate,
    editedAt: reviewDate,
    userName: '',
    userEmail: '',
    isActive: true
  };

  const [formData, setFormData] = useState(initialFormData);
  const [apiError, setApiError] = useState(false);
  const [userErrorMessage, setUserErrorMessage] = useState('');
  const [formErrorMessage, setFormErrorMessage] = useState(null);
  const formHasError = useRef(false);
  const inputsAreInvalid = useRef(false);
  const commentaryLengthIsInvalid = useRef(false);
  const ratingIsInvalid = useRef(false);

  useEffect(() => {
    if (!user) {
      setUserErrorMessage('You must be logged in to write a review.');
    }
  }, [user]);

  const validateInputsNotEmpty = () => {
    const summary = formData.title;
    const commentary = formData.review;
    return (summary.trim().length === 0 && commentary.trim().length === 0);
  };

  const validateCommentaryLength = () => {
    const commentary = formData.review;
    return (commentary.trim().length > 500)
  }

  const validateRating = () => {
    const { rating } = formData;
    return !(rating && rating >= 0.5 && rating <= 5);
  };

  const validateFormData = () => {
    inputsAreInvalid.current = validateInputsNotEmpty();
    commentaryLengthIsInvalid = validateCommentaryLength();
    ratingIsInvalid.current = validateRating();
    if (inputsAreInvalid.current || ratingIsInvalid.current || commentaryLengthIsInvalid.current) {
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
    if(commentaryLengthIsInvalid.current){
      if(errorMessage){
        errorMessage = errorMessage.concat(' ** AND ** ', constants.REVIEW_FORM_COMMENTARY_LENGTH);
      }else{
        errorMessage = constants.REVIEW_FORM_COMMENTARY_LENGTH;
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
    generateError();
    if (!formHasError.current) {
      const newReview = await saveReview(formData, setApiError, productId);
      console.log(newReview);
      if (newReview && !newReview.error) {
        setToastData(constants.SAVE_REVIEW_SUCCESS);
        history.push('/');
      } else {
        setToastData(constants.SAVE_REVIEW_FAILURE);
      }
      openToast();
    }
  };

  if (!user) {
    return (
      <AppAlert
        severity={SEVERITY_LEVELS.ERROR}
        title="Error"
        message={userErrorMessage}
      />
    );
  }

  return (
    <div className={styles.pageContainer}>
      <h2>
        New Review for
        {' '}
        {product.name}
      </h2>
      {(formHasError.current || apiError) && <AppAlert severity={SEVERITY_LEVELS.ERROR} title="Error" message={formErrorMessage} />}
      <Card className={styles.formCard}>
        <form onSubmit={handleSubmit} className={styles.reviewForm}>

          <div className={styles.inputFields}>
            <FormItem
              placeholder="Review Summary"
              type="text"
              id="title"
              label="Summary:"
              onChange={handleFormChange}
              value={formData.title}
            />
            <FormItem
              placeholder="Write commentary here"
              id="review"
              type="textarea"
              label="Commentary:"
              onChange={handleFormChange}
              value={formData.review}
            />
          </div>

          <div className={styles.ratingContainer}>
            <Box component="fieldset" mb={3} borderColor="transparent">
              <FormItem
                name="rating"
                type="number"
                label="Rating:"
                value={formData.rating}
                hidden
              />
              <Rating
                name="rating"
                value={Number(formData.rating)}
                precision={0.5}
                onChange={handleFormChange}
                size="large"
              />
            </Box>
          </div>

          <div className={styles.buttonContainer}>
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
        </form>
      </Card>
    </div>
  );
};

export default NewReviewPage;
