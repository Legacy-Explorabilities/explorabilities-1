import React from 'react';
import {Link} from 'react-router';
import Auth from '../auth/auth.jsx'; //import Auth to find out if user is logged in ?
import authHelpers from '../auth/auth-helpers.js';


//when user logged out, change the logout text to login
//need to send user login status down as props?
//need to make this stateful class

export default class Nav extends React.Component {
  
  constructor(props) {
    super(props);
    
    this.state = {
      // buttonText: 'Default'
    };
  }

  render() {
    console.log('inside render');
    return (
      <div className="clearfix nav">
        <h2 className="beautify nav-title">Explorabilities</h2>
        <nav>
          <Link to="myplaces">
            <button>My Places</button>
          </Link>
          <Link to="explore">
            <button>Explore!</button>
          </Link>
          <Link to="auth/signin">
            <button onClick={authHelpers.logout}>{this.props.buttonText} *</button>
          </Link>
        </nav>
      </div>
    );
  }

} 


// var text = function() {
//   //If user is logged in, display 'Log Out'
//     //else, display 'Log In'
//   return 'Log Out';
// }

//verifies the user's token serverside.
//check out line 60 in server/db/users/usersController.js
/*function requireAuth(nextState, replace, blah) {
  axios.get('/users/auth', {
    headers: { token: localStorage.token || null }
  })
  .then((res) => {
    //res.data.user = user email
    //res.data.id = user id
    console.log('User is logged in');
    console.log('Response is: ', res);
    this.state.buttonText = 'Log Out'; //change the buttonText state to Log Out
    console.log(this.state.buttonText);
  })
  .catch((err) => {
    console.log('User is NOT logged in');
    this.state.buttonText = 'Log In'; //change the buttonText state to Log In
    replace({
      pathname: '/auth/signin',
      state: {
        nextPathName: nextState.location.pathname
      }
    });
  });
}*/

// export default Nav;
