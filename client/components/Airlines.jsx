import React from 'react';
import axios from 'axios';
// import MapContainer from './MapContainer.jsx';
// import Place from './Place.jsx';
// import ItineraryList from './itineraryList.jsx';
import Flights from './Flights.jsx';
import {browserHistory} from 'react-router';


function checkAuth() {
  if (!localStorage.token) {
    return false;
  } else {
    return true;
  }
}

export default class Airlines/*!!!!!*/ extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      
    };
    // setInterval(()=>{console.log(window.flightData);}, 3000);
  }

  render() {
    let flightDetails = function(e, flightOptionNum){
      e.preventDefault();
      window.flightOptionNum = flightOptionNum;
      browserHistory.push('/option'+flightOptionNum);
    }
    let flightsViewRender = window.flightData.map(function(flight, index) {
        return (
          <div>
            <h3>Option: {index + 1}</h3>
            <button class="btn btn-info" onClick={(e)=>{flightDetails(e, index + 1);}}>See details</button>
            <p></p>
            <h4>Departure</h4>
            <p></p>
            <table className="table table-hover table-bordered">
              <tbody>
                <tr>
                  <th>Price</th>
                  <td>{flight.saleTotal.replace(/USD/gi, '$')}</td>
                </tr>
                <tr>
                  <th>From</th>
                  <td>{flight.outgoingTrip.from}</td>
                </tr>
                <tr>
                  <th>To</th>
                  <td>{flight.outgoingTrip.to}</td>
                </tr>
                <tr>
                  <th>Departure time</th>
                  <td>{flight.outgoingTrip.departure}</td>
                </tr>
                <tr>
                  <th>Arrival time</th>
                  <td>{flight.outgoingTrip.arrival}</td>
                </tr>
                <tr>
                  <th>Total trip length</th>
                  <td>{flight.outgoingTrip.totalTripLength}</td>
                </tr>
                <tr>
                  <th>Flight segments</th>
                  <td>{flight.outgoingTrip.flightSegments.length}</td>
                </tr>
              </tbody>
            </table>
            <h4>Return</h4>
            <table className="table table-hover table-bordered">
              <tbody>
                <tr>
                  <th>From</th>
                  <td>{flight.returnTrip.from}</td>
                </tr>
                <tr>
                  <th>To</th>
                  <td>{flight.returnTrip.to}</td>
                </tr>
                <tr>
                  <th>Departure time</th>
                  <td>{flight.returnTrip.departure}</td>
                </tr>
                <tr>
                  <th>Arrival time</th>
                  <td>{flight.returnTrip.arrival}</td>
                </tr>
                <tr>
                  <th>Total trip length</th>
                  <td>{flight.returnTrip.totalTripLength}</td>
                </tr>
                <tr>
                  <th>Flight segments</th>
                  <td>{flight.returnTrip.flightSegments.length}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )
    });
        
    return (
      <div>
        <p>&nbsp;</p>
        <div className='col-lg-6'>
          <div>
              {flightsViewRender}  
          </div>
        </div>
      </div>
    );
  
  } 
  
}


