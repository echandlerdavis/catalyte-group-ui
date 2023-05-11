import React, { useState, useRef, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import Box from '@material-ui/core/Box';
import { ClickAwayListener, TextField } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import Constants from '../../utils/constants';
import { useCart } from '../checkout-page/CartContext';
import styles from './ProductCard.module.css';
import { validateOrder, inOrder } from './ProductCard';
import Toast from '../toast/Toast';
import updateLastActive from '../../utils/UpdateLastActive';
import Reviews from '../reviews/Reviews';

/**
 * @name useStyles
 * @description Material-ui styling for ProductCard component
 * @return styling
 */
const useStyles = makeStyles((theme) => ({
  root: {
    width: '50em',
    height: '45em',
    overflowY: 'scroll'
  },
  media: {
    height: 0,
    paddingTop: '56.25%',
    margin: '1em'
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: 'rotate(180deg)'
  },
  header: {
    minHeight: 100
  },
  box: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    overflow: 'hidden'
  },
  colorSpan: {
    display: 'inline-flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 2
  },
  colorLabel: {
    alignSelf: 'flex-start',
    flexBasis: '28%',
    marginRight: '1em'
  },
  quantityInput: {
    width: '3em',
    margin: '1em',
    alignSelf: 'flex-end'
  },
  actionsFormatting: {
    display: 'inline-flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-end'
  },
  cartInfo: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
}));
/**
   * Reads the color of a product and returns component with the color as the background
   * Please note that inline style was needed in order to override MUI table cell styles
   * @param {string} hexColor products color as hexColor string
   * @returns div element
   */
const colorDot = (hexColor) => (
  <div style={{
    backgroundColor: hexColor,
    color: hexColor === '#ffffff' ? 'black' : 'white',
    boxShadow: '.1rem .1rem .1rem grey',
    height: '1.5em',
    width: '1.5em',
    borderRadius: '50%',
    borderColor: 'grey',
    borderWidth: '1px',
    borderStyle: 'solid'
  }}
  />
);

/**
 * @name ProductModalCard
 * @description displays single product card component
 * @param {*} props product
 * @return component
 */
