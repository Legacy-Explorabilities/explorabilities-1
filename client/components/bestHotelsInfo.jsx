import React from 'react';
import axios from 'axios';
import StarRatingComponent from 'react-star-rating-component';
import MapContainer from './MapContainer.jsx';

export default class Hotels extends React.Component {
  constructor(props) {
  	// console.log("------", props)
   super(props);
  }
  componentDidMount() {
  	//this.props.updatePlace;	
  }

  render() {
  	var hotelsDetailView = this.props.location.state.hotelData.map(function(hotles){
  	return (
  		<div>
		    <h3>Place: <a href ={`${hotles.website}`}>{hotles.name}</a></h3>
		    <label>Address: </label><span>{hotles.vicinity}</span><br/>
		    <label>Phone: </label><span>{hotles.international_phone_number}</span><br/>
		    <label>Rating: </label>
		    <StarRatingComponent
		    name="rate2"
		    editing={false}
		    starCount={5}
		    value={hotles.rating}/>
            <br/>

            <label>Website: </label><a href ={`${hotles.website}`}>{hotles.website}</a><br></br><br></br>
        </div>
  	);
  });
  	return(
  		<div>{hotelsDetailView}</div>
  		);
  }
}







