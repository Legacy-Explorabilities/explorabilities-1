import React from 'react';
import {Link} from 'react-router';
import StarRatingComponent from 'react-star-rating-component';

export default class PlaceItem extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log('PlaceItem.jsx props', this.props);
  }

  render() {
    return (
      <div id='place'>
        <div id="placeContent">
        <button onClick={this.props.saveItinerary}>Add</button>
        <p><strong>{this.props.type}</strong></p>
        <h3><Link to="#">{this.props.name}</Link></h3>
        <table>
          <tbody>
            <tr id="place-address-row" className="place_row">
              <td className="place_attribute_name"></td>
            </tr>
          </tbody>
        </table>
        </div>
      </div>    
    )
  }
}

// const placeItem = (props) => {
//   return (
//     <div id='place'>
//       <div id="placeContent">
//       <button onClick={this.props.saveItinerary}>Add</button>
//       <h3>{this.props.place.name}</h3>
//       <table>
//         <tbody>
//           <tr id="place-address-row" className="place_row">
//             <td className="place_attribute_name"></td>
//           </tr>
//         </tbody>
//       </table>
//       </div>
//     </div>
//   );
// };


// export default placeItem;