import HttpHelper from '../../utils/HttpHelper';
import Constants, { SEVERITY_LEVELS } from '../../utils/constants';

const fetchReviews = async (setReviews, setApiError, productId) => {
  await HttpHelper(Constants.REVIEWS_ENDPOINT(productId), 'GET')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(Constants.API_ERROR);
    })
    .then(setReviews)
    .catch(() => {
      setApiError(true);
    });
};

export const deleteReview = (review, user, setMessage, displayMessage) => {
  const toastDataHarness = { MESSAGE: '', SEVERITY: SEVERITY_LEVELS.INFO };
  const messagesDict = {
    204: 'Review deleted',
    404: 'ERROR: review does not exist',
    403: 'ERROR: you do not have permission to delete review'
  };
  HttpHelper(`/reviews/${review.id}/email/${user.email}`, 'DELETE')
    .then((response) => {
      toastDataHarness.reviewId = review.id;
      if (response.status in messagesDict) {
        toastDataHarness.MESSAGE = messagesDict[response.status];
        if (response.status < 300) {
          toastDataHarness.SEVERITY = SEVERITY_LEVELS.SUCCESS;
        } else {
          toastDataHarness.SEVERITY = SEVERITY_LEVELS.ERROR;
        }
        setMessage(toastDataHarness);
        displayMessage(true);
        return;
      }
      throw new Error(`Response code ${response.status} not implemented.`);
    })
    .catch((e) => {
    // if error, display error
      toastDataHarness.MESSAGE = e.message;
      toastDataHarness.SEVERITY = SEVERITY_LEVELS.ERROR;
      setMessage(toastDataHarness);
      displayMessage(true);
    });
};

export default fetchReviews;
