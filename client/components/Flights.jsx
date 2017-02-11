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
      arrivalAirports: [],
      userSelectedDepartureAirport: '',
      userSelectedArrivalAirport: '',
    }
    console.log("PROPSSSSSS TEST", props);
    //setInterval(function(){console.log('hello', props)}, 1000)
  }

  render() {
    const context = this;
    //listen for user clicks on departure airports
    function setDepartureAirport(airport, e){
      context.setState({
        userSelectedDepartureAirport: e.target.value
      }, ()=>{

      });
      console.log('setDepartureAirport', airport, e.target.value);
    }

    function setArrivalAirport(airport, e){
      
      context.setState({
        userSelectedArrivalAirport: e.target.value
      }, () => {
        
      });
      console.log('setArrivalAirport', airport, e.target.value);

    }
    let departureAirportsView = this.state.departureAirports.map(function(airport) {
      return (
        <option 
          value={airport.code} 
          name="userSelectedDepartureAirport">
            {airport.code}:{airport.name}
        </option>
      )
    });

    let arrivalAirportsView = this.state.arrivalAirports.map(function(airport) {
      return (
        <option 
          value={airport.code} 
          name="userSelectedArrivalAirport">
            {airport.code}:{airport.name}
        </option>
      )
    });

    return (
      <div>
        <div id='place' className='airport'>
          <div id="placeContent">
            <form onSubmit={(e)=>{context.handleSubmit(e, context)}}>
              <h3 className="placeHeader">Airlines</h3>
              <p>&nbsp;</p>
              <p>Select an Airport near you</p>
              <select name="departureAirports" name="departureAirports"
              onChange={setDepartureAirport.bind(this, 'departureAirports')}
              >
                {departureAirportsView}
              </select>
              <p>&nbsp;</p>
              <p>Select an Airport near {sessionStorage.targetVicinity}</p>
              <select name="arrivalAirports"
              onChange={setArrivalAirport.bind(this, 'arrivalAirports')}
              >
                {arrivalAirportsView}
              </select>
              <button type="submit">Search Deals</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
  //listen for updates in props (e.g. finding user's location)
  componentWillReceiveProps(location) {
    console.log('componentWillReceiveProps ', location)
    if (location.currentUserLocation && location.searchTargetLocation) {
      //only after both curent location and target (vacation/trip) location are found
      //invoke findDepartureAirports and ArrivalAirports
      this.findDepartureAirports(location.currentUserLocation);
      this.findArrivalAirports(location.searchTargetLocation);
    }
  }
  handleSubmit(e, context, a, d){
    e.preventDefault();
    console.log('button triggered submit', context.state, a)
    context.findFlights(
      context.state.userSelectedDepartureAirport, 
      context.state.userSelectedArrivalAirport
    );
  }
  findFlights(origin, destination) {
    if (origin && destination) {   
      console.log('origin and destination present in findFlights', origin, destination);
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
              "origin": origin,
              "destination": destination,
              "date": "2017-03-29"
            },
            {
              "origin": destination,
              "destination": origin,
              "date": "2017-04-29"
            },
          ],
          "passengers": {
            "adultCount": 1,
            "childCount": 0,
          },
          "solutions": 1,
          "refundable": false
        }
      }
    
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
        console.log('Success QPX', JSON.stringify(response));
      })
      .catch(function(error) {
        console.log('ERROR QPX!', error);
      }); 
    }
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
      url: 'http://localhost:3000/iatacodes/',
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