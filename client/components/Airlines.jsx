import React from 'react';
import axios from 'axios';
// import MapContainer from './MapContainer.jsx';
// import Place from './Place.jsx';
// import ItineraryList from './itineraryList.jsx';
import Airports from './Airports.jsx';
import Deals from './Deals.jsx';

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
        <MapContainer updatePlace={this.updatePlace.bind(this)} updateQuery={this.updateQuery.bind(this)}/>
        <div id="exploreContent" className="clearfix">
          <Place place={this.state.place} saveItinerary={this.saveItinerary.bind(this)}/>
          
        </div>
      </div>
    );
  }
  
}
