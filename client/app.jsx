import React from 'react';
import ReactDOM from 'react-dom';
import Nav from './components/Nav.jsx';
import axios from 'axios';


export default class App extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log('app.jsx componentDidMount this.props', this.props);
  };

  render() {
    return (
      <div>
        <Nav/>
        {this.props.children}
      </div>
    );
  }
}
