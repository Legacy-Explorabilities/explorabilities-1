//API Key for Google QPX - AIzaSyDuf6lwcJMGBRt4exA2HdQlCy8PdDSRFDE 
//API Key for IATA Airport Codes 23116fc6-26dc-471e-a90c-537e7511569a (http://iatacodes.org/)
//Get ALL THE WORLD'S AIRPORTS
import React from 'react';
import axios from 'axios';

export default class Flights extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      departureAirports: [],
      arrivalAirports: []
    }
    //setInterval(function(){console.log('hello', props)}, 1000)
  }


  render() {
    var departureAirportsView = this.state.departureAirports.map(function(airport) {
      return (
        <li key={airport.code}>
          <span>{airport.code}: </span>
          <span>{airport.name}</span>
        </li>
      )
    });

    var arrivalAirportsView = this.state.arrivalAirports.map(function(airport) {
      return (
        <li key={airport.code}>
          <span>{airport.code}: </span>
          <span>{airport.name}</span>
        </li>
      )
    });

    return (
      <div>
        <h2>Select airports:</h2>
        <ul>{departureAirportsView}</ul>
        <ul>{arrivalAirportsView}</ul>
      </div>
    );
  }
  //listen for updates in props (e.g. finding user's location)
  componentWillReceiveProps(location) {
    console.log('Location from Flights.jsx ', location)
    if (location.currentUserLocation && location.searchTargetLocation) {
      //only after both curent location and target (vacation/trip) location are found
      //invoke findDepartureAirports and ArrivalAirports
      this.findDepartureAirports(location.currentUserLocation);
      this.findArrivalAirports(location.searchTargetLocation);
    }
  }
  // componentDidMount() {
  // }

  findFlights(origin, destination) {
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
    const context = this;
    console.log('findDepartureAirports');
    /*Make a request to the server which will make ghe get request
    when data comes back, set this (Flights) component's state to that data*/
    this.getAirportDataFromServer(currentUserLocation, function (data){
      
      var filteredAirports = data.filter(function(airport){
        return (!airport.name.match(/heliport/gi) && !airport.name.match(/bus/gi))
      });
      context.setState({
        departureAirports: filteredAirports
      });
      console.log('departureAirportData', filteredAirports); 
    })
    
  }

  findArrivalAirports(searchTargetLocation) {
    const context = this;
    console.log('findArrivalAirports');
    /*Make a request to the server which will make ghe get request
    when data comes back, set this (Flights) component's state to that data*/
    this.getAirportDataFromServer(searchTargetLocation, function (data){
      var filteredAirports = data.filter(function(airport){
        return (!airport.name.match(/heliport/gi) && !airport.name.match(/bus/gi))
      })
      context.setState({
        arrivalAirports: filteredAirports
      });
      console.log('arrivalAirportData', filteredAirports);  
      
    })
  }

  getAirportDataFromServer(searchLocation, findDepartureOrArrivalAirports){
    axios({
      method: 'post',
      url: 'http://127.0.0.1:3000/iatacodes/',
      data: {
        lat: searchLocation.lat,
        lng: searchLocation.lng,
      }
    })
    .then(function(response) {
      findDepartureOrArrivalAirports(response.data.response)
    })
    .catch(function(error) {
      console.log(error);
    });  
  }
}