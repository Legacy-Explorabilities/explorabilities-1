import React from 'react';
import axios from 'axios';
import {Link, browserHistory} from 'react-router';
import Hotels from './bestHotelsInfo.jsx'

export default class MapContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hotelData: []
    }
}

componentWillMount() {
    console.log('MapContainer props', this.props);
  }
  render() {
    return (
      <div>

      <div id="googleMaps"></div>

        <div className="searchBox">
          <form>
            <label id="searchLabel">
            </label>
            <input className="searchText"
              id="searchForm"
              type="text"
              placeholder=" Enter a Destination (E.g. Cancun, Mexico) "
            />
            <input className="searchText"
                id="interestSearch"
                type="text"
                placeholder="Narrow down your search"
                />
            &nbsp;&nbsp;&nbsp;<button id="submitInterest" type="submit">Submit</button>
          </form>
        </div>
        
      </div>
    );
  }
  componentDidMount() {
    this.createMap();
  }

  createMap() {
    const currentLocation = {};
    navigator.geolocation.getCurrentPosition(function(position) {
      currentLocation.lat = position.coords.latitude;
      currentLocation.lng = position.coords.longitude;      
    });
    const context = this;

    function delayMapUntilLocationFound(){

    /* ########## JSONP call for Google Map data ########## */
      ((function fetchMap() {
      window.initMap = initMap;
      const ref = window.document.getElementsByTagName('script')[0];
      const script = window.document.createElement('script');
      script.src = 'http://maps.googleapis.com/maps/api/js?key=AIzaSyCBb0bm-_wNIf3oDMi-5PN_zeOf1bRWstI&libraries=places&callback=initMap';
      ref.parentNode.insertBefore(script, ref);
      script.onload = function () {
        this.remove();
      };
    })());

    /* ################### Map Init ################### */


    let map, places, autocomplete, place;

    let hotelSelected = false;
    let markers = [];
    const searchForm = document.getElementById('searchForm');

    function initMap() {
      //const sanFrancisco = {lat: 37.775, lng: -122.42};
      let location = {lat: currentLocation.lat || 37.775, lng: currentLocation.lng || -122.42}
      //pass the current location to explorer parent to be used by flights component
      context.props.currentUserLocation(location)
      map = new google.maps.Map(document.getElementById('googleMaps'), {
        center: location,
        zoom: 15,
        zoomControl: true,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: false
      });

      autocomplete = new google.maps.places.Autocomplete((
          document.getElementById('searchForm')), {
            types: ['geocode']
      });
      

      places = new google.maps.places.PlacesService(map);

      google.maps.event.addListener(map, 'tilesloaded', function(){
        search();
      });

      var button = document.getElementById('submitInterest');
      button.addEventListener('click', onInterestChanged);

      var hotelButton = document.getElementById('hotels');
      hotelButton.addEventListener('click', onHotelSelected);
      sessionStorage.place = "San Francisco";


      autocomplete.addListener('place_changed', onPlaceChanged);


      // autocomplete.addListener('place_changed', onPlaceChanged);


      map.addListener('dragend', zoomFilter);

      axios.get('http://maps.googleapis.com/maps/api/geocode/json?latlng='+ 
                currentLocation.lat + ',' +
                currentLocation.lng)
        .then(function(response){
          window.formatedUserCity = response.data.results[2].formatted_address;
          console.log(response.data.results[2].formatted_address); // ex.: { user: 'Your User'}
          console.log(response.status); // ex.: 200
        });  
    }

    function zoomFilter() {
      if (map.getZoom() > 10) { search(); }
    }

    // When the user selects a city, get the place details for the city and
    // zoom the map in on the city.
    function onHotelSelected(e){
      console.log("hotels selected");
      e.preventDefault();
      hotelSelected = true;
      place = autocomplete.getPlace();
      search();
    }

    function onPlaceChanged() {
      place = autocomplete.getPlace();
      document.getElementById('interestSearch').value = '';
      sessionStorage.targetVicinity = place.vicinity;
      sessionStorage.place = place.name;


      context.props.updateQuery(place);

      if (place.geometry) {
        map.panTo(place.geometry.location);
        var exploreDestination = {lat: map.getCenter().lat(), lng: map.getCenter().lng()}
        //on location change pass location to Explore parent, to be used by flights component
        context.props.searchTargetLocation(exploreDestination);
        map.setZoom(13);

        search();
        //hotels();
      } else {
        // searchForm.placeholder = "Enter Your Destination (E.g. Cancun, Mexico)";
        searchForm.value = '';
      }
    }
      // if the user selects a particular interest in a city, get the details for the city filtered by that interest
      function onInterestChanged(e) {
        e.preventDefault();

        console.log(place);

        place = autocomplete.getPlace();

        if (place.geometry) {
          map.panTo(place.geometry.location);
          map.setZoom(13);
          search();
        } else {
          // searchForm.placeholder = "Enter Your Destination (E.g. Cancun, Mexico)";
          searchForm.value = '';
        }
      }
    // Search for attractions in the selected city, within the viewport of the map.

      function search() {
        const interest = document.getElementById('interestSearch').value;
        //get the hotels for the hotels page

        const hotelSearch= {
          bounds: map.getBounds(),
          types: ['lodging']
        }

        console.log(map.getBounds());
        // if ppl are looking for a new city;
        if (interest === ''){

          if (hotelSelected === false) {
            const search = {
              bounds: map.getBounds(),
              //radius: radius,
              //query: interest
              //types: someCondition === true ? types = [everything] : types = [lodging]
              types: [
                'amusement_park',
                'aquarium',
                'art_gallery',
                'bar',
                'book_store',
                'bowling_alley',
                'cafe',
                'campground',
                'casino',
                'library',
                //'lodging',
                'movie_theater',
                'museum',
                'night_club',
                'park',
                'restaurant',
                'spa',
                'stadium',
                'zoo'
              ]
            };
            places.nearbySearch(search, function (results, status) {
              if (status === google.maps.places.PlacesServiceStatus.OK) {
                clearMarkers();
                // Create a marker for each item found
                for (var i = 0; i < results.length; i++) {
                  let iconImage = {
                    url: results[i].icon,
                    size: new google.maps.Size(71, 71),
                    origin: new google.maps.Point(0, 0),
                    anchor: new google.maps.Point(17, 34),
                    scaledSize: new google.maps.Size(15, 15)
                  };
                  // Use marker animation to drop the icons incrementally on the map.
                  markers[i] = new google.maps.Marker({
                    position: results[i].geometry.location,
                    animation: google.maps.Animation.DROP,
                    icon: iconImage
                  });
                  // If the user clicks a marker, call setPlace to update the object in the Place component.
                  markers[i].placeResult = results[i];
                  google.maps.event.addListener(markers[i], 'click', setPlace);
                  setTimeout(dropMarker(i), i * 10);
                }
              }
            });
          }
          else {
            //search specifically for hotels for the hotels page
            places.nearbySearch(hotelSearch, function (results, status) {
              var hotels = results;
              context.setState({
                hotelData: hotels
              }, function () {
                browserHistory.push({
                  pathname: '/hotels',
                  state: {hotelData: context.state.hotelData}
                })
                hotelSelected = false;
              });
            })
          }


          if(hotelSelected === false){
          console.log('not checking for interests');
          const search = {
            bounds: map.getBounds(),
            //radius: radius,
            //query: interest
            //types: someCondition === true ? types = [everything] : types = [lodging]
            types: [
              'amusement_park',
              'aquarium',
              'art_gallery',
              'bar',
              'book_store',
              'bowling_alley',
              'cafe',
              'campground',
              'casino',
              'library',
              //'lodging',
              'movie_theater',
              'museum',
              'night_club',
              'park',
              'restaurant',
              'spa',
              'stadium',
              'zoo'
            ]
          };
          places.nearbySearch(search, function(results, status) {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
              clearMarkers();

              //hanyen: send the array of objects to Explore.jsx so that Place.jsx can render them
              context.props.updatePlace(results);

              // Create a marker for each item found
              for (var i = 0; i < results.length; i++) {
                let iconImage = {
                  url: results[i].icon,
                  size: new google.maps.Size(71, 71),
                  origin: new google.maps.Point(0, 0),
                  anchor: new google.maps.Point(17, 34),
                  scaledSize: new google.maps.Size(15, 15)
                };
                // Use marker animation to drop the icons incrementally on the map.
                markers[i] = new google.maps.Marker({
                  position: results[i].geometry.location,
                  animation: google.maps.Animation.DROP,
                  icon: iconImage
                });
                // If the user clicks a marker, call setPlace to update the object in the Place component.
                markers[i].placeResult = results[i];
                google.maps.event.addListener(markers[i], 'click', setPlace);
                setTimeout(dropMarker(i), i * 10);
              }
            }
          });
        } else{
        //search specifically for hotels for the hotels page
        places.nearbySearch(hotelSearch, function(results, status) {
            var hotels = results;
            context.setState({hotelData: hotels}, function(){
              browserHistory.push({
                pathname: '/hotels',
                state: { hotelData: context.state.hotelData }
           })
              hotelSelected = false;
          });
        });

      }
    }
        // if ppl are looking for a particular interest in that city;
        else{
          const search = {
            location: map.getCenter(),
            radius: '700',
            query: interest

          };
          places.textSearch(search, function(results, status) {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
              clearMarkers();

              //hanyen: send the array of objects to Explore.jsx so that Place.jsx can render them
              context.props.updatePlace(results);

              // Create a marker for each item found
              for (var i = 0; i < results.length; i++) {
                let iconImage = {
                  url: results[i].icon,
                  size: new google.maps.Size(71, 71),
                  origin: new google.maps.Point(0, 0),
                  anchor: new google.maps.Point(17, 34),
                  scaledSize: new google.maps.Size(15, 15)
                };
                // Use marker animation to drop the icons incrementally on the map.
                markers[i] = new google.maps.Marker({
                  position: results[i].geometry.location,
                  animation: google.maps.Animation.DROP,
                  icon: iconImage
                });
                // If the user clicks a marker, call setPlace to update the object in the Place component.
                markers[i].placeResult = results[i];
                google.maps.event.addListener(markers[i], 'click', setPlace);
                setTimeout(dropMarker(i), i * 10);
              }
            }
          });
        }
      }

    function clearMarkers() {
      for (var i = 0; i < markers.length; i++) {
        if (markers[i]) {
          markers[i].setMap(null);
        }
      }
      markers = [];
    }

    function dropMarker(i) {
      return function() {
        markers[i].setMap(map);
      };
    }

    function setPlace() {
      const marker = this;
      places.getDetails({placeId: marker.placeResult.place_id},
        function(place, status) {
          console.log('Inside setPlace', arguments);
          if (status !== google.maps.places.PlacesServiceStatus.OK) {
            return;
          }
          console.log('===================')
          console.log('Detailed place info', place);
          console.log('===================')
          // context.props.updatePlace(place);
        });
    }
    };

    setTimeout(delayMapUntilLocationFound, 1000);
  }
}
