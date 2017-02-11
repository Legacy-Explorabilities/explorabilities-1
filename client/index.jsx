import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, browserHistory, IndexRedirect} from 'react-router';
import App from './app.jsx';
import Auth from './auth/auth.jsx';
import authHelpers from './auth/auth-helpers.js';
import Signin from './auth/signin.jsx';
import Signup from './auth/signup.jsx';
import Explore from './components/Explore.jsx';
import MyPlaces from './components/MyPlaces.jsx';
import Airlines from './components/Airlines.jsx';
// import Flights from './components/Flights.jsx'
import Hotels from './components/bestHotelsInfo.jsx'
import axios from 'axios';

//remove itinerary from Explore.js

ReactDOM.render(
  <Router history={browserHistory}>
    
    <Route path="/" component={App}>
      <IndexRedirect to="/explore" />
      <Route path="/auth" component={Auth}>
        <Route path="/auth/signin" component={Signin}/>
        <Route path="/auth/signup" component={Signup}/>
        <Route path="/explore" component={Explore}/>
        <Route path="myplaces" component={MyPlaces} onEnter={requireAuth}/>
        <Route path="/airlines" component={Airlines} onEnter={requireAuth}/>
         <Route path="/hotels" component={Hotels}/>
      </Route>
    </Route>   
  </Router>, document.getElementById('app'));


function requireAuth(nextState, replace) {
  if (!localStorage.token) {
    replace({
      pathname: '/auth/signin',
      state: {
        nextPathName: nextState.location.pathname,
      }
    });
  }
}