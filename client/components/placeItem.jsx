import React from 'react';
import StarRatingComponent from 'react-star-rating-component';

const placeItem = ({place}) => {
  return (
    <li className="itineraryItem">
      <div>
        <button onClick={this.props.saveItinerary}>Add to Itinerary</button>
        <h3>Place: <a href ={`${place.website}`}>{place.name}</a></h3><br/>
        <label>Address: </label><span>{place.formatted_address}</span><br/>
        <label>Phone: </label><span>{place.international_phone_number}</span><br/>
        <label>Rating: </label>
        <StarRatingComponent
          name="rate2"
          editing={false}
          starCount={5}
          value={place.rating}
        />
        <br/>

        <label>Website: </label><a href ={`${place.website}`}>{place.website}</a>
      </div>
    </li>
  );
};


export default placeItem;
