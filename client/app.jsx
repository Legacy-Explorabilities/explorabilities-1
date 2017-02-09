import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';


export default class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      // buttonText: ''
    };

  }

  componentDidMount() {
    console.log('THIS', this.props);
  };

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }

}
