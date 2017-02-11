//API Key for Google QPX - AIzaSyDuf6lwcJMGBRt4exA2HdQlCy8PdDSRFDE 
//API Key for IATA Airport Codes 23116fc6-26dc-471e-a90c-537e7511569a (http://iatacodes.org/)
//Get ALL THE WORLD'S AIRPORTS
import React from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import moment from 'moment';
require('style!css!../../node_modules/react-datepicker/dist/react-datepicker.css');

export default class Flights extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      departureAirports: [],
      arrivalAirports: [],
      userSelectedDepartureAirport: '',
      userSelectedArrivalAirport: '',
      departureDate: '',
      returnDate: '',
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

    function setDepartureDate (date) {
      var now = moment();
      if (now.isAfter(date)) {
        alert('You can\'t select a date that has passed. Please select a valid date')
      } else {
        context.setState({
          departureDate: date
        });
      } 
    }

    function setReturnDate (date) {
      //var now = moment();
      if (!context.state.departureDate) {
        alert('Please select a departure date first!');
      } else if (context.state.departureDate.isAfter(date)) {
        alert('You can\'t select a date earlier than departure date. Please select a valid date')
      } else {
        context.setState({
          returnDate: date
        });
      }
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
              <p>&nbsp;</p>
              <div>
                <p>Choose departure date</p>
                <DatePicker
                  selected={context.state.departureDate}
                  onChange={setDepartureDate}
                />
              </div>
              <p>&nbsp;</p>
              <div>
                <p>Choose return date (for round-trip flights)</p>
                <DatePicker
                  selected={context.state.returnDate}
                  onChange={setReturnDate}
                />
              </div>
              <p>&nbsp;</p>
              <button type="submit">Search Flights!</button>
              <p>&nbsp;</p>
              <p>&nbsp;</p>
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
    if (!context.state.departureDate && 
        !context.state.userSelectedDepartureAirport &&
        !context.state.userSelectedArrivalAirport){
      alert('please select the choose city and flight dates')
    } else {
      console.log('button triggered submit', context.state, a)

      console.log(context.state.returnDate.isAfter(context.state.departureDate));

      if (!!context.state.returnDate){
        context.findFlights(
          context,
          context.state.userSelectedDepartureAirport, 
          context.state.userSelectedArrivalAirport, 
          true
        );
      } else {
        context.findFlights(
          context,
          context.state.userSelectedDepartureAirport, 
          context.state.userSelectedArrivalAirport, 
          false
        );
      }
    }
    
  }
  findFlights(context, origin, destination, roundTrip) {
    if (!origin || !destination) {
      alert('please search for destination city')
    } else if (origin && destination) {   
      console.log('origin and destination present in findFlights', origin, destination, context.state);
     
      //TODO: Create an input field for customer to choose the date

      

      var params = '';
      if (roundTrip) {
        var roundTripFlightSearch = {
          "request": {
            "slice": [
              {
                "origin": origin,
                "destination": destination,
                "date": context.state.departureDate.format("YYYY-MM-DD")
              },
              {
                "origin": destination,
                "destination": origin,
                "date": context.state.returnDate.format("YYYY-MM-DD")
              },
            ],
            "passengers": {
              "adultCount": 1,
              "childCount": 0,
            },
            "solutions": 5,
            "refundable": false
          }
        }
        params = JSON.stringify(roundTripFlightSearch); 
      } else {
        var oneWayFlightSearch = {
          "request": {
            "slice": [
              {
                "origin": origin,
                "destination": destination,
                "date": context.state.departureDate.format("YYYY-MM-DD")
              }
            ],
            "passengers": {
              "adultCount": 1,
              "childCount": 0,
            },
            "solutions": 5,
            "refundable": false
          }
        }
        params = JSON.stringify(oneWayFlightSearch); 
      }
      console.log('FLIGHT PARAMETERS', params);

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