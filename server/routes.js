const express = require('express');
const bodyParser = require('body-parser');
const userCtrl = require('./db/users/usersController.js');
const itineraryCtrl = require('./db/itinerary/itineraryController.js');
const routes = express();
const request = require('request');

//Parse incoming body
routes.use(bodyParser.urlencoded({extended: true}));
routes.use(bodyParser.json());

routes.use(express.static(__dirname + '/../public'));
routes.use(express.static(__dirname + '/../public/img'));

routes.get('/users/signin', userCtrl.signin);
routes.post('/users/create', userCtrl.create);
routes.get('/users/auth', userCtrl.authenticate);
routes.post('/iatacodes/', function(req, res) {
  //Server gets POST request from client in order to make GET request to IATACODES.ORG
  //Circumvents CORS Policy since IATACODES api doesn't allow cross-origin requests
  //Response is then sent to the client
  //'https://iatacodes.org/api/v6/nearby?api_key=23116fc6-26dc-471e-a90c-537e7511569a&lat=37.775&lng=-122.42&distance=50'
  request('https://iatacodes.org/api/v6/nearby?api_key=23116fc6-26dc-471e-a90c-537e7511569a&lat=' + req.body.lat + '&lng=' + req.body.lng + '&distance=100', function (error, response, body) {
    if (!error && response.statusCode === 200) {
      res.send(body);
    }
  });

});

routes.get('/itinerary', itineraryCtrl.retreive);
routes.post('/itinerary', itineraryCtrl.save);

routes.get('/*', function(req, res) {
  res.redirect('/');
});

module.exports = routes;
