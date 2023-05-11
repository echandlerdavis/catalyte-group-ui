import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import ShareIcon from '@material-ui/icons/Share';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Constants from '../../utils/constants';
import { useCart } from '../checkout-page/CartContext';
import styles from './ProductCard.module.css';
import setLastActive from '../../utils/UpdateLastActive';

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
  avatar: {
    backgroundColor: red[500]
  },
  header: {
    minHeight: 100
  }
}));
/**
 * Validates the product id
 * @param {product Object} product
 * @returns boolean
 */
export const productHasId = (product) => product.id !== undefined && product.id !== null;

/**
 * Verify that there is enough inventory to handle the order
 * @param {int} inventoryQty quanity from product from the server; NOT state.prodcuts
 * @param {int} orderQty quantity that the customer would like to order
 * @returns boolean
 */
export const haveEnoughInventory = (inventoryQty, orderQty) => inventoryQty >= orderQty;

/**
 * Returns true if the given product is in the given orders
 * @param {product} product
 * @param {array} orders
 * @returns boolean
 */
export const inOrder = (product, orders) => orders.filter((p) => p.id === product.id).length > 0;

/**
 * Validate that the given product is valid
 * @param {Product object} product
 * @returns result Object {valid: boolean, errors: [string]}
 */
export const validateOrder = (product, orders, desiredQty) => {
  const result = {
    valid: true,
    errors: []
  };
  // Validate the product id
  if (!productHasId(product)) {
    result.valid = false;
    result.errors.push(Constants.PRODUCT_MISSING_ID);
  }
  // Validate inventory
  // if product has no id, can't verify inventory
  if (result.valid) {
    // user has already clicked add icon, so orderQty is currenty orderQty + 1
    let orderQty = desiredQty;
    if (orderQty === undefined && inOrder(product, orders)) {
      orderQty = orders.filter((p) => p.id === product.id)[0].quantity + 1;
    } else if (orderQty === undefined) {
      orderQty = 1;
    }
    if (!haveEnoughInventory(product.quantity, orderQty)) {
      result.valid = false;
      result.errors.push(Constants.INSUFFICIENT_INVENTORY);
    }
  }

  return result;
};

/**
 * Consolidate the given list of duplicates into a single order item with a larger quantity.
 * @param {object} product the product that has duplicates
 * @param {array} duplicates an array of the duplicate products iin the order
 * @param {array} order state.products
 */
export const consolidateOrder = (product, duplicates, order) => {
  const firstDuplicate = order.find((p) => p.id === product.id);
  while (duplicates.length > 1) {
    const duplicate = duplicates.pop();
    const duplicateIndex = order.lastIndexOf((p) => p.id === product.id);
    firstDuplicate.quantity += duplicate.quantity;
    order.splice(duplicateIndex, 1);
  }
};

/**
 * @name ProductCard
 * @description displays single product card component
 * @param {*} props product
 * @return component
 */
const ProductCard = ({
  product, clickAction, openToast, setToastData
}) => {
  const classes = useStyles();
  const modalClickZone = {
    cursor: 'pointer'
  };

  const { dispatch } = useCart();
  const {
    state: { products }
  } = useCart();

  const onAdd = () => {
    // validate product
    const productErrors = validateOrder(product, products).errors;
    if (productErrors.length > 0) {
      // use the toast to display an error
      setToastData(Constants.ADD_PRODUCT_FAILURE(productErrors));
      openToast();
      return;
    }
    // set the success message
    setToastData(Constants.ADD_PRODUCT_SUCCESS(product.name));
    // update activity time
    setLastActive();
    // locate if the product is a duplicate
    let existingProducts = [];
    if (products.length > 0) {
      existingProducts = products.filter((p) => p.id === product.id);
    }

    if (products.length === 0 || existingProducts.length === 0) {
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
      // toast
      openToast();
      return;
    }
    // if multiple existing products in cart, consolitate
    if (existingProducts.length > 1) {
      consolidateOrder(product, existingProducts, products);
    }
    // add quantity from action product to now single existingProduct
    existingProducts[0].quantity += 1;
    // toast
    openToast();
  };

  return (
    <Card className={classes.root}>
      <div className={styles.CardContainer}>
        <div style={modalClickZone}>
          <CardHeader
            avatar={(
              <Avatar aria-label="demographics" className={classes.avatar}>
                {product.demographic.charAt(0)}
              </Avatar>
          )}
            action={(
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
          )}
            className={classes.header}
            title={product.name}
            subheader={`${product.demographic} ${product.category} ${product.type}`}
            onClick={() => clickAction(product)}
          />
          <CardMedia
            className={classes.media}
            image={Constants.PLACEHOLDER_IMAGE}
            title="placeholder"
            onClick={() => clickAction(product)}
          />
          <CardContent onClick={() => clickAction(product)}>
            <Typography variant="body2" color="textSecondary" component="p">
              {product.description}
            </Typography>
            <br />
            <Typography variant="body2" color="textSecondary" component="p">
              Price: $
              {product.price.toFixed(2)}
            </Typography>
          </CardContent>
        </div>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
          <IconButton aria-label="add to shopping cart" onClick={onAdd}>
            <AddShoppingCartIcon />
          </IconButton>
        </CardActions>
      </div>
    </Card>
  );
};

export default ProductCard;
