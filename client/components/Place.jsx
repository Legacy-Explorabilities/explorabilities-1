import React from 'react';
import Review from './Review.jsx';
import PlaceItem from './PlaceItem.jsx';
import StarRatingComponent from 'react-star-rating-component';

export default class Place extends React.Component {
  constructor(props) {
    super(props);
  }

/*
  renderReviews () {
    if (!this.props.reviews) {
      if (this.props.place.reviews) {
        return this.props.place.reviews.map((review, index) =>
          <Review
            key={index}
            review={review.text}
            reviewer={review.author_name}
            rating={review.rating}
            date={review.relative_time_description}/>
        );
      } else {
        return;
      }
    } else {
      return (
        <Review />
      );
    }
  }*/

  render() {
    console.log('Place.jsx props.place: ', this.props.place); //Find out what's in props
    console.log('this.props.place.length', this.props.place.length);
    if (this.props.place.length > 0) {
      return (
        <div>
        {this.props.place.map((placeitem, index) => (
          <PlaceItem 
            name={placeitem.name}
            rating={placeitem.rating} 
            vicinity={placeitem.vicinity}
            saveItinerary={this.props.saveItinerary}
          />
        ))}
        </div>
      );
    }
    return (
      <div id='place'>
        <div id="placeContent">
          <h3 className="placeHeader">Itinerary Item</h3>
        </div>
      </div>
    );
  }
}
