angular.module('starter.controllers')
.controller('MyPartiesController', function($scope, Party, Auth, $ionicModal, $state) {
  $scope.title = 'My Parties';
  $scope.user = Auth.getUser();

  $scope.doRefresh = function() {
    Party.getUserParties(Auth.getUser().id).success(function(data) {
      console.log('user parties ', data);
      $scope.parties = data.user.parties;
    }).finally(function() {
      $scope.$broadcast('scroll.refreshComplete');
    });
  };

  Party.getUserParties(Auth.getUser().id).success(function(data) {
    console.log('user parties ', data);
    $scope.parties = data.user.parties;
  });

  $ionicModal.fromTemplateUrl('templates/newParty.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });
  $scope.createParty = function(party) {
    navigator.geolocation.getCurrentPosition(function(pos) {
      console.log(pos);
      party.latitude = pos.coords.latitude
      party.longitude = pos.coords.longitude
      Party.createParty(party).success(function(data) {
        console.log('success', data);
        $scope.party = {};
        $scope.closeModal();
        $scope.doRefresh();
      });
    }, function(error) {
      console.log(error);
    });
  };
  $scope.openModal = function() {
    $scope.modal.show();
    console.log('opening modal');
  };
  $scope.closeModal = function() {
    $scope.modal.hide();
    console.log('closing modal');
  };
  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });
});