import React from 'react';
import { Modal, Button, Typography, makeStyles } from '@material-ui/core';
import { red } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  deleteModal: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(4),
    outline: 'none',
    width: 400,
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    textAlign: 'center',
  },
  deleteModalProductName: {
    marginTop: theme.spacing(2),
    fontWeight: 'bold',
  },
  deleteModalWarning: {
    marginTop: theme.spacing(2),
    color: red[500],
  },
  deleteModalButtons: {
    marginTop: theme.spacing(4),
  },
}));

const DeleteProductModal = ({
  open,
  deletingProduct,
  deletingProductWithPurchases,
  handleDeleteConfirmed,
  handleDeleteCancelled
}) => {
  const classes = useStyles();

  return (
    <Modal open={open} onClose={handleDeleteCancelled}>
      <div className={classes.deleteModal}>
        <Typography variant="h6">Confirmation</Typography>
        <Typography>Are you sure you want to delete this product?</Typography>
        <Typography variant="body1" className={classes.deleteModalProductName}>
          Product: {deletingProduct && deletingProduct.name}
        </Typography>
        {deletingProductWithPurchases.length > 0 && (
          <Typography variant="body2" className={classes.deleteModalWarning}>
            This product is associated with {deletingProductWithPurchases.length} order(s). Marking it as inactive will remove the product from these orders.
          </Typography>
        )}
        <div className={classes.deleteModalButtons}>
          <Button variant="contained" color="secondary" onClick={handleDeleteConfirmed}>
            Delete
          </Button>
          <Button variant="outlined" color="default" onClick={handleDeleteCancelled}>
            Cancel
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteProductModal;