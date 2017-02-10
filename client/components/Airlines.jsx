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
  }

  render() {
    return (
      <div id="exploreContainer">
        <div id="exploreContent" className="clearfix">
          <Flights 
            searchTargetLocation   = {this.state.userSearchLocation} 
            currentUserLocation    = {this.state.userLocation} 
          />
        </div>
      </div>
    );
  }
  
}
