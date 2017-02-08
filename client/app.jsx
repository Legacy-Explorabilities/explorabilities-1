import React from 'react';
import ReactDOM from 'react-dom';
import Nav from './components/Nav.jsx';
import axios from 'axios';


export default class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      buttonText: ''
    };

  }

  componentDidMount() {
    console.log('THIS', this.props);
  };

  render() {
    return (
      <div>
        <Nav />
        {this.props.children}
      </div>
    );
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
      this.props.buttonText = 'Log Out'; //change the buttonText state to Log Out
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

}
