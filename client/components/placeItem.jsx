import React from 'react';
import StarRatingComponent from 'react-star-rating-component';

const placeItem = ({name, rating, vicinity}) => {
  return (
    <div id='place'>
      <div id="placeContent">
      <button>Add to Itinerary</button>
      <h2>{name}</h2>
      <table>
        <tbody>
          <tr id="place-address-row" className="place_row">
            <td className="place_attribute_name">Address:</td>
            <td id="place-address">{vicinity}</td>
          </tr>
        </tbody>
      </table>
      </div>
      <p/>
    </div>
  );
};


export default placeItem;