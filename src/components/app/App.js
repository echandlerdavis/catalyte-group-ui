import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ProductPage from '../product-page/ProductPage';
import CheckoutPage from '../checkout-page/CheckoutPage';
import ConfirmationPage from '../confirmation-page/ConfirmationPage';
import MaintenancePage from '../maintenance-page/MaintenancePage';
import NewProductPage from '../new-product-page/NewProductPage';
import Header from '../header/Header';
/**
 * @name App
 * @returns component
 */
const App = () => (
  <BrowserRouter>
    <Header />
    <main>
      <Switch>
        <Route exact path="/" render={() => <ProductPage />} />
        <Route exact path="/checkout" render={() => <CheckoutPage />} />
        <Route exact path="/confirmation" render={() => <ConfirmationPage />} />
        <Route exact path="/maintenance" render={() => <MaintenancePage />} />
        <Route exact path="/maintenance/new/product" render={() => <NewProductPage />} />
      </Switch>
    </main>
  </BrowserRouter>
);

export default App;
