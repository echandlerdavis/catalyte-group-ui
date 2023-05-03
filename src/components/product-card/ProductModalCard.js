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
import Box from '@material-ui/core/Box';
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
  avatar: {
    backgroundColor: red[500]
  },
  header: {
    minHeight: 100
  }
}));

/**
 * @name ProductModalCard
 * @description displays single product card component
 * @param {*} props product
 * @return component
 */
const ProductModalCard = (props) => {
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
    <Box>
      <Card className={classes.root} onClick={() => onClose()}>
        <div className={styles.CardContainer}>
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
        </div>
      </Card>
    </Box>
  );
};

export default ProductModalCard;
