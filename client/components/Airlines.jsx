import React from 'react';
import axios from 'axios';
// import MapContainer from './MapContainer.jsx';
// import Place from './Place.jsx';
// import ItineraryList from './itineraryList.jsx';
import Flights from './Flights.jsx';

function checkAuth() {
  if (!localStorage.token) {
    return false;
  } else {
    return true;
  }
}

export default class Explore extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      
    };
    setInterval(()=>{console.log(window.flightData);}, 3000);
  }

  render() {
    let flightSegmentsView = window.flightData.map(function(flight, index) {
      return flight.outgoingTrip.flightSegments.map(function(segment){
        return (
          <table>
            <thead>
              <th className='text-center'>Option: {index + 1}</th>
            </thead>
            <tr>
              <th>Origin</th>
              <td>{segment.origin}</td>
            </tr>
            <tr>
              <th>Destination</th>
              <td>{segment.destination}</td>
            </tr>
            <tr>
              <th>Departure Time</th>
              <td>{segment.departureTime}</td>
            </tr>
            <tr>
              <th>Arrival Time:</th>
              <td>{segment.arrivalTime}</td>
            </tr>
            <tr>
              <th>Carrier</th>
              <td>{segment.carrier}</td>
            </tr>
            <tr>
              <th>Flight Number</th>
              <td>{segment.flightNumber}</td>
            </tr>
            <tr>
              <th>Aircraft</th>
              <td>{segment.aircraft}</td>
            </tr>
            <tr>
              <th>Class</th>
              <td>{segment.cabin}</td>
            </tr>
            <tr>
              <th>Connection duration</th>
              <td>{segment.connectionDuration}</td>
            </tr>
            <tr>
              <th>Flight Duration</th>
              <td>{segment.duration}</td>
            </tr>
            <tr>
              <th>Meal</th>
              <td>{!!segment.meal}</td>
            </tr>
          </table>
        )
      });
      
    let flightsView = window.flightData.map(function(flight, index) {
        return (
          <tbody>
            <thead>
              <th className='text-center'>Option: {index + 1}</th>
            </thead>
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
              <td>{flightSegmentsView}</td>
            </tr>
          </tbody>
          )
      });
        
    });
    return (
      <div>
        <div className='col-lg-8'>
           <table className="table table-hover table-bordered">
              {flightsView}  
          </table>
        </div>
      </div>
    );
  }
  
}


