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
  render() {
    return (
      <div id="exploreContainer">
        <MapContainer updatePlace={this.updatePlace.bind(this)} updateQuery={this.updateQuery.bind(this)} searchTargetLocation={this.searchTargetLocation.bind(this)} currentUserLocation={this.currentUserLocation.bind(this)}/>
        <div id="exploreContent" className="clearfix">
          <Place place={this.state.place} addItem={this.addItem.bind(this)}/>
          <ItineraryList
            list={this.state.itinerary}
            query={this.state.query}
            saveMessage={this.state.saveMessage}
            removeItem={this.removeItem.bind(this)}
            saveItinerary={this.saveItinerary.bind(this)}
          />
          <Flights 
            searchTargetLocation   = {this.state.userSearchLocation} 
            currentUserLocation    = {this.state.userLocation} 
          />
        </div>
      </div>
    );
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

  updateQuery(query) {
    this.setState({
      place: {},
      query: query,
      itinerary: {},
      saveMessage: ''
    });
  }

  addItem() {
    this.state.itinerary[this.state.place.place_id] = this.state.place;
    this.setState({
      itinerary: this.state.itinerary
    });
  }

  removeItem(key) {
    delete this.state.itinerary[key];
    this.setState({
      itinerary: this.state.itinerary,
      saveMessage: ''
    });
  }

  saveItinerary() {
    const context = this;
    console.log(this.state.query, 'query');

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
  }
}
