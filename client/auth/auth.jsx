import React from 'react';
import {Link} from 'react-router';
import Nav from '../components/Nav.jsx';
import axios from 'axios';

export default class Auth extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      error: ''
    };
//comment
    this.handleSignin = this.handleSignin.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
    this.routeToExplore = this.routeToExplore.bind(this);
    this.setError = this.setError.bind(this);
  }

  componentWillMount(nextState, replace) {
    console.log('inside componentWillMount');
    axios.get('/users/auth', {
      headers: { token: localStorage.token || null }
    })
    .then((res) => {
      //res.data.user = user email
      //res.data.id = user id
      console.log('User is logged in');
      console.log('Response is: ', res);
      this.state.buttonText = 'Log Out'; //change the buttonText state to Log Out
      console.log('State button', this.state.buttonText);
    })
    .catch((err) => {
      console.log('User is NOT logged in');
      this.state.buttonText = 'Log In'; //change the buttonText state to Log In
      console.log('State button', this.state.buttonText);
      replace({
        pathname: '/auth/signin',
        state: {
          nextPathName: nextState.location.pathname
        }
      });
    });
  }

  render () {
    return (    
        <div>
          <Nav buttonText={this.state.buttonText} />
          <div>
            {React.cloneElement(this.props.children, {
              error: this.state.error,
              signin: this.handleSignin,
              signup: this.handleSignup
            })}
          </div>
        </div>
    );
  }

  handleSignin (e) {
    e.preventDefault();
    const email = e.target.querySelector('[name="email"]').value;
    const password = e.target.querySelector('[name="password"]').value;

    axios.get('/users/signin', {
      params: {
        email: email,
        password: password
      }
    })
    .then(this.routeToExplore)
    .catch(this.setError);
  }

  handleSignup (e) {
    e.preventDefault();
    const email = e.target.querySelector('[name="email"]').value;
    const password = e.target.querySelector('[name="password"]').value;
    const confirmPassword = e.target.querySelector('[name="confirm_password"]').value;

    if (password !== confirmPassword) {
      this.setState({
        error: 'Passwords do not match'
      });
    } else {
      axios.post('/users/create', {
        email: email,
        password: password
      })
      .then(this.routeToExplore)
      .catch(this.setError);
    }
  }

  routeToExplore (res) {
    if (res.data.success) {
      localStorage.token = res.data.token;
      this.props.router.push('/explore');
    } else {
      this.setState({
        error: 'An error occurred'
      });
    }
  }

  setError (err) {
    this.setState({
      error: err.response.data
    });
  }
}
