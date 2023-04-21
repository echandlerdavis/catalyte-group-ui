import React, { useState } from 'react';
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
import Toast from '../toast/Toast';

/**
 * @name useStyles
 * @description Material-ui styling for ProductCard component
 * @return styling
 */
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345
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
  }
}));

/**
 * @name ProductCard
 * @description displays single product card component
 * @param {*} props product
 * @return component
 */
const ProductCard = ({ product }) => {
  const classes = useStyles();
  const [open, setOpenToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('Product added!');

  const closeToast = () => {
    setOpenToast(false);
  };

  const openToast = () => {
    setOpenToast(true);
  };

  const { dispatch } = useCart();
  const {
    state: { products }
  } = useCart();

  const onAdd = () => {
    // make sure id is present on new product
    if (product.id === undefined || product.id === null) {
      // use the toast to display an error
      setToastMessage(`Product ${product.description} does not have a unique ID.`);
      openToast();
      return;
    }
    // set the success message
    const successMessage = `${product.description} added to cart!`;
    // locate if the product is a duplicate
    let existingProducts = [];
    if (products.length > 0) {
      existingProducts = products.filter((p) => p.id === product.id);
    }

    if (products.length === 0 || existingProducts.length === 0) {
      // toast
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
      setToastMessage(successMessage);
      openToast();
      return;
    }
    // if multiple existing products in cart, consolitate
    if (existingProducts.length > 1) {
      const firstIndex = products.findIndex((p) => p.id === product.id);
      while (existingProducts.length > 1) {
        const duplicate = existingProducts.pop();
        const duplicateIndex = products.findLastIndex((p) => p.id === product.id);
        products[firstIndex].quantity += duplicate.quantity;
        products.splice(duplicateIndex, 1);
      }
    }
    // add quantity from action product to now single existingProduct
    existingProducts[0].quantity += 1;
    // toast
    setToastMessage(successMessage);
    openToast();
  };

  return (
    <Card className={classes.root}>
      <Toast message={toastMessage} open={open} handleClose={closeToast} />
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
        title={product.name}
        subheader={`${product.demographic} ${product.category} ${product.type}`}
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
    </Card>
  );
};

export default ProductCard;
