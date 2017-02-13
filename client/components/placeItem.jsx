import React from 'react';
import {Link} from 'react-router';
import StarRatingComponent from 'react-star-rating-component';

export default class PlaceItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      thePlaceId: '',
    };
  }

  componentDidMount() {
    // console.log('PlaceItem.jsx props', this.props);
    this.state.thePlaceId = this.props.thePlaceId;
  }

  render() {
    return (
      <div id='place'>
        <div id="placeContent">
        <button onClick={() => this.props.saveItinerary(this.state.thePlaceId)}>Add</button>
        <div></div>
        <p><strong>{this.props.type}</strong></p>
        <h3><Link to="#" onClick={() => this.props.getPlaceId(this.state.thePlaceId)}>{this.props.name}</Link></h3>
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