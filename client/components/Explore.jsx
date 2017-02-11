import React from 'react';
import axios from 'axios';
import MapContainer from './MapContainer.jsx';
import Place from './Place.jsx';
import ItineraryList from './itineraryList.jsx';
import Flights from './Flights.jsx';

export default class Explore extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      place: {},
      query: '',
      itinerary: {},
      saveMessage: '',
      localAirports: []
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
    return (
      <div id="exploreContainer">
        <MapContainer
          updatePlace={this.updatePlace.bind(this)} 
          updateQuery={this.updateQuery.bind(this)} 
          searchTargetLocation={this.searchTargetLocation.bind(this)} 
          currentUserLocation={this.currentUserLocation.bind(this)}
        />
        <div id="exploreContent" className="clearfix">
          <Place place={this.state.place} saveItinerary={this.saveItinerary.bind(this)}/>
          <Flights 
            searchTargetLocation   = {this.state.userSearchLocation} 
            currentUserLocation    = {this.state.userLocation} 
            placeVicinity = {this.state.place.vicinity}
          />
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
  saveItinerary() {
    if (checkAuth()) {
      const context = this;
      
      this.state.itinerary[this.state.place.place_id] = this.state.place;
      this.setState({
        itinerary: this.state.itinerary
      });

      axios.post('/itinerary', {
        token: localStorage.token,
        itineraryID: this.state.query.place_id,
        itineraryName: this.state.query.name,
        placeIDs: Object.keys(this.state.itinerary)
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
