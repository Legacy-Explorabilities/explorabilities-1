//API Key for Google QPX - AIzaSyDuf6lwcJMGBRt4exA2HdQlCy8PdDSRFDE 
//API Key for IATA Airport Codes 23116fc6-26dc-471e-a90c-537e7511569a (http://iatacodes.org/)
//Get ALL THE WORLD'S AIRPORTS
import React from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import {browserHistory} from 'react-router';
require('style!css!../../node_modules/react-datepicker/dist/react-datepicker.css');

export default class FlightsSearch extends React.Component {
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
    }

    function setArrivalAirport(airport, e){
      
      context.setState({
        userSelectedArrivalAirport: e.target.value
      }, () => {
        
      });

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
            {airport.code}: {airport.name}
        </option>

      )
    });

    return (
      <div>
        <div id='place'>
          <div id="placeContent" className='airport'>
            <form onSubmit={(e)=>{context.handleSubmit(e, context)}}>
              <button type="submit">Search Airline Deals</button>
              <h2 className="placeHeader">Airlines</h2>
              <p>Select an Airport near you</p>
              <select name="departureAirports"
              onChange={setDepartureAirport.bind(this, 'departureAirports')}
              >
                {departureAirportsView}
              </select>
              <p>Select an Airport near your destination</p>
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
    if (location.currentUserLocation && location.searchTargetLocation) {
      //only after both curent location and target (vacation/trip) location are found
      //invoke findDepartureAirports and ArrivalAirports
      this.findDepartureAirports(location.currentUserLocation);
      this.findArrivalAirports(location.searchTargetLocation);
    }
  }
  handleSubmit(e, context){
    e.preventDefault();
    if (!context.state.departureDate && 
        !context.state.userSelectedDepartureAirport &&
        !context.state.userSelectedArrivalAirport){
      alert('please select the choose city and flight dates')
    } else {
      console.log('button triggered submit', context.state)

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
        url: 'https://www.googleapis.com/qpxExpress/v1/trips/search?key=AIzaSyDuf6lwcJMGBRt4exA2HdQlCy8PdDSRFDE',
        data: params,
        headers: {
          'content-type': 'application/json'
        }
      })
      .then(function(response) {
        function findAirportName(airportCode){
          var airports = response.data.trips.data.airport;
          for (var i = 0; i < airports.length; i ++) {
            if (airports[i].code === airportCode){
              return airports[i].name
            }
          }
        };

        function findCarrierName(carrierCode){
          var carriers = response.data.trips.data.carrier;

          for (var i = 0; i < carriers.length; i ++) {
            if (carriers[i].code === carrierCode){
              return carriers[i].name
            }
          }
        };

        function findAircraftName(aircraftCode){
          var aircrafts = response.data.trips.data.aircraft;
          for (var i = 0; i < aircrafts.length; i ++) {
            if (aircrafts[i].code === aircraftCode){
              return aircrafts[i].name
            }
          }
        };
        function iterateThroughSegments(segment){

          var carrierName = findCarrierName(segment.flight.carrier);
          var aircraftName = findAircraftName(segment.leg[0].aircraft);
          var originAirportName = findAirportName(segment.leg[0].origin);
          var destinationAirportName = findAirportName(segment.leg[0].destination);

          var singleSegment = {
            duration: moment.duration(segment.duration * 60000) + ' hours and ' + moment.duration(segment.duration * 60000).minutes() + ' minutes',
            carrier: carrierName,
            flightNumber: segment.flight.carrier + ' ' +segment.flight.number,
            id: segment.id,
            cabin: segment.cabin,
            bookingCode: segment.bookingCode,
            bookingCodeCount: segment.bookingCodeCount,
            kind: segment.leg[0].kind,
            id: segment.leg[0].id,
            aircraft: aircraftName,
            arrivalTime: moment(segment.leg[0].arrivalTime).format('MMMM Do YYYY, h:mm:ss a'),
            departureTime: moment(segment.leg[0].departureTime).format('MMMM Do YYYY, h:mm:ss a'),
            origin: originAirportName + ' (' + segment.leg[0].origin + ')',
            destination: destinationAirportName + ' (' + segment.leg[0].destination + ')',
            originTerminal: segment.leg[0].originTerminal,
            destinationTerminal: segment.leg[0].destinationTerminal,
            duration: moment.duration(segment.leg[0].duration * 60000).hours() + ' hours and ' + moment.duration(segment.leg[0].duration * 60000).minutes() + ' minutes',
            mileage: segment.leg[0].mileage,
            meal: segment.leg[0].meal,
            connectionDuration: moment.duration(segment.connectionDuration  * 60000).hours() + ' hours and ' + moment.duration(segment.connectionDuration  * 60000).minutes() + ' minutes'
          }
          return singleSegment;
        };

        function iterateThroughSlices(slice){
          //there will be one slice for one-way flights
          //two for round-trip
          var legs = slice.segment.map(function(leg) {
            return iterateThroughSegments(leg);
          });
          //TODO: must iterate through slice.segment
          var singleSlice = {
            from: legs[0].origin,
            to: legs[legs.length-1].destination,
            departure: legs[0].departureTime,
            arrival: legs[legs.length-1].arrivalTime,
            totalTripLength: moment.duration(slice.duration * 60000).hours() + ' hours and ' + moment.duration(slice.duration * 60000).minutes() + ' minutes',
            flightSegments: legs
          }
          console.log(singleSlice);
          return singleSlice;
        };

        function iterateThroughTripOptions(tripOption){
          var slices = tripOption.slice.map(function(singleSlice){
            return iterateThroughSlices(singleSlice);
          });

          var singleTripOption = {
            saleTotal: tripOption.saleTotal,
            outgoingTrip: slices[0],
            returnTrip: !!slices[1] ? slices[1] : false,
          };
          return singleTripOption;
        }

        function iterateThroguhData(flightData){
          var result = [];
          flightData.data.trips.tripOption.forEach(function(singleTripOption){
            result.push(iterateThroughTripOptions(singleTripOption))
          });
          return result;
        }

        var data = iterateThroguhData(response);
        context.props.updateFlights(data);
        console.log('SUCCESS QPX!!!', context);
        
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