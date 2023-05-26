import React, { useState, useRef } from 'react';
import {
  Box, ClickAwayListener, CardContent, Card, Button,
  ButtonGroup, RadioGroup, Radio, FormControlLabel
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import styles from '../checkout-page/forms/DeliveryAddress.module.css';
import FormItem from '../form/FormItem';
import constants from '../../utils/constants';
import {
  validateFlatRate, validatePercentRate, validateTitle, emptyFieldCheck, savePromoCode
} from './CreatePromoService';
// import FormItemDropdown from '../form/FormItemDropdown';
import Toast from '../toast/Toast';
/**
 * @name useStyles
 * @description Material-ui styling for PromoCode component
 * @return styling
 */
const useStyles = makeStyles(() => ({
  root: {
    width: '65em'
  },
  box: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  }
}));

/**
 * @CreatePromoModal
 * @description Component to submit new Promotional Codes to the database
 * @return Modal Component
 */
const CreatePromoModal = React.forwardRef((props, ref) => {
  const { setToastSuccessData } = props;
  const { openToastSuccess } = props;
  const { onClose } = props;
  const { setApiError } = props;
  const [promoData, setPromoData] = useState({ type: '' });
  const [emptyFieldErrors, setEmptyFieldErrors] = useState([]);
  const [invalidErrors, setInvalidErrors] = useState([]);
  const [toastOpen, setToastOpen] = useState(false);
  const [toastData, setToastData] = useState({
    MESSAGE: '',
    SEVERITY: constants.SEVERITY_LEVELS.INFO
  });

  const classes = useStyles();
  const titleIsValid = useRef(false);
  const rateIsValid = useRef(false);
  const formHasError = useRef(false);

  const closeToast = () => {
    setToastOpen(false);
  };

  const handleChange = (e) => {
    setPromoData({ ...promoData, [e.target.id]: e.target.value });
    closeToast();
  };
  const handleRadioChange = (e) => {
    setPromoData({ ...promoData, type: e.target.value });
    closeToast();
  };

  // Force capitalized Characters on title
  const handleTitleChangeForceCap = (e) => {
    const titleValue = (e.target.value.toUpperCase());
    setPromoData({ ...promoData, title: titleValue });
  };

  const getFormErrors = () => {
    // reset errors
    formHasError.current = false;

    titleIsValid.current = validateTitle(promoData.title);
    if (promoData.type === 'FLAT') {
      rateIsValid.current = validateFlatRate(promoData.rate);
    }
    if (promoData.type === 'PERCENT') {
      rateIsValid.current = validatePercentRate(promoData.rate);
    }
    if (emptyFieldErrors.current.length) {
      setEmptyFieldErrors([...emptyFieldErrors.current]);
      formHasError.current = true;
    }

    if (!titleIsValid.current) {
      setInvalidErrors((prev) => [...prev, 'title']);
      formHasError.current = true;
    }
    if (!rateIsValid.current) {
      setInvalidErrors((prev) => [...prev, 'rate']);
      formHasError.current = true;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    closeToast();
    setInvalidErrors([]);
    setEmptyFieldErrors([]);

    emptyFieldErrors.current = emptyFieldCheck(promoData);
    getFormErrors();

    if (!formHasError.current) {
      const newPromoCode = await savePromoCode(promoData, setApiError);
      if (newPromoCode.success) {
        setToastSuccessData({ MESSAGE: `${promoData.title} has been saved succesfully!`, SEVERITY: constants.SEVERITY_LEVELS.SUCCESS });
        openToastSuccess(true);
        onClose();
        return true;
      }
      setToastData({ MESSAGE: `${promoData.title} was not saved due to server error. This most likely is becuase ${promoData.title} may have already been used.`, SEVERITY: constants.SEVERITY_LEVELS.ERROR });
      setToastOpen(true);
      return false;
    }
    setToastData({ MESSAGE: 'Please Correct errors on highlighted fields -- All fields are required ', SEVERITY: constants.SEVERITY_LEVELS.ERROR });
    setToastOpen(true);
    return false;
  };
  const errors = `${invalidErrors} ${emptyFieldErrors}`;

  return (
    <ClickAwayListener onClickAway={onClose}>
      <Box
        ref={{ ref }}
        className={classes.box}
        display="flex"
        justifyContent="flex-end"
        alignItems="flex-end"
      >
        <Card className={classes.root}>
          <div className={styles.CardContainer}>
            <h2>Create Promo Code</h2>
            <Toast
              message={toastData.MESSAGE}
              open={toastOpen}
              handleClose={closeToast}
              severity={toastData.SEVERITY}
              horizontalPosition="center"
            />
            <CardContent>
              <FormItem
                placeholder="e.g. SUMMER2023"
                id="title"
                type="text"
                label={(emptyFieldErrors.includes('title') && (`Title - ${constants.EMPTY_FIELD}`))
                  || (invalidErrors.includes('title') && constants.PROMO_TITLE_INVALID)
                  || 'Title'}
                onChange={handleTitleChangeForceCap}
                value={promoData.title}
                className={errors && errors.includes('title') && styles.invalidField}
                onClickAway={handleChange}
              />
              <br />
              <FormItem
                placeholder="e.g. Summer Sale"
                id="description"
                type="text"
                label={(emptyFieldErrors.includes('description') && (`Description - ${constants.EMPTY_FIELD}`))
                  || 'Description'}
                onChange={handleChange}
                value={promoData.description}
                className={errors && errors.includes('description') && styles.invalidField}
              />
              <br />
              <FormItem
                placeholder="e.g. 06/21/2023"
                id="startDate"
                type="date"
                label={(emptyFieldErrors.includes('startDate') && (`Start Date - ${constants.EMPTY_FIELD}`))
                  || 'Start Date'}
                onChange={handleChange}
                value={promoData.start_date}
                className={errors && errors.includes('startDate') && styles.invalidField}
              />
              <br />
              <FormItem
                placeholder="e.g. 09/20/2023"
                id="endDate"
                type="date"
                label={(emptyFieldErrors.includes('endDate') && (`End Date - ${constants.EMPTY_FIELD}`))
                  || 'End Date'}
                onChange={handleChange}
                value={promoData.end_date}
                className={errors && errors.includes('endDate') && styles.invalidField}
              />
              <br />
              <FormItem
                placeholder="e.g. 25"
                id="rate"
                type="text"
                label={(emptyFieldErrors.includes('rate') && (`Rate - ${constants.EMPTY_FIELD}`))
                  || (invalidErrors.includes('rate') && constants.PROMO_RATE_INVALID)
                  || 'Rate'}
                onChange={handleChange}
                value={promoData.rate}
                className={errors && errors.includes('rate') && styles.invalidField}
              />
              <br />
              <RadioGroup
                row
                value={promoData.type}
                onChange={handleRadioChange}
                id="type"
                label="Rate Type"
                className={styles.invalidRateField}
              >
                <FormControlLabel
                  value="FLAT"
                  label="Flat"
                  id="type"
                  control={(errors.includes('type') && <Radio style={{ color: 'red', backgroundColor: 'white' }} />) || <Radio style={{ color: 'green', backgroundColor: 'white' }} />}
                  labelPlacement="bottom"
                />
                <FormControlLabel
                  value="PERCENT"
                  control={(errors.includes('type') && <Radio style={{ color: 'red', backgroundColor: 'white' }} />) || <Radio style={{ color: 'green', backgroundColor: 'white' }} />}
                  label="Percent"
                  id="type"
                  labelPlacement="bottom"
                />
              </RadioGroup>
              <br />
              <ButtonGroup row="true" style={{ display: 'flex', justifyContent: 'right' }} float="right">
                <Button
                  style={{ backgroundColor: '#395aa1', color: 'white', borderRadius: 20 }}
                  disabled={false}
                  size="small"
                  variant="contained"
                  onClick={handleSubmit}
                >
                  save
                </Button>
                <p />
                <Button
                  style={{
                    backgroundColor: '#395aa1', color: 'white', borderRadius: 20
                  }}
                  disabled={false}
                  size="small"
                  variant="contained"
                  onClick={onClose}
                >
                  exit
                </Button>
              </ButtonGroup>
            </CardContent>
          </div>
        </Card>
      </Box>
    </ClickAwayListener>
  );
});
export default CreatePromoModal;
