import React from 'react';
import axios from 'axios';
import MapContainer from './MapContainer.jsx';
import Place from './Place.jsx';
import ItineraryList from './itineraryList.jsx';
import FlightsSearch from './Flights.jsx';
import FlightsView from './FlightsView.jsx';
import Hotels from './bestHotelsInfo.jsx';
import {browserHistory} from 'react-router';


export default class Explore extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      place: [],
      placesGoogleObject: {},
      query: '',
      itinerary: {},
      saveMessage: '',
      localAirports: [],
      hotels:[],
      thePlaceId: '',
      foundFlights: []
    };
  }

  componentDidMount() {
    console.log('Explore.jsx componentDidMount localStorage', localStorage);
    if (localStorage.places) {
      this.setState({
        place: JSON.parse(localStorage.places)
      });
    }
  }
  //Flights's searchTargetLocation and currentUserLocation are passed down from here
  render() {

    /*

    Displaying detailed information for places
    @@ make sure this.state.place is passed down all the way to placeItem.jsx
      > pass down the place id to placeItem.jsx
    @@ create a function to do ajax call to Google to get detail information
      > put the in placeItem.jsx and make sure each instance of the component has it.
      > to make ajax call to Google, need to instantiate the google place object
      > either pass it down from Explore or instantiate it again in placeItem.jsx
      > instantiate google place object in Place.jsx, then pass it down to placeItem.jsx
      > make Place.jsx a child of MapContainer.jsx and pass down the google object
        XXX problem because Place is not rendered from MapContainer, but from Explore.jsx
      > From Explore.js, bind the method to set places and send it down to Map. Once bound, send it down to Place > placeItem
        >> Figure out what  // updatePlace // does. ie. what object is being passed back from MapContainer.
        >> updatePlace grab the summary of the place object so that I can render all the places.
        >> need to figure out how to pass back the google place object.
          >>> create updatePlacesGoogleObject method and pass it down to MapContainer
          >>> on line 100 in MapContainer.jsx, send places object back to Explore
          >>> send placesGoogleObject state down to Place.jsx and to placeItem.jsx
          >>> in placeItem.jsx, the getDetails() method needs prints out all the placeIds. Why?
          XXX dead end
        >> need to control everything from Explore.jsx level. All we need from placeItem.jsx is the place_id of the component being clicked.
          >>> remember that the saveItenerary also needs the place_id of the component
          >>> 


    @@ use bootstrap to display the popup
      > research Bootstrap Popover. https://v4-alpha.getbootstrap.com/components/popovers/#example-enable-popovers-everywhere
        > include tether.min.js
        XXX does it work with React?
    @@ use react-popover
      > do research https://github.com/littlebits/react-popover

      */



    return (
      <div id="exploreContainer">
        
        <MapContainer
          updatePlace={this.updatePlace.bind(this)} 
          updateQuery={this.updateQuery.bind(this)} 
          searchTargetLocation={this.searchTargetLocation.bind(this)} 
          currentUserLocation={this.currentUserLocation.bind(this)}/>
        
        <div id="exploreContent" className="clearfix">
          <FlightsSearch 
            searchTargetLocation   = {this.state.userSearchLocation} 
            currentUserLocation    = {this.state.userLocation} 
            placeVicinity = {this.state.place.vicinity}
            updateFlights = {this.updateFlights.bind(this)}
          />
          <FlightsView foundFlights={this.state.foundFlights}/>
          <Place 
              place={this.state.place} 
              saveItinerary={this.saveItinerary.bind(this)}
              getPlaceId={this.getPlaceId.bind(this)}/>
        </div>

      </div>
    );
  }
