function NearPartiesController(scope, Party) {
  console.log('NearPartiesController');
  scope.title = 'Parties Near Me';

  scope.doRefresh = function() {
    this.getParties();
  }.bind(this);

  this.getParties = function() {
    navigator.geolocation.getCurrentPosition(function(pos) {
      console.log('geoposition', pos);
      Party.getParties(pos.coords).success(function(data) {
        console.log('near parties ', data);
        scope.parties = data;
      });
    }, function(error) {  
      console.log('geolocation error', error);
    });
  };

  this.getParties();
}

angular.module('starter.controllers')
  .controller('NearPartiesController', ['$scope', 'Party', NearPartiesController]);