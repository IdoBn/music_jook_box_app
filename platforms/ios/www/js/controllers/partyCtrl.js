angular.module('starter.controllers')
.controller('PartyController', ['$scope', '$stateParams', 'Party', 'Auth', '$ionicPopup', '$state', function($scope, $stateParams, Party, Auth, $ionicPopup, $state){
  $scope.id = $stateParams.partyId;
  $scope.currentUser = Auth.getUser()
  Party.getParty($scope.id).success(function(data) {
    $scope.party = data.party;
  });

  $scope.doRefresh = function() {
    Party.getParty($scope.id).success(function(data) {
      $scope.party = data.party;
    })
    .finally(function() {
      $scope.$broadcast('scroll.refreshComplete');
   });
  };

  $scope.destroyParty = function() {
    $ionicPopup.confirm({
      title: 'Delete Party',
      content: 'Are you sure you want to delete this party?'
    }).then(function(res) {
      if(res) {
        Party.destroyParty($scope.party.id).success(function() {
          $state.go('app.parties');
        });
      }
    });
  };
}]);