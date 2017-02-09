//API Key for Google QPX - AIzaSyDuf6lwcJMGBRt4exA2HdQlCy8PdDSRFDE 
//API Key for IATA Airport Codes 23116fc6-26dc-471e-a90c-537e7511569a (http://iatacodes.org/)
//Get ALL THE WORLD'S AIRPORTS
import React from 'react';
import axios from 'axios';

export default class Flights extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <p>Hello!</p>
      </div>
    );
  }

  componentDidMount() {
    this.findFlights();
    this.findAirports();
  }

  findFlights() {
    var today = new Date();
    var dd = today.getDate();
    //The value returned by getMonth is an integer between 0 and 11, referring 0 to January, 1 to February, and so on.
    var mm = today.getMonth() + 2; 
    var yyyy = today.getFullYear();
    var fullDate = yyyy + '-' + mm + '-' + dd;
    console.log(fullDate);

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
    console.log(params);

    axios({
      method: 'post',
      url: 'https://www.googleapis.com/qpxExpress/v1/trips/search?key=AIzaSyDuf6lwcJMGBRt4exA2HdQlCy8PdDSRFDE',
      data: params,
      headers: {
        'content-type': 'application/json'
      }
    })
    .then(function(response) {
      console.log('Success', response);
    })
    .catch(function(error) {
      console.log(error);
    }); 
  }
  //make a post request to the server, so server can make get request for IATA CODES (Circumvent CORS)
  findAirports() {
    console.log('find airports');
    axios({
      method: 'post',
      url: 'http://localhost:3000/iatacodes/',
      data: {
        lat: 37.775,
        lng: -122.42,
      }
    })
    .then(function(response) {
      console.log('Success FROM SERVER', response);
    })
      .catch(function(error) {
        console.log(error);
      });  
  }
}