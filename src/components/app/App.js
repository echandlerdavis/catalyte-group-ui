import React, { useState } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ProductPage from '../product-page/ProductPage';
import CheckoutPage from '../checkout-page/CheckoutPage';
import ConfirmationPage from '../confirmation-page/ConfirmationPage';
import MaintenancePage from '../maintenance-page/MaintenancePage';
import ProfilePage from '../profile-page/ProfilePage';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import FilterComponentExample from '../filter-component/FilterContainer';
/**
 * @name App
 * @returns component
 */
const App = () => {
  const [user, setUser] = useState(null);
  return (
    <div className="App">
      <div className="Container">
        <BrowserRouter>
          <Header user={user} setUser={setUser} />
          <main>
            <Switch>
              <Route exact path="/" render={() => <ProductPage />} />
              <Route exact path="/checkout" render={() => <CheckoutPage />} />
              <Route exact path="/confirmation" render={() => <ConfirmationPage />} />
              <Route path="/maintenance" render={() => <MaintenancePage />} />
              <Route exact path="/profilepage" render={() => <ProfilePage user={user} setUser={setUser} />} />
              <Route exact path="/filter" render={() => <FilterComponentExample />} />
            </Switch>
          </main>
          <Footer />
        </BrowserRouter>
      </div>
    </div>
  );
};
export default App;