//MapContainer
//
  /*updatePlace(place) {
    //set data to localStorage
    localStorage.places = JSON.stringify(place);
    console.log('Explore.jsx place object given from MapContainer.jsx', place);
    console.log('Explore.jsx localStorage is set with place given from MapContainer.jsx', localStorage);
    //get data from localStorage
    //setState is a built in method
    this.setState({
      place: JSON.parse(localStorage.places)
    });
  }*/
  updateFlights(flights){
    this.setState({
      foundFlights: flights
    }, function(){
      window.flightData = flights;
      browserHistory.push('/airlines');
      console.log('CHANGE PAGE TO AIRLINES IN UPDATEFLIGHTS FUNCITON ', this.state)

    });
  }
  updatePlace(place) {
    this.setState({
      place: place
    });
  }

  //user's target location - set from map container
  searchTargetLocation(location){
    //console.log(airports);
    this.setState({
      userSearchLocation: location,
    });
  }
  //user's current locaiton - set from map container
  currentUserLocation(location) {
    console.log('invoked currentUserLocation ', location)
    this.setState({
      userLocation: location,
    });
  }


//MapContainer
  updateQuery(query) {
    this.setState({
      place: {},
      query: query,
      itinerary: {},
      saveMessage: ''
    });
  }

//ItineraryList
  removeItem(key) {
    delete this.state.itinerary[key];
    this.setState({
      itinerary: this.state.itinerary,
      saveMessage: ''
    });
  }
//ItineraryList. This function will save the item to database.
  saveItinerary(id) {
    console.log('==================');
    console.log('state.query', this.state.query);
    console.log('==================');
    console.log('in saveItinerary');
    console.log('token', localStorage.token);
    console.log('itineraryID', this.state.query.place_id);
    console.log('itineraryName', this.state.query.name);
    console.log('placeIDs', id);
    console.log('==================');
    if (checkAuth()) {
      const context = this;
      // this.state.itinerary[this.state.place.place_id] = this.state.place;
      // this.setState({
      //   itinerary: this.state.itinerary
      // });

      axios.post('/itinerary', {
        token: localStorage.token,
        itineraryID: this.state.query.place_id,
        itineraryName: this.state.query.name,
        placeIDs: [id]
      })
      .then(function(res) {
        if (res.status === 200) {
          context.setState({
            saveMessage: 'Saved'
          });
          console.log(context.state.saveMessage);
        }
      })
      .catch(function(error) {
        console.log(error, 'error saving itinerary');
      });
    } else {
      alert('Please login');
    }
  }

  getPlaceId(id) {
    
    console.log('Clicked placeItem id', id);
    this.setState({
      thePlaceId: id
    });
    
    /*//build map
    const key = 'AIzaSyCBb0bm-_wNIf3oDMi-5PN_zeOf1bRWstI';
    const url = 'https://maps.googleapis.com/maps/api/js?key=' + key + '&libraries=places&callback=initMap';

    window.initMap = initMap;
    const ref = window.document.getElementsByTagName('script')[0];
    const script = window.document.createElement('script');
    script.src = url;
    ref.parentNode.insertBefore(script, ref);
    script.onload = function () {
      this.remove();
    };

    function initMap() {
      const map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 37.775, lng: -122.42 },
        zoom: 8,
        zoomControl: true,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: false
      });

      const service = new google.maps.places.PlacesService(map);

      service.getDetails({
        placeId: id
      }, (place, status) => {
        console.log('===========');
        console.log('Detailed Place information', place);
        console.log('===========');
      });
      
    }*/
  
    // this.state.placesGoogleObject.getDetails({placeId: '9d8f15a1eeb97beb2644f06bfa08a72384c4fc2a'}, function(place, status) {
      
    //   //pop up a window with detailed information
    //   console.log('PlaceItem.jsx getDetails place object', place);
      
    // });  
  }

  

}

function checkAuth() {
  if (!localStorage.token) {
    return false;
  } else {
    return true;
  }

}

//TODO
//popup login dialog
//currently Explore doesn't remember the last location user entered (1)
  //may need to store the state in the localStorage
  //this function setPlace() in MapContainer set the prop, which call updatePlace method in Explore (this file).
  //in local storage create hotel, airline, deals property, then use array to store the many object. Do fancy sorting algorithm? Or use Hash to retrieve.  

//Use ComponentDidLoad to do all the 3rd party API queries and save it to localStorage
  // and retrieve the object to be rendered on the screen.

//Adding and removing to itenenary should be handled in Places component.
//Remove itinerary component from Explore
//Populate the area below the map with: Hotels, Airlines, Restaurants, Activities, etc in the vicinity of the destinations.
//research infinity scrolling
