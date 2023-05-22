import React from 'react';
import {
  Box, ClickAwayListener, CardContent, Card, Button, RadioGroup, FormControlLabel, Radio
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import styles from '../product-card/ProductCard.module.css';
import FormItem from '../form/FormItem';

/**
 * @name useStyles
 * @description Material-ui styling for ProductCard component
 * @return styling
 */
const useStyles = makeStyles(() => ({
  root: {
    width: '65em'
  },
  media: {
    height: 0,
    paddingTop: '56.25%',
    margin: '1em'
  },
  header: {
    height: 5
  },
  box: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  },
  FormItem: {
    paddingLeft: '5px'
  },
  h2: {
    paddingBottom: '0px'
  }
}));

const CreatePromoModal = React.forwardRef((props, ref) => {
  // const { promoCode } = props;
  const { onClose } = props;
  //   const { promoData } = props;
  const { handleSubmit } = props;

  // toast stuff for errors
  //   const [open, setOpenToast] = useState(false);
  const classes = useStyles();

  const [value, setValue] = React.useState('');

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  //   const onTitleChange = (event) => {
  //     setText()
  //   }

  return (
    <ClickAwayListener onClickAway={onClose}>
      <Box ref={{ ref }} className={classes.box}>
        <Card className={classes.root}>
          <div className={styles.CardContainer}>
            <h2>Create Promo Code</h2>
            <CardContent>
              <FormItem
                placeholder="e.g. SUMMER2023"
                id="title"
                type="text"
                label="Title"
                autoCapitalize="characters"
                onChange={(event) => setValue(event.target.value.toUpperCase())}
                value={value}
              />
              <br />
              <FormItem
                placeholder="e.g. Summer Sale"
                id="description"
                type="text"
                label="Description"
                // onChange={onChange}
                // value={promoData.description}
              />
              <br />
              <FormItem
                placeholder="e.g. 25"
                id="rate"
                type="text"
                label="Rate"
                // onChange={onChange}
                // value={promoData.rate}
              />
              <RadioGroup
                row
                name="Rate Type"
                label="Rate Type"
                onChange={handleChange}
                value={value}
              >
                <FormControlLabel value={0} control={<Radio />} label="Flate Rate" />
                <FormControlLabel value={1} control={<Radio />} label="Percentage Rate" />
              </RadioGroup>
              <br />
              <FormItem
                placeholder="e.g. 06/21/2023"
                id="Start Date"
                type="text"
                label="Start Date"
                // onChange={onChange}
                // value={promoData.startDate}
              />
              <br />
              <FormItem
                placeholder="e.g. 09/20/2023"
                type="text"
                label="End Date"
                // onChange={onChange}
                // value={promoData.endDate}
              />
              <br />
              <Button
                style={{ backgroundColor: '#395aa1', color: 'white', borderRadius: 20 }}
                disabled={false}
                size="small"
                variant="contained"
                onClick={handleSubmit}
              >
                save
              </Button>
            </CardContent>
          </div>
        </Card>
      </Box>
    </ClickAwayListener>
  );
});
export default CreatePromoModal;
