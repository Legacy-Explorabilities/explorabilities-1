import React from 'react';
import axios from 'axios';
export default class FlightsSearch extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(flightData) {
    console.log('PROPS FROM FLIGHTS VIEW,', flightData);
    // window.flightData = flightData;
  }

  render() {
    
    return(
      null
    )
  }
}