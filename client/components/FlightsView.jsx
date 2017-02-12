import React from 'react';
import axios from 'axios';

export default class FlightsSearch extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(flightData) {
    console.log('PROPS FROM FLIGHTS VIEW,', flightData);
  }

  render() {
    let flightsView = this.props.foundFlights.map(function(flights) {
      return (
        <div>
          <p>{JSON.stringify(flights)}</p>
        </div>

      )
    });
    return(
      <div id='place' className='airport'>
        <div>
          {flightsView}
        </div>
      </div>
    )
  }
}