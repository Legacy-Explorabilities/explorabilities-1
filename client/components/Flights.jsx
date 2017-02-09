//API Key for Google QPX - AIzaSyDuf6lwcJMGBRt4exA2HdQlCy8PdDSRFDE 
//API Key for IATA Airport Codes 23116fc6-26dc-471e-a90c-537e7511569a (http://iatacodes.org/)
//Get ALL THE WORLD'S AIRPORTS
import React from 'react';
import axios from 'axios';

export default class Flights extends React.Component {
  constructor(props) {
    super(props);
    
    //setInterval(function(){console.log('hello', props)}, 1000)
  }

  render() {
    return (
      <div>
        <p>Hello!</p>
      </div>
    );
  }
  componentWillReceiveProps(location) {
    console.log('Location from Flights.jsx ', location)
    if (location.currentUserLocation && location.searchTargetLocation) {
      //this.findFlights();
      this.findDepartureAirports(location.currentUserLocation);
      this.findArrivalAirports(location.searchTargetLocation);
    }
  }
  // componentDidMount() {
    
  // }

  findFlights() {
    console.log('huh lets see', this.props);
    var today = new Date();
    var dd = today.getDate();
    //The value returned by getMonth is an integer between 0 and 11, referring 0 to January, 1 to February, and so on.
    var mm = today.getMonth() + 2; 
    var yyyy = today.getFullYear();
    var fullDate = yyyy + '-' + mm + '-' + dd;
    //console.log(fullDate);

    //TODO: Create an input field for customer to choose the date

    var flightSearchOptions = {
      "request": {
        "slice": [
          {
            "origin": "SFO",
            "destination": "LAX",
            "date": "2017-03-29"
          }
        ],
        "passengers": {
          "adultCount": 1,
          "infantInLapCount": 0,
          "infantInSeatCount": 0,
          "childCount": 0,
          "seniorCount": 0
        },
        "solutions": 3,
        "refundable": false
      }
    };
    
    var params = JSON.stringify(flightSearchOptions);
    //console.log(params);

    axios({
      method: 'post',
      url: 'https://www.googleapis.com/qpxExpress/v1/trips/search?key=AIzaSyDAneVe-LTFEqyCEcq2FwgIoXzYalmi3is',
      data: params,
      headers: {
        'content-type': 'application/json'
      }
    })
    .then(function(response) {
      console.log('Success QPX', response);
    })
    .catch(function(error) {
      console.log('ERROR QPX!', error);
    }); 
  }
  //make a post request to the server, so server can make get request for IATA CODES (Circumvent CORS)
  findDepartureAirports(currentUserLocation) {
    //'https://iatacodes.org/api/v6/nearby?api_key=23116fc6-26dc-471e-a90c-537e7511569a&lat=37.775&lng=-122.42&distance=50'
    console.log('findDepartureAirports');
    this.getAirportDataFromServer(currentUserLocation)
  }

  findArrivalAirports(searchTargetLocation) {
    console.log('findArrivalAirports');
    this.getAirportDataFromServer(searchTargetLocation)
  }

  getAirportDataFromServer(searchLocation){
    axios({
      method: 'post',
      url: 'http://localhost:3000/iatacodes/',
      data: {
        lat: searchLocation.lat,
        lng: searchLocation.lng,
      }
    })
    .then(function(response) {
      var nearbyAirportCodes = [];
      response.data.response.forEach(function(airport) {
        nearbyAirportCodes.push(airport.code);
      });
      console.log('Success FROM SERVER', nearbyAirportCodes);
    })
    .catch(function(error) {
      console.log(error);
    });  
  }
}