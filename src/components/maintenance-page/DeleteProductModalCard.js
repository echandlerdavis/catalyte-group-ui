import React from 'react';
import { Modal, Button } from '@material-ui/core';
import styles from './MaintenancePage.module.css';

const DeleteProductModal = ({ open, onClose, deletingProduct, deletingProductOrders, handleDeleteConfirmed, handleDeleteCancelled }) => {
  return (
    <Modal open={open} onClose={handleDeleteCancelled}>
      <div className={styles.deleteModal}>
        <h3>Confirmation</h3>
        <p>Are you sure you want to delete this product?</p>
        <p className={styles.deleteModalProductName}>
          Product: {deletingProduct && deletingProduct.name}
        </p>
        {deletingProductOrders.length > 0 && (
          <p className={styles.deleteModalWarning}>
            This product is associated with {deletingProductOrders.length} order(s).
            Marking it as inactive will remove the product from these orders.
          </p>
        )}
        <div className={styles.deleteModalButtons}>
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