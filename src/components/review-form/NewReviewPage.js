import React, { useState, useEffect } from 'react';
import { fetchUser, parseCookies } from '../profile-page/ProfilePageService';
import AppAlert from '../alert/Alert';
import { SEVERITY_LEVELS } from '../../utils/constants';
import { Box, Typography } from '@material-ui/core'
import FormItem from '../form/FormItem';

const NewReviewPage = ({ props }) => {
  const { productId } = props;
  const date = new Date();
  const reviewDate = date.toISOString().split('T')[0];

  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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


  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }


  return (
    <>
      <h2>New Review</h2>
      {!isLoggedIn ? (
        <AppAlert severity={SEVERITY_LEVELS.ERROR} title="Error" message="You must be logged in to write a review." />
      ) : (
        <form>
          <FormItem
          placeholder="Review Title"
          type="text"
          id="title"
          label="Title"
          onChange={handleFormChange}
          value={formData.title}
          className={errors && errors.inclueds('title' && styles.invalidField)}
           />
          {/* Name of user (Just typography, I think) */}
          <Box component="fieldset" mb={3} borderColor="transparent">
            <Typography component="legend">Rating</Typography>
            <Rating name="pristine" defaultValue={null} value={ratingValue} precision={0.5} />
          </Box>
          <FormItem />
        </form>
      )}
    </>
  );
};

export default NewReviewPage;
