import React from 'react';
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
import { TextField } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import Constants from '../../utils/constants';
import { useCart } from '../checkout-page/CartContext';
import styles from './ProductCard.module.css';

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
    alignContent: 'center',
    width: '100%',
    marginLeft: '1em',
    marginRight: '1em'
  },
  colorLabel: {
    alignSelf: 'flex-start',
    flexBasis: '50%'
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

  const onAdd = () => {
    if (products.length === 0) {
      // add product to order
      dispatch(
        {
          type: 'add',
          product: {
            id: product.id,
            title: product.name,
            price: product.price,
            description: product.description,
            quantity: 1
          }
        }
      );
    }
  };

  return (
    <Box ref={ref} className={classes.box}>
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
          <CardActions>
            <TextField
              type="number"
              InputProps={{ inputProps: { min: 0 } }}
              default={1}
              autoFocus
            />
            <IconButton aria-label="add to shopping cart" onClick={onAdd}>
              <AddShoppingCartIcon />
            </IconButton>
          </CardActions>
        </div>
      </Card>
    </Box>
  );
});

export default ProductModalCard;
