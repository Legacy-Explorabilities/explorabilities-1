import React from 'react';
import axios from 'axios';
import {browserHistory} from 'react-router';


export default class FlightDetails/*!!!!!*/ extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      
    };

  }

  render() {
    // console.log(window.flightData[flightOptionNum]);
    //console.log('FLIGHT OPTION NUM: ', window.flightOptionNum );
    let outgoingTripSegments = window.flightData[flightOptionNum].outgoingTrip.flightSegments.map(function(outgoingTrip, index) {
        return (
        <div>
          <p>&nbsp;</p>
          <h4>Segment: {index + 1}</h4> 
          <p></p>
          <table className="table table-hover table-bordered">
            <tbody>
              <tr>
                <th>Origin</th>
                <td>{outgoingTrip.origin}, terminal: {outgoingTrip.originTerminal}</td>
              </tr>
             <tr>
               <th>Destination</th>
               <td>{outgoingTrip.destination}, terminal: {outgoingTrip.destinationTerminal}</td>
             </tr>
              <tr>
                <th>Departure Time</th>
                <td>{outgoingTrip.departureTime}</td>
              </tr>
              <tr>
                <th>Arrival Time</th>
                <td>{outgoingTrip.arrivalTime}</td>
              </tr>
              <tr>
                <th>Carrier</th>
                <td>{outgoingTrip.carrier}</td>
              </tr>
              <tr>
                <th>Flight Number</th>
                <td>{outgoingTrip.flightNumber}</td>
              </tr>
              <tr>
                <th>Meal</th>
                <td>{outgoingTrip.meal}</td>
              </tr>
              <tr>
                <th>Flight Distance</th>
                <td>{outgoingTrip.mileage} miles</td>
              </tr>
              <tr>
                <th>Flight Duration</th>
                <td>{outgoingTrip.duration}</td>
              </tr>
              <tr>
                <th>Layover</th>
                <td>{outgoingTrip.connectionDuration}</td>
              </tr>
            </tbody>
          </table>
        </div>
        )
    });

    let returnTripSegments = window.flightData[flightOptionNum].returnTrip.flightSegments.map(function(returnTrip, index) {
        return(
        <div>
          <p></p>
          <h4>Segment: {index + 1}</h4>  
          <p></p> 
          <table className="table table-hover table-bordered">
            <tbody>
              <tr>
                <th>Origin</th>
                <td>{returnTrip.origin}, terminal: {returnTrip.originTerminal}</td>
              </tr>
              <tr>
                <th>Destination</th>
                <td>{returnTrip.destination}, terminal: {returnTrip.destinationTerminal}</td>
              </tr>
              <tr>
                <th>Departure Time</th>
                <td>{returnTrip.departureTime}</td>
              </tr>
              <tr>
                <th>Arrival Time</th>
                <td>{returnTrip.arrivalTime}</td>
              </tr>
              <tr>
                <th>Carrier</th>
                <td>{returnTrip.carrier}</td>
              </tr>
              <tr>
                <th>Flight Number</th>
                <td>{returnTrip.flightNumber}</td>
              </tr>
              <tr>
                <th>Meal</th>
                <td>{returnTrip.meal}</td>
              </tr>
              <tr>
                <th>Flight Distance</th>
                <td>{returnTrip.mileage}</td>
              </tr>
              <tr>
                <th>Flight Duration</th>
                <td>{returnTrip.duration}</td>
              </tr>
              <tr>
                <th>Layover</th>
                <td>{returnTrip.connectionDuration}</td>
              </tr>
            </tbody>
          </table>
        </div>
        )
    });


    return(
      <div className='airlinesView'>
      <p>&nbsp;</p>
        <div>
          <h3>Outgoing Trip Segments</h3>
          <div>
            {outgoingTripSegments}
          </div>
        </div>
        <div>
        <p>&nbsp;</p>
          <h3>Return Trip Segments</h3>
          <div>
            {returnTripSegments}
          </div>
        </div>
      </div>
    )
  } 
  
}


