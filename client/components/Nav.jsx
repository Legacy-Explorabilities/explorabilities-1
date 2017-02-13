import React from 'react';
import {Link} from 'react-router';
import authHelpers from '../auth/auth-helpers.js';

export default class Nav extends React.Component {

  render() {
    return (
      <nav className="navbar navbar-fixed-top">
        
          
          <div className="col-md-4">
            <Link to="explore"><img src="img/logo-explorapedia.png" className="logo"/></Link>
          </div>

          <div className="col-md-1">
            <Link to="airlines"><p className="navLink">Airlines</p></Link>
          </div>
          
          <div className="col-md-1">
            <Link to="hotels" id="hotels"><p className="navLink">Hotels</p></Link>
          </div>

          <div className="col-md-1">
              <Link to="deals"><p className="navLink">Deals</p></Link>
          </div>

          <div className="col-md-6 navMyPlaceLogoutButton">
            <Link to="myplaces">
              <button>My Places</button>
            </Link>
            <Link to="auth/signin">
              <button onClick={authHelpers.logout}>{checkAuth()}</button>
            </Link>
          </div>

        
      </nav>
    );
  }
}

function checkAuth() {
  if (!localStorage.token) {
    return 'Log In';
  } else {
    return 'Log Out';
  }
}

