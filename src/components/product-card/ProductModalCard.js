import React, { useState } from 'react';
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

/**
 * @name useStyles
 * @description Material-ui styling for ProductCard component
 * @return styling
 */
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    height: '100%'
  },
  media: {
    height: 0,
    paddingTop: '56.25%'
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
    transform: 'translate(-50%, -50%)'
  },
  colorSpan: {
    display: 'inline-flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    marginLeft: '1em',
    marginRight: '1em'
  },
  colorLabel: {
    alignSelf: 'flex-start',
    flexBasis: '50%'
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
    boxShadow: '.05rem .05rem .05rem grey',
    height: '1.5em',
    width: '1.5em',
    borderRadius: '50%'
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
  // input box stuff
  const [inputValue, setInputValue] = useState(1);
  const inputChange = (e) => {
    setInputValue(e.target.value);
  };

  const onAdd = () => {
    // if inputValue = 0, do nothing
    if (inputValue === 0) {
      return;
    }
    // validate order and pop toast if error
    const validation = validateOrder(product, products);
    if (!validation.valid) {
      setToastData(Constants.ADD_PRODUCT_FAILURE(validation.errors));
      openToast();
      return;
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
      return;
    }
    // if not a new item, set the quantity to inputValue
    products.filter((p) => p.id === product.id)[0].quantity = inputValue;
    onClose();
  };

  return (
    <ClickAwayListener onClickAway={onClose}>
      <Box ref={ref} className={classes.box}>
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
              <Typography variant="body2" color="textSecondary" component="p">
                {product.description}
              </Typography>
              <br />
              <Typography variant="body2" color="textSecondary" component="p">
                Price: $
                {product.price.toFixed(2)}
              </Typography>
            </CardContent>
            <br />
            <Typography variant="body2" color="textSecondary" component="span" className={classes.colorSpan}>
              <div className={classes.colorLabel}>Primary Color:</div>
              {colorDot(product.primaryColorCode)}
            </Typography>
            <br />
            <Typography variant="body2" color="textSecondary" component="span" className={classes.colorSpan}>
              <div className={classes.colorLabel}>Secondary Color:</div>
              {colorDot(product.secondaryColorCode)}
            </Typography>
            <CardActions className={classes.actionsFormatting}>
              <TextField
                label="Quantity"
                id="qtyInput"
                type="number"
                InputProps={{ inputProps: { min: 0 } }}
                className={classes.quantityInput}
                value={inputValue}
                onChange={inputChange}
                autoFocus
              />
              <IconButton aria-label="add to shopping cart" onClick={onAdd} style={{ alignSelf: 'flex-end', margin: '.25em' }}>
                <AddShoppingCartIcon />
              </IconButton>
            </CardActions>
          </div>
        </Card>
      </Box>
    </ClickAwayListener>
  );
});

export default ProductModalCard;