const ProductModalCard = React.forwardRef((props, ref) => {
  const { product } = props;
  const { setToastCallback, openToastCallback } = props;
  const classes = useStyles();
  const { dispatch } = useCart();
  const {
    state: { products }
  } = useCart();
  const { onClose } = props;
  // toast stuff for errors
  const [open, setOpenToast] = useState(false);
  const [toastData, setToastData] = useState({
    MESSAGE: '',
    SEVERITY: Constants.SEVERITY_LEVELS.INFO
  });

  const closeToast = () => {
    setOpenToast(false);
  };

  const openToast = () => {
    setOpenToast(true);
  };
  // input box stuff. Defaults to 1.
  const [inputValue, setInputValue] = useState(1);
  const initialInput = useRef(Number.parseInt(inputValue, 10));
  // prevents user from inputing -, thus stopping negative numbers
  const validateKeyStroke = (e) => {
    if (e.key === '-') {
      e.preventDefault();
      e.stopPropagation();
    }
  };
  const inputChange = (e) => {
    if (e.target.value.length > 0) {
      setInputValue(Number.parseInt(e.target.value, 10));
    } else {
      setInputValue('');
    }
  };

  const resetInput = () => {
    setInputValue(initialInput.current);
  };

  useEffect(() => {
    resetInput();
  }, [toastData]);

  const onAdd = () => {
    // make sure inputValue is filled out
    if (inputValue.length === 0) {
      setToastData(Constants.ADD_PRODUCT_FAILURE([Constants.QUANTITY_MUST_BE_ENTERED]));
      openToast();
      return;
    }
    // make sure inputValue is a number
    setInputValue(Number.parseInt(inputValue, 10));
    // check for number errors
    // if inputValue = 0, do nothing
    let errors = [];
    if (inputValue <= 0) {
      errors.push(Constants.CANNOT_ADD_ZERO_QUANTITY);
    }
    if (!Number.isInteger(inputValue)) {
      errors.push(Constants.QUANTITY_MUST_BE_INT);
    }
    if (errors.length > 0) {
      setToastData(Constants.ADD_PRODUCT_FAILURE(errors));
      openToast();
      errors = [];
      return;
    }
    // validate order and pop toast if error
    const validation = validateOrder(product, products, inputValue);
    if (!validation.valid) {
      setToastData(Constants.ADD_PRODUCT_FAILURE(validation.errors));
      openToast();
      return;
    }
    // set success toast data
    if (Number.parseInt(inputValue, 10) === 1) {
      setToastCallback(Constants.ADD_PRODUCT_SUCCESS(product.name));
    } else {
      setToastCallback(Constants.ADD_MULTIPLE_SUCCESS(product.name, inputValue));
    }
    // check to see if product is already in order
    const repeatItem = inOrder(product, products);
    if (!repeatItem) {
      // add product to order
      dispatch(
        {
          type: 'add',
          product: {
            id: product.id,
            title: product.name,
            price: product.price,
            description: product.description,
            quantity: inputValue
          }
        }
      );
      onClose();
      openToastCallback();
      updateLastActive();
      return;
    }
    // if not a new item, add the quantity to inputValue
    products.filter((p) => p.id === product.id)[0].quantity += inputValue;
    openToastCallback();
    onClose();
    updateLastActive();
  };

  return (
    <ClickAwayListener onClickAway={onClose}>
      <Box ref={{ ref }} className={classes.box}>
        <Toast
          message={toastData.MESSAGE}
          open={open}
          severity={toastData.SEVERITY}
          handleClose={closeToast}
        />
        <Card className={classes.root}>
          <div className={styles.CardContainer}>
            <CardHeader
              className={classes.header}
              title={product.name}
              subheader={`${product.category} ${product.type}`}
              action={(
                <IconButton onClick={() => onClose()}>
                  <Close />
                </IconButton>
            )}
            />
            <CardMedia
              className={classes.media}
              image={Constants.PLACEHOLDER_IMAGE}
              title="placeholder"
            />
            <CardContent>
              <div className={styles.description}>
                <Typography variant="body2" color="textSecondary" component="p">
                  {product.description}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Price: $
                  {product.price.toFixed(2)}
                </Typography>
              </div>
              <br />
              <div className={styles.description}>
                <Typography variant="body2" color="textSecondary" component="span" className={classes.colorSpan}>
                  <div className={classes.colorLabel}>Primary Color:</div>
                  {colorDot(product.primaryColorCode)}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="span" className={classes.colorSpan}>
                  <div className={classes.colorLabel}>Secondary Color:</div>
                  {colorDot(product.secondaryColorCode)}
                </Typography>
              </div>
              <br />
              <br />
              <div className={classes.cartInfo}>
                <TextField
                  style={{ marginLeft: '1em' }}
                  label="Currently in cart:"
                  value={inOrder(product, products)
                    ? products.filter((p) => p.id === product.id)[0].quantity
                    : 0}
                  disabled
                />

                <CardActions className={classes.actionsFormatting}>
                  <TextField
                    label="Quantity"
                    id="qtyInput"
                    type="number"
                    step="1"
                    InputProps={{ inputProps: { min: 0 } }}
                    className={classes.quantityInput}
                    value={inputValue}
                    onChange={inputChange}
                    onKeyDown={validateKeyStroke}
                  />
                  <IconButton aria-label="add to shopping cart" onClick={onAdd} style={{ alignSelf: 'flex-end', margin: '.25em' }}>
                    <AddShoppingCartIcon />
                  </IconButton>
                </CardActions>
              </div>
              <Reviews productId={product.id} />
            </CardContent>

          </div>
        </Card>
      </Box>
    </ClickAwayListener>
  );
});

export default ProductModalCard;
