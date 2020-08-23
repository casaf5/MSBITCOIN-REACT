import React from 'react';
import { Home } from './pages/Home/Home';
import { Contacts } from './pages/Contacts/Contacts';
import { Statistics } from './pages/Statistics/Statistics';
import { AppFooter } from './cmps/AppFooter/AppFooter';
import { AppHeader } from './cmps/AppHeader/AppHeader';
import { ContactDetails } from './pages/ContactDetails/ContactDetails';
import { ContactEdit } from './pages/ContactEdit/ContactEdit';
import { Login } from './pages/Login/Login';
import { HashRouter as Router, Route } from 'react-router-dom';
import './style.scss';

function App() {
  return (
    <div className='App main-layout'>
      <Router>
        <AppHeader />
        <main>
          <Route exact component={Home} path='/' />
          <Route exact component={Contacts} path='/contacts' />
          <Route exact component={Statistics} path='/Statistics' />
          <Route exact component={Login} path='/login' />
          <Route exact component={ContactDetails} path='/contacts/details/:id' />
          <Route exact component={ContactEdit} path='/contacts/edit/:id?' />
        </main>
        <AppFooter />
      </Router>
    </div>
  );
}

export default App;
